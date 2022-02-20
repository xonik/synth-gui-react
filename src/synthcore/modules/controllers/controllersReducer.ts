import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { NumericControllerPayload } from '../common/CommonReducer'

type ControllersState = {
    controllers: {[key: number]: number}
}

export const initialState: ControllersState = {
    controllers: {}
}

export const controllersSlice = createSlice({
    name: 'controllers',
    initialState,
    reducers: {
        setController:  (state, { payload }: PayloadAction<NumericControllerPayload>) => {
            state.controllers[payload.ctrlId] = payload.value
        },
    }
})

export const {
    setController,
} = controllersSlice.actions

export const selectController = (ctrlId: number) => (state: RootState) => state.controllers.controllers[ctrlId] || 0

export default controllersSlice.reducer