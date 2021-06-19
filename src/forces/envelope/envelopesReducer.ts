// createSlice
// separate reducer for stage

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Envelope, LoopMode, ReleaseMode, StageId } from './types'
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

export const envelopesSlice = createSlice({
    name: 'envelopes',
    initialState,
    reducers: {
        incrementLevel: (state, {payload}: PayloadAction<NumericPayload>) => {
            state.envs[payload.env].stages[payload.stage].level = getBounded(state.envs[payload.env].stages[payload.stage].level + payload.value);
        },
        setLevel: (state, {payload}: PayloadAction<NumericPayload>) => {
            console.log('updating level', payload.value);
            const stage = payload.stage;
            const env = state.envs[payload.env];
            if(
                stage === StageId.DECAY2 ||
                stage === StageId.SUSTAIN ||
                (stage === StageId.RELEASE2 && env.stages[StageId.RELEASE1].enabled)
            ){
                state.envs[payload.env].stages[payload.stage].level = getBounded(payload.value);

                // sustain level is not used directly. Instead it replaces r1 or r2 level depending on if
                // r1 is enabled or not.
                if(stage === StageId.SUSTAIN) {
                    if(env.stages[StageId.RELEASE1].enabled) {
                        state.envs[payload.env].stages[StageId.RELEASE1].level = env.stages[StageId.SUSTAIN].level;
                    } else {
                        state.envs[payload.env].stages[StageId.RELEASE2].level = env.stages[StageId.SUSTAIN].level;
                    }
                }
            }
            state.envs[payload.env].stages[payload.stage].level = getBounded(payload.value);
        },
        incrementTime: (state, {payload}: PayloadAction<NumericPayload>) => {
            state.envs[payload.env].stages[payload.stage].time = getBounded(state.envs[payload.env].stages[payload.stage].time + payload.value);
        },
        setTime: (state, {payload}: PayloadAction<NumericPayload>) => {
            state.envs[payload.env].stages[payload.stage].time = getBounded(payload.value);
        },
        incrementCurve: (state, {payload}: PayloadAction<CurveIncPayload>) => {
            state.envs[payload.env].stages[payload.stage].curve = getBounded(state.envs[payload.env].stages[payload.stage].curve + payload.curveInc);
        },
        setCurve: (state, {payload}: PayloadAction<CurvePayload>) => {
            state.envs[payload.env].stages[payload.stage].curve = getBounded(payload.curve, 0, curveFuncs.length-1);
        },

        setReleaseMode: (state, {payload}: PayloadAction<ReleaseModePayload>) => {
            state.envs[payload.env].releaseMode = payload.releaseMode;
        },
        setResetOnTrigger: (state, {payload}: PayloadAction<ResetOnTriggerPayload>) => {
            state.envs[payload.env].resetOnTrigger = payload.resetOnTrigger;
        },
        setLoopMode: (state, {payload}: PayloadAction<LoopModePayload>) => {
            state.envs[payload.env].loopMode = payload.loopMode;
        },
        setMaxLoops: (state, {payload}: PayloadAction<NumericPayload>) => {
            state.envs[payload.env].maxLoops = payload.value
        },
        enableDisableStage: (state, {payload}: PayloadAction<EnableDisableStagePayload>) => {
            if(cannotDisableStage(payload.stage)){
                return;
            }
            state.envs[payload.env].stages[payload.stage].enabled = payload.enabled;
            if(payload.stage === StageId.RELEASE1){
                const env = state.envs[payload.env];
                if(env.stages[StageId.RELEASE1].enabled) {
                    state.envs[payload.env].stages[StageId.RELEASE1].level = env.stages[StageId.SUSTAIN].level;
                } else {
                    state.envs[payload.env].stages[StageId.RELEASE2].level = env.stages[StageId.SUSTAIN].level;
                }
            }
        },
        toggleStageActive: (state, {payload}: PayloadAction<ToggleStageActivePayload>) => {
            if(cannotDisableStage(payload.stage)){
                return;
            }
            state.envs[payload.env].stages[payload.stage].enabled = !state.envs[payload.env].stages[payload.stage].enabled;
        },
        setInvert: (state, {payload}: PayloadAction<SetInvertPayload>) => {
            state.envs[payload.env].invert = payload.invert;
            const resetLevel = payload.invert ? 1 : 0;

            state.envs[payload.env].stages[StageId.DELAY].level = resetLevel;
            state.envs[payload.env].stages[StageId.ATTACK].level = resetLevel;
            state.envs[payload.env].stages[StageId.DECAY1].level = payload.invert ? 0 : 1;
            state.envs[payload.env].stages[StageId.STOPPED].level = resetLevel;
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