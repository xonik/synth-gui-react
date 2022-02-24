import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StageId } from './types'
import { RootState } from '../../store'
import { NumericPayload } from '../common/types'

type LfosState = {

    gui: {
        lfoId: number;
        stageId: StageId;
    }
    ui: {
        lfoId: number;
    }
}

export const initialState: LfosState = {
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

export type NumericLfoPayload = LfoPayload & {
    value: number;
}

export const lfosSlice = createSlice({
    name: 'lfos',
    initialState,
    reducers: {
        selectStage: (state, { payload }: PayloadAction<StagePayload>) => {
            state.gui.stageId = payload.stage
        },
        deselectStage: (state, { payload }: PayloadAction<StagePayload>) => {
            state.gui.stageId = StageId.STOPPED
        },
        setGuiLfo: (state, { payload }: PayloadAction<LfoPayload>) => {
            state.gui.lfoId = payload.lfo
        },
        setUiLfo: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.ui.lfoId = payload.value
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
export const selectGuiStageId = (state: RootState) => state.lfos.gui.stageId
export const selectGuiLfoId = (state: RootState) => state.lfos.gui.lfoId
export const selectUiLfoId = (state: RootState) => state.lfos.ui.lfoId

export default lfosSlice.reducer