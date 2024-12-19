import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StageId } from './types'
import { RootState } from '../../store'
import { NumericPayload } from '../common/types'
import { Curve } from '../../generatedTypes'
import { getVoiceGroupId, selectedVoiceGroup } from "../../selectedVoiceGroup";
import { VOICE_GROUPS } from "../../../utils/constants";

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

export const initialState = (() => {
    const state: LfosState[] = []
    for (let i = 0; i < VOICE_GROUPS; i++) {
        state.push(initialStateCreator())
    }
    return state
})()


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
            state[getVoiceGroupId()].gui.currStageId = payload.stage
        },
        deselectStage: (state, { payload }: PayloadAction<StagePayload>) => {
            state[getVoiceGroupId()].gui.currStageId = StageId.STOPPED
        },
        setGuiLfo: (state, { payload }: PayloadAction<LfoPayload>) => {
            state[getVoiceGroupId()].gui.currLfoId = payload.lfo
        },
        setUiLfo: (state, { payload }: PayloadAction<NumericPayload>) => {
            state[getVoiceGroupId()].ui.currLfoId = payload.value
        },
        setCurrDelayLevel: (state, { payload }: PayloadAction<NumericPayload>) => {
            state[getVoiceGroupId()].gui.currDelayLevel = payload.value
        },

        // actions only consumed by api
        toggleStageSelected: (state, { payload }: PayloadAction<StagePayload>) => {
        },

        setCustomShapeParams: (state, { payload }: PayloadAction<CustomShapeParamsPayload>) => {
            state[getVoiceGroupId()].misc.customShapeParams[payload.lfoId] = payload.params
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
export const selectCurrGuiStageId = (state: RootState) => state.lfos[getVoiceGroupId()].gui.currStageId
export const selectCurrGuiLfoId = (state: RootState) => state.lfos[getVoiceGroupId()].gui.currLfoId
export const selectCurrGuiDelayLevel = (state: RootState) => state.lfos[getVoiceGroupId()].gui.currDelayLevel
export const selectCurrUiLfoId = (state: RootState) => state.lfos[getVoiceGroupId()].ui.currLfoId
export const selectCustomShapeParams = (state: RootState) => (lfoId: number) => state.lfos[getVoiceGroupId()].misc.customShapeParams[lfoId]

export default lfosSlice.reducer