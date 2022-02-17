import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'

type FxState = {
    distortion: {
        drive: number,
        level: number,
        in: number,
        clip: number,
        out: number,
    },
    bitCrusher: {
        bits: number,
        rate: number,
        level: number,
        in: number,
        out: number,
    }
}

export const initialState: FxState = {
    distortion: {
        drive: 0,
        level: 0,
        in: 0,
        clip: 0,
        out: 0,
    },
    bitCrusher: {
        bits: 0,
        rate: 0,
        level: 0,
        in: 0,
        out: 0,
    }
}

export type NumericPayload = {
    value: number;
}

export const fxSlice = createSlice({
    name: 'fx',
    initialState,
    reducers: {
        setDistortionDrive: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.distortion.drive = payload.value
        },
        setDistortionLevel: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.distortion.level = payload.value
        },
        setDistortionIn: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.distortion.in = payload.value
        },
        setDistortionClip: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.distortion.clip = payload.value
        },
        setDistortionOut: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.distortion.out = payload.value
        },
        setBitCrusherBits: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.bitCrusher.bits = payload.value
        },
        setBitCrusherRate: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.bitCrusher.rate = payload.value
        },
        setBitCrusherLevel: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.bitCrusher.level = payload.value
        },
        setBitCrusherIn: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.bitCrusher.in = payload.value
        },
        setBitCrusherOut: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.bitCrusher.out = payload.value
        },
    }
})

export const {
    setDistortionDrive,
    setDistortionLevel,
    setDistortionIn,
    setDistortionClip,
    setDistortionOut,
    setBitCrusherBits,
    setBitCrusherRate,
    setBitCrusherLevel,
    setBitCrusherIn,
    setBitCrusherOut,
} = fxSlice.actions

export const selectDistortion = (state: RootState) => state.fx.distortion
export const selectBitCrusher = (state: RootState) => state.fx.bitCrusher

export default fxSlice.reducer