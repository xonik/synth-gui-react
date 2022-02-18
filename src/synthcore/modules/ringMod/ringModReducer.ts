import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { NumericPayload } from '../common/CommonReducer'

type RingModState = {
    source: number,
}

export const initialState: RingModState = {
    source: 0,
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