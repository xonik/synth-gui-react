import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StageId } from './types'
import { RootState } from '../../store'
import { NumericPayload } from '../common/types'
import { Curve } from '../../generatedTypes'

type CustomParams = {
    decayEnabled: boolean;
    decayCurve: number;
    attackCurve: number;
}

const getDefaultCustomShapeParams = () => ({
    decayEnabled: true,
    decayCurve: Curve.LIN,
    attackCurve: Curve.LIN
})

type LfosState = {
    gui: {
        currLfoId: number;
        currStageId: StageId;
        currDelayLevel: number;
    }
    ui: {
        currLfoId: number;
    }
    misc: {
        customShapeParams: CustomParams[]
    }
}

export const initialState: LfosState = {
    gui: {
        currLfoId: 0,
        currStageId: StageId.STOPPED,
        currDelayLevel: 0,
    },
    ui: {
        currLfoId: 0
    },
    misc: {
        customShapeParams: [
            getDefaultCustomShapeParams(),
            getDefaultCustomShapeParams(),
            getDefaultCustomShapeParams(),
            getDefaultCustomShapeParams(),
        ]
    }
}

type StagePayload = {
    lfo: number;
    stage: StageId;
}

type LfoPayload = {
    lfo: number;
}

type CustomShapeParamsPayload = {
    lfoId: number,
    params: CustomParams
}

export const lfosSlice = createSlice({
    name: 'lfos',
    initialState,
    reducers: {
        selectStage: (state, { payload }: PayloadAction<StagePayload>) => {
            state.gui.currStageId = payload.stage
        },
        deselectStage: (state, { payload }: PayloadAction<StagePayload>) => {
            state.gui.currStageId = StageId.STOPPED
        },
        setGuiLfo: (state, { payload }: PayloadAction<LfoPayload>) => {
            state.gui.currLfoId = payload.lfo
        },
        setUiLfo: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.ui.currLfoId = payload.value
        },
        setCurrDelayLevel: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.gui.currDelayLevel = payload.value
        },

        // actions only consumed by api
        toggleStageSelected: (state, { payload }: PayloadAction<StagePayload>) => {
        },

        setCustomShapeParams: (state, { payload }: PayloadAction<CustomShapeParamsPayload>) => {
            state.misc.customShapeParams[payload.lfoId] = payload.params
        },
    }
})

export const {
    selectStage,
    deselectStage,

    setGuiLfo,
    setUiLfo,
    setCurrDelayLevel,

    toggleStageSelected,
    setCustomShapeParams,

} = lfosSlice.actions

export const selectLfos = (state: RootState) => state.lfos
export const selectCurrGuiStageId = (state: RootState) => state.lfos.gui.currStageId
export const selectCurrGuiLfoId = (state: RootState) => state.lfos.gui.currLfoId
export const selectCurrGuiDelayLevel = (state: RootState) => state.lfos.gui.currDelayLevel
export const selectCurrUiLfoId = (state: RootState) => state.lfos.ui.currLfoId
export const selectCustomShapeParams = (state: RootState) => (lfoId: number) => state.lfos.misc.customShapeParams[lfoId]

export default lfosSlice.reducer