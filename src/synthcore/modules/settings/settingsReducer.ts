import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { getVoiceGroupId } from "../../selectedVoiceGroup";
import { VOICE_GROUPS } from "../../../utils/constants";

type SettingsState = {
    midiChannel: number
}

type MidiChannelPayload = {
    channel: number;
}

const initialStateCreator = () => ({
    midiChannel: 0,
})

export const initialState = (() => {
    const state: SettingsState[] = []
    for (let i = 0; i < VOICE_GROUPS; i++) {
        state.push(initialStateCreator())
    }
    return state
})()



export const uiSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setMidiChannel: (state, {payload}: PayloadAction<MidiChannelPayload>) => {
            state[getVoiceGroupId()].midiChannel = payload.channel
        },
    }
})

export const selectMidiChannel = (state: RootState) => state.settings[getVoiceGroupId()].midiChannel

export const {
    setMidiChannel,
} = uiSlice.actions;

export default uiSlice.reducer;