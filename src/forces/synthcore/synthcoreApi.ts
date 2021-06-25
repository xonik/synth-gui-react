import {
    selectEnvelope,
    setDualLevels,
    setLevel,
    setTime,
    setStageEnabled,
    toggleRetrigger,
    toggleReleaseMode,
    toggleLoopMode,
    setInvert,
    setResetOnTrigger,
    setReleaseMode, setLoopMode
} from '../envelope/envelopesReducer'
import { Envelope, StageId } from '../envelope/types'
import { AnyAction, Dispatch, } from '@reduxjs/toolkit'
import { store } from '../store'

let storeDispatch: Dispatch | undefined;

const dispatch = (action: AnyAction) => {
    if(!storeDispatch){
        storeDispatch = store.dispatch
    }
    storeDispatch(action);
}


const getBounded = (value: number, from: number = 0, to: number = 1) => {
    if(value > to) return to;
    if(value < from) return from;
    return value;
}

function updateReleaseLevels(env: Envelope, value: number) {
    if (env.stages[StageId.RELEASE1].enabled) {
        dispatch(setLevel({env: env.id, stage: StageId.RELEASE1, value}))
    } else {
        dispatch(setLevel({env: env.id, stage: StageId.RELEASE2, value}))
    }
}

const cannotDisableStage = (stage: StageId) => stage === StageId.ATTACK || stage === StageId.RELEASE2

export const envApi = {

    setStageLevel: (envId: number, stageId: StageId, requestedValue: number) => {
        const env = selectEnvelope(store.getState()).envs[envId];
        const r1enabled = env.stages[StageId.RELEASE1].enabled;
        if(
            stageId === StageId.DECAY2 ||
            stageId === StageId.SUSTAIN ||
            (stageId === StageId.RELEASE2 && r1enabled)
        ){
            const value = getBounded(requestedValue);

            // sustain level is not used directly. Instead it replaces r1 or r2 level depending on if
            // r1 is enabled or not.
            if(stageId === StageId.SUSTAIN){
                const stage2Id = r1enabled ? StageId.RELEASE1 : StageId.RELEASE2;
                dispatch(setDualLevels({env: env.id, stage1: StageId.SUSTAIN, stage2: stage2Id, value}));
            } else {
                dispatch(setLevel({env: envId, stage: stageId, value}));
            }

            if(stageId === StageId.SUSTAIN) {
                updateReleaseLevels(env, value);
            }
        }
    },

    setStageTime: (envId: number, stageId: StageId, requestedValue: number) => {
        // TODO: env3 may control env 4-6 etc
        dispatch(setTime({env: envId, stage: stageId, value: getBounded(requestedValue)}));
    },

    toggleStageEnabled: (envId: number, stageId: StageId) => {
        if(cannotDisableStage(stageId)){
            return;
        }

        const env = selectEnvelope(store.getState()).envs[envId];
        const stage = env.stages[stageId];
        const enabled = !stage.enabled;
        dispatch(setStageEnabled({env:envId, stage: stageId, enabled}))

        if(stageId === StageId.RELEASE1 && !enabled){
            dispatch(setLevel({env: envId, stage: StageId.RELEASE2, value: env.stages[StageId.SUSTAIN].level}));
        }
    },
    toggleInvert: (envId: number) => {
        const env = selectEnvelope(store.getState()).envs[envId];
        dispatch(setInvert({env: envId, invert: !env.invert}))
    },
    toggleRetrigger: (envId: number) => {
        const env = selectEnvelope(store.getState()).envs[envId];
        dispatch(setResetOnTrigger({env: envId, resetOnTrigger: !env.resetOnTrigger}))
    },
    toggleReleaseMode: (envId: number) => {
        const env = selectEnvelope(store.getState()).envs[envId];
        const releaseMode = (env.releaseMode + 1) % 3;
        dispatch(setReleaseMode({env: envId, releaseMode}))
    },
    toggleLoopMode: (envId: number) => {
        const env = selectEnvelope(store.getState()).envs[envId];
        const loopMode = (env.loopMode + 1) % 4;
        dispatch(setLoopMode({env: envId, loopMode}))
    }

}