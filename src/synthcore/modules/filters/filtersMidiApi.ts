import controllers from '../../../midi/controllers'
import { ApiSource } from '../../types'

// If imported directly we get a cyclic dependency. Not sure why it works now.
import { filtersApi } from '../../synthcoreApi'
import { numericParamReceive, numericParamSend, toggleParamReceive, toggleParamSend } from '../common/commonMidiApi'

// LFP
const lpfInput = (() => {
    const cfg = controllers.LPF.INPUT
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, filtersApi.setLpfInput)
    }
})()
const lpfDrive = (() => {
    const cfg = controllers.LPF.DRIVE
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, filtersApi.setLpfDrive)
    }
})()
const lpfResonance = (() => {
    const cfg = controllers.LPF.RESONANCE
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, filtersApi.setLpfResonance)
    }
})()
const lpfCutoff = (() => {
    const cfg = controllers.LPF.CUTOFF
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, filtersApi.setLpfCutoff)
    }
})()
const lpfFmAmt = (() => {
    const cfg = controllers.LPF.FM_AMT
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, filtersApi.setLpfFmAmt)
    }
})()
const lpfEnvAmt = (() => {
    const cfg = controllers.LPF.ENV_AMT
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, filtersApi.setLpfEnvAmt)
    }
})()
const lpfLfoAmt = (() => {
    const cfg = controllers.LPF.LFO_AMT
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, filtersApi.setLpfLfoAmt)
    }
})()
const lpfKbdAmt = (() => {
    const cfg = controllers.LPF.KBD_AMT
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, filtersApi.setLpfKbdAmt)
    }
})()
const lpfExtCv = (() => {
    const cfg = controllers.LPF.EXT_CV
    return {
        send: (source: ApiSource, value: number) => toggleParamSend(source, value, cfg),
        receive: () => toggleParamReceive(cfg, filtersApi.setLpfExtCv)
    }
})()
const lpfWheel = (() => {
    const cfg = controllers.LPF.WHEEL
    return {
        send: (source: ApiSource, value: number) => toggleParamSend(source, value, cfg),
        receive: () => toggleParamReceive(cfg, filtersApi.setLpfWheel)
    }
})()
const lpfSlope = (() => {
    const cfg = controllers.LPF.SLOPE
    return {
        send: (source: ApiSource, value: number) => toggleParamSend(source, value, cfg),
        receive: () => toggleParamReceive(cfg, filtersApi.setLpfSlope)
    }
})()

// BOTH FILTERS
const filtersLinkCutoff = (() => {
    const cfg = controllers.FILTERS.LINK_CUTOFF
    return {
        send: (source: ApiSource, value: number) => toggleParamSend(source, value, cfg),
        receive: () => toggleParamReceive(cfg, filtersApi.setFiltersLinkCutoff)
    }
})()
const filtersRouting = (() => {
    const cfg = controllers.FILTERS.ROUTING
    return {
        send: (source: ApiSource, value: number) => toggleParamSend(source, value, cfg),
        receive: () => toggleParamReceive(cfg, filtersApi.setFiltersRouting)
    }
})()

// SVF
const svfInput = (() => {
    const cfg = controllers.SVF.INPUT
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, filtersApi.setSvfInput)
    }
})()
const svfDrive = (() => {
    const cfg = controllers.SVF.DRIVE
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, filtersApi.setSvfDrive)
    }
})()
const svfResonance = (() => {
    const cfg = controllers.SVF.RESONANCE
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, filtersApi.setSvfResonance)
    }
})()
const svfCutoff = (() => {
    const cfg = controllers.SVF.CUTOFF
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, filtersApi.setSvfCutoff)
    }
})()
const svfFmAmt = (() => {
    const cfg = controllers.SVF.FM_AMT
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, filtersApi.setSvfFmAmt)
    }
})()
const svfEnvAmt = (() => {
    const cfg = controllers.SVF.ENV_AMT
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, filtersApi.setSvfEnvAmt)
    }
})()
const svfLfoAmt = (() => {
    const cfg = controllers.SVF.LFO_AMT
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, filtersApi.setSvfLfoAmt)
    }
})()
const svfKbdAmt = (() => {
    const cfg = controllers.SVF.KBD_AMT
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, filtersApi.setSvfKbdAmt)
    }
})()
const svfExtCv = (() => {
    const cfg = controllers.SVF.EXT_CV
    return {
        send: (source: ApiSource, value: number) => toggleParamSend(source, value, cfg),
        receive: () => toggleParamReceive(cfg, filtersApi.setSvfExtCv)
    }
})()
const svfWheel = (() => {
    const cfg = controllers.SVF.WHEEL
    return {
        send: (source: ApiSource, value: number) => toggleParamSend(source, value, cfg),
        receive: () => toggleParamReceive(cfg, filtersApi.setSvfWheel)
    }
})()
const svfSlope = (() => {
    const cfg = controllers.SVF.SLOPE
    return {
        send: (source: ApiSource, value: number) => toggleParamSend(source, value, cfg),
        receive: () => toggleParamReceive(cfg, filtersApi.setSvfSlope)
    }
})()

const vcoKbd = (() => {
    const cfg = controllers.SVF.KBD_AMT
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, filtersApi.setSvfKbdAmt)
    }
})()

const initReceive = () => {
    lpfInput.receive()
    lpfDrive.receive()
    lpfResonance.receive()
    lpfCutoff.receive()
    lpfFmAmt.receive()
    lpfEnvAmt.receive()
    lpfLfoAmt.receive()
    lpfKbdAmt.receive()
    lpfExtCv.receive()
    lpfWheel.receive()
    lpfSlope.receive()

    // BOTH FILTERS
    filtersLinkCutoff.receive()
    filtersRouting.receive()

    // SVF
    svfInput.receive()
    svfDrive.receive()
    svfResonance.receive()
    svfCutoff.receive()
    svfFmAmt.receive()
    svfEnvAmt.receive()
    svfLfoAmt.receive()
    svfKbdAmt.receive()
    svfExtCv.receive()
    svfWheel.receive()
    svfSlope.receive()   
}

const filtersMidiApi = {
    setLpfInput: lpfInput.send,
    setLpfDrive: lpfDrive.send,
    setLpfResonance: lpfResonance.send,
    setLpfCutoff: lpfCutoff.send,
    setLpfFmAmt: lpfFmAmt.send,
    setLpfEnvAmt: lpfEnvAmt.send,
    setLpfLfoAmt: lpfLfoAmt.send,
    setLpfKbdAmt: lpfKbdAmt.send,
    setLpfExtCv: lpfExtCv.send,
    setLpfWheel: lpfWheel.send,
    setLpfSlope: lpfSlope.send,

    // BOTH FILTERS
    setFiltersLinkCutoff: filtersLinkCutoff.send,
    setFiltersRouting: filtersRouting.send,

    // SVF
    setSvfInput: svfInput.send,
    setSvfDrive: svfDrive.send,
    setSvfResonance: svfResonance.send,
    setSvfCutoff: svfCutoff.send,
    setSvfFmAmt: svfFmAmt.send,
    setSvfEnvAmt: svfEnvAmt.send,
    setSvfLfoAmt: svfLfoAmt.send,
    setSvfKbdAmt: svfKbdAmt.send,
    setSvfExtCv: svfExtCv.send,
    setSvfWheel: svfWheel.send,
    setSvfSlope: svfSlope.send,
    
    initReceive,
}

export default filtersMidiApi
