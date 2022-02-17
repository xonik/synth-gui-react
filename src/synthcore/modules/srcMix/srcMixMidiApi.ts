import controllers from '../../../midi/controllers'
import { ApiSource } from '../../types'

// If imported directly we get a cyclic dependency. Not sure why it works now.
import { srcMixApi } from '../../synthcoreApi'
import { numericParamReceive, numericParamSend, toggleParamReceive, toggleParamSend } from '../common/commonMidiApi'

const levelOsc1 = (() => {
    const cfg = controllers.SOURCE_MIX.LEVEL_OSC1
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, srcMixApi.setLevelOsc1)
    }
})()
const levelOsc2 = (() => {
    const cfg = controllers.SOURCE_MIX.LEVEL_OSC2
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, srcMixApi.setLevelOsc2)
    }
})()
const levelOsc3 = (() => {
    const cfg = controllers.SOURCE_MIX.LEVEL_OSC3
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, srcMixApi.setLevelOsc3)
    }
})()
const levelNoise = (() => {
    const cfg = controllers.SOURCE_MIX.LEVEL_NOISE
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, srcMixApi.setLevelNoise)
    }
})()
const levelRingMod = (() => {
    const cfg = controllers.SOURCE_MIX.LEVEL_RING_MOD
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, srcMixApi.setLevelRingMod)
    }
})()
const levelExtAudio = (() => {
    const cfg = controllers.SOURCE_MIX.LEVEL_EXT_AUDIO
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, srcMixApi.setLevelExtAudio)
    }
})()

const outOsc1 = (() => {
    const cfg = controllers.SOURCE_MIX.OUT_OSC1
    return {
        send: (source: ApiSource, value: number) => toggleParamSend(source, value, cfg),
        receive: () => toggleParamReceive(cfg, srcMixApi.setOutOsc1)
    }
})()
const outOsc2 = (() => {
    const cfg = controllers.SOURCE_MIX.OUT_OSC2
    return {
        send: (source: ApiSource, value: number) => toggleParamSend(source, value, cfg),
        receive: () => toggleParamReceive(cfg, srcMixApi.setOutOsc2)
    }
})()
const outOsc3 = (() => {
    const cfg = controllers.SOURCE_MIX.OUT_OSC3
    return {
        send: (source: ApiSource, value: number) => toggleParamSend(source, value, cfg),
        receive: () => toggleParamReceive(cfg, srcMixApi.setOutOsc3)
    }
})()
const outNoise = (() => {
    const cfg = controllers.SOURCE_MIX.OUT_NOISE
    return {
        send: (source: ApiSource, value: number) => toggleParamSend(source, value, cfg),
        receive: () => toggleParamReceive(cfg, srcMixApi.setOutNoise)
    }
})()
const outRingMod = (() => {
    const cfg = controllers.SOURCE_MIX.OUT_RING_MOD
    return {
        send: (source: ApiSource, value: number) => toggleParamSend(source, value, cfg),
        receive: () => toggleParamReceive(cfg, srcMixApi.setOutRingMod)
    }
})()
const outExtAudio = (() => {
    const cfg = controllers.SOURCE_MIX.OUT_EXT_AUDIO
    return {
        send: (source: ApiSource, value: number) => toggleParamSend(source, value, cfg),
        receive: () => toggleParamReceive(cfg, srcMixApi.setOutExtAudio)
    }
})()

const initReceive = () => {
    levelOsc1.receive()
    levelOsc2.receive()
    levelOsc3.receive()
    levelNoise.receive()
    levelRingMod.receive()
    levelExtAudio.receive()

    outOsc1.receive()
    outOsc2.receive()
    outOsc3.receive()
    outNoise.receive()
    outRingMod.receive()
    outExtAudio.receive()
}

const srcMixMidiApi = {
    setLevelOsc1: levelOsc1.send,
    setLevelOsc2: levelOsc2.send,
    setLevelOsc3: levelOsc3.send,
    setLevelNoise: levelNoise.send,
    setLevelRingMod: levelRingMod.send,
    setLevelExtAudio: levelExtAudio.send,

    setOutOsc1: outOsc1.send,
    setOutOsc2: outOsc2.send,
    setOutOsc3: outOsc3.send,
    setOutNoise: outNoise.send,
    setOutRingMod: outRingMod.send,
    setOutExtAudio: outExtAudio.send,

    initReceive,
}

export default srcMixMidiApi
