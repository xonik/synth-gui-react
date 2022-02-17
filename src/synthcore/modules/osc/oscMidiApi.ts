import controllers from '../../../midi/controllers'
import { ApiSource } from '../../types'
import { shouldSend } from '../../../midi/utils'
import logger from '../../../utils/logger'
import { cc } from '../../../midi/midibus'

// If imported directly we get a cyclic dependency. Not sure why it works now.
import { oscApi } from '../../synthcoreApi'
import { ControllerConfigCC, ControllerConfigCCWithValue } from '../../../midi/types'


const numericParamSend = (
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

const numericParamReceive = (
    cfg: ControllerConfigCC,
    apiSetValue: (value: number, source: ApiSource) => void
) => {
    cc.subscribe((value: number) => {
        apiSetValue(value, ApiSource.MIDI)
    }, cfg)
}

const toggleParamSend = (
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

const toggleParamReceive = (
    cfg: ControllerConfigCCWithValue,
    apiSetValue: (value: number, source: ApiSource) => void
) => {
    cc.subscribe((midiValue: number) => {
        const value = cfg.values.indexOf(midiValue) || 0
        apiSetValue(value, ApiSource.MIDI)
    }, cfg)
}

// DCO 1
const dco1Note = (() => {
    const cfg = controllers.DCO1.NOTE
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, oscApi.setDco1Note)
    }
})()

const dco1Waveform = (() => {
    const cfg = controllers.DCO1.WAVEFORM
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, oscApi.setDco1Waveform)
    }
})()

const dco1Sub1Level = (() => {
    const cfg = controllers.DCO1.SUB1
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, oscApi.setDco1Sub1Level)
    }
})()

const dco1Sub2Level = (() => {
    const cfg = controllers.DCO1.SUB2
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, oscApi.setDco1Sub2Level)
    }
})()

const dco1Pw = (() => {
    const cfg = controllers.DCO1.PW
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, oscApi.setDco1Pw)
    }
})()

// DCO 2
const dco2Note = (() => {
    const cfg = controllers.DCO2.NOTE
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, oscApi.setDco2Note)
    }
})()

const dco2Detune = (() => {
    const cfg = controllers.DCO2.DETUNE
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, oscApi.setDco2Detune)
    }
})()

const dco2Waveform = (() => {
    const cfg = controllers.DCO2.WAVEFORM
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, oscApi.setDco2Waveform)
    }
})()

const dco2Sub1Level = (() => {
    const cfg = controllers.DCO2.SUB1
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, oscApi.setDco2Sub1Level)
    }
})()

const dco2Sub2Level = (() => {
    const cfg = controllers.DCO2.SUB2
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, oscApi.setDco2Sub2Level)
    }
})()

const dco2Pw = (() => {
    const cfg = controllers.DCO2.PW
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, oscApi.setDco2Pw)
    }
})()

// VCO
const vcoNote = (() => {
    const cfg = controllers.VCO.NOTE
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, oscApi.setVcoNote)
    }
})()

const vcoDetune = (() => {
    const cfg = controllers.VCO.DETUNE
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, oscApi.setVcoDetune)
    }
})()

const vcoWaveform = (() => {
    const cfg = controllers.VCO.WAVEFORM
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, oscApi.setVcoWaveform)
    }
})()

const vcoCrossMod = (() => {
    const cfg = controllers.VCO.CROSS_MOD
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, oscApi.setVcoCrossMod)
    }
})()


const vcoPw = (() => {
    const cfg = controllers.VCO.PW
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, oscApi.setVcoPw)
    }
})()


const dco1Sync = (() => {
    const cfg = controllers.DCO1.SYNC
    return {
        send: (source: ApiSource, value: number) => toggleParamSend(source, value, cfg),
        receive: () => toggleParamReceive(cfg, oscApi.setDco1Sync)
    }
})()
const dco1Mode = (() => {
    const cfg = controllers.DCO1.MODE
    return {
        send: (source: ApiSource, value: number) => toggleParamSend(source, value, cfg),
        receive: () => toggleParamReceive(cfg, oscApi.setDco1Mode)
    }
})()
const dco1SubWave = (() => {
    const cfg = controllers.DCO1.SUB_WAVE
    return {
        send: (source: ApiSource, value: number) => toggleParamSend(source, value, cfg),
        receive: () => toggleParamReceive(cfg, oscApi.setDco1SubWave)
    }
})()
const dco1Wheel = (() => {
    const cfg = controllers.DCO1.WHEEL
    return {
        send: (source: ApiSource, value: number) => toggleParamSend(source, value, cfg),
        receive: () => toggleParamReceive(cfg, oscApi.setDco1Wheel)
    }
})()
const dco1Lfo = (() => {
    const cfg = controllers.DCO1.LFO
    return {
        send: (source: ApiSource, value: number) => toggleParamSend(source, value, cfg),
        receive: () => toggleParamReceive(cfg, oscApi.setDco1Lfo)
    }
})()
const dco1Kbd = (() => {
    const cfg = controllers.DCO1.KBD
    return {
        send: (source: ApiSource, value: number) => toggleParamSend(source, value, cfg),
        receive: () => toggleParamReceive(cfg, oscApi.setDco1Kbd)
    }
})()

const dco2Mode = (() => {
    const cfg = controllers.DCO2.MODE
    return {
        send: (source: ApiSource, value: number) => toggleParamSend(source, value, cfg),
        receive: () => toggleParamReceive(cfg, oscApi.setDco2Mode)
    }
})()
const dco2SubWave = (() => {
    const cfg = controllers.DCO2.SUB_WAVE
    return {
        send: (source: ApiSource, value: number) => toggleParamSend(source, value, cfg),
        receive: () => toggleParamReceive(cfg, oscApi.setDco2SubWave)
    }
})()
const dco2Wheel = (() => {
    const cfg = controllers.DCO2.WHEEL
    return {
        send: (source: ApiSource, value: number) => toggleParamSend(source, value, cfg),
        receive: () => toggleParamReceive(cfg, oscApi.setDco2Wheel)
    }
})()
const dco2Lfo = (() => {
    const cfg = controllers.DCO2.LFO
    return {
        send: (source: ApiSource, value: number) => toggleParamSend(source, value, cfg),
        receive: () => toggleParamReceive(cfg, oscApi.setDco2Lfo)
    }
})()
const dco2Kbd = (() => {
    const cfg = controllers.DCO2.KBD
    return {
        send: (source: ApiSource, value: number) => toggleParamSend(source, value, cfg),
        receive: () => toggleParamReceive(cfg, oscApi.setDco2Kbd)
    }
})()

const vcoSync = (() => {
    const cfg = controllers.VCO.SYNC
    return {
        send: (source: ApiSource, value: number) => toggleParamSend(source, value, cfg),
        receive: () => toggleParamReceive(cfg, oscApi.setVcoSync)
    }
})()
const vcoCrossModSrc = (() => {
    const cfg = controllers.VCO.CROSS_MOD_SRC
    return {
        send: (source: ApiSource, value: number) => toggleParamSend(source, value, cfg),
        receive: () => toggleParamReceive(cfg, oscApi.setVcoCrossModSrc)
    }
})()
const vcoExtCv = (() => {
    const cfg = controllers.VCO.EXT_CV
    return {
        send: (source: ApiSource, value: number) => toggleParamSend(source, value, cfg),
        receive: () => toggleParamReceive(cfg, oscApi.setVcoExtCv)
    }
})()
const vcoWheel = (() => {
    const cfg = controllers.VCO.WHEEL
    return {
        send: (source: ApiSource, value: number) => toggleParamSend(source, value, cfg),
        receive: () => toggleParamReceive(cfg, oscApi.setVcoWheel)
    }
})()
const vcoLfo = (() => {
    const cfg = controllers.VCO.LFO
    return {
        send: (source: ApiSource, value: number) => toggleParamSend(source, value, cfg),
        receive: () => toggleParamReceive(cfg, oscApi.setVcoLfo)
    }
})()
const vcoKbd = (() => {
    const cfg = controllers.VCO.KBD
    return {
        send: (source: ApiSource, value: number) => toggleParamSend(source, value, cfg),
        receive: () => toggleParamReceive(cfg, oscApi.setVcoKbd)
    }
})()

const initReceive = () => {
    dco1Note.receive()
    dco1Waveform.receive()
    dco1Sub1Level.receive()
    dco1Sub2Level.receive()
    dco1SubWave.receive()
    dco1Pw.receive()

    dco1Sync.receive()
    dco1Mode.receive()
    dco1SubWave.receive()
    dco1Wheel.receive()
    dco1Lfo.receive()
    dco1Kbd.receive()
        
    dco2Note.receive()
    dco2Detune.receive()
    dco2Waveform.receive()
    dco2Sub1Level.receive()
    dco2Sub2Level.receive()

    dco2Mode.receive()
    dco2SubWave.receive()
    dco2Wheel.receive()
    dco2Lfo.receive()
    dco2Kbd.receive()    
    
    dco2Pw.receive()
    vcoNote.receive()
    vcoDetune.receive()
    vcoWaveform.receive()
    vcoCrossMod.receive()
    vcoPw.receive()

    vcoSync.receive()
    vcoCrossModSrc.receive()
    vcoExtCv.receive()
    vcoWheel.receive()
    vcoLfo.receive()
    vcoKbd.receive()    
}

const oscMidiApi = {
    setDco1Note: dco1Note.send,
    setDco1Waveform: dco1Waveform.send,
    setDco1Sub1Level: dco1Sub1Level.send,
    setDco1Sub2Level: dco1Sub2Level.send,
    setDco1Pw: dco1Pw.send,

    setDco1Sync: dco1Sync.send,
    setDco1Mode: dco1Mode.send,
    setDco1SubWave: dco1SubWave.send,
    setDco1Wheel: dco1Wheel.send,
    setDco1Lfo: dco1Lfo.send,
    setDco1Kbd: dco1Kbd.send,    
    
    setDco2Note: dco2Note.send,
    setDco2Detune: dco2Detune.send,
    setDco2Waveform: dco2Waveform.send,
    setDco2Sub1Level: dco2Sub1Level.send,
    setDco2Sub2Level: dco2Sub2Level.send,
    setDco2Pw: dco2Pw.send,

    setDco2Mode: dco2Mode.send,
    setDco2SubWave: dco2SubWave.send,
    setDco2Wheel: dco2Wheel.send,
    setDco2Lfo: dco2Lfo.send,
    setDco2Kbd: dco2Kbd.send,    
    
    setVcoNote: vcoNote.send,
    setVcoDetune: vcoDetune.send,
    setVcoWaveform: vcoWaveform.send,
    setVcoCrossMod: vcoCrossMod.send,
    setVcoPw: vcoPw.send,

    setVcoSync: vcoSync.send,
    setVcoCrossModSrc: vcoCrossModSrc.send,
    setVcoExtCv: vcoExtCv.send,
    setVcoWheel: vcoWheel.send,
    setVcoLfo: vcoLfo.send,
    setVcoKbd: vcoKbd.send,
    
    initReceive,
}

export default oscMidiApi
