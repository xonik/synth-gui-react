import { ApiSource } from '../../types'
import {
    ControllerConfig,
    ControllerConfigButton,
    ControllerConfigCC,
    ControllerConfigNRPN,
} from '../../../midi/types'
import { shouldSend } from '../../../midi/utils'
import logger from '../../../utils/logger'
import {button, cc, nrpn} from '../../../midi/midibus'
import { NumericInputProperty } from './types'

// Send signature
export type ParamSendFunc  = (
    input: NumericInputProperty,
    outputMapper?: (value: number, ctrl: ControllerConfig, valueIndex?: number) => number
) => void

// Receive signature
export type ParamReceiveFunc  = (
    ctrl: ControllerConfig | ControllerConfigCC | ControllerConfigButton,
    apiSetValue: (input: NumericInputProperty) => void,
    inputMapper?: (midiValue: number, ctrl: ControllerConfig) => ({ value: number, valueIndex?: number }),
) => void

export const toggleParamSend = (
    source: ApiSource,
    value: number,
    cfg: ControllerConfigButton,
) => {
    if (!shouldSend(source)) {
        return
    }
    logger.midi(`Setting value for ${cfg.label} to ${value}`)
    button.send(cfg, cfg.values[value])
}

export const toggleParamReceive = (
    cfg: ControllerConfigButton,
    apiSetValue: (value: number, source: ApiSource) => void
) => {
    button.subscribe((midiValue: number) => {
        const value = cfg.values.indexOf(midiValue) || 0
        apiSetValue(value, ApiSource.MIDI)
    }, cfg)
}


const ccMapper = {
    input: (midiValue: number, ctrl: ControllerConfig | ControllerConfigCC | ControllerConfigButton) => {
        return { value: ctrl.bipolar ? (midiValue - 64) / 127 : midiValue / 127 }
    },
    output: (value: number, ctrl: ControllerConfig | ControllerConfigCC | ControllerConfigButton) => {
        return ctrl.bipolar
            ? Math.floor(63 * value + 64)
            : Math.floor(127 * value)

    }
}
const ccWithValueMapper = {
    input: (midiValue: number, ctrl: ControllerConfig | ControllerConfigCC | ControllerConfigButton) => {
        return { value: (ctrl.values && ctrl.values.indexOf(midiValue)) || 0 }
    },
    output: (value: number, ctrl: ControllerConfig | ControllerConfigCC | ControllerConfigButton) => {
        return (ctrl.values && ctrl.values[value]) || 0
    }
}

const nrpnMapper = {
    input: (midiValue: number, ctrl: ControllerConfig | ControllerConfigCC | ControllerConfigButton) => {

        const valuePart = midiValue & 0xFFFF
        const valueIndex = midiValue >> 16

        const value = ctrl.bipolar ? (valuePart - 32767) / 32767 : valuePart / 65535
        return {
            value, valueIndex
        }
    },
    output: (value: number, ctrl: ControllerConfig | ControllerConfigCC | ControllerConfigButton, valueIndex?: number) => {
        let midiValue = ctrl.bipolar
            ? Math.floor(32767 * value + 32767)
            : Math.floor(65535 * value)

        // more than 5 bits will make send fail!
        if (valueIndex && valueIndex >= 0 && valueIndex < 32) {
            midiValue += (valueIndex << 16)
        }
        return midiValue
    }
}

export const paramSend: ParamSendFunc = (
    input: NumericInputProperty,
    outputMapper?: (value: number, ctrl: ControllerConfig, valueIndex?: number) => number
) => {
    const {
        source,
        ctrl,
        value,
        valueIndex,
    } = input

    if (!shouldSend(source)) {
        return
    }

    if (ctrl.type === 'button') {
        logger.midi(`Setting value for ${ctrl.label} to ${value}`)
        const buttonValue = (ccWithValueMapper.output)(value, ctrl)
        button.send(ctrl as ControllerConfigButton, buttonValue)
    } else if (ctrl.hasOwnProperty('cc')) {
        const midiValue = (outputMapper || ccMapper.output)(value, ctrl)
        logger.midi(`Setting value for ${ctrl.label} to ${value} (${midiValue})`)
        cc.send(ctrl as ControllerConfigCC, midiValue)
    } else if (ctrl.hasOwnProperty('addr')) {
        const midiValue = (outputMapper || nrpnMapper.output)(value, ctrl, valueIndex)
        logger.midi(`Setting value for ${ctrl.label} to ${value} (${midiValue})`)
        nrpn.send(ctrl as ControllerConfigNRPN, midiValue)
    }
}

export const paramReceive: ParamReceiveFunc = (
    ctrl: ControllerConfig | ControllerConfigCC | ControllerConfigButton,
    apiSetValue: (input: NumericInputProperty) => void,
    inputMapper?: (midiValue: number, ctrl: ControllerConfig) => ({ value: number, valueIndex?: number }),
) => {
    if (ctrl.type === 'button') {
        button.subscribe((midiValue: number) => {
            if (ctrl.values) {
                const { value } = (inputMapper || ccWithValueMapper.input)(midiValue, ctrl)
                apiSetValue({ ctrl, value, source: ApiSource.MIDI })
            }
        }, ctrl as ControllerConfigButton)
    } else if (ctrl.hasOwnProperty('cc')) {
        cc.subscribe((midiValue: number) => {
            if (ctrl.values) {
                const { value } = (inputMapper || ccWithValueMapper.input)(midiValue, ctrl)
                apiSetValue({ ctrl, value, source: ApiSource.MIDI })
            } else {
                const { value } = (inputMapper || ccMapper.input)(midiValue, ctrl)
                apiSetValue({ ctrl, value, source: ApiSource.MIDI })
            }
        }, ctrl as ControllerConfigCC)
    } else if (ctrl.hasOwnProperty('addr')) {
        nrpn.subscribe((midiValue: number) => {
            const { value, valueIndex } = (inputMapper || nrpnMapper.input)(midiValue, ctrl)
            apiSetValue({ ctrl, value, valueIndex, source: ApiSource.MIDI })
        }, ctrl as ControllerConfigNRPN)
    }
}

export const boolParamSend = (
    source: ApiSource,
    on: boolean,
    cfg: ControllerConfigButton,
) => {
    if (!shouldSend(source)) {
        return
    }

    const index = on ? 1 : 0
    logger.midi(`Setting value for ${cfg.label} to ${index}`)
    button.send(cfg, cfg.values[index])
}

export const boolParamReceive = (
    cfg: ControllerConfigButton,
    apiSetValue: (on: boolean, source: ApiSource) => void
) => {
    button.subscribe((midiValue: number) => {
        const value = cfg.values.indexOf(midiValue) || 0
        const on = value === 1
        apiSetValue(on, ApiSource.MIDI)
    }, cfg)
}

export const buttonParamSend = (
    source: ApiSource,
    cfg: ControllerConfigButton,
) => {
    if (!shouldSend(source)) {
        return
    }
    logger.midi(`Sending ${cfg.label}`)
    button.send(cfg, cfg.values[0])
}

export const buttonParamReceive = (
    cfg: ControllerConfigButton,
    apiSetValue: (source: ApiSource) => void
) => {
    button.subscribe((midiValue: number) => {
        apiSetValue(ApiSource.MIDI)
    }, cfg)
}
