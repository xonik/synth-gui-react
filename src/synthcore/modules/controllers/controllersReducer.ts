import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { NumericControllerPayload } from '../common/CommonReducer'
import { ControllerConfig } from '../../../midi/types'

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
            state.controllers[payload.ctrl.id] = payload.value
        },
    }
})

export const {
    setController,
} = controllersSlice.actions

export const selectController = (ctrl: ControllerConfig) => (state: RootState) => state.controllers.controllers[ctrl.id] || 0

export default controllersSlice.reducer