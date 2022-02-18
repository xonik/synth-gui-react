// createSlice
// separate reducer for stage

import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'
import { Lfo, Stage, StageId } from './types'
import { getDefaultLfo } from './lfoUtils'
import { RootState } from '../../store'
import { NumericPayload } from '../common/CommonReducer'

type LfosState = {
    lfos: Lfo[];
    gui: {
        lfoId: number;
        stageId: StageId;
    }
    ui: {
        lfoId: number;
    }
}

export const initialState: LfosState = {
    lfos: [
        getDefaultLfo(0),
        getDefaultLfo(1),
        getDefaultLfo(2),
        getDefaultLfo(3),
    ],
    gui: {
        lfoId: 0,
        stageId: StageId.STOPPED,
    },
    ui: {
        lfoId: 2
    }
}

type StagePayload = {
    lfo: number;
    stage: StageId;
}

type LfoPayload = {
    lfo: number;
}

type NumericStagePayload = StagePayload & {
    value: number;
}

export type NumericLfoPayload = LfoPayload & {
    value: number;
}

type DualStageLevelPayload = {
    lfo: number;
    stage1: StageId;
    stage2: StageId;
    value: number;
}

type CurvePayload = StagePayload & {
    curve: number;
}

type EnabledStagePayload = StagePayload & {
    enabled: boolean;
}

const getStage = (state: Draft<any>, payload: StagePayload): Draft<Stage> => {
    return state.lfos[payload.lfo].stages[payload.stage]
}

const getLfo = (state: Draft<any>, payload: StagePayload | LfoPayload | NumericLfoPayload): Draft<Lfo> => {
    return state.lfos[payload.lfo]
}

export const lfosSlice = createSlice({
    name: 'lfos',
    initialState,
    reducers: {
        setLevel: (state, { payload }: PayloadAction<NumericStagePayload>) => {
            getStage(state, payload).level = payload.value
        },
        setDualLevels: (state, { payload }: PayloadAction<DualStageLevelPayload>) => {
            state.lfos[payload.lfo].stages[payload.stage1].level = payload.value
            state.lfos[payload.lfo].stages[payload.stage2].level = payload.value
        },
        setTime: (state, { payload }: PayloadAction<NumericStagePayload>) => {
            getStage(state, payload).time = payload.value
        },
        setCurve: (state, { payload }: PayloadAction<CurvePayload>) => {
            getStage(state, payload).curve = payload.curve
        },

        setStageEnabled: (state, { payload }: PayloadAction<EnabledStagePayload>) => {
            getStage(state, payload).enabled = payload.enabled
        },

        setRate: (state, { payload }: PayloadAction<NumericLfoPayload>) => {
            getLfo(state, payload).rate = payload.value
        },
        setDepth: (state, { payload }: PayloadAction<NumericLfoPayload>) => {
            getLfo(state, payload).depth = payload.value
        },
        setShape: (state, { payload }: PayloadAction<NumericLfoPayload>) => {
            getLfo(state, payload).shape = payload.value
        },
        setSync: (state, { payload }: PayloadAction<NumericLfoPayload>) => {
            getLfo(state, payload).sync = payload.value
        },
        setReset: (state, { payload }: PayloadAction<NumericLfoPayload>) => {
            getLfo(state, payload).resetOnTrigger = payload.value
        },
        setOnce: (state, { payload }: PayloadAction<NumericLfoPayload>) => {
            getLfo(state, payload).once = payload.value
        },

        setGuiStage: (state, { payload }: PayloadAction<StagePayload>) => {
            state.gui.stageId = payload.stage
        },
        unsetGuiStage: (state, { payload }: PayloadAction<StagePayload>) => {
            state.gui.stageId = StageId.STOPPED
        },
        setGuiLfo: (state, { payload }: PayloadAction<LfoPayload>) => {
            state.gui.lfoId = payload.lfo
        },
        setUiLfo: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.ui.lfoId = payload.value
        },

        // actions only consumed by api
        toggleStageEnabled: (state, { payload }: PayloadAction<StagePayload>) => {
        },
        toggleStageSelected: (state, { payload }: PayloadAction<StagePayload>) => {
        },
    }
})

export const {
    setLevel,
    setDualLevels,
    setTime,
    setCurve,
    setStageEnabled,

    setRate,
    setDepth,
    setShape,
    setSync,
    setReset,
    setOnce,

    setGuiStage,
    unsetGuiStage,
    setGuiLfo,
    setUiLfo,

    toggleStageEnabled,
    toggleStageSelected,

} = lfosSlice.actions

export const selectLfos = (state: RootState) => state.lfos
export const selectLfo = (lfoId: number) => (state: RootState) => state.lfos.lfos[lfoId]
export const selectLevel = (lfoId: number, stageId: StageId) => (state: RootState) => state.lfos.lfos[lfoId].stages[stageId].level
export const selectTime = (lfoId: number, stageId: StageId) => (state: RootState) => state.lfos.lfos[lfoId].stages[stageId].time
export const selectRetrigger = (lfoId: number) => (state: RootState) => state.lfos.lfos[lfoId].resetOnTrigger
export const selectGuiStageId = (state: RootState) => state.lfos.gui.stageId
export const selectGuiLfoId = (state: RootState) => state.lfos.gui.lfoId
export const selectUiLfoId = (state: RootState) => state.lfos.ui.lfoId
export const selectUiLfo = (state: RootState) => state.lfos.lfos[state.lfos.ui.lfoId]

export default lfosSlice.reducer