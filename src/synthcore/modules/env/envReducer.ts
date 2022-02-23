import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Stage, StageId } from './types'
import { RootState } from '../../store'
import { getDefaultShadowStages } from './envUtils'

type EnvelopesState = {
    gui: {
        currEnvId: number;
        currStageId: StageId;
    }
    ui: {

        // These are used to show a different value on pots/curve
        // than what is actually stored/sent - to allow different
        // pot resonse curves to cover a greater range.
        shadowStages: {
            [envId: number]: Stage[]
        }
    }
}

export const initialState: EnvelopesState = {
    gui: {
        currEnvId: 0,
        currStageId: StageId.STOPPED,
    },
    ui: {
        shadowStages: {
            0: getDefaultShadowStages(0),
            1: getDefaultShadowStages(1),
            2: getDefaultShadowStages(2),
            3: getDefaultShadowStages(3),
            4: getDefaultShadowStages(4),
        }
    }
}

type StagePayload = {
    env: number;
    stage: StageId;
}

type StageValuePayload = StagePayload & {
    value: number
}

type EnvPayload = {
    env: number;
}

export const envelopesSlice = createSlice({
    name: 'envelopes',
    initialState,
    reducers: {
        selectStage: (state, { payload }: PayloadAction<StagePayload>) => {
            state.gui.currStageId = payload.stage
        },
        deselectStage: (state, { payload }: PayloadAction<StagePayload>) => {
            state.gui.currStageId = StageId.STOPPED
        },
        selectGuiEnv: (state, { payload }: PayloadAction<EnvPayload>) => {
            state.gui.currEnvId = payload.env
        },
        setStageTime: (state, { payload }: PayloadAction<StageValuePayload>) => {
            //state.ui.shadowStages[payload.env][payload.stage] = payload.value
        },
        setStageLevel: (state, { payload }: PayloadAction<StageValuePayload>) => {
            //state.ui.shadowStages[payload.env][payload.stage] = payload.value
        },

        // actions only consumed by api
        toggleStageSelected: (state, { payload }: PayloadAction<StagePayload>) => {
        },
    }
})

export const {
    selectStage,
    deselectStage,
    selectGuiEnv,
    toggleStageSelected,
} = envelopesSlice.actions

export const selectCurrStageId = (state: RootState) => state.envelopes.gui.currStageId
export const selectCurrEnvId = (state: RootState) => state.envelopes.gui.currEnvId
export const selectShadowStage = (envId: number, stageId: number) => (state: RootState) => state.envelopes.ui.shadowStages[envId][stageId]

export default envelopesSlice.reducer