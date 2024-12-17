import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { getVoiceGroupId } from "../../selectedVoiceGroup";

type SettingsState = {
    midiChannel: number
}

type MidiChannelPayload = {
    channel: number;
}

const initialStateCreator = () => ({
    midiChannel: 0,
})

const initialState: SettingsState[] = [
    initialStateCreator(),
    initialStateCreator(),
    initialStateCreator(),
    initialStateCreator(),
    initialStateCreator(),
    initialStateCreator(),
    initialStateCreator(),
    initialStateCreator(),
]

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