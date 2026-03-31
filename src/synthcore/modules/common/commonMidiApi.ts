import { button, cc, nrpn } from '../../../midi/midibus'
import type {
    ControllerConfig,
    ControllerConfigButton,
    ControllerConfigCC,
    ControllerConfigNRPN,
} from '../../../midi/types'
import { shouldSend } from '../../../midi/utils'
import { getBounded } from '../../../store/utils'
import logger from '../../../utils/logger'
import { ApiSource } from '../../types'
import type { NumericInputProperty } from './types'

// Send signature
export type ParamSendFunc = (
    input: NumericInputProperty,
    outputMapper?: (value: number, ctrl: ControllerConfig, valueIndex?: number) => number
) => void

// Receive signature
export type ParamReceiveFunc = (
    ctrl: ControllerConfig | ControllerConfigCC | ControllerConfigButton,
    apiSetValue: (input: NumericInputProperty) => void,
    inputMapper?: (midiValue: number, ctrl: ControllerConfig) => { value: number; valueIndex?: number }
) => void

export const toggleParamSend = (
    source: ApiSource,
    value: number,
    cfg: ControllerConfigButton,
    voiceGroupIndex: number
) => {
    if (!shouldSend(source)) {
        return
    }
    logger.midi(`Setting button param value for ${cfg.label} to ${value}`)
    button.send(voiceGroupIndex, cfg, cfg.values[value])
}

export const toggleParamReceive = (
    cfg: ControllerConfigButton,
    apiSetValue: (value: number, source: ApiSource, voiceGroupIndex: number) => void
) => {
    button.subscribe((voiceGroupIndex: number, midiValue: number) => {
        const value = cfg.values.indexOf(midiValue) || 0
        apiSetValue(value, ApiSource.MIDI, voiceGroupIndex)
    }, cfg)
}

const ccMapper = {
    input: (midiValue: number, ctrl: ControllerConfig | ControllerConfigCC | ControllerConfigButton) => {
        return { value: ctrl.bipolar ? (midiValue - 64) / 127 : midiValue / 127 }
    },
    output: (value: number, ctrl: ControllerConfig | ControllerConfigCC | ControllerConfigButton) => {
        return ctrl.bipolar ? Math.floor(63 * value + 64) : Math.floor(127 * value)
    },
}
const ccWithValueMapper = {
    input: (midiValue: number, ctrl: ControllerConfig | ControllerConfigCC | ControllerConfigButton) => {
        return { value: (ctrl.values && ctrl.values.indexOf(midiValue)) || 0 }
    },
    output: (value: number, ctrl: ControllerConfig | ControllerConfigCC | ControllerConfigButton) => {
        return (ctrl.values && ctrl.values[value]) || 0
    },
}

const ccWithRangeMapper = {
    input: (midiValue: number, ctrl: ControllerConfig | ControllerConfigCC | ControllerConfigButton) => {
        if (!ctrl.range) {
            throw Error('cannot use ctrl without range')
        }
        const span = ctrl.range.to - ctrl.range.from
        const value = (midiValue - ctrl.range.from) / span
        if (value < 0 || value > 1) {
            console.error('Received midi value is out of range, capping', midiValue, ctrl.range.from, ctrl.range.to)
        }
        return { value: getBounded(value) }
    },
    output: (value: number, ctrl: ControllerConfig | ControllerConfigCC | ControllerConfigButton) => {
        if (!ctrl.range) {
            throw Error('cannot use ctrl without range')
        }
        const span = ctrl.range.to - ctrl.range.from

        let midiValue = Math.round(ctrl.range.from + span * value)
        if (midiValue < 0 || midiValue > 127) {
            console.error('Calculated midi value is out of range, capping', midiValue, ctrl.range.from, ctrl.range.to)
            midiValue = getBounded(midiValue, 0, 127)
        }

        console.log('outputting', {
            midiValue,
            backConverted: (midiValue - ctrl.range.from) / span,
        })

        return midiValue
    },
}

const nrpnMapper = {
    input: (midiValue: number, ctrl: ControllerConfig | ControllerConfigCC | ControllerConfigButton) => {
        const valuePart = midiValue & 0xffff
        const valueIndex = midiValue >> 16

        const value = ctrl.bipolar ? (valuePart - 32767) / 32767 : valuePart / 65535
        return {
            value,
            valueIndex,
        }
    },
    output: (
        value: number,
        ctrl: ControllerConfig | ControllerConfigCC | ControllerConfigButton,
        valueIndex?: number
    ) => {
        let midiValue = ctrl.bipolar ? Math.floor(32767 * value + 32767) : Math.floor(65535 * value)

        // more than 5 bits will make send fail!
        if (valueIndex && valueIndex >= 0 && valueIndex < 32) {
            midiValue += valueIndex << 16
        }
        return midiValue
    },
}

const nrpnWithRangeMapper = {
    input: (midiValue: number, ctrl: ControllerConfig | ControllerConfigCC | ControllerConfigButton) => {
        if (!ctrl.range) {
            throw Error('cannot use ctrl without range')
        }
        const span = ctrl.range.to - ctrl.range.from
        const value = (midiValue - ctrl.range.from) / span
        if (value < 0 || value > 1) {
            console.log('Received midi value is out of range, capping', midiValue, ctrl.range.from, ctrl.range.to)
        }
        return { value: getBounded(value) }
    },
    output: (value: number, ctrl: ControllerConfig | ControllerConfigCC | ControllerConfigButton) => {
        if (!ctrl.range) {
            throw Error('cannot use ctrl without range')
        }
        const span = ctrl.range.to - ctrl.range.from

        let midiValue = Math.round(ctrl.range.from + span * value)
        if (midiValue < 0 || midiValue > 65535) {
            console.log('Calculated midi value is out of range, capping', midiValue, ctrl.range.from, ctrl.range.to)
            midiValue = getBounded(midiValue, 0, 127)
        }

        console.log('outputting', {
            midiValue,
            backConverted: (midiValue - ctrl.range.from) / span,
        })

        return midiValue
    },
}

export const paramSend: ParamSendFunc = (
    input: NumericInputProperty,
    outputMapper?: (value: number, ctrl: ControllerConfig, valueIndex?: number) => number
) => {
    const { source, ctrl, value, valueIndex, voiceGroupIndex } = input

    if (!shouldSend(source)) {
        return
    }

    console.log('Sending ctrl', ctrl)
    if (ctrl.type === 'button') {
        logger.midi(`Setting paramSend button value for ${ctrl.label} to ${value}`)
        const buttonValue = ccWithValueMapper.output(value, ctrl)
        button.send(voiceGroupIndex, ctrl as ControllerConfigButton, buttonValue)
    } else if (Object.hasOwn(ctrl, 'cc')) {
        let midiValue
        if (ctrl.range) {
            midiValue = (outputMapper || ccWithRangeMapper.output)(value, ctrl)
        } else {
            midiValue = (outputMapper || ccMapper.output)(value, ctrl)
        }
        logger.midi(`Setting paramSend cc value for ${ctrl.label} to ${value} (${midiValue})`)
        cc.send(voiceGroupIndex, ctrl as ControllerConfigCC, midiValue)
    } else if (Object.hasOwn(ctrl, 'addr')) {
        let midiValue
        if (ctrl.range) {
            midiValue = (outputMapper || nrpnWithRangeMapper.output)(value, ctrl)
        } else {
            midiValue = (outputMapper || nrpnMapper.output)(value, ctrl, valueIndex)
        }
        logger.midi(`Setting paramSend nrpn value for ${ctrl.label} to ${value} (${midiValue})`)
        nrpn.send(voiceGroupIndex, ctrl as ControllerConfigNRPN, midiValue)
    }
}

export const paramReceive: ParamReceiveFunc = (
    ctrl: ControllerConfig | ControllerConfigCC | ControllerConfigButton,
    apiSetValue: (input: NumericInputProperty) => void,
    inputMapper?: (midiValue: number, ctrl: ControllerConfig) => { value: number; valueIndex?: number }
) => {
    if (ctrl.type === 'button') {
        button.subscribe((voiceGroupIndex: number, midiValue: number) => {
            if (ctrl.values) {
                const { value } = (inputMapper || ccWithValueMapper.input)(midiValue, ctrl)
                apiSetValue({ ctrl, value, source: ApiSource.MIDI, voiceGroupIndex })
            }
        }, ctrl as ControllerConfigButton)
    } else if (Object.hasOwn(ctrl, 'cc')) {
        cc.subscribe((voiceGroupIndex: number, midiValue: number) => {
            if (ctrl.values) {
                const { value } = (inputMapper || ccWithValueMapper.input)(midiValue, ctrl)
                apiSetValue({ ctrl, value, source: ApiSource.MIDI, voiceGroupIndex })
            } else if (ctrl.range) {
                const { value } = (inputMapper || ccWithRangeMapper.input)(midiValue, ctrl)
                apiSetValue({ ctrl, value, source: ApiSource.MIDI, voiceGroupIndex })
            } else {
                const { value } = (inputMapper || ccMapper.input)(midiValue, ctrl)
                apiSetValue({ ctrl, value, source: ApiSource.MIDI, voiceGroupIndex })
            }
        }, ctrl as ControllerConfigCC)
    } else if (Object.hasOwn(ctrl, 'addr')) {
        nrpn.subscribe((voiceGroupIndex: number, midiValue: number) => {
            const { value, valueIndex } = (inputMapper || nrpnMapper.input)(midiValue, ctrl)
            apiSetValue({ ctrl, value, valueIndex, source: ApiSource.MIDI, voiceGroupIndex })
        }, ctrl as ControllerConfigNRPN)
    }
}

export const boolParamSend = (source: ApiSource, on: boolean, cfg: ControllerConfigButton, voiceGroupIndex: number) => {
    if (!shouldSend(source)) {
        return
    }

    const index = on ? 1 : 0
    logger.midi(`Setting boolParam value for ${cfg.label} to ${index}`)
    button.send(voiceGroupIndex, cfg, cfg.values[index])
}

export const boolParamReceive = (
    cfg: ControllerConfigButton,
    apiSetValue: (on: boolean, source: ApiSource, voiceGroupIndex: number) => void
) => {
    button.subscribe((voiceGroupIndex: number, midiValue: number) => {
        const value = cfg.values.indexOf(midiValue) || 0
        const on = value === 1
        apiSetValue(on, ApiSource.MIDI, voiceGroupIndex)
    }, cfg)
}

export const buttonParamSend = (source: ApiSource, cfg: ControllerConfigButton, voiceGroupIndex: number) => {
    if (!shouldSend(source)) {
        return
    }
    logger.midi(`Sending ${cfg.label}`)
    button.send(voiceGroupIndex, cfg, cfg.values[0])
}

export const buttonParamReceive = (
    cfg: ControllerConfigButton,
    apiSetValue: (voiceGroupIndex: number, source: ApiSource) => void
) => {
    button.subscribe((voiceGroupIndex: number, midiValue: number) => {
        apiSetValue(voiceGroupIndex, ApiSource.MIDI)
    }, cfg)
}
