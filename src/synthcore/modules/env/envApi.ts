import { Envelope, LoopMode, ReleaseMode, StageId } from './types'
import {
    deselectStage,
    selectCurrEnvId,
    selectCurrStageId,
    selectEnv,
    selectEnvelope,
    selectEnvelopes,
    selectStage,
    setCurve,
    setDualLevels,
    setInvert as setInvertAction,
    setLevel,
    setLoopMode as setLoopModeAction,
    setLoopEnabled as setLoopEnabledAction,
    setMaxLoops as setMaxLoopsAction,
    setReleaseMode as setReleaseModeAction,
    setResetOnTrigger,
    setStageEnabled as setStageEnabledAction,
    setTime,
    setEnv3Id as setEnv3IdAction,
    selectEnv3Id,
} from '../env/envelopesReducer'
import { store } from '../../store'
import midiApi from '../../../midi/midiApi'
import { curveFuncs } from '../../../components/curves/curveCalculator'
import { ApiSource } from '../../types'
import { dispatch, getBounded } from '../../utils'

const updateReleaseLevels = (env: Envelope, value: number) => {
    if (env.stages[StageId.RELEASE1].enabled) {
        dispatch(setLevel({ env: env.id, stage: StageId.RELEASE1, value }))
    } else {
        dispatch(setLevel({ env: env.id, stage: StageId.RELEASE2, value }))
    }
}

const cannotDisableStage = (stage: StageId) => stage === StageId.ATTACK || stage === StageId.RELEASE2 || stage === StageId.SUSTAIN

// requestedValue is always 0-1 while store value is -1 to 1 if bipolar
const setStageLevel = (envId: number, stageId: StageId, requestedValue: number, source: ApiSource) => {
    const env = selectEnvelopes(store.getState()).envs[envId]
    const r1enabled = env.stages[StageId.RELEASE1].enabled
    if (
        stageId === StageId.DECAY2 ||
        stageId === StageId.SUSTAIN ||
        (stageId === StageId.RELEASE2 && r1enabled)
    ) {
        let boundedValue = getBounded(requestedValue)
        const value = env.bipolar ? boundedValue * 2 - 1 : boundedValue

        // sustain level is not used directly. Instead it replaces r1 or r2 level depending on if
        // r1 is enabled or not.
        if (stageId === StageId.SUSTAIN) {
            const stage2Id = r1enabled ? StageId.RELEASE1 : StageId.RELEASE2
            dispatch(setDualLevels({ env: env.id, stage1: StageId.SUSTAIN, stage2: stage2Id, value }))
        } else {
            dispatch(setLevel({ env: envId, stage: stageId, value }))
        }

        if (stageId === StageId.SUSTAIN) {
            updateReleaseLevels(env, value)
        }

        midiApi.env.setLevel(source, envId, stageId, boundedValue)
    }
}

const incrementStageLevel = (envId: number, stageId: StageId, incLevel: number, source: ApiSource) => {
    const env = selectEnvelopes(store.getState()).envs[envId]
    let currentLevel = selectEnvelope(envId)(store.getState()).stages[stageId].level
    if (env.bipolar) {
        currentLevel = (currentLevel + 1) / 2
    }
    setStageLevel(envId, stageId, currentLevel + incLevel, source)
}

const setStageTime = (envId: number, stageId: StageId, requestedValue: number, source: ApiSource) => {
    const boundedValue = getBounded(requestedValue)
    dispatch(setTime({ env: envId, stage: stageId, value: boundedValue }))
    midiApi.env.setTime(source, envId, stageId, boundedValue)
}

const incrementStageTime = (envId: number, stageId: StageId, incTime: number, source: ApiSource) => {
    const currentTime = selectEnvelope(envId)(store.getState()).stages[stageId].time
    setStageTime(envId, stageId, currentTime + incTime, source)
}

const setStageEnabled = (envId: number, stageId: StageId, enabled: boolean, source: ApiSource) => {
    if (cannotDisableStage(stageId)) {
        return
    }

    const env = selectEnvelopes(store.getState()).envs[envId]
    dispatch(setStageEnabledAction({ env: envId, stage: stageId, enabled }))

    if (stageId === StageId.RELEASE1) {
        if(enabled){
            dispatch(setLevel({ env: envId, stage: StageId.RELEASE1, value: env.stages[StageId.SUSTAIN].level }))
        } else {
            dispatch(setLevel({ env: envId, stage: StageId.RELEASE2, value: env.stages[StageId.SUSTAIN].level }))
        }
    }
    midiApi.env.setStageEnabled(source, envId, stageId, enabled)
}
const toggleStageEnabled = (envId: number, stageId: StageId, source: ApiSource) => {
    const env = selectEnvelopes(store.getState()).envs[envId]
    const stage = env.stages[stageId]
    const enabled = !stage.enabled
    setStageEnabled(envId, stageId, enabled, source)
}
const setInvert = (envId: number, invert: boolean, source: ApiSource) => {
    dispatch(setInvertAction({ env: envId, invert }))
    midiApi.env.setInvert(source, envId, invert)
}
const toggleInvert = (envId: number, source: ApiSource) => {
    const env = selectEnvelopes(store.getState()).envs[envId]
    const invert = !env.invert
    setInvert(envId, invert, source)
}
const setRetrigger = (envId: number, resetOnTrigger: boolean, source: ApiSource) => {
    dispatch(setResetOnTrigger({ env: envId, resetOnTrigger }))
    midiApi.env.setResetOnTrigger(source, envId, resetOnTrigger)
}
const toggleRetrigger = (envId: number, source: ApiSource) => {
    const env = selectEnvelopes(store.getState()).envs[envId]
    const resetOnTrigger = !env.resetOnTrigger
    setRetrigger(envId, resetOnTrigger, source)
}
const setReleaseMode = (envId: number, releaseMode: ReleaseMode, source: ApiSource) => {
    dispatch(setReleaseModeAction({ env: envId, releaseMode }))
    midiApi.env.setReleaseMode(source, envId, releaseMode)
}
const toggleReleaseMode = (envId: number, source: ApiSource) => {
    const env = selectEnvelopes(store.getState()).envs[envId]
    const releaseMode = (env.releaseMode + 1) % 3
    setReleaseMode(envId, releaseMode, source)
}
const setLoopMode = (envId: number, loopMode: LoopMode, source: ApiSource) => {
    dispatch(setLoopModeAction({ env: envId, loopMode }))
    midiApi.env.setLoopMode(source, envId, loopMode)
}
const toggleLoopMode = (envId: number, source: ApiSource) => {
    const env = selectEnvelopes(store.getState()).envs[envId]
    const loopMode = (env.loopMode + 1) % 3
    setLoopMode(envId, loopMode, source)
}
const setLoopEnabled = (envId: number, enabled: boolean, source: ApiSource) => {
    dispatch(setLoopEnabledAction({env: envId, enabled}))
    midiApi.env.setLoopEnabled(source, envId, enabled)
}
const toggleLoopEnabled = (envId: number, source: ApiSource) => {
    const env = selectEnvelopes(store.getState()).envs[envId]
    const loopEnabled = !env.loopEnabled;
    setLoopEnabled(envId, loopEnabled, source)
}
const toggleStageSelected = (envId: number, stageId: StageId, source: ApiSource) => {
    const currStageId = selectCurrStageId(store.getState())
    if (currStageId === stageId) {
        dispatch(deselectStage({ env: -1, stage: stageId }))
    } else {
        dispatch(selectStage({ env: -1, stage: stageId }))
    }
}
const setCurrentEnv = (envId: number, source: ApiSource) => {
    const boundedEnv = getBounded(envId, 0, selectEnvelopes(store.getState()).envs.length - 1)
    if (selectCurrEnvId(store.getState()) !== boundedEnv) {
        dispatch(selectEnv({ env: boundedEnv }))
    }
}
const incrementCurrentEnvelope = (increment: number, source: ApiSource) => {
    setCurrentEnv(selectCurrEnvId(store.getState()) + increment, source)
}
const setStageCurve = (envId: number, stageId: StageId, curve: number, source: ApiSource) => {
    const stage = selectEnvelope(envId)(store.getState()).stages[stageId]
    const boundedCurve = getBounded(curve, 0, curveFuncs.length - 1)
    if (stage.curve !== boundedCurve) {
        dispatch(setCurve({ env: envId, stage: stageId, curve: boundedCurve }))
        midiApi.env.setCurve(source, envId, stageId, curve)
    }
}
const incrementStageCurve = (envId: number, stageId: StageId, increment: number, source: ApiSource) => {
    const stage = selectEnvelope(envId)(store.getState()).stages[stageId]
    setStageCurve(envId, stageId, stage.curve + increment, source)
}
const setMaxLoops = (envId: number, maxLoops: number, source: ApiSource) => {
    const currMaxLoops = selectEnvelope(envId)(store.getState()).maxLoops
    const boundedMaxLoops = getBounded(maxLoops, 2, 128)
    if (boundedMaxLoops !== currMaxLoops) {
        dispatch(setMaxLoopsAction({ env: envId, value: boundedMaxLoops }))
        midiApi.env.setMaxLoops(source, envId, boundedMaxLoops)
    }
}
const incrementMaxLoops = (envId: number, increment: number, source: ApiSource) => {
    const currMaxLoops = selectEnvelope(envId)(store.getState()).maxLoops
    setMaxLoops(envId, currMaxLoops + increment, source)
}
const trigger = (envId: number, source: ApiSource) => {
    midiApi.env.trigger(source, envId)
}
const release = (envId: number, source: ApiSource) => {
    midiApi.env.trigger(source, envId)
}
const setEnv3Id = (id: number,source: ApiSource) => {
    const envelopes = selectEnvelopes(store.getState()).envs.length
    if(id < envelopes && id > 1) {
        dispatch(setEnv3IdAction({id}))
        midiApi.env.setEnv3Id(source, id)
    }
}
const toggleEnv3Id = (source: ApiSource) => {
    const envelopes = selectEnvelopes(store.getState()).envs.length
    const currEnv3Id = selectEnv3Id(store.getState())
    let nextEnv3Id = (currEnv3Id + 1);
    if(nextEnv3Id > envelopes-1) nextEnv3Id = 2;
    setEnv3Id(nextEnv3Id, source);
}

export default {
    setStageLevel,
    incrementStageLevel,
    setStageTime,
    incrementStageTime,
    setStageEnabled,
    toggleStageEnabled,
    setInvert,
    toggleInvert,
    setRetrigger,
    toggleRetrigger,
    setReleaseMode,
    toggleReleaseMode,
    setLoopMode,
    toggleLoopMode,
    setLoopEnabled,
    toggleLoopEnabled,
    toggleStageSelected,
    setCurrentEnv,
    incrementCurrentEnvelope,
    setStageCurve,
    incrementStageCurve,
    setMaxLoops,
    incrementMaxLoops,
    trigger,
    setEnv3Id,
    toggleEnv3Id,
}