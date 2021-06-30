import {
    selectEnvelopes,
    setDualLevels,
    setLevel,
    setTime,
    setStageEnabled,
    setInvert,
    setResetOnTrigger,
    setReleaseMode, setLoopMode, deselectStage, selectStage, selectCurrEnvId, selectCurrStageId, selectEnv, selectEnvelope, setCurve, setMaxLoops
} from '../envelope/envelopesReducer'
import { Envelope, StageId } from '../envelope/types'
import { AnyAction, Dispatch, } from '@reduxjs/toolkit'
import { store } from '../store'
import { curveFuncs } from '../../components/curves/curveCalculator'

let storeDispatch: Dispatch | undefined

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

const cannotDisableStage = (stage: StageId) => stage === StageId.ATTACK || stage === StageId.RELEASE2

export const envApi = {

    // requestedValue is always 0-1 while store value is -1 to 1 if bipolar
    setStageLevel: (envId: number, stageId: StageId, requestedValue: number) => {
        const env = selectEnvelopes(store.getState()).envs[envId]
        const r1enabled = env.stages[StageId.RELEASE1].enabled
        if (
            stageId === StageId.DECAY2 ||
            stageId === StageId.SUSTAIN ||
            (stageId === StageId.RELEASE2 && r1enabled)
        ) {
            let value = getBounded(requestedValue)
            if (env.bipolar) {
                value = value * 2 - 1
            }

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
        }
    },

    incrementStageLevel: (envId: number, stageId: StageId, incLevel: number) => {
        const env = selectEnvelopes(store.getState()).envs[envId]
        let currentLevel = selectEnvelope(envId)(store.getState()).stages[stageId].level
        if (env.bipolar) {
            currentLevel = (currentLevel + 1) / 2
        }
        envApi.setStageLevel(envId, stageId, currentLevel + incLevel)
    },

    setStageTime: (envId: number, stageId: StageId, requestedValue: number) => {
        dispatch(setTime({ env: envId, stage: stageId, value: getBounded(requestedValue) }))
    },

    incrementStageTime: (envId: number, stageId: StageId, incTime: number) => {
        const currentTime = selectEnvelope(envId)(store.getState()).stages[stageId].time
        envApi.setStageTime(envId, stageId, currentTime + incTime)
    },

    toggleStageEnabled: (envId: number, stageId: StageId) => {
        if (cannotDisableStage(stageId)) {
            return
        }

        const env = selectEnvelopes(store.getState()).envs[envId]
        const stage = env.stages[stageId]
        const enabled = !stage.enabled
        dispatch(setStageEnabled({ env: envId, stage: stageId, enabled }))

        if (stageId === StageId.RELEASE1 && !enabled) {
            dispatch(setLevel({ env: envId, stage: StageId.RELEASE2, value: env.stages[StageId.SUSTAIN].level }))
        }
    },
    toggleInvert: (envId: number) => {
        const env = selectEnvelopes(store.getState()).envs[envId]
        dispatch(setInvert({ env: envId, invert: !env.invert }))
    },
    toggleRetrigger: (envId: number) => {
        const env = selectEnvelopes(store.getState()).envs[envId]
        dispatch(setResetOnTrigger({ env: envId, resetOnTrigger: !env.resetOnTrigger }))
    },
    toggleReleaseMode: (envId: number) => {
        const env = selectEnvelopes(store.getState()).envs[envId]
        const releaseMode = (env.releaseMode + 1) % 3
        dispatch(setReleaseMode({ env: envId, releaseMode }))
    },
    toggleLoopMode: (envId: number) => {
        const env = selectEnvelopes(store.getState()).envs[envId]
        const loopMode = (env.loopMode + 1) % 4
        dispatch(setLoopMode({ env: envId, loopMode }))
    },
    toggleStageSelected: (envId: number, stageId: StageId) => {
        const currStageId = selectCurrStageId(store.getState())
        if (currStageId === stageId) {
            dispatch(deselectStage({ env: -1, stage: stageId }))
        } else {
            dispatch(selectStage({ env: -1, stage: stageId }))
        }
    },
    setCurrentEnv: (envId: number) => {
        const boundedEnv = getBounded(envId, 0, selectEnvelopes(store.getState()).envs.length - 1)
        if (selectCurrEnvId(store.getState()) !== boundedEnv) {
            dispatch(selectEnv({ env: boundedEnv }))
        }
    },
    incrementCurrentEnvelope: (increment:number) => {
        envApi.setCurrentEnv(selectCurrEnvId(store.getState()) + increment);
    },
    setStageCurve: (envId: number, stageId: StageId, curve: number) => {
        const stage = selectEnvelope(envId)(store.getState()).stages[stageId]
        const boundedCurve = getBounded(curve, 0, curveFuncs.length - 1)
        if (stage.curve !== boundedCurve) {
            dispatch(setCurve({ env: envId, stage: stageId, curve: boundedCurve }))
        }
    },
    incrementStageCurve: (envId: number, stageId: StageId, increment: number) => {
        const stage = selectEnvelope(envId)(store.getState()).stages[stageId]
        envApi.setStageCurve(envId, stageId, stage.curve + increment)
    },
    setMaxLoops: (envId: number, maxLoops: number) => {
        const currMaxLoops = selectEnvelope(envId)(store.getState()).maxLoops
        const boundedMaxLoops = getBounded(maxLoops, 2, 256)
        if (boundedMaxLoops !== currMaxLoops) {
            dispatch(setMaxLoops({ env: envId, value: boundedMaxLoops }))
        }
    },
    incrementMaxLoops: (envId: number, increment: number) => {
        const currMaxLoops = selectEnvelope(envId)(store.getState()).maxLoops
        envApi.setMaxLoops(envId, currMaxLoops + increment);
    }

}
