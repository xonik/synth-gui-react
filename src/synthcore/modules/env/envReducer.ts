// createSlice
// separate reducer for stage

import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'
import { Envelope, Stage, StageId } from './types'
import { getDefaultEnvelope } from './envUtils'
import { RootState } from '../../store'
import { NumericControllerPayload } from '../common/CommonReducer'
import envControllers from './envControllers'
import { ControllerConfig } from '../../../midi/types'

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

type DualStageLevelPayload = {
    env: number;
    stage1: StageId;
    stage2: StageId;
    value: number;
}

type CurvePayload = StagePayload & {
    curve: number;
}

type EnabledStagePayload = StagePayload & {
    enabled: number;
}

type Env3IdPayload = {
    id: number;
}

const getStage = (state: Draft<any>, payload: StagePayload): Draft<Stage> => {
    return state.envs[payload.env].stages[payload.stage]
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

        setStageEnabled: (state, { payload }: PayloadAction<EnabledStagePayload>) => {
            getStage(state, payload).enabled = payload.enabled
        },

        selectStage: (state, { payload }: PayloadAction<StagePayload>) => {
            state.gui.currStageId = payload.stage
        },
        deselectStage: (state, { payload }: PayloadAction<StagePayload>) => {
            state.gui.currStageId = StageId.STOPPED
        },
        selectGuiEnv: (state, { payload }: PayloadAction<EnvPayload>) => {
            state.gui.currEnvId = payload.env
        },
        setEnv3Id: (state, { payload }: PayloadAction<Env3IdPayload>) => {
            state.ui.env3Id = payload.id
        },

        setEnvController:  (state, { payload }: PayloadAction<NumericControllerPayload>) => {
            const env = state.envs[payload.ctrlIndex || 0]

            // TODO: Not very nice to have this here!
            if(payload.ctrl.id === envControllers(0).INVERT.id) {
                const resetLevel = payload.value ? 1 : 0
                env.stages[StageId.DELAY].level = resetLevel
                env.stages[StageId.ATTACK].level = resetLevel
                env.stages[StageId.DECAY1].level = payload.value ? 0 : 1
                env.stages[StageId.STOPPED].level = resetLevel
            }
            env.controllers[payload.ctrl.id] = payload.value
        },

        // actions only consumed by api
        toggleStageEnabled: (state, { payload }: PayloadAction<StagePayload>) => {
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

    setStageEnabled,
    selectStage,
    deselectStage,
    selectGuiEnv,
    setEnv3Id,

    setEnvController,

    toggleStageEnabled,
    toggleStageSelected,
} = envelopesSlice.actions

export const selectEnvelopes = (state: RootState) => state.envelopes
export const selectEnvelope = (envId: number) => (state: RootState) => state.envelopes.envs[envId]
export const selectLevel = (envId: number, stageId: StageId) => (state: RootState) => state.envelopes.envs[envId].stages[stageId].level
export const selectTime = (envId: number, stageId: StageId) => (state: RootState) => state.envelopes.envs[envId].stages[stageId].time

export const selectCurrStageId = (state: RootState) => state.envelopes.gui.currStageId
export const selectCurrEnvId = (state: RootState) => state.envelopes.gui.currEnvId
export const selectEnv3Id = (state: RootState) => state.envelopes.ui.env3Id

export const selectEnvController = (ctrl: ControllerConfig, ctrlIndex: number) => (state: RootState): number => state.envelopes.envs[ctrlIndex].controllers[ctrl.id] || 0

export default envelopesSlice.reducer