import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StageId } from './types'
import { RootState } from '../../store'
import { selectedVoiceGroup } from "../../selectedVoiceGroup";

type EnvelopesState = {
    gui: {
        currEnvId: number;
        currStageId: StageId;
    }
}

type StagePayload = {
    env: number;
    stage: StageId;
}

type EnvPayload = {
    env: number;
}

 const initialStateCreator = () => ({
    gui: {
        currEnvId: 0,
        currStageId: StageId.STOPPED,
    },
})

export const initialState: EnvelopesState[] = [
    initialStateCreator(),
    initialStateCreator(),
    initialStateCreator(),
    initialStateCreator(),
    initialStateCreator(),
    initialStateCreator(),
    initialStateCreator(),
    initialStateCreator(),
]

export const envelopesSlice = createSlice({
    name: 'envelopes',
    initialState,
    reducers: {
        selectStage: (state, { payload }: PayloadAction<StagePayload>) => {
            state[selectedVoiceGroup].gui.currStageId = payload.stage
        },
        deselectStage: (state, { payload }: PayloadAction<StagePayload>) => {
            state[selectedVoiceGroup].gui.currStageId = StageId.STOPPED
        },
        selectGuiEnv: (state, { payload }: PayloadAction<EnvPayload>) => {
            state[selectedVoiceGroup].gui.currEnvId = payload.env
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

export const selectCurrStageId = (state: RootState) => state.envelopes[selectedVoiceGroup].gui.currStageId
export const selectCurrEnvId = (state: RootState) => state.envelopes[selectedVoiceGroup].gui.currEnvId

export default envelopesSlice.reducer