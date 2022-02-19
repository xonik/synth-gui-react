import controllers from '../../../midi/controllers'
import { ApiSource } from '../../types'

// If imported directly we get a cyclic dependency. Not sure why it works now.
import { numericParamReceive, numericParamSend } from '../common/commonMidiApi'
import { postMixApi } from '../../synthcoreApi'

const lpfLevel = (() => {
    const cfg = controllers.POST_MIX.LPF
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, postMixApi.setLpfLevel)
    }
})()
const svfLevel = (() => {
    const cfg = controllers.POST_MIX.SVF
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, postMixApi.setSvfLevel)
    }
})()
const sine1Level = (() => {
    const cfg = controllers.POST_MIX.SINE1
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, postMixApi.setSine1Level)
    }
})()
const sine2Level = (() => {
    const cfg = controllers.POST_MIX.SINE2
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, postMixApi.setSine2Level)
    }
})()

const pan = (() => {
    const cfg = controllers.POST_MIX.PAN
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, postMixApi.setPan)
    }
})()
const amt = (() => {
    const cfg = controllers.POST_MIX.AMOUNT
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, postMixApi.setAmt)
    }
})()
const fx1 = (() => {
    const cfg = controllers.POST_MIX.FX1_SEND
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, postMixApi.setFX1)
    }
})()
const fx2 = (() => {
    const cfg = controllers.POST_MIX.FX2_SEND
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, postMixApi.setFX2)
    }
})()

const initReceive = () => {
    lpfLevel.receive()
    svfLevel.receive()
    sine1Level.receive()
    sine2Level.receive()

    pan.receive()
    amt.receive()
    fx1.receive()
    fx2.receive()    
}

const postMixMidiApi = {
    setLpfLevel: lpfLevel.send,
    setSvfLevel: svfLevel.send,
    setSine1Level: sine1Level.send,
    setSine2Level: sine2Level.send,

    setPan: pan.send,
    setAmt: amt.send,
    setFX1: fx1.send,
    setFX2: fx2.send,

    initReceive,
}

export default postMixMidiApi
