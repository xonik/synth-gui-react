import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { NumericControllerPayload } from '../common/CommonReducer'
import { ControllerConfig } from '../../../midi/types'
import { Controllers } from './types'

type ControllersState = {
    controllers: Controllers
}

export const initialState: ControllersState = {
    controllers: {
        0: {}
    }
}

export const controllersSlice = createSlice({
    name: 'controllers',
    initialState,
    reducers: {
        setController:  (state, { payload }: PayloadAction<NumericControllerPayload>) => {
            state.controllers[0][payload.ctrl.id] = payload.value
        },
    }
})

export const {
    setController,
} = controllersSlice.actions

export const selectController = (ctrl: ControllerConfig) => (state: RootState) => state.controllers.controllers[0][ctrl.id] || 0

export default controllersSlice.reducer