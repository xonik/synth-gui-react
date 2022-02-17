import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'

type CommonFxState = {
    dsp1: {
        param1: number,
        param2: number,
        param3: number,
        effect: number,
        source: number,
    },
    dsp2: {
        param1: number,
        param2: number,
        param3: number,
        effect: number,
        source: number,
        chain: number,
    },
    chorus: {
        rate: number,
        depth: number,
        source: number,
        mode: number,
    },
    bitCrusher: {
        bits: number,
        rate: number,
        source: number,
    },
    mix: {
        levelDsp1: number,
        levelDsp2: number,
        levelChorus: number,
        levelBitCrusher: number,
    }
}

export const initialState: CommonFxState = {
    dsp1: {
        param1: 0,
        param2: 0,
        param3: 0,
        effect: 0,
        source: 0,
    },
    dsp2: {
        param1: 0,
        param2: 0,
        param3: 0,
        effect: 0,
        source: 0,
        chain: 0,
    },
    chorus: {
        rate: 0,
        depth: 0,
        source: 0,
        mode: 0,
    },
    bitCrusher: {
        bits: 0,
        rate: 0,
        source: 0,
    },
    mix: {
        levelDsp1: 0,
        levelDsp2: 0,
        levelChorus: 0,
        levelBitCrusher: 0,
    }
}

export type NumericPayload = {
    value: number;
}

export const commonFxSlice = createSlice({
    name: 'commonFx',
    initialState,
    reducers: {
        setDsp1Param1: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.dsp1.param1 = payload.value
        },
        setDsp1Param2: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.dsp1.param2 = payload.value
        },
        setDsp1Param3: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.dsp1.param3 = payload.value
        },
        setDsp1Effect: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.dsp1.effect = payload.value
        },
        setDsp1Source: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.dsp1.source = payload.value
        },

        setDsp2Param1: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.dsp2.param1 = payload.value
        },
        setDsp2Param2: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.dsp2.param2 = payload.value
        },
        setDsp2Param3: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.dsp2.param3 = payload.value
        },
        setDsp2Effect: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.dsp2.effect = payload.value
        },
        setDsp2Source: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.dsp2.source = payload.value
        },
        setDsp2Chain: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.dsp2.chain = payload.value
        },

        setChorusRate: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.chorus.rate = payload.value
        },
        setChorusDepth: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.chorus.depth = payload.value
        },
        setChorusSource: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.chorus.source = payload.value
        },
        setChorusMode: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.chorus.mode = payload.value
        },

        setBitCrusherBits: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.bitCrusher.bits = payload.value
        },
        setBitCrusherRate: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.bitCrusher.rate = payload.value
        },
        setBitCrusherSource: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.bitCrusher.source = payload.value
        },

        setLevelDsp1: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.mix.levelDsp1 = payload.value
        },
        setLevelDsp2: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.mix.levelDsp2 = payload.value
        },
        setLevelChorus: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.mix.levelChorus = payload.value
        },
        setLevelBitCrusher: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.mix.levelBitCrusher = payload.value
        },
    }
})

export const {
    setDsp1Param1,
    setDsp1Param2,
    setDsp1Param3,
    setDsp1Effect,
    setDsp1Source,

    setDsp2Param1,
    setDsp2Param2,
    setDsp2Param3,
    setDsp2Effect,
    setDsp2Source,
    setDsp2Chain,

    setChorusRate,
    setChorusDepth,
    setChorusSource,
    setChorusMode,

    setBitCrusherBits,
    setBitCrusherRate,
    setBitCrusherSource,

    setLevelDsp1,
    setLevelDsp2,
    setLevelChorus,
    setLevelBitCrusher,
} = commonFxSlice.actions

export const selectDsp1 = (state: RootState) => state.commonFx.dsp1
export const selectDsp2 = (state: RootState) => state.commonFx.dsp2
export const selectChorus = (state: RootState) => state.commonFx.chorus
export const selectBitCrusher = (state: RootState) => state.commonFx.bitCrusher
export const selectMix = (state: RootState) => state.commonFx.mix

export default commonFxSlice.reducer