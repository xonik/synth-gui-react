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
    setInvert,
    setLevel,
    setLoopMode,
    setMaxLoops,
    setReleaseMode,
    setResetOnTrigger,
    setStageEnabled,
    setTime
} from '../envelope/envelopesReducer'
import { Envelope, LoopMode, ReleaseMode, StageId } from '../envelope/types'
import { AnyAction, Dispatch, } from '@reduxjs/toolkit'
import { store } from '../store'
import { curveFuncs } from '../../components/curves/curveCalculator'
import midiApi from '../../midi/midiApi'

let storeDispatch: Dispatch | undefined

export enum ApiSource {
    GUI,
    SPI,
    MIDI
}

const dispatch = (action: AnyAction) => {
    if (!storeDispatch) {
        storeDispatch = store.dispatch
    }
    storeDispatch(action)
}


const getBounded = (value: number, from: number = 0, to: number = 1) => {
    if (value > to) {
        return to
    }
    if (value < from) {
        return from
    }
    return value
}

function updateReleaseLevels(env: Envelope, value: number) {
    if (env.stages[StageId.RELEASE1].enabled) {
        dispatch(setLevel({ env: env.id, stage: StageId.RELEASE1, value }))
    } else {
        dispatch(setLevel({ env: env.id, stage: StageId.RELEASE2, value }))
    }
}

const cannotDisableStage = (stage: StageId) => stage === StageId.ATTACK || stage === StageId.RELEASE2 || stage === StageId.SUSTAIN

export const envApi = {
    // requestedValue is always 0-1 while store value is -1 to 1 if bipolar
    setStageLevel: (envId: number, stageId: StageId, requestedValue: number, source: ApiSource) => {
        const env = selectEnvelopes(store.getState()).envs[envId]
        const r1enabled = env.stages[StageId.RELEASE1].enabled
        if (
            stageId === StageId.DECAY2 ||
            stageId === StageId.SUSTAIN ||
            (stageId === StageId.RELEASE2 && r1enabled)
        ) {
            let boundedValue = getBounded(requestedValue)
            const value = env.bipolar ? boundedValue * 2 - 1 : boundedValue;

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
    },

    incrementStageLevel: (envId: number, stageId: StageId, incLevel: number, source: ApiSource) => {
        const env = selectEnvelopes(store.getState()).envs[envId]
        let currentLevel = selectEnvelope(envId)(store.getState()).stages[stageId].level
        if (env.bipolar) {
            currentLevel = (currentLevel + 1) / 2
        }
        envApi.setStageLevel(envId, stageId, currentLevel + incLevel, source)
    },

    setStageTime: (envId: number, stageId: StageId, requestedValue: number, source: ApiSource) => {
        const boundedValue = getBounded(requestedValue)
        dispatch(setTime({ env: envId, stage: stageId, value: boundedValue }))
        midiApi.env.setTime(source, envId, stageId, boundedValue)
    },

    incrementStageTime: (envId: number, stageId: StageId, incTime: number, source: ApiSource) => {
        const currentTime = selectEnvelope(envId)(store.getState()).stages[stageId].time
        envApi.setStageTime(envId, stageId, currentTime + incTime, source)
    },
    setStageEnabled: (envId: number, stageId: StageId, enabled: boolean, source: ApiSource) =>{
        if (cannotDisableStage(stageId)) {
            return
        }

        const env = selectEnvelopes(store.getState()).envs[envId]
        dispatch(setStageEnabled({ env: envId, stage: stageId, enabled }))

        if (stageId === StageId.RELEASE1 && !enabled) {
            dispatch(setLevel({ env: envId, stage: StageId.RELEASE2, value: env.stages[StageId.SUSTAIN].level }))
        }
        midiApi.env.setStageEnabled(source, envId, stageId, enabled)
    },
    toggleStageEnabled: (envId: number, stageId: StageId, source: ApiSource) => {
        const env = selectEnvelopes(store.getState()).envs[envId]
        const stage = env.stages[stageId]
        const enabled = !stage.enabled
        envApi.setStageEnabled(envId, stageId, enabled, source)
    },
    setInvert: (envId: number, invert: boolean, source: ApiSource) => {
        dispatch(setInvert({ env: envId, invert }))
        midiApi.env.setInvert(source, envId, invert)
    },
    toggleInvert: (envId: number, source: ApiSource) => {
        const env = selectEnvelopes(store.getState()).envs[envId]
        const invert = !env.invert
        envApi.setInvert(envId, invert, source)
    },
    setRetrigger: (envId: number, resetOnTrigger: boolean, source: ApiSource) => {
        dispatch(setResetOnTrigger({ env: envId, resetOnTrigger }))
        midiApi.env.setResetOnTrigger(source, envId, resetOnTrigger)
    },
    toggleRetrigger: (envId: number, source: ApiSource) => {
        const env = selectEnvelopes(store.getState()).envs[envId]
        const resetOnTrigger = !env.resetOnTrigger
        envApi.setRetrigger(envId, resetOnTrigger, source)
    },
    setReleaseMode: (envId: number, releaseMode: ReleaseMode, source: ApiSource) => {
        dispatch(setReleaseMode({ env: envId, releaseMode }))
        midiApi.env.setReleaseMode(source, envId, releaseMode)
    },
    toggleReleaseMode: (envId: number, source: ApiSource) => {
        const env = selectEnvelopes(store.getState()).envs[envId]
        const releaseMode = (env.releaseMode + 1) % 3
        envApi.setReleaseMode(envId, releaseMode, source)
    },
    setLoopMode: (envId: number, loopMode: LoopMode, source: ApiSource) => {
        dispatch(setLoopMode({ env: envId, loopMode }))
        midiApi.env.setLoopMode(source, envId, loopMode)
    },
    toggleLoopMode: (envId: number, source: ApiSource) => {
        const env = selectEnvelopes(store.getState()).envs[envId]
        const loopMode = (env.loopMode + 1) % 4
        envApi.setLoopMode(envId, loopMode, source)
    },
    toggleStageSelected: (envId: number, stageId: StageId, source: ApiSource) => {
        const currStageId = selectCurrStageId(store.getState())
        if (currStageId === stageId) {
            dispatch(deselectStage({ env: -1, stage: stageId }))
        } else {
            dispatch(selectStage({ env: -1, stage: stageId }))
        }
    },
    setCurrentEnv: (envId: number, source: ApiSource) => {
        const boundedEnv = getBounded(envId, 0, selectEnvelopes(store.getState()).envs.length - 1)
        if (selectCurrEnvId(store.getState()) !== boundedEnv) {
            dispatch(selectEnv({ env: boundedEnv }))
        }
    },
    incrementCurrentEnvelope: (increment:number, source: ApiSource) => {
        envApi.setCurrentEnv(selectCurrEnvId(store.getState()) + increment, source);
    },
    setStageCurve: (envId: number, stageId: StageId, curve: number, source: ApiSource) => {
        const stage = selectEnvelope(envId)(store.getState()).stages[stageId]
        const boundedCurve = getBounded(curve, 0, curveFuncs.length - 1)
        if (stage.curve !== boundedCurve) {
            dispatch(setCurve({ env: envId, stage: stageId, curve: boundedCurve }))
            midiApi.env.setCurve(source, envId, stageId, curve)
        }
    },
    incrementStageCurve: (envId: number, stageId: StageId, increment: number, source: ApiSource) => {
        const stage = selectEnvelope(envId)(store.getState()).stages[stageId]
        envApi.setStageCurve(envId, stageId, stage.curve + increment, source)
    },
    setMaxLoops: (envId: number, maxLoops: number, source: ApiSource) => {
        const currMaxLoops = selectEnvelope(envId)(store.getState()).maxLoops
        const boundedMaxLoops = getBounded(maxLoops, 2, 128)
        if (boundedMaxLoops !== currMaxLoops) {
            dispatch(setMaxLoops({ env: envId, value: boundedMaxLoops }))
            midiApi.env.setMaxLoops(source, envId, boundedMaxLoops)
        }
    },
    incrementMaxLoops: (envId: number, increment: number, source: ApiSource) => {
        const currMaxLoops = selectEnvelope(envId)(store.getState()).maxLoops
        envApi.setMaxLoops(envId, currMaxLoops + increment, source);
    }

}


