import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { NumericPayload } from '../common/CommonReducer'

type KbdState = {
    portamento: number,
    unisonDetune: number,
    hold: number,
    chord: number,
    mode: number,
}

export const initialState: KbdState = {
    portamento: 0,
    unisonDetune: 0,
    hold: 0,
    chord: 0,
    mode: 0,
}

export const kbdSlice = createSlice({
    name: 'kbd',
    initialState,
    reducers: {
        setPortamento: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.portamento = payload.value
        },
        setUnisonDetune: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.unisonDetune = payload.value
        },
        setHold: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.hold = payload.value
        },
        setChord: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.chord = payload.value
        },
        setMode: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.mode = payload.value
        },
    }
})

export const {
    setPortamento,
    setUnisonDetune,
    setHold,
    setChord,
    setMode,
} = kbdSlice.actions

export const selectKbd = (state: RootState) => state.kbd

export default kbdSlice.reducer