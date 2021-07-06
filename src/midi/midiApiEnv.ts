import { ApiSource, envApi } from '../forces/synthcore/synthcoreApi'
import { Curve, LoopMode, ReleaseMode } from '../forces/envelope/types'
import midiControllers from './midiControllers'
import { send16, send2x7, sendCC, subscribe, subscribeToCmd } from './midibus'

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

const setLevel = (source: ApiSource, envId: number, stageId: number, boundedValue: number) => {
    if(!shouldSend(source)) return;
    selectEnv(envId)
    send16(midiControllers.ENV1.LEVEL.cc, Math.round(boundedValue * 65535))
}
const receiveLevel = () => {
    subscribeToCmd((values: number[]) => {
        const value = values[0] + values[1] * 128 + values[2] * 16384
        envApi.setStageLevel(currentEnvId, values[3], value, ApiSource.MIDI)
    }, midiControllers.ENV1.LEVEL)
}

const setTime = (source: ApiSource, envId: number, stageId: number, boundedValue: number) => {
    if(!shouldSend(source)) return;
    selectEnv(envId)
    send16(midiControllers.ENV1.TIME.cc, Math.round(boundedValue * 65535))
}
const receiveTime = () => {
    subscribeToCmd((values: number[]) => {
        const value = values[0] + values[1] * 128 + values[2] * 16384
        envApi.setStageTime(currentEnvId, values[3], value, ApiSource.MIDI)
    }, midiControllers.ENV1.TIME)
}

const setInvert = (source: ApiSource, envId: number, invert: boolean) => {
    if(!shouldSend(source)) return;
    selectEnv(envId)
    const invertIndex = invert ? 1 : 0
    sendCC(midiControllers.ENV1.INVERT.cc, midiControllers.ENV1.INVERT.values?.[invertIndex] || 0)
}
const receiveInvert = () => {
    subscribe((value: number) => {
        const invert = value === midiControllers.ENV1.INVERT.values?.[1];
        envApi.setInvert(currentEnvId, invert, ApiSource.MIDI)
    }, midiControllers.ENV1.INVERT)
}

const setResetOnTrigger = (source: ApiSource, envId: number, resetOnTrigger: boolean) => {
    if(!shouldSend(source)) return;
    selectEnv(envId)
    const resetIndex = resetOnTrigger ? 1 : 0
    sendCC(midiControllers.ENV1.RESET_ON_TRIGGER.cc, midiControllers.ENV1.RESET_ON_TRIGGER.values?.[resetIndex] || 0)
}
const receiveResetOnTrigger = () => {
    subscribe((value: number) => {
        const reset = value === midiControllers.ENV1.RESET_ON_TRIGGER.values?.[1];
        envApi.setRetrigger(currentEnvId, reset, ApiSource.MIDI)
    }, midiControllers.ENV1.RESET_ON_TRIGGER)
}

const setReleaseMode = (source: ApiSource, envId: number, releaseMode: ReleaseMode) => {
    if(!shouldSend(source)) return;
    selectEnv(envId)
    sendCC(midiControllers.ENV1.RELEASE_MODE.cc, midiControllers.ENV1.RELEASE_MODE.values?.[releaseMode] || 0)
}
const receiveReleaseMode = () => {
    subscribe((value: number) => {
        const releaseMode = midiControllers.ENV1.RELEASE_MODE.values?.indexOf(value) || 0;
        envApi.setReleaseMode(currentEnvId, releaseMode, ApiSource.MIDI)
    }, midiControllers.ENV1.RELEASE_MODE)
}

const setLoopMode = (source: ApiSource, envId: number, loopMode: LoopMode) => {
    if(!shouldSend(source)) return;
    selectEnv(envId)
    sendCC(midiControllers.ENV1.LOOP_MODE.cc, midiControllers.ENV1.LOOP_MODE.values?.[loopMode] || 0)
}
const receiveLoopMode = () => {
    subscribe((value: number) => {
        const loopMode = midiControllers.ENV1.LOOP_MODE.values?.indexOf(value) || 0;
        envApi.setLoopMode(currentEnvId, loopMode, ApiSource.MIDI)
    }, midiControllers.ENV1.LOOP_MODE)
}

const setStageEnabled = (source: ApiSource, envId: number, stageId: number, enabled: boolean) => {
    if(!shouldSend(source)) return;
    selectEnv(envId)
    const enableBit = enabled ? 0b1000 : 0;
    const data = stageId | enableBit;
    sendCC(midiControllers.ENV1.TOGGLE_STAGE.cc, data)
}
const receiveStageEnabled = () => {
    subscribe((value: number) => {
        const stageId = value & 0b111
        const enabled = (value & 0b1000) > 0;
        envApi.setStageEnabled(currentEnvId, stageId, enabled, ApiSource.MIDI)
    }, midiControllers.ENV1.TOGGLE_STAGE)
}

const setCurve = (source: ApiSource, envId: number, stageId: number, curve: Curve) => {
    if(!shouldSend(source)) return;
    selectEnv(envId)
    send2x7(midiControllers.ENV1.CURVE.cc, stageId, curve)
}
const receiveCurve = () => {
    subscribeToCmd((values: number[]) => {
        const stageId = values[0]
        const curve = values[1]
        envApi.setStageCurve(currentEnvId, stageId, curve, ApiSource.MIDI)
    }, midiControllers.ENV1.CURVE)
}

const setMaxLoops = (source: ApiSource, envId: number, maxLoops: number) => {
    if(!shouldSend(source)) return;
    selectEnv(envId)
    sendCC(midiControllers.ENV1.MAX_LOOPS.cc, maxLoops)
}
const receiveMaxLoops = () => {
    subscribe((value: number) => {
        envApi.setMaxLoops(currentEnvId, value, ApiSource.MIDI)
    }, midiControllers.ENV1.MAX_LOOPS)
}

const initReceive = () => {
    receiveLevel()
    receiveTime()
    receiveInvert()
    receiveResetOnTrigger()
    receiveReleaseMode()
    receiveLoopMode()
    receiveStageEnabled()
    receiveCurve()
    receiveMaxLoops()
}

export default {
    setLevel,
    setTime,
    setStageEnabled,
    setInvert,
    setResetOnTrigger,
    setReleaseMode,
    setLoopMode,
    setCurve,
    setMaxLoops,
    initReceive,
}