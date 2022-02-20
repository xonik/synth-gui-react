import { Envelope, LoopMode, ReleaseMode, StageId } from './types'
import {
    deselectStage,
    selectCurrEnvId,
    selectCurrStageId,
    selectGuiEnv,
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
} from '../env/envReducer'
import { store } from '../../store'
import midiApi from './envMidiApi'
import { curveFuncs } from '../../../components/curves/curveCalculator'
import { ApiSource } from '../../types'
import { dispatch, getBounded, getQuantized } from '../../utils'
import { createIndexClickMapper, createIndexIncrementMapper } from '../common/utils'
import envControllers from './envControllers'

const updateReleaseLevels = (env: Envelope, value: number) => {
    if (env.stages[StageId.RELEASE1].enabled) {
        dispatch(setLevel({ env: env.id, stage: StageId.RELEASE1, value }))
    } else {
        dispatch(setLevel({ env: env.id, stage: StageId.RELEASE2, value }))
    }
}

const cannotDisableStage = (stage: StageId) => stage === StageId.ATTACK || stage === StageId.RELEASE2 || stage === StageId.SUSTAIN

const setStageLevel = (envId: number, stageId: StageId, requestedValue: number, source: ApiSource) => {
    const env = selectEnvelopes(store.getState()).envs[envId]
    const r1enabled = env.stages[StageId.RELEASE1].enabled
    if (
        stageId === StageId.DECAY2 ||
        stageId === StageId.SUSTAIN ||
        (stageId === StageId.RELEASE2 && r1enabled)
    ) {
        const boundedValue = env.bipolar
            ? getQuantized(getBounded(requestedValue, -1, 1), 32767)
            : getQuantized(getBounded(requestedValue), 32767)

        const currentLevel = env.stages[stageId].level
        if (boundedValue === currentLevel) {
            return
        }

        // sustain level is not used directly. Instead it replaces r1 or r2 level depending on if
        // r1 is enabled or not.
        if (stageId === StageId.SUSTAIN) {
            const stage2Id = r1enabled ? StageId.RELEASE1 : StageId.RELEASE2
            dispatch(setDualLevels({ env: env.id, stage1: StageId.SUSTAIN, stage2: stage2Id, value: boundedValue }))
        } else {
            dispatch(setLevel({ env: envId, stage: stageId, value: boundedValue }))
        }

        if (stageId === StageId.SUSTAIN) {
            updateReleaseLevels(env, boundedValue)
        }

        midiApi.setLevel(source, envId, stageId, boundedValue)
    }
}

const incrementStageLevel = (envId: number, stageId: StageId, incLevel: number, source: ApiSource) => {
    const currentLevel = selectEnvelope(envId)(store.getState()).stages[stageId].level
    setStageLevel(envId, stageId, currentLevel + incLevel, source)
}

const setStageTime = (envId: number, stageId: StageId, requestedValue: number, source: ApiSource) => {
    const boundedValue = getQuantized(getBounded(requestedValue))
    const currentTime = selectEnvelope(envId)(store.getState()).stages[stageId].time
    if (boundedValue === currentTime) {
        return
    }

    dispatch(setTime({ env: envId, stage: stageId, value: boundedValue }))
    midiApi.setTime(source, envId, stageId, boundedValue)
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
    if (env.stages[stageId].enabled === enabled) {
        return
    }

    dispatch(setStageEnabledAction({ env: envId, stage: stageId, enabled }))

    if (stageId === StageId.RELEASE1) {
        if (enabled) {
            dispatch(setLevel({ env: envId, stage: StageId.RELEASE1, value: env.stages[StageId.SUSTAIN].level }))
        } else {
            dispatch(setLevel({ env: envId, stage: StageId.RELEASE2, value: env.stages[StageId.SUSTAIN].level }))
        }
    }
    midiApi.setStageEnabled(source, envId, stageId, enabled)
}
const toggleStageEnabled = (envId: number, stageId: StageId, source: ApiSource) => {
    const env = selectEnvelopes(store.getState()).envs[envId]
    const stage = env.stages[stageId]
    const enabled = !stage.enabled
    setStageEnabled(envId, stageId, enabled, source)
}
const setInvert = (envId: number, invert: boolean, source: ApiSource) => {
    const env = selectEnvelopes(store.getState()).envs[envId]
    if (env.invert === invert) {
        return
    }

    dispatch(setInvertAction({ env: envId, invert }))
    midiApi.setInvert(source, envId, invert)
}
const toggleInvert = (envId: number, source: ApiSource) => {
    const env = selectEnvelopes(store.getState()).envs[envId]
    const invert = !env.invert
    setInvert(envId, invert, source)
}
const setRetrigger = (envId: number, resetOnTrigger: boolean, source: ApiSource) => {
    const env = selectEnvelopes(store.getState()).envs[envId]
    if (env.resetOnTrigger === resetOnTrigger) {
        return
    }

    dispatch(setResetOnTrigger({ env: envId, resetOnTrigger }))
    midiApi.setResetOnTrigger(source, envId, resetOnTrigger)
}
const toggleRetrigger = (envId: number, source: ApiSource) => {
    const env = selectEnvelopes(store.getState()).envs[envId]
    const resetOnTrigger = !env.resetOnTrigger
    setRetrigger(envId, resetOnTrigger, source)
}
const setReleaseMode = (envId: number, releaseMode: ReleaseMode, source: ApiSource) => {
    const env = selectEnvelopes(store.getState()).envs[envId]
    if (env.releaseMode === releaseMode) {
        return
    }

    dispatch(setReleaseModeAction({ env: envId, releaseMode }))
    midiApi.setReleaseMode(source, envId, releaseMode)
}
const toggleReleaseMode = (envId: number, source: ApiSource) => {
    const env = selectEnvelopes(store.getState()).envs[envId]
    const releaseMode = (env.releaseMode + 1) % 3
    setReleaseMode(envId, releaseMode, source)
}
const setLoopMode = (envId: number, loopMode: LoopMode, source: ApiSource) => {
    const env = selectEnvelopes(store.getState()).envs[envId]
    if (env.loopMode === loopMode) {
        return
    }

    dispatch(setLoopModeAction({ env: envId, loopMode }))
    midiApi.setLoopMode(source, envId, loopMode)
}
const toggleLoopMode = (envId: number, source: ApiSource) => {
    const env = selectEnvelopes(store.getState()).envs[envId]
    const loopMode = (env.loopMode + 1) % 3
    setLoopMode(envId, loopMode, source)
}
const setLoopEnabled = (envId: number, enabled: boolean, source: ApiSource) => {
    const env = selectEnvelopes(store.getState()).envs[envId]
    if (env.loopEnabled === enabled) {
        return
    }

    dispatch(setLoopEnabledAction({ env: envId, enabled }))
    midiApi.setLoopEnabled(source, envId, enabled)
}
const toggleLoopEnabled = (envId: number, source: ApiSource) => {
    const env = selectEnvelopes(store.getState()).envs[envId]
    const loopEnabled = !env.loopEnabled
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
        dispatch(selectGuiEnv({ env: boundedEnv }))
    }
}
const incrementCurrentEnvelope = (increment: number, source: ApiSource) => {
    setCurrentEnv(selectCurrEnvId(store.getState()) + increment, source)
}
const setStageCurve = (envId: number, stageId: StageId, curve: number, source: ApiSource) => {
    const stage = selectEnvelope(envId)(store.getState()).stages[stageId]
    const boundedCurve = getBounded(curve, 0, curveFuncs.length - 1)
    if (stage.curve === boundedCurve) {
        return
    }

    dispatch(setCurve({ env: envId, stage: stageId, curve: boundedCurve }))
    midiApi.setCurve(source, envId, stageId, curve)
}
const incrementStageCurve = (envId: number, stageId: StageId, increment: number, source: ApiSource) => {
    const stage = selectEnvelope(envId)(store.getState()).stages[stageId]
    console.log('increment', {
        envId,
        stageId,
        increment,
        source,
        env: selectEnvelope(envId),
        stages: selectEnvelope(envId)(store.getState()).stages,
        stage,
    })
    setStageCurve(envId, stageId, stage.curve + increment, source)
}
const setMaxLoops = (envId: number, maxLoops: number, source: ApiSource) => {
    const currMaxLoops = selectEnvelope(envId)(store.getState()).maxLoops
    const boundedMaxLoops = getBounded(maxLoops, 2, 128)
    if (boundedMaxLoops === currMaxLoops) {
        return
    }

    dispatch(setMaxLoopsAction({ env: envId, value: boundedMaxLoops }))
    midiApi.setMaxLoops(source, envId, boundedMaxLoops)
}
const incrementMaxLoops = (envId: number, increment: number, source: ApiSource) => {
    const currMaxLoops = selectEnvelope(envId)(store.getState()).maxLoops
    setMaxLoops(envId, currMaxLoops + increment, source)
}
const trigger = (envId: number, source: ApiSource) => {
    midiApi.trigger(source, envId)
}
const release = (envId: number, source: ApiSource) => {
    midiApi.release(source, envId)
}
const setEnv3Id = (id: number, source: ApiSource) => {
    const envelopes = selectEnvelopes(store.getState()).envs.length
    const currentEnv3Id = selectEnv3Id(store.getState())
    if (id !== currentEnv3Id && id < envelopes && id > 1) {
        dispatch(setEnv3IdAction({ id }))
        midiApi.setEnv3Id(source, id)
    }
}
const toggleEnv3Id = (source: ApiSource) => {
    const envelopes = selectEnvelopes(store.getState()).envs.length
    const currEnv3Id = selectEnv3Id(store.getState())
    let nextEnv3Id = (currEnv3Id + 1)
    if (nextEnv3Id > envelopes - 1) {
        nextEnv3Id = 2
    }
    setEnv3Id(nextEnv3Id, source)
}

const increment = createIndexIncrementMapper([
    [envControllers(0).DELAY_TIME, ({
                                        ctrlIndex,
                                        value,
                                        source
                                    }) => incrementStageTime(ctrlIndex || 0, StageId.DELAY, value, source)],
    [envControllers(0).ATTACK_TIME, ({
                                         ctrlIndex,
                                         value,
                                         source
                                     }) => incrementStageTime(ctrlIndex || 0, StageId.ATTACK, value, source)],
    [envControllers(0).DECAY1_TIME, ({
                                         ctrlIndex,
                                         value,
                                         source
                                     }) => incrementStageTime(ctrlIndex || 0, StageId.DECAY1, value, source)],
    [envControllers(0).DECAY2_TIME, ({
                                         ctrlIndex,
                                         value,
                                         source
                                     }) => incrementStageTime(ctrlIndex || 0, StageId.DECAY2, value, source)],
    [envControllers(0).SUSTAIN_LEVEL, ({
                                           ctrlIndex,
                                           value,
                                           source
                                       }) => incrementStageLevel(ctrlIndex || 0, StageId.SUSTAIN, value, source)],
    [envControllers(0).RELEASE1_TIME, ({
                                           ctrlIndex,
                                           value,
                                           source
                                       }) => incrementStageTime(ctrlIndex || 0, StageId.RELEASE1, value, source)],
    [envControllers(0).RELEASE2_TIME, ({
                                           ctrlIndex,
                                           value,
                                           source
                                       }) => incrementStageTime(ctrlIndex || 0, StageId.RELEASE2, value, source)],
    [envControllers(0).DECAY2_LEVEL, ({
                                          ctrlIndex,
                                          value,
                                          source
                                      }) => incrementStageLevel(ctrlIndex || 0, StageId.DECAY2, value, source)],
    [envControllers(0).RELEASE2_LEVEL, ({
                                            ctrlIndex,
                                            value,
                                            source
                                        }) => incrementStageLevel(ctrlIndex || 0, StageId.RELEASE2, value, source)],
])

const toggle = createIndexClickMapper([
    [envControllers(0).SELECT_ENV3_ID, ({ ctrlIndex, source }) => toggleEnv3Id(source)],
    [envControllers(0).LOOP, ({ ctrlIndex, source }) => toggleLoopEnabled(ctrlIndex || 0, source)],
    [envControllers(0).TRIGGER, ({ ctrlIndex, source }) => trigger(ctrlIndex || 0, source)],
    [envControllers(0).INVERT, ({ ctrlIndex, source }) => toggleInvert(ctrlIndex || 0, source)],
])

const envApi = {
    setStageLevel,
    setStageTime,
    setStageEnabled,
    setInvert,
    setRetrigger,
    setReleaseMode,
    setLoopMode,
    setCurrentEnv,
    setStageCurve,
    setMaxLoops,
    setLoopEnabled,

    incrementCurrentEnvelope,
    incrementStageTime,
    incrementStageLevel,
    incrementStageCurve,
    incrementMaxLoops,

    toggleStageEnabled,
    toggleInvert,
    toggleLoopMode,
    toggleRetrigger,
    toggleReleaseMode,
    toggleLoopEnabled,
    toggleStageSelected,
    trigger,
    release,
    setEnv3Id,

    increment,
    toggle
}

export default envApi