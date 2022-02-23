// createSlice
// separate reducer for stage

import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'
import { Lfo, Stage, StageId } from './types'
import { getDefaultLfo } from './lfoUtils'
import { RootState } from '../../store'
import { ControllerConfig } from '../../../midi/types'
import { NumericControllerPayload, NumericPayload } from '../common/types'

type LfosState = {

    lfos: Lfo[]
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

        setLfoController:  (state, { payload }: PayloadAction<NumericControllerPayload>) => {
            state.lfos[payload.ctrlIndex || 0].controllers[payload.ctrl.id] = payload.value
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

    setGuiStage,
    unsetGuiStage,
    setGuiLfo,
    setUiLfo,

    setLfoController,

    toggleStageEnabled,
    toggleStageSelected,

} = lfosSlice.actions

export const selectLfos = (state: RootState) => state.lfos
export const selectLfo = (lfoId: number) => (state: RootState) => state.lfos.lfos[lfoId]
export const selectLevel = (lfoId: number, stageId: StageId) => (state: RootState) => state.lfos.lfos[lfoId].stages[stageId].level
export const selectTime = (lfoId: number, stageId: StageId) => (state: RootState) => state.lfos.lfos[lfoId].stages[stageId].time
export const selectGuiStageId = (state: RootState) => state.lfos.gui.stageId
export const selectGuiLfoId = (state: RootState) => state.lfos.gui.lfoId
export const selectUiLfoId = (state: RootState) => state.lfos.ui.lfoId
export const selectUiLfo = (state: RootState) => state.lfos.lfos[state.lfos.ui.lfoId]
export const selectLfoController = (ctrl: ControllerConfig, ctrlIndex: number, valueIndex?: number) => (state: RootState) => state.lfos.lfos[ctrlIndex].controllers[ctrl.id] || 0

export default lfosSlice.reducer