import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StageId } from './types'
import { RootState } from '../../store'
import { getVoiceGroupIndex } from "../../selectedVoiceGroup";
import { VOICE_GROUPS } from "../../../utils/constants";

type EnvelopesState = {
    gui: {
        currEnvId: number;
        currStageId: StageId;
    }
}

type StagePayload = {
    voiceGroupIndex: number;
    env: number;
    stage: StageId;
}

type EnvPayload = {
    voiceGroupIndex: number;
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
            state[payload.voiceGroupIndex].gui.currStageId = payload.stage
        },
        deselectStage: (state, { payload }: PayloadAction<StagePayload>) => {
            state[payload.voiceGroupIndex].gui.currStageId = StageId.STOPPED
        },
        selectGuiEnv: (state, { payload }: PayloadAction<EnvPayload>) => {
            state[payload.voiceGroupIndex].gui.currEnvId = payload.env
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

export const selectCurrStageId = (state: RootState, voiceGroupIndex = getVoiceGroupIndex()) => state.envelopes[voiceGroupIndex].gui.currStageId
export const selectCurrEnvId = (state: RootState, voiceGroupIndex = getVoiceGroupIndex()) => state.envelopes[voiceGroupIndex].gui.currEnvId

export default envelopesSlice.reducer