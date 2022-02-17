import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'

type PostMixState = {
    mix: {
        lpfLevel: number,
        svfLevel: number,
        sine1Level: number,
        sine2Level: number,
    },
    out: {
        pan: number,
        amt: number,
        fx1: number,
        fx2: number,
    }
}

export const initialState: PostMixState = {
    mix: {
        lpfLevel: 0,
        svfLevel: 0,
        sine1Level: 0,
        sine2Level: 0,
    },
    out: {
        pan: 0,
        amt: 0,
        fx1: 0,
        fx2: 0,
    }    
}

export type NumericPayload = {
    value: number;
}

export const postMixSlice = createSlice({
    name: 'postMix',
    initialState,
    reducers: {
        setLpfLevel: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.mix.lpfLevel = payload.value
        },
        setSvfLevel: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.mix.svfLevel = payload.value
        },
        setSine1Level: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.mix.sine1Level = payload.value
        },
        setSine2Level: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.mix.sine2Level = payload.value
        },

        setPan: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.out.pan = payload.value
        },
        setAmt: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.out.amt = payload.value
        },
        setFX1: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.out.fx1 = payload.value
        },
        setFX2: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.out.fx2 = payload.value
        },
    }
})

export const {  
    setLpfLevel,
    setSvfLevel,
    setSine1Level,
    setSine2Level,
    setPan,
    setAmt,
    setFX1,
    setFX2,
} = postMixSlice.actions

export const selectPostMixMix = (state: RootState) => state.postMix.mix
export const selectPostMixOut = (state: RootState) => state.postMix.out

export default postMixSlice.reducer