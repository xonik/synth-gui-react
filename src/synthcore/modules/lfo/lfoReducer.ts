import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StageId } from './types'
import { RootState } from '../../store'
import { NumericPayload } from '../common/types'
import { Curve } from '../../generatedTypes'
import { selectedVoiceGroup } from "../../selectedVoiceGroup";

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

const initialStateCreator = () => ({
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
})

export const initialState: LfosState[] = [
    initialStateCreator(),
    initialStateCreator(),
    initialStateCreator(),
    initialStateCreator(),
    initialStateCreator(),
    initialStateCreator(),
    initialStateCreator(),
    initialStateCreator(),
]

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
            state[selectedVoiceGroup].gui.currStageId = payload.stage
        },
        deselectStage: (state, { payload }: PayloadAction<StagePayload>) => {
            state[selectedVoiceGroup].gui.currStageId = StageId.STOPPED
        },
        setGuiLfo: (state, { payload }: PayloadAction<LfoPayload>) => {
            state[selectedVoiceGroup].gui.currLfoId = payload.lfo
        },
        setUiLfo: (state, { payload }: PayloadAction<NumericPayload>) => {
            state[selectedVoiceGroup].ui.currLfoId = payload.value
        },
        setCurrDelayLevel: (state, { payload }: PayloadAction<NumericPayload>) => {
            state[selectedVoiceGroup].gui.currDelayLevel = payload.value
        },

        // actions only consumed by api
        toggleStageSelected: (state, { payload }: PayloadAction<StagePayload>) => {
        },

        setCustomShapeParams: (state, { payload }: PayloadAction<CustomShapeParamsPayload>) => {
            state[selectedVoiceGroup].misc.customShapeParams[payload.lfoId] = payload.params
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
export const selectCurrGuiStageId = (state: RootState) => state.lfos[selectedVoiceGroup].gui.currStageId
export const selectCurrGuiLfoId = (state: RootState) => state.lfos[selectedVoiceGroup].gui.currLfoId
export const selectCurrGuiDelayLevel = (state: RootState) => state.lfos[selectedVoiceGroup].gui.currDelayLevel
export const selectCurrUiLfoId = (state: RootState) => state.lfos[selectedVoiceGroup].ui.currLfoId
export const selectCustomShapeParams = (state: RootState) => (lfoId: number) => state.lfos[selectedVoiceGroup].misc.customShapeParams[lfoId]

export default lfosSlice.reducer