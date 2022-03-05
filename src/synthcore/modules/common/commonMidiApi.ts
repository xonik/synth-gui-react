import { ApiSource } from '../../types'
import {
    ControllerConfig,
    ControllerConfigCC,
    ControllerConfigCCWithValue,
    ControllerConfigNRPN
} from '../../../midi/types'
import { shouldSend } from '../../../midi/utils'
import logger from '../../../utils/logger'
import { cc, nrpn } from '../../../midi/midibus'
import { NumericInputProperty } from './types'

export const toggleParamSend = (
    source: ApiSource,
    value: number,
    cfg: ControllerConfigCCWithValue,
) => {
    if (!shouldSend(source)) {
        return
    }
    logger.midi(`Setting value for ${cfg.label} to ${value}`)
    cc.send(cfg, cfg.values[value])
}

export const toggleParamReceive = (
    cfg: ControllerConfigCCWithValue,
    apiSetValue: (value: number, source: ApiSource) => void
) => {
    cc.subscribe((midiValue: number) => {
        const value = cfg.values.indexOf(midiValue) || 0
        apiSetValue(value, ApiSource.MIDI)
    }, cfg)
}


const ccMapper = {
    input: (midiValue: number, ctrl: ControllerConfig | ControllerConfigCC | ControllerConfigCCWithValue) => {
        return { value: ctrl.bipolar ? (midiValue - 64) / 127 : midiValue / 127 }
    },
    output: (value: number, ctrl: ControllerConfig | ControllerConfigCC | ControllerConfigCCWithValue) => {
        return ctrl.bipolar
            ? Math.floor(63 * value + 64)
            : Math.floor(127 * value)

    }
}
const ccWithValueMapper = {
    input: (midiValue: number, ctrl: ControllerConfig | ControllerConfigCC | ControllerConfigCCWithValue) => {
        return { value: (ctrl.values && ctrl.values.indexOf(midiValue)) || 0 }
    },
    output: (value: number, ctrl: ControllerConfig | ControllerConfigCC | ControllerConfigCCWithValue) => {
        return (ctrl.values && ctrl.values[value]) || 0
    }
}

const nrpnMapper = {
    input: (midiValue: number, ctrl: ControllerConfig | ControllerConfigCC | ControllerConfigCCWithValue) => {

        const valuePart = midiValue & 0xFFFF
        const valueIndex = midiValue >> 16

        const value = ctrl.bipolar ? (valuePart - 32767) / 32767 : valuePart / 65535
        return {
            value, valueIndex
        }
    },
    output: (value: number, ctrl: ControllerConfig | ControllerConfigCC | ControllerConfigCCWithValue, valueIndex?: number) => {
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

export const paramSend = (
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

    if (ctrl.hasOwnProperty('cc')) {
        if (ctrl.values) {
            logger.midi(`Setting value for ${ctrl.label} to ${value}`)
            const midiValue = (outputMapper || ccWithValueMapper.output)(value, ctrl)
            cc.send(ctrl as ControllerConfigCCWithValue, midiValue)
        } else {
            const midiValue = (outputMapper || ccMapper.output)(value, ctrl)
            logger.midi(`Setting value for ${ctrl.label} to ${value} (${midiValue})`)
            cc.send(ctrl as ControllerConfigCC, midiValue)
        }
    } else if (ctrl.hasOwnProperty('addr')) {
        const midiValue = (outputMapper || nrpnMapper.output)(value, ctrl, valueIndex)
        logger.midi(`Setting value for ${ctrl.label} to ${value} (${midiValue})`)
        nrpn.send(ctrl as ControllerConfigNRPN, midiValue)
    }
}

export const paramReceive = (
    ctrl: ControllerConfig | ControllerConfigCC | ControllerConfigCCWithValue,
    apiSetValue: (input: NumericInputProperty) => void,
    inputMapper?: (midiValue: number, ctrl: ControllerConfig) => ({ value: number, valueIndex?: number }),
) => {
    if (ctrl.hasOwnProperty('cc')) {
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
    cfg: ControllerConfigCCWithValue,
) => {
    if (!shouldSend(source)) {
        return
    }
    const index = on ? 1 : 0
    logger.midi(`Setting value for ${cfg.label} to ${index}`)
    cc.send(cfg, cfg.values[index])
}

export const boolParamReceive = (
    cfg: ControllerConfigCCWithValue,
    apiSetValue: (on: boolean, source: ApiSource) => void
) => {
    cc.subscribe((midiValue: number) => {
        const value = cfg.values.indexOf(midiValue) || 0
        const on = value === 1
        apiSetValue(on, ApiSource.MIDI)
    }, cfg)
}

export const buttonParamSend = (
    source: ApiSource,
    cfg: ControllerConfigCCWithValue,
) => {
    if (!shouldSend(source)) {
        return
    }
    logger.midi(`Sending ${cfg.label}`)
    cc.send(cfg, cfg.values[0])
}

export const buttonParamReceive = (
    cfg: ControllerConfigCCWithValue,
    apiSetValue: (source: ApiSource) => void
) => {
    cc.subscribe((midiValue: number) => {
        apiSetValue(ApiSource.MIDI)
    }, cfg)
}
