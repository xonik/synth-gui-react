import controllers from '../../../midi/controllers'
import { ApiSource } from '../../types'

// If imported directly we get a cyclic dependency. Not sure why it works now.
import { numericParamReceive, numericParamSend } from '../common/commonMidiApi'
import { outApi, postMixApi } from '../../synthcoreApi'

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
const volume = (() => {
    const cfg = controllers.OUTPUT.VOLUME
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, outApi.setVolume)
    }
})()
const spread = (() => {
    const cfg = controllers.OUTPUT.SPREAD
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, outApi.setSpread)
    }
})()
const headphones = (() => {
    const cfg = controllers.OUTPUT.HEADPHONES
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, outApi.setHeadphones)
    }
})()

const initReceive = () => {
    volume.receive()
    spread.receive()
    headphones.receive()
}

const outMidiApi = {
    setVolume: volume.send,
    setSpread: spread.send,
    setHeadphones: headphones.send,

    initReceive,
}

export default outMidiApi
