import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'

type RingModState = {
    source: number,
}

export const initialState: RingModState = {
    source: 0,
}

export type NumericPayload = {
    value: number;
}

export const ringModSlice = createSlice({
    name: 'ringMod',
    initialState,
    reducers: {
        setSource: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.source = payload.value
        },
    }
})

export const {
    setSource,
} = ringModSlice.actions

export const selectRingMod = (state: RootState) => state.ringMod

export default ringModSlice.reducer