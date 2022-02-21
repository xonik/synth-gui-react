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
import { NumericInputProperty } from './commonApi'

export const numericParamSend = (
    source: ApiSource,
    value: number,
    cfg: ControllerConfigCC,
) => {
    if (!shouldSend(source)) {
        return
    }
    logger.midi(`Setting value for ${cfg.label} to ${value}`)
    cc.send(cfg, Math.floor(127 * value))
}

export const numericParamReceive = (
    cfg: ControllerConfigCC,
    apiSetValue: (value: number, source: ApiSource) => void
) => {
    cc.subscribe((value: number) => {
        apiSetValue(value / 127, ApiSource.MIDI)
    }, cfg)
}

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

export const paramSend = (
    source: ApiSource,
    cfg: ControllerConfig | ControllerConfigCC | ControllerConfigCCWithValue,
    value: number,
    valueIndex?: number,
) => {
    if (!shouldSend(source)) {
        return
    }
    if (cfg.hasOwnProperty('cc')) {
        if (cfg.values) {
            logger.midi(`Setting value for ${cfg.label} to ${value}`)
            cc.send(cfg as ControllerConfigCCWithValue, cfg.values[value])
        } else {

            const midiValue = cfg.bipolar
                ? Math.floor(63 * value + 64)
                : Math.floor(127 * value)
            if (cfg.bipolar)

                logger.midi(`Setting value for ${cfg.label} to ${value} (${midiValue})`)
            cc.send(cfg as ControllerConfigCC, midiValue)
        }
    } else if (cfg.hasOwnProperty('addr')) {
        let midiValue = cfg.bipolar
            ? Math.floor(32767 * value + 32767)
            : Math.floor(65535 * value)

        // more than 5 bits will make send fail!
        if(valueIndex && valueIndex >= 0 && valueIndex < 32){
            midiValue += (valueIndex << 16)
        }

        logger.midi(`Setting value for ${cfg.label} to ${value} (${midiValue})`)
        nrpn.send(cfg as ControllerConfigNRPN, midiValue)
    }
}

export const paramReceive = (
    ctrl: ControllerConfig | ControllerConfigCC | ControllerConfigCCWithValue,
    apiSetValue: (input: NumericInputProperty) => void
) => {
    if (ctrl.hasOwnProperty('cc')) {
        cc.subscribe((midiValue: number) => {
            if (ctrl.values) {
                const value = ctrl.values.indexOf(midiValue) || 0
                apiSetValue({ ctrl, value, source: ApiSource.MIDI })
            } else {
                const value = ctrl.bipolar ? (midiValue - 64) / 127 : midiValue / 127
                apiSetValue({ ctrl, value, source: ApiSource.MIDI })
            }
        }, ctrl as ControllerConfigCC)
    } else if (ctrl.hasOwnProperty('addr')) {
        nrpn.subscribe((rawMidiValue: number) => {

            const midiValue = rawMidiValue & 0xFFFF
            const valueIndex = rawMidiValue >> 16

            const value = ctrl.bipolar ? (midiValue - 32767) / 32767 : midiValue / 65535
            apiSetValue({ ctrl, value, valueIndex, source: ApiSource.MIDI })
        }, ctrl as ControllerConfigNRPN)
    }
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
