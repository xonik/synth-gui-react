import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StageId } from './types'
import { RootState } from '../../store'
import { getVoiceGroupId } from "../../selectedVoiceGroup";
import { VOICE_GROUPS } from "../../../utils/constants";

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

export const initialState = (() => {
    const state: EnvelopesState[] = []
    for (let i = 0; i < VOICE_GROUPS; i++) {
        state.push(initialStateCreator())
    }
    return state
})()

export const envelopesSlice = createSlice({
    name: 'envelopes',
    initialState,
    reducers: {
        selectStage: (state, { payload }: PayloadAction<StagePayload>) => {
            state[getVoiceGroupId()].gui.currStageId = payload.stage
        },
        deselectStage: (state, { payload }: PayloadAction<StagePayload>) => {
            state[getVoiceGroupId()].gui.currStageId = StageId.STOPPED
        },
        selectGuiEnv: (state, { payload }: PayloadAction<EnvPayload>) => {
            state[getVoiceGroupId()].gui.currEnvId = payload.env
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

export const selectCurrStageId = (state: RootState) => state.envelopes[getVoiceGroupId()].gui.currStageId
export const selectCurrEnvId = (state: RootState) => state.envelopes[getVoiceGroupId()].gui.currEnvId

export default envelopesSlice.reducer