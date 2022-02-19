import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { NumericControllerPayload } from '../common/CommonReducer'

type OutState = {
    controllers: {[key: number]: number}
}

export const initialState: OutState = {
    controllers: {}
}

export const outSlice = createSlice({
    name: 'out',
    initialState,
    reducers: {
        setController:  (state, { payload }: PayloadAction<NumericControllerPayload>) => {
            state.controllers[payload.ctrlId] = payload.value
        },
    }
})

export const {
    setController,
} = outSlice.actions

export const selectOutController = (ctrlId: number) => (state: RootState) => state.out.controllers[ctrlId] || 0

export default outSlice.reducer