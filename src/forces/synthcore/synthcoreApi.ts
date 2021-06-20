import { selectEnvelope, setDualLevels, setLevel, setTime } from '../envelope/envelopesReducer'
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
    }

}