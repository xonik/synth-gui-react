import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { NumericPayload } from '../common/CommonReducer'

type OutState = {
    volume: number,
    spread: number,
    headphones: number,
}

export const initialState: OutState = {
    volume: 0,
    spread: 0,
    headphones: 0,
}

export const outSlice = createSlice({
    name: 'out',
    initialState,
    reducers: {
        setVolume: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.volume = payload.value
        },
        setSpread: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.spread = payload.value
        },
        setHeadphones: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.headphones = payload.value
        },
    }
})

export const {
    setVolume,
    setSpread,
    setHeadphones,
} = outSlice.actions

export const selectOut = (state: RootState) => state.out

export default outSlice.reducer