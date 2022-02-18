import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { NumericPayload } from '../common/CommonReducer'

type FiltersState = {
    lpf: {
        input: number
        drive: number
        resonance: number
        cutoff: number
        fmAmt: number
        envAmt: number
        lfoAmt: number
        kbdAmt: number
        extCv: number
        wheel: number
        slope: number
    },
    filters: {
        linkCutoff: number
        routing: number
    },
    svf: {
        input: number
        drive: number
        resonance: number
        cutoff: number
        fmAmt: number
        envAmt: number
        lfoAmt: number
        kbdAmt: number
        extCv: number
        wheel: number
        slope: number
    }
}

export const initialState: FiltersState = {
    lpf: {
        input: 0,
        drive: 0,
        resonance: 0,
        cutoff: 0,
        fmAmt: 0,
        envAmt: 0,
        lfoAmt: 0,
        kbdAmt: 0,
        extCv: 0,
        wheel: 0,
        slope: 0,
    },
    filters: {
        linkCutoff: 0,
        routing: 0,
    },
    svf: {
        input: 0,
        drive: 0,
        resonance: 0,
        cutoff: 0,
        fmAmt: 0,
        envAmt: 0,
        lfoAmt: 0,
        kbdAmt: 0,
        extCv: 0,
        wheel: 0,
        slope: 0,
    }
}

export const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        // LPF
        setLpfInput: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.lpf.input = payload.value
        },
        setLpfDrive: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.lpf.drive = payload.value
        },
        setLpfResonance: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.lpf.resonance = payload.value
        },
        setLpfCutoff: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.lpf.cutoff = payload.value
        },
        setLpfFmAmt: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.lpf.fmAmt = payload.value
        },
        setLpfEnvAmt: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.lpf.envAmt = payload.value
        },
        setLpfLfoAmt: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.lpf.lfoAmt = payload.value
        },
        setLpfKbdAmt: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.lpf.kbdAmt = payload.value
        },
        setLpfExtCv: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.lpf.extCv = payload.value
        },
        setLpfWheel: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.lpf.wheel = payload.value
        },
        setLpfSlope: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.lpf.slope = payload.value
        },

        // BOTH FILTERS
        setFiltersLinkCutoff: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.filters.linkCutoff = payload.value
        },
        setFiltersRouting: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.filters.routing = payload.value
        },
        
        // SVF
        setSvfInput: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.svf.input = payload.value
        },
        setSvfDrive: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.svf.drive = payload.value
        },
        setSvfResonance: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.svf.resonance = payload.value
        },
        setSvfCutoff: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.svf.cutoff = payload.value
        },
        setSvfFmAmt: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.svf.fmAmt = payload.value
        },
        setSvfEnvAmt: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.svf.envAmt = payload.value
        },
        setSvfLfoAmt: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.svf.lfoAmt = payload.value
        },
        setSvfKbdAmt: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.svf.kbdAmt = payload.value
        },
        setSvfExtCv: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.svf.extCv = payload.value
        },
        setSvfWheel: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.svf.wheel = payload.value
        },
        setSvfSlope: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.svf.slope = payload.value
        },
    }
})

export const {
    setLpfInput,
    setLpfDrive,
    setLpfResonance,
    setLpfCutoff,
    setLpfFmAmt,
    setLpfEnvAmt,
    setLpfLfoAmt,
    setLpfKbdAmt,
    setLpfExtCv,
    setLpfWheel,
    setLpfSlope,

    // BOTH FILTERS
    setFiltersLinkCutoff,
    setFiltersRouting,

    // SVF
    setSvfInput,
    setSvfDrive,
    setSvfResonance,
    setSvfCutoff,
    setSvfFmAmt,
    setSvfEnvAmt,
    setSvfLfoAmt,
    setSvfKbdAmt,
    setSvfExtCv,
    setSvfWheel,
    setSvfSlope,

} = filtersSlice.actions

export const selectLpf = (state: RootState) => state.filters.lpf
export const selectFilters = (state: RootState) => state.filters.filters
export const selectSvf = (state: RootState) => state.filters.svf

export default filtersSlice.reducer