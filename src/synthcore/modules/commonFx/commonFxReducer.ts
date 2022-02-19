import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { NumericControllerPayload } from '../common/CommonReducer'

type CommonFxState = {
    controllers: {[key: number]: number}
}

export const initialState: CommonFxState = {
    controllers: {}
}

export const commonFxSlice = createSlice({
    name: 'commonFx',
    initialState,
    reducers: {
        setController:  (state, { payload }: PayloadAction<NumericControllerPayload>) => {
            state.controllers[payload.ctrlId] = payload.value
        },
    }
})

export const {
    setController
} = commonFxSlice.actions

export const selectCommonFxController = (ctrlId: number) => (state: RootState) => state.commonFx.controllers[ctrlId] || 0

export default commonFxSlice.reducer