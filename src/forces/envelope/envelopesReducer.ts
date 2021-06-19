// createSlice
// separate reducer for stage

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Envelope, LoopMode, ReleaseMode, StageId } from './types'
import { getDefaultEnvelope } from './envelopeUtils'
import { RootState } from '../store'
import { curveFuncs } from '../../components/curves/curveCalculator'

type EnvelopesState = Envelope;

const initialState: EnvelopesState = {
    ...getDefaultEnvelope()
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

const getBounded = (value: number, from: number = 0, to: number = 1) => {
    if(value > to) return to;
    if(value < from) return from;
    return value;
}

export const envelopesSlice = createSlice({
    name: 'envelopes',
    initialState,
    reducers: {
        incrementLevel: (state, {payload}: PayloadAction<NumericPayload>) => {
            state.stages[payload.stage].level = getBounded(state.stages[payload.stage].level + payload.value);
        },
        setLevel: (state, {payload}: PayloadAction<NumericPayload>) => {
            console.log('updating level', payload.value);
            state.stages[payload.stage].level = getBounded(payload.value);
        },
        incrementTime: (state, {payload}: PayloadAction<NumericPayload>) => {
            state.stages[payload.stage].time = getBounded(state.stages[payload.stage].time + payload.value);
        },
        setTime: (state, {payload}: PayloadAction<NumericPayload>) => {
            state.stages[payload.stage].time = getBounded(payload.value);
        },
        incrementCurve: (state, {payload}: PayloadAction<CurveIncPayload>) => {
            state.stages[payload.stage].curve = getBounded(state.stages[payload.stage].curve + payload.curveInc);
        },
        setCurve: (state, {payload}: PayloadAction<CurvePayload>) => {
            state.stages[payload.stage].curve = getBounded(payload.curve, 0, curveFuncs.length-1);
        },

        setReleaseMode: (state, {payload}: PayloadAction<ReleaseModePayload>) => {
            state.releaseMode = payload.releaseMode;
        },
        setResetOnTrigger: (state, {payload}: PayloadAction<ResetOnTriggerPayload>) => {
            state.resetOnTrigger = payload.resetOnTrigger;
        },
        setLoopMode: (state, {payload}: PayloadAction<LoopModePayload>) => {
            state.loopMode = payload.loopMode;
        },
        setMaxLoops: (state, {payload}: PayloadAction<NumericPayload>) => {
            state.maxLoops = payload.value
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
export const selectLevel = (state: RootState, envId: number, stageId: StageId) => state.envelopes.stages[stageId].level;
export const selectTime = (state: RootState, stageId: StageId) => state.envelopes.stages[stageId].time;

export default envelopesSlice.reducer;