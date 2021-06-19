// createSlice
// separate reducer for stage

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Envelope, StageId } from './types'
import { getDefaultEnvelope } from './envelopeUtils'
import { RootState } from '../store'

type EnvelopesState = Envelope;

const initialState: EnvelopesState = {
    ...getDefaultEnvelope()
}

type StagePayload = {
    env: number;
    stage: StageId;
}

type StageLevelPayload = StagePayload & {
    levelIncrement: number;
}

const getBounded = (value: number) => {
    if(value > 1) return 1;
    if(value < 0) return 0;
    return value;
}

export const envelopesSlice = createSlice({
    name: 'envelopes',
    initialState,
    reducers: {
        incrementLevel: (state, {payload}: PayloadAction<StageLevelPayload>) => {
            state.stages[payload.stage].level = getBounded(state.stages[payload.stage].level + payload.levelIncrement);
        }
    }
})

export const {incrementLevel} = envelopesSlice.actions;
export const selectEnvelope = (state: RootState) => state.envelopes

export default envelopesSlice.reducer;