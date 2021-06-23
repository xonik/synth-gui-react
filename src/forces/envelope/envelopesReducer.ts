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
        getDefaultEnvelope(0),
        getDefaultEnvelope(1),
        getDefaultEnvelope(2),
    ]

}

type StagePayload = {
    env: number;
    stage: StageId;
}

type NumericPayload = StagePayload & {
    value: number;
}

type DualStageLevelPayload = {
    env: number;
    stage1: StageId;
    stage2: StageId;
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

type ToggleStageActivePayload = StagePayload

type SetInvertPayload = StagePayload & {
    invert: boolean;
}

type EnabledStagePayload = StagePayload & {
    enabled: boolean;
}

const getBounded = (value: number, from: number = 0, to: number = 1) => {
    if(value > to) return to;
    if(value < from) return from;
    return value;
}


const getStage = (state: Draft<any>, payload: StagePayload): Draft<Stage> => {
    return state.envs[payload.env].stages[payload.stage];
}

const getEnv = (state: Draft<any>, payload: StagePayload): Draft<Envelope> => {
    return state.envs[payload.env];
}

export const envelopesSlice = createSlice({
    name: 'envelopes',
    initialState,
    reducers: {
        setLevel: (state, {payload}: PayloadAction<NumericPayload>) => {
            getStage(state, payload).level = payload.value;
        },
        setDualLevels: (state, {payload}: PayloadAction<DualStageLevelPayload>) => {
            state.envs[payload.env].stages[payload.stage1].level = payload.value;
            state.envs[payload.env].stages[payload.stage2].level = payload.value;
        },
        setTime: (state, {payload}: PayloadAction<NumericPayload>) => {
            const stage = getStage(state, payload);
            stage.time = getBounded(payload.value);
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

        setStageEnabled: (state, {payload}: PayloadAction<EnabledStagePayload>) => {
            getStage(state, payload).enabled = payload.enabled;
        },
        setInvert: (state, {payload}: PayloadAction<SetInvertPayload>) => {
            const env = getEnv(state, payload);
            env.invert = payload.invert;
            const resetLevel = payload.invert ? 1 : 0;

            env.stages[StageId.DELAY].level = resetLevel;
            env.stages[StageId.ATTACK].level = resetLevel;
            env.stages[StageId.DECAY1].level = payload.invert ? 0 : 1;
            env.stages[StageId.STOPPED].level = resetLevel;
        },
        toggleStageEnabled: (state, {payload}: PayloadAction<ToggleStageActivePayload>) => {
            // TODO: Make action only, consumed by api
        },
    }
})

export const {
    setLevel,
    setDualLevels,
    setTime,
    setCurve,
    setReleaseMode,
    setResetOnTrigger,
    setLoopMode,
    setMaxLoops,
    toggleStageEnabled,
    setStageEnabled,
} = envelopesSlice.actions;
export const selectEnvelope = (state: RootState) => state.envelopes;
export const selectLevel = (state: RootState, envId: number, stageId: StageId) => state.envelopes.envs[envId].stages[stageId].level;
export const selectTime = (state: RootState, envId: number, stageId: StageId) => state.envelopes.envs[envId].stages[stageId].time;

export default envelopesSlice.reducer;