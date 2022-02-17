import controllers from '../../../midi/controllers'
import { ApiSource } from '../../types'

// If imported directly we get a cyclic dependency. Not sure why it works now.
import { fxApi } from '../../synthcoreApi'
import { numericParamReceive, numericParamSend, toggleParamReceive, toggleParamSend } from '../common/commonMidiApi'

const distortionDrive = (() => {
    const cfg = controllers.DISTORTION.DRIVE
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, fxApi.setDistortionDrive)
    }
})()
const distortionLevel = (() => {
    const cfg = controllers.DISTORTION.LEVEL
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, fxApi.setDistortionLevel)
    }
})()
const bitCrusherBits = (() => {
    const cfg = controllers.BIT_CRUSHER.BITS
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, fxApi.setBitCrusherBits)
    }
})()
const bitCrusherRate = (() => {
    const cfg = controllers.BIT_CRUSHER.RATE
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, fxApi.setBitCrusherRate)
    }
})()
const bitCrusherLevel = (() => {
    const cfg = controllers.BIT_CRUSHER.LEVEL
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, fxApi.setBitCrusherLevel)
    }
})()

const distortionIn = (() => {
    const cfg = controllers.DISTORTION.IN
    return {
        send: (source: ApiSource, value: number) => toggleParamSend(source, value, cfg),
        receive: () => toggleParamReceive(cfg, fxApi.setDistortionIn)
    }
})()
const distortionClip = (() => {
    const cfg = controllers.DISTORTION.CLIP
    return {
        send: (source: ApiSource, value: number) => toggleParamSend(source, value, cfg),
        receive: () => toggleParamReceive(cfg, fxApi.setDistortionClip)
    }
})()
const distortionOut = (() => {
    const cfg = controllers.DISTORTION.OUT
    return {
        send: (source: ApiSource, value: number) => toggleParamSend(source, value, cfg),
        receive: () => toggleParamReceive(cfg, fxApi.setDistortionOut)
    }
})()
const bitCrusherIn = (() => {
    const cfg = controllers.BIT_CRUSHER.IN
    return {
        send: (source: ApiSource, value: number) => toggleParamSend(source, value, cfg),
        receive: () => toggleParamReceive(cfg, fxApi.setBitCrusherIn)
    }
})()
const bitCrusherOut = (() => {
    const cfg = controllers.BIT_CRUSHER.OUT
    return {
        send: (source: ApiSource, value: number) => toggleParamSend(source, value, cfg),
        receive: () => toggleParamReceive(cfg, fxApi.setBitCrusherOut)
    }
})()

const initReceive = () => {
    distortionDrive.receive()
    distortionLevel.receive()
    bitCrusherBits.receive()
    bitCrusherRate.receive()
    bitCrusherLevel.receive()

    distortionIn.receive()
    distortionClip.receive()
    distortionOut.receive()
    bitCrusherIn.receive()
    bitCrusherOut.receive()
}

const fxMidiApi = {
    setDistortionDrive: distortionDrive.send,
    setDistortionLevel: distortionLevel.send,
    setBitCrusherBits: bitCrusherBits.send,
    setBitCrusherRate: bitCrusherRate.send,
    setBitCrusherLevel: bitCrusherLevel.send,

    setDistortionIn: distortionIn.send,
    setDistortionClip: distortionClip.send,
    setDistortionOut: distortionOut.send,
    setBitCrusherIn: bitCrusherIn.send,
    setBitCrusherOut: bitCrusherOut.send,

    initReceive,
}

export default fxMidiApi
