import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StageId } from './types'
import { RootState } from '../../store'
import { NumericPayload } from '../common/types'

type LfosState = {

    gui: {
        currLfoId: number;
        currStageId: StageId;
    }
    ui: {
        currLfoId: number;
    }
}

export const initialState: LfosState = {
    gui: {
        currLfoId: 0,
        currStageId: StageId.STOPPED,
    },
    ui: {
        currLfoId: 2
    }
}

type StagePayload = {
    lfo: number;
    stage: StageId;
}

type LfoPayload = {
    lfo: number;
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

        // actions only consumed by api
        toggleStageSelected: (state, { payload }: PayloadAction<StagePayload>) => {
        },
    }
})

export const {
    selectStage,
    deselectStage,

    setGuiLfo,
    setUiLfo,

    toggleStageSelected,

} = lfosSlice.actions

export const selectLfos = (state: RootState) => state.lfos
export const selectCurrGuiStageId = (state: RootState) => state.lfos.gui.currStageId
export const selectCurrGuiLfoId = (state: RootState) => state.lfos.gui.currLfoId
export const selectCurrUiLfoId = (state: RootState) => state.lfos.ui.currLfoId

export default lfosSlice.reducer