import { ApiSource } from '../forces/synthcore/synthcoreApi'
import { Curve, LoopMode, ReleaseMode } from '../forces/envelope/types'
import midiControllers from './midiControllers'
import { sendCC } from './midibus'

const shouldSend = (source: ApiSource) => {
    // TODO: Make this configurable
    return source !== ApiSource.MIDI;
}

let currentEnvId = -1;

const selectEnv = (envId: number) => {
    if(envId !== currentEnvId){
        sendCC(midiControllers.ENV1.SELECT.cc, envId)
        currentEnvId = envId;
    }
}

const sendLevel = (source: ApiSource, envId: number, stageId: number, boundedValue: number) => {
    if(!shouldSend(source)) return;
    selectEnv(envId)
    // TODO: Make this triple byte
    sendCC(midiControllers.ENV1.LEVEL.cc, Math.round(boundedValue * 127))
}
const sendTime = (source: ApiSource, envId: number, stageId: number, boundedValue: number) => {
    if(!shouldSend(source)) return;
    selectEnv(envId)
    // TODO: Make this dual byte
    sendCC(midiControllers.ENV1.TIME.cc, Math.round(boundedValue * 127))
}
const setInvert = (source: ApiSource, envId: number, invert: boolean) => {
    if(!shouldSend(source)) return;
    selectEnv(envId)
    const invertIndex = invert ? 1 : 0
    sendCC(midiControllers.ENV1.INVERT.cc, midiControllers.ENV1.INVERT.values?.[invertIndex] || 0)
}
const setResetOnTrigger = (source: ApiSource, envId: number, resetOnTrigger: boolean) => {
    if(!shouldSend(source)) return;
    selectEnv(envId)
    const resetIndex = resetOnTrigger ? 1 : 0
    sendCC(midiControllers.ENV1.RESET_ON_TRIGGER.cc, midiControllers.ENV1.RESET_ON_TRIGGER.values?.[resetIndex] || 0)
}
const setReleaseMode = (source: ApiSource, envId: number, releaseMode: ReleaseMode) => {
    if(!shouldSend(source)) return;
    selectEnv(envId)
    sendCC(midiControllers.ENV1.RELEASE_MODE.cc, midiControllers.ENV1.RELEASE_MODE.values?.[releaseMode] || 0)
}
const setLoopMode = (source: ApiSource, envId: number, loopMode: LoopMode) => {
    if(!shouldSend(source)) return;
    selectEnv(envId)
    sendCC(midiControllers.ENV1.LOOP_MODE.cc, midiControllers.ENV1.LOOP_MODE.values?.[loopMode] || 0)
}
const setStageEnabled = (source: ApiSource, envId: number, stageId: number, enabled: boolean) => {
    if(!shouldSend(source)) return;
    selectEnv(envId)
    const data = (stageId << 7) || (enabled ? 1 : 0)
    sendCC(midiControllers.ENV1.TOGGLE_STAGE.cc, data)
}
const setCurve = (source: ApiSource, envId: number, stageId: number, curve: Curve) => {
    if(!shouldSend(source)) return;
    selectEnv(envId)
    const data = (stageId << 7) || curve
    sendCC(midiControllers.ENV1.CURVE.cc, data)
}
const setMaxLoops = (source: ApiSource, envId: number, maxLoops: number) => {
    if(!shouldSend(source)) return;
    selectEnv(envId)
    sendCC(midiControllers.ENV1.MAX_LOOPS.cc, maxLoops)
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
        setCurve,
        setMaxLoops
    }
}