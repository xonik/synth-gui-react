import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'

type SettingsState = {
    midiChannel: number
}

const initialState: SettingsState = {
    midiChannel: 0,
}

type MidiChannelPayload = {
    channel: number;
}

export const uiSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setMidiChannel: (state, {payload}: PayloadAction<MidiChannelPayload>) => {
            state.midiChannel = payload.channel
        },
    }
})

export const selectMidiChannel = (state: RootState) => state.settings.midiChannel

export const {
    setMidiChannel,
} = uiSlice.actions;

export default uiSlice.reducer;