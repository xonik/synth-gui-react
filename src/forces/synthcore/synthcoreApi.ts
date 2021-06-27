import {
    selectEnvelopes,
    setDualLevels,
    setLevel,
    setTime,
    setStageEnabled,
    toggleRetrigger,
    toggleReleaseMode,
    toggleLoopMode,
    setInvert,
    setResetOnTrigger,
    setReleaseMode, setLoopMode, deselectStage, selectStage, selectCurrEnvId, selectCurrStageId, initialState, selectEnv, selectEnvelope, setCurve
} from '../envelope/envelopesReducer'
import { Envelope, StageId } from '../envelope/types'
import { AnyAction, Dispatch, } from '@reduxjs/toolkit'
import { store } from '../store'
import { MainDisplayControllerIds } from './controllers'
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

    setStageTime: (envId: number, stageId: StageId, requestedValue: number) => {
        dispatch(setTime({ env: envId, stage: stageId, value: getBounded(requestedValue) }))
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
        if(selectCurrEnvId(store.getState()) !== envId) {
            dispatch(selectEnv({env: envId}))
        }
    },

    setStageCurve: (envId: number, stageId: StageId, curve: number) => {
        const stage = selectEnvelope(envId)(store.getState()).stages[stageId];
        if(stage.curve !== curve){
            dispatch(setCurve({env: envId, stage: stageId, curve}))
        }
    }

}

const getDiscrete = (value: number, options: number) => {
    let discrete = Math.floor(value * options);
    if(discrete === options) {
        return options - 1;
    } else {
        return discrete;
    }

}

export const mainDisplayApi = {
    handleMainDisplayController: (ctrlId: MainDisplayControllerIds, value: number) => {
        //TODO Check current display page here
        const envId = selectCurrEnvId(store.getState())
        if (ctrlId === MainDisplayControllerIds.POT1) {
            const envCount = initialState.envs.length;
            envApi.setCurrentEnv(getDiscrete(value, envCount))
        } else if (ctrlId === MainDisplayControllerIds.POT2) {
            const stageId = selectCurrStageId(store.getState())
            if(stageId !== StageId.STOPPED) {
                envApi.setStageTime(envId, stageId, value)
            }
        } else if (ctrlId === MainDisplayControllerIds.POT3) {
            const stageId = selectCurrStageId(store.getState())
            if(stageId !== StageId.STOPPED){
                envApi.setStageLevel(envId, stageId, value)
            }
        } else if (ctrlId === MainDisplayControllerIds.POT4) {
            const stageId = selectCurrStageId(store.getState())
            if(stageId !== StageId.STOPPED) {
                const curveCount = curveFuncs.length;
                envApi.setStageCurve(envId, stageId, getDiscrete(value, curveCount))
            }
        } else if (ctrlId === MainDisplayControllerIds.POT5) {

        } else if (ctrlId === MainDisplayControllerIds.POT6) {

        }

    }
}