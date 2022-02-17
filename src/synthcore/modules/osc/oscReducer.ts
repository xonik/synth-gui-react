import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'

type OscState = {
    dco1: {
        note: number,
        waveform: number,
        sub1Level: number,
        sub2Level: number,
        pw: number,
        subWave: number,
        sync: number,
        mode: number,
        wheel: number,
        lfo: number,
        kbd: number
    };
    dco2: {
        note: number,
        detune: number,
        waveform: number,
        sub1Level: number,
        sub2Level: number,
        pw: number,
        subWave: number,
        mode: number,
        wheel : number,
        lfo: number,
        kbd: number
    };
    vco: {
        note: number,
        detune: number,
        waveform: number,
        pw: number,
        crossMod: number,
        sync: number,
        crossModSrc: number
        mode: number,
        extCv: number,
        wheel: number,
        lfo: number,
        kbd: number
    };
}

export const initialState: OscState = {
    dco1: {
        note: 63,
        waveform: 0,
        sub1Level: 0,
        sub2Level: 0,
        pw: 0,
        subWave: 0,
        sync: 0,
        mode: 0,
        wheel : 0,
        lfo: 0,
        kbd: 0        
    },
    dco2: {
        note: 63,
        detune: 63,
        waveform: 0,
        sub1Level: 0,
        sub2Level: 0,
        pw: 0,
        subWave: 0,
        mode: 0,
        wheel : 0,
        lfo: 0,
        kbd: 0
    },
    vco: {
        note: 63,
        detune: 63,
        waveform: 0,
        pw: 0,
        crossMod: 0,
        sync: 0,
        crossModSrc: 0,
        mode: 0,
        extCv : 0,
        wheel : 0,
        lfo: 0,
        kbd: 0
    },
}

export type NumericPayload = {
    value: number;
}

export const oscSlice = createSlice({
    name: 'osc',
    initialState,
    reducers: {
        // DCO 1
        setDco1Note: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.dco1.note = payload.value
        },
        setDco1Waveform: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.dco1.waveform = payload.value
        },
        setDco1Sub1Level: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.dco1.sub1Level = payload.value
        },
        setDco1Sub2Level: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.dco1.sub2Level = payload.value
        },
        setDco1Pw: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.dco1.pw = payload.value
        },
        setDco1SubWave: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.dco1.subWave = payload.value
        },
        setDco1Sync: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.dco1.sync = payload.value
        },
        setDco1Mode: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.dco1.mode = payload.value
        },
        setDco1Wheel: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.dco1.wheel = payload.value
        },
        setDco1Lfo: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.dco1.lfo = payload.value
        },
        setDco1Kbd: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.dco1.kbd = payload.value
        },

        // DCO 2
        setDco2Note: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.dco2.note = payload.value
        },
        setDco2Detune: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.dco2.detune = payload.value
        },
        setDco2Waveform: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.dco2.waveform = payload.value
        },
        setDco2Sub1Level: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.dco2.sub1Level = payload.value
        },
        setDco2Sub2Level: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.dco2.sub2Level = payload.value
        },
        setDco2Pw: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.dco2.pw = payload.value
        },
        setDco2SubWave: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.dco2.subWave = payload.value
        },
        setDco2Mode: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.dco2.mode = payload.value
        },
        setDco2Wheel: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.dco2.wheel = payload.value
        },
        setDco2Lfo: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.dco2.lfo = payload.value
        },
        setDco2Kbd: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.dco2.kbd = payload.value
        },        

        // VCO
        setVcoNote: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.vco.note = payload.value
        },
        setVcoDetune: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.vco.detune = payload.value
        },
        setVcoWaveform: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.vco.waveform = payload.value
        },
        setVcoCrossMod: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.vco.crossMod = payload.value
        },
        setVcoPw: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.vco.pw = payload.value
        },
        setVcoSync: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.vco.sync = payload.value
        },
        setVcoCrossModSrc: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.vco.crossModSrc = payload.value
        },
        setVcoMode: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.vco.mode = payload.value
        },
        setVcoExtCv: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.vco.extCv = payload.value
        },
        setVcoWheel: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.vco.wheel = payload.value
        },
        setVcoLfo: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.vco.lfo = payload.value
        },
        setVcoKbd: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.vco.kbd = payload.value
        },
    }
})

export const {
    setDco1Note,
    setDco1Waveform,
    setDco1Sub1Level,
    setDco1Sub2Level,
    setDco1Pw,
    setDco1Sync,
    setDco1SubWave,
    setDco1Mode,
    setDco1Wheel,
    setDco1Lfo,
    setDco1Kbd,
    
    setDco2Note,
    setDco2Detune,
    setDco2Waveform,
    setDco2Sub1Level,
    setDco2Sub2Level,
    setDco2Pw,
    setDco2SubWave,
    setDco2Mode,
    setDco2Wheel,
    setDco2Lfo,
    setDco2Kbd,

    setVcoNote,
    setVcoDetune,
    setVcoWaveform,
    setVcoCrossMod,
    setVcoPw,
    setVcoSync,
    setVcoCrossModSrc,
    setVcoExtCv,
    setVcoMode,
    setVcoWheel,
    setVcoLfo,
    setVcoKbd,

} = oscSlice.actions

export const selectDco1 = (state: RootState) => state.osc.dco1
export const selectDco2 = (state: RootState) => state.osc.dco2
export const selectVco = (state: RootState) => state.osc.vco

export default oscSlice.reducer