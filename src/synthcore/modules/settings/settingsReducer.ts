import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { VOICE_GROUPS } from "../../../utils/constants";

type VoiceGroupSettingsState = {
    midiChannel: number
}

type SettingsState = {
    globalSettings: {
        midiChannel: number
    }
    voiceGroupSettings: VoiceGroupSettingsState[]
}

type MidiChannelPayload = {
    channel: number;
}

type VoiceGroupMidiChannelPayload = {
    voiceGroupId: number;
    channel: number;
}

const initialVoiceGroupSettingsStateCreator = (midiChannel: number) => ({
    midiChannel,
})

export const initialState = (() => {
    const state: SettingsState = {
        globalSettings: {
            midiChannel: 0
        },
        voiceGroupSettings: []
    }
    for (let i = 0; i < VOICE_GROUPS; i++) {
        state.voiceGroupSettings.push(initialVoiceGroupSettingsStateCreator(i))
    }
    return state
})()


export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setGlobalMidiChannel: (state, { payload }: PayloadAction<MidiChannelPayload>) => {
            state.globalSettings.midiChannel = payload.channel
        },
        setVoiceGroupMidiChannel: (state, { payload }: PayloadAction<VoiceGroupMidiChannelPayload>) => {
            state.voiceGroupSettings[payload.voiceGroupId].midiChannel = payload.channel
        },
    }
})

export const selectVoiceGroupMidiChannel = (state: RootState, voiceGroupId: number) => state.settings.voiceGroupSettings[voiceGroupId].midiChannel
export const selectGlobalMidiChannel = (state: RootState) => state.settings.globalSettings.midiChannel
export const getVoiceGroupIdFromMidiChannel = (state: RootState, midiChannel: number) => {
    return state.settings.voiceGroupSettings.findIndex((group) => group.midiChannel === midiChannel)
}

export const {
    setGlobalMidiChannel,
    setVoiceGroupMidiChannel,
} = settingsSlice.actions;

export default settingsSlice.reducer;