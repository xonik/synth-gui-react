// createSlice
// separate reducer for stage

import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'
import { Envelope, LoopMode, ReleaseMode, Stage, StageId } from './types'
import { getDefaultEnvelope } from './envUtils'
import { RootState } from '../../store'

type EnvelopesState = {
    envs: Envelope[];
    gui: {
        currEnvId: number;
        currStageId: StageId;
    }
    ui: {
        env3Id: number;
    }
}

export const initialState: EnvelopesState = {
    envs: [
        getDefaultEnvelope(0),
        getDefaultEnvelope(1),
        getDefaultEnvelope(2),
        getDefaultEnvelope(3),
        getDefaultEnvelope(4),
    ],
    gui: {
        currEnvId: 0,
        currStageId: StageId.STOPPED,
    },
    ui: {
        env3Id: 2
    }
}

type StagePayload = {
    env: number;
    stage: StageId;
}

type EnvPayload = {
    env: number;
}

type NumericStagePayload = StagePayload & {
    value: number;
}

type NumericEnvPayload = EnvPayload & {
    value: number;
}

type DualStageLevelPayload = {
    env: number;
    stage1: StageId;
    stage2: StageId;
    value: number;
}

type CurvePayload = StagePayload & {
    curve: number;
}

type ReleaseModePayload = EnvPayload & {
    releaseMode: ReleaseMode;
}

type ResetOnTriggerPayload = EnvPayload & {
    resetOnTrigger: boolean;
}

type LoopModePayload = EnvPayload & {
    loopMode: LoopMode;
}

type LoopEnabledPayload = EnvPayload & {
    enabled: boolean;
}

type SetInvertPayload = EnvPayload & {
    invert: boolean;
}

type EnabledStagePayload = StagePayload & {
    enabled: boolean;
}

type Env3IdPayload = {
    id: number;
}

const getStage = (state: Draft<any>, payload: StagePayload): Draft<Stage> => {
    return state.envs[payload.env].stages[payload.stage]
}

const getEnv = (state: Draft<any>, payload: StagePayload | EnvPayload): Draft<Envelope> => {
    return state.envs[payload.env]
}

export const envelopesSlice = createSlice({
    name: 'envelopes',
    initialState,
    reducers: {
        setLevel: (state, { payload }: PayloadAction<NumericStagePayload>) => {
            getStage(state, payload).level = payload.value
        },
        setDualLevels: (state, { payload }: PayloadAction<DualStageLevelPayload>) => {
            state.envs[payload.env].stages[payload.stage1].level = payload.value
            state.envs[payload.env].stages[payload.stage2].level = payload.value
        },
        setTime: (state, { payload }: PayloadAction<NumericStagePayload>) => {
            getStage(state, payload).time = payload.value
        },
        setCurve: (state, { payload }: PayloadAction<CurvePayload>) => {
            getStage(state, payload).curve = payload.curve
        },

        setReleaseMode: (state, { payload }: PayloadAction<ReleaseModePayload>) => {
            getEnv(state, payload).releaseMode = payload.releaseMode
        },
        setResetOnTrigger: (state, { payload }: PayloadAction<ResetOnTriggerPayload>) => {
            getEnv(state, payload).resetOnTrigger = payload.resetOnTrigger
        },
        setLoopMode: (state, { payload }: PayloadAction<LoopModePayload>) => {
            getEnv(state, payload).loopMode = payload.loopMode
        },
        setLoopEnabled: (state, { payload }: PayloadAction<LoopEnabledPayload>) => {
            getEnv(state, payload).loopEnabled = payload.enabled
        },
        setMaxLoops: (state, { payload }: PayloadAction<NumericEnvPayload>) => {
            getEnv(state, payload).maxLoops = payload.value
        },
        setStageEnabled: (state, { payload }: PayloadAction<EnabledStagePayload>) => {
            getStage(state, payload).enabled = payload.enabled
        },
        setInvert: (state, { payload }: PayloadAction<SetInvertPayload>) => {
            const env = getEnv(state, payload)
            env.invert = payload.invert
            const resetLevel = payload.invert ? 1 : 0

            env.stages[StageId.DELAY].level = resetLevel
            env.stages[StageId.ATTACK].level = resetLevel
            env.stages[StageId.DECAY1].level = payload.invert ? 0 : 1
            env.stages[StageId.STOPPED].level = resetLevel
        },
        selectStage: (state, { payload }: PayloadAction<StagePayload>) => {
            state.gui.currStageId = payload.stage
        },
        deselectStage: (state, { payload }: PayloadAction<StagePayload>) => {
            state.gui.currStageId = StageId.STOPPED
        },
        selectEnv: (state, { payload }: PayloadAction<EnvPayload>) => {
            state.gui.currEnvId = payload.env
        },
        setEnv3Id: (state, { payload }: PayloadAction<Env3IdPayload>) => {
            state.ui.env3Id = payload.id
        },

        // actions only consumed by api
        toggleStageEnabled: (state, { payload }: PayloadAction<StagePayload>) => {
        },
        toggleInvert: (state, { payload }: PayloadAction<EnvPayload>) => {
        },
        toggleRetrigger: (state, { payload }: PayloadAction<EnvPayload>) => {
        },
        toggleReleaseMode: (state, { payload }: PayloadAction<EnvPayload>) => {
        },
        toggleLoopMode: (state, { payload }: PayloadAction<EnvPayload>) => {
        },
        toggleLoopEnabled: (state, { payload }: PayloadAction<EnvPayload>) => {
        },
        toggleStageSelected: (state, { payload }: PayloadAction<StagePayload>) => {
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
    setLoopEnabled,
    setMaxLoops,
    setStageEnabled,
    setInvert,
    selectStage,
    deselectStage,
    selectEnv,
    setEnv3Id,
    toggleStageEnabled,
    toggleInvert,
    toggleRetrigger,
    toggleReleaseMode,
    toggleLoopMode,
    toggleLoopEnabled,
    toggleStageSelected,
} = envelopesSlice.actions

export const selectEnvelopes = (state: RootState) => state.envelopes
export const selectEnvelope = (envId: number) => (state: RootState) => state.envelopes.envs[envId]
export const selectLevel = (envId: number, stageId: StageId) => (state: RootState) => state.envelopes.envs[envId].stages[stageId].level
export const selectTime = (envId: number, stageId: StageId) => (state: RootState) => state.envelopes.envs[envId].stages[stageId].time
export const selectInvert = (envId: number) => (state: RootState) => state.envelopes.envs[envId].invert
export const selectRetrigger = (envId: number) => (state: RootState) => state.envelopes.envs[envId].resetOnTrigger
export const selectReleaseMode = (envId: number) => (state: RootState) => state.envelopes.envs[envId].releaseMode
export const selectLoopMode = (envId: number) => (state: RootState) => state.envelopes.envs[envId].loopMode
export const selectLoopEnabled = (envId: number) => (state: RootState) => state.envelopes.envs[envId].loopEnabled
export const selectCurrStageId = (state: RootState) => state.envelopes.gui.currStageId
export const selectCurrEnvId = (state: RootState) => state.envelopes.gui.currEnvId
export const selectEnv3Id = (state: RootState) => state.envelopes.ui.env3Id

export default envelopesSlice.reducer