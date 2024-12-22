import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StageId } from './types'
import { RootState } from '../../store'
import { NumericPayload } from '../common/types'
import { Curve } from '../../generatedTypes'
import { getVoiceGroupIndex } from "../../selectedVoiceGroup";
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
    voiceGroupIndex: number;
    lfo: number;
    stage: StageId;
}

type LfoPayload = {
    voiceGroupIndex: number;
    lfo: number;
}

type CustomShapeParamsPayload = {
    voiceGroupIndex: number;
    lfoId: number,
    params: CustomParams
}

export const lfosSlice = createSlice({
    name: 'lfos',
    initialState,
    reducers: {
        selectStage: (state, { payload }: PayloadAction<StagePayload>) => {
            state[payload.voiceGroupIndex].gui.currStageId = payload.stage
        },
        deselectStage: (state, { payload }: PayloadAction<StagePayload>) => {
            state[payload.voiceGroupIndex].gui.currStageId = StageId.STOPPED
        },
        setGuiLfo: (state, { payload }: PayloadAction<LfoPayload>) => {
            state[payload.voiceGroupIndex].gui.currLfoId = payload.lfo
        },
        setUiLfo: (state, { payload }: PayloadAction<NumericPayload>) => {
            state[payload.voiceGroupIndex].ui.currLfoId = payload.value
        },
        setCurrDelayLevel: (state, { payload }: PayloadAction<NumericPayload>) => {
            state[payload.voiceGroupIndex].gui.currDelayLevel = payload.value
        },

        // actions only consumed by api
        toggleStageSelected: (state, { payload }: PayloadAction<StagePayload>) => {
        },

        setCustomShapeParams: (state, { payload }: PayloadAction<CustomShapeParamsPayload>) => {
            state[payload.voiceGroupIndex].misc.customShapeParams[payload.lfoId] = payload.params
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
export const selectCurrGuiStageId = (state: RootState, voiceGroupIndex = getVoiceGroupIndex()) => state.lfos[voiceGroupIndex].gui.currStageId
export const selectCurrGuiLfoId = (state: RootState, voiceGroupIndex = getVoiceGroupIndex()) => state.lfos[voiceGroupIndex].gui.currLfoId
export const selectCurrGuiDelayLevel = (state: RootState, voiceGroupIndex: number) => state.lfos[voiceGroupIndex].gui.currDelayLevel
export const selectCurrUiLfoId = (state: RootState, voiceGroupIndex = getVoiceGroupIndex()) => state.lfos[voiceGroupIndex].ui.currLfoId
export const selectCustomShapeParams = (state: RootState, voiceGroupIndex: number) => (lfoId: number) => state.lfos[voiceGroupIndex].misc.customShapeParams[lfoId]

export default lfosSlice.reducer