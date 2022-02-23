import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StageId } from './types'
import { RootState } from '../../store'

type EnvelopesState = {
    gui: {
        currEnvId: number;
        currStageId: StageId;
    }
}

export const initialState: EnvelopesState = {
    gui: {
        currEnvId: 0,
        currStageId: StageId.STOPPED,
    },
}

type StagePayload = {
    env: number;
    stage: StageId;
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

export default envelopesSlice.reducer