import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { getDefaultVoice } from './voicesUtils'
import { Voice } from './types'

type VoicesState = {
    voices: Voice[],
}

export const initialState: VoicesState = {
    voices: [
        getDefaultVoice(0),
        getDefaultVoice(1),
        getDefaultVoice(2),
        getDefaultVoice(3),
        getDefaultVoice(4),
        getDefaultVoice(5),
        getDefaultVoice(6),
        getDefaultVoice(7),
    ]
}

export type VoiceStatePayload = {
    voice: number;
    value: number;
}

export const voicesSlice = createSlice({
    name: 'noise',
    initialState,
    reducers: {
        setVoiceState: (state, { payload }: PayloadAction<VoiceStatePayload>) => {
            state.voices[payload.voice].state = payload.value
        },
    }
})

export const {
    setVoiceState,
} = voicesSlice.actions

export const selectVoices = (state: RootState) => state.voices.voices

export default voicesSlice.reducer