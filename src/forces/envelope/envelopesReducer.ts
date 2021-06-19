// createSlice
// separate reducer for stage

import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'
import { Envelope, LoopMode, ReleaseMode, Stage, StageId } from './types'
import { getDefaultEnvelope } from './envelopeUtils'
import { RootState } from '../store'
import { curveFuncs } from '../../components/curves/curveCalculator'

type EnvelopesState = {
    envs: Envelope[];
}

const initialState: EnvelopesState = {
    envs: [
        getDefaultEnvelope(),
        getDefaultEnvelope(),
        getDefaultEnvelope(),
    ]

}

type StagePayload = {
    env: number;
    stage: StageId;
}

type NumericPayload = StagePayload & {
    value: number;
}

type CurveIncPayload = StagePayload & {
    curveInc: number;
}

type CurvePayload = StagePayload & {
    curve: number;
}

type ReleaseModePayload = StagePayload & {
    releaseMode: ReleaseMode;
}

type ResetOnTriggerPayload = StagePayload & {
    resetOnTrigger: boolean;
}

type LoopModePayload = StagePayload & {
    loopMode: LoopMode;
}

type EnableDisableStagePayload = StagePayload & {
    enabled: boolean;
}

type ToggleStageActivePayload = StagePayload

type SetInvertPayload = StagePayload & {
    invert: boolean;
}

const getBounded = (value: number, from: number = 0, to: number = 1) => {
    if(value > to) return to;
    if(value < from) return from;
    return value;
}

const cannotDisableStage = (stage: StageId) => stage === StageId.ATTACK || stage === StageId.RELEASE2

const getStage = (state: Draft<any>, payload: StagePayload): Draft<Stage> => {
    return state.envs[payload.env].stages[payload.stage];
}

const getEnv = (state: Draft<any>, payload: StagePayload): Draft<Envelope> => {
    return state.envs[payload.env];
}

function updateReleaseLevels(env: Draft<Envelope>) {
    if (env.stages[StageId.RELEASE1].enabled) {
        env.stages[StageId.RELEASE1].level = env.stages[StageId.SUSTAIN].level
    } else {
        env.stages[StageId.RELEASE2].level = env.stages[StageId.SUSTAIN].level
    }
}

export const envelopesSlice = createSlice({
    name: 'envelopes',
    initialState,
    reducers: {
        incrementLevel: (state, {payload}: PayloadAction<NumericPayload>) => {
            const stage = getStage(state, payload);
            stage.level = getBounded(stage.level + payload.value);
        },
        setLevel: (state, {payload}: PayloadAction<NumericPayload>) => {
            const stageId = payload.stage;
            const env = getEnv(state, payload);
            const stage = getStage(state, payload);
            if(
                stageId === StageId.DECAY2 ||
                stageId === StageId.SUSTAIN ||
                (stageId === StageId.RELEASE2 && env.stages[StageId.RELEASE1].enabled)
            ){
                stage.level = getBounded(payload.value);

                // sustain level is not used directly. Instead it replaces r1 or r2 level depending on if
                // r1 is enabled or not.
                if(stageId === StageId.SUSTAIN) {
                    updateReleaseLevels(env)
                }
            }
            stage.level = getBounded(payload.value);
        },
        incrementTime: (state, {payload}: PayloadAction<NumericPayload>) => {
            const stage = getStage(state, payload);
            stage.time = getBounded(stage.time + payload.value);
        },
        setTime: (state, {payload}: PayloadAction<NumericPayload>) => {
            const stage = getStage(state, payload);
            stage.time = getBounded(payload.value);
        },
        incrementCurve: (state, {payload}: PayloadAction<CurveIncPayload>) => {
            const stage = getStage(state, payload);
            stage.curve = getBounded(stage.curve + payload.curveInc, 0, curveFuncs.length - 1);
        },
        setCurve: (state, {payload}: PayloadAction<CurvePayload>) => {
            const stage = getStage(state, payload);
            stage.curve = getBounded(payload.curve, 0, curveFuncs.length - 1);
        },

        setReleaseMode: (state, {payload}: PayloadAction<ReleaseModePayload>) => {
            getEnv(state, payload).releaseMode = payload.releaseMode;
        },
        setResetOnTrigger: (state, {payload}: PayloadAction<ResetOnTriggerPayload>) => {
            getEnv(state, payload).resetOnTrigger = payload.resetOnTrigger;
        },
        setLoopMode: (state, {payload}: PayloadAction<LoopModePayload>) => {
            getEnv(state, payload).loopMode = payload.loopMode;
        },
        setMaxLoops: (state, {payload}: PayloadAction<NumericPayload>) => {
            getEnv(state, payload).maxLoops = payload.value
        },
        enableDisableStage: (state, {payload}: PayloadAction<EnableDisableStagePayload>) => {
            if(cannotDisableStage(payload.stage)){
                return;
            }

            const stage = getStage(state, payload);
            stage.enabled = payload.enabled;
            const env = getEnv(state, payload);
            if(payload.stage === StageId.RELEASE1){
                updateReleaseLevels(env);
            }
        },
        toggleStageActive: (state, {payload}: PayloadAction<ToggleStageActivePayload>) => {
            if(cannotDisableStage(payload.stage)){
                return;
            }
            const stage = getStage(state, payload);
            stage.enabled = !stage.enabled;
        },
        setInvert: (state, {payload}: PayloadAction<SetInvertPayload>) => {
            const env = getEnv(state, payload);
            env.invert = payload.invert;
            const resetLevel = payload.invert ? 1 : 0;

            env.stages[StageId.DELAY].level = resetLevel;
            env.stages[StageId.ATTACK].level = resetLevel;
            env.stages[StageId.DECAY1].level = payload.invert ? 0 : 1;
            env.stages[StageId.STOPPED].level = resetLevel;
        }
    }
})

export const {
    incrementLevel,
    setLevel,
    incrementTime,
    setTime,
    incrementCurve,
    setCurve,
    setReleaseMode,
    setResetOnTrigger,
    setLoopMode,
    setMaxLoops,
} = envelopesSlice.actions;
export const selectEnvelope = (state: RootState) => state.envelopes;
export const selectLevel = (state: RootState, envId: number, stageId: StageId) => state.envelopes.envs[envId].stages[stageId].level;
export const selectTime = (state: RootState, envId: number, stageId: StageId) => state.envelopes.envs[envId].stages[stageId].time;

export default envelopesSlice.reducer;