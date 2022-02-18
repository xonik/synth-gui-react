import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { NumericPayload } from '../common/CommonReducer'

type MasterClockState = {
    rate: number,
    source: number,
}

export const initialState: MasterClockState = {
    rate: 0,
    source: 0,
}

export const masterClockSlice = createSlice({
    name: 'masterClock',
    initialState,
    reducers: {
        setRate: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.rate = payload.value
        },
        setSource: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.source = payload.value
        },
    }
})

export const {
    setRate,
    setSource,

} = masterClockSlice.actions

export const selectMasterClock = (state: RootState) => state.masterClock

export default masterClockSlice.reducer