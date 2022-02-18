import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { NumericPayload } from '../common/CommonReducer'

type NoiseState = {
    colour: number,
}

export const initialState: NoiseState = {
    colour: 0,
}

export const noiseSlice = createSlice({
    name: 'noise',
    initialState,
    reducers: {
        setColour: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.colour = payload.value
        },
    }
})

export const {
    setColour,
} = noiseSlice.actions

export const selectNoise = (state: RootState) => state.noise

export default noiseSlice.reducer