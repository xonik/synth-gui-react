import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { NumericPayload } from '../common/CommonReducer'

type ArpState = {
    tempo: number,
    onOff: number,
    sync: number,
    range: number,
    mode: number,
    trigger: number,
}

export const initialState: ArpState = {
    tempo: 0,
    onOff: 0,
    sync: 0,
    range: 0,
    mode: 0,
    trigger: 0,
}

export const arpSlice = createSlice({
    name: 'arp',
    initialState,
    reducers: {
        setTempo: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.tempo = payload.value
        },
        setOnOff: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.onOff = payload.value
        },
        setSync: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.sync = payload.value
        },
        setRange: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.range = payload.value
        },
        setMode: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.mode = payload.value
        },
        setTrigger: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.trigger = payload.value
        },
    }
})

export const {
    setTempo,
    setOnOff,
    setSync,
    setRange,
    setMode,
    setTrigger,
} = arpSlice.actions

export const selectArp = (state: RootState) => state.arp

export default arpSlice.reducer