import { ApiSource } from '../forces/synthcore/synthcoreApi'
import { Curve, LoopMode, ReleaseMode } from '../forces/envelope/types'

const sendLevel = (source: ApiSource, envId: number, stageId: number, boundedValue: number) => {

}
const sendTime = (source: ApiSource, envId: number, stageId: number, boundedValue: number) => {

}
const setInvert = (source: ApiSource, envId: number, invert: boolean) => {

}
const setResetOnTrigger = (source: ApiSource, envId: number, resetOnTrigger: boolean) => {

}
const setReleaseMode = (source: ApiSource, envId: number, releaseMode: ReleaseMode) => {

}
const setLoopMode = (source: ApiSource, envId: number, loopMode: LoopMode) => {

}
const setStageEnabled = (source: ApiSource, envId: number, stageId: number, enabled: boolean) => {

}
const selectStage = (source: ApiSource, envId: number, stageId: number) => {

}
const deselectStage = (source: ApiSource, envId: number, stageId: number) => {

}
const setCurve = (source: ApiSource, envId: number, stageId: number, curve: Curve) => {

}
const setMaxLoops = (source: ApiSource, envId: number, maxLoops: number) => {

}

export default {
    env: {
        sendLevel,
        sendTime,
        setStageEnabled,
        setInvert,
        setResetOnTrigger,
        setReleaseMode,
        setLoopMode,
        selectStage,
        deselectStage,
        setCurve,
        setMaxLoops
    }
}