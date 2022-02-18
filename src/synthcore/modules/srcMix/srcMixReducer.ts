import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { NumericPayload } from '../common/CommonReducer'

type SrcMixState = {
    levelOsc1: number
    levelOsc2: number
    levelOsc3: number
    levelNoise: number
    levelRingMod: number
    levelExtAudio: number
    outOsc1: number
    outOsc2: number
    outOsc3: number
    outNoise: number
    outRingMod: number
    outExtAudio: number
}

export const initialState: SrcMixState = {
    levelOsc1: 0,
    levelOsc2: 0,
    levelOsc3: 0,
    levelNoise: 0,
    levelRingMod: 0,
    levelExtAudio: 0,
    outOsc1: 0,
    outOsc2: 0,
    outOsc3: 0,
    outNoise: 0,
    outRingMod: 0,
    outExtAudio: 0,
}

export const srcMixSlice = createSlice({
    name: 'srcMix',
    initialState,
    reducers: {
        setLevelOsc1: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.levelOsc1 = payload.value
        },
        setLevelOsc2: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.levelOsc2 = payload.value
        },
        setLevelOsc3: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.levelOsc3 = payload.value
        },
        setLevelNoise: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.levelNoise = payload.value
        },
        setLevelRingMod: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.levelRingMod = payload.value
        },
        setLevelExtAudio: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.levelExtAudio = payload.value
        },
        setOutOsc1: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.outOsc1 = payload.value
        },
        setOutOsc2: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.outOsc2 = payload.value
        },
        setOutOsc3: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.outOsc3 = payload.value
        },
        setOutNoise: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.outNoise = payload.value
        },
        setOutRingMod: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.outRingMod = payload.value
        },
        setOutExtAudio: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.outExtAudio = payload.value
        },
    }
})

export const {
    setLevelOsc1,
    setLevelOsc2,
    setLevelOsc3,
    setLevelNoise,
    setLevelRingMod,
    setLevelExtAudio,
    setOutOsc1,
    setOutOsc2,
    setOutOsc3,
    setOutNoise,
    setOutRingMod,
    setOutExtAudio,
} = srcMixSlice.actions

export const selectSrcMix = (state: RootState) => state.srcMix

export default srcMixSlice.reducer