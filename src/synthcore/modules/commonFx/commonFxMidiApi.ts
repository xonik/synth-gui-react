import controllers from '../../../midi/controllers'
import { ApiSource } from '../../types'

// If imported directly we get a cyclic dependency. Not sure why it works now.
import { commonFxApi } from '../../synthcoreApi'
import { numericParamReceive, numericParamSend, toggleParamReceive, toggleParamSend } from '../common/commonMidiApi'

const dsp1Param1 = (() => {
    const cfg = controllers.DSP1.PARAM1
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, commonFxApi.setDsp1Param1)
    }
})()
const dsp1Param2 = (() => {
    const cfg = controllers.DSP1.PARAM2
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, commonFxApi.setDsp1Param2)
    }
})()
const dsp1Param3 = (() => {
    const cfg = controllers.DSP1.PARAM3
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, commonFxApi.setDsp1Param3)
    }
})()
const dsp1Effect = (() => {
    const cfg = controllers.DSP1.EFFECT
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, commonFxApi.setDsp1Effect)
    }
})()

const dsp2Param1 = (() => {
    const cfg = controllers.DSP2.PARAM1
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, commonFxApi.setDsp2Param1)
    }
})()
const dsp2Param2 = (() => {
    const cfg = controllers.DSP2.PARAM2
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, commonFxApi.setDsp2Param2)
    }
})()
const dsp2Param3 = (() => {
    const cfg = controllers.DSP2.PARAM3
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, commonFxApi.setDsp2Param3)
    }
})()
const dsp2Effect = (() => {
    const cfg = controllers.DSP2.EFFECT
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, commonFxApi.setDsp2Effect)
    }
})()

const chorusRate = (() => {
    const cfg = controllers.CHORUS.RATE
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, commonFxApi.setChorusRate)
    }
})()
const chorusDepth = (() => {
    const cfg = controllers.CHORUS.DEPTH
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, commonFxApi.setChorusDepth)
    }
})()

const bitCrusherBits = (() => {
    const cfg = controllers.BIT_CRUSHER.BITS
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, commonFxApi.setBitCrusherBits)
    }
})()
const bitCrusherRate = (() => {
    const cfg = controllers.BIT_CRUSHER.RATE
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, commonFxApi.setBitCrusherRate)
    }
})()

const levelDsp1 = (() => {
    const cfg = controllers.FX_MIX.LEVEL_DSP1
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, commonFxApi.setLevelDsp1)
    }
})()
const levelDsp2 = (() => {
    const cfg = controllers.FX_MIX.LEVEL_DSP2
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, commonFxApi.setLevelDsp2)
    }
})()
const levelChorus = (() => {
    const cfg = controllers.FX_MIX.LEVEL_CHORUS
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, commonFxApi.setLevelChorus)
    }
})()
const levelBitCrusher = (() => {
    const cfg = controllers.FX_MIX.LEVEL_BIT_CRUSHER
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, commonFxApi.setLevelBitCrusher)
    }
})()

const dsp1Source = (() => {
    const cfg = controllers.DSP1.SOURCE
    return {
        send: (source: ApiSource, value: number) => toggleParamSend(source, value, cfg),
        receive: () => toggleParamReceive(cfg, commonFxApi.setDsp1Source)
    }
})()
const dsp2Source = (() => {
    const cfg = controllers.DSP2.SOURCE
    return {
        send: (source: ApiSource, value: number) => toggleParamSend(source, value, cfg),
        receive: () => toggleParamReceive(cfg, commonFxApi.setDsp2Source)
    }
})()
const dsp2Chain = (() => {
    const cfg = controllers.DSP2.CHAIN
    return {
        send: (source: ApiSource, value: number) => toggleParamSend(source, value, cfg),
        receive: () => toggleParamReceive(cfg, commonFxApi.setDsp2Chain)
    }
})()
const chorusSource = (() => {
    const cfg = controllers.CHORUS.SOURCE
    return {
        send: (source: ApiSource, value: number) => toggleParamSend(source, value, cfg),
        receive: () => toggleParamReceive(cfg, commonFxApi.setChorusSource)
    }
})()
const chorusMode = (() => {
    const cfg = controllers.CHORUS.MODE
    return {
        send: (source: ApiSource, value: number) => toggleParamSend(source, value, cfg),
        receive: () => toggleParamReceive(cfg, commonFxApi.setChorusMode)
    }
})()
const bitCrusherSource = (() => {
    const cfg = controllers.FX_BIT_CRUSHER.SOURCE
    return {
        send: (source: ApiSource, value: number) => toggleParamSend(source, value, cfg),
        receive: () => toggleParamReceive(cfg, commonFxApi.setBitCrusherSource)
    }
})()

const initReceive = () => {
    dsp1Param1.receive()
    dsp1Param2.receive()
    dsp1Param3.receive()
    dsp1Effect.receive()
    dsp1Source.receive()

    dsp2Param1.receive()
    dsp2Param2.receive()
    dsp2Param3.receive()
    dsp2Effect.receive()
    dsp2Source.receive()
    dsp2Chain.receive()

    chorusRate.receive()
    chorusDepth.receive()
    chorusSource.receive()
    chorusMode.receive()

    bitCrusherBits.receive()
    bitCrusherRate.receive()
    bitCrusherSource.receive()

    levelDsp1.receive()
    levelDsp2.receive()
    levelChorus.receive()
    levelBitCrusher.receive()
}

const commonFxMidiApi = {
    setDsp1Param1: dsp1Param1.send,
    setDsp1Param2: dsp1Param2.send,
    setDsp1Param3: dsp1Param3.send,
    setDsp1Effect: dsp1Effect.send,
    setDsp1Source: dsp1Source.send,

    setDsp2Param1: dsp2Param1.send,
    setDsp2Param2: dsp2Param2.send,
    setDsp2Param3: dsp2Param3.send,
    setDsp2Effect: dsp2Effect.send,
    setDsp2Source: dsp2Source.send,
    setDsp2Chain: dsp2Chain.send,

    setChorusRate: chorusRate.send,
    setChorusDepth: chorusDepth.send,
    setChorusSource: chorusSource.send,
    setChorusMode: chorusMode.send,

    setBitCrusherBits: bitCrusherBits.send,
    setBitCrusherRate: bitCrusherRate.send,
    setBitCrusherSource: bitCrusherSource.send,

    setLevelDsp1: levelDsp1.send,
    setLevelDsp2: levelDsp2.send,
    setLevelChorus: levelChorus.send,
    setLevelBitCrusher: levelBitCrusher.send,

    initReceive,
}

export default commonFxMidiApi
