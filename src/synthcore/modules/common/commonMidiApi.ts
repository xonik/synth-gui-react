import { ApiSource } from '../../types'
import { ControllerConfigCC, ControllerConfigCCWithValue } from '../../../midi/types'
import { shouldSend } from '../../../midi/utils'
import logger from '../../../utils/logger'
import { cc } from '../../../midi/midibus'

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
        apiSetValue(value, ApiSource.MIDI)
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

export const toggleParamReceive = (
    cfg: ControllerConfigCCWithValue,
    apiSetValue: (value: number, source: ApiSource) => void
) => {
    cc.subscribe((midiValue: number) => {
        const value = cfg.values.indexOf(midiValue) || 0
        apiSetValue(value, ApiSource.MIDI)
    }, cfg)
}
