import { PayloadAction } from '@reduxjs/toolkit'
import { increment } from '../ui/uiReducer'
import { mainDisplayApi } from './mainDisplayApi'

export const mainDisplayMiddleware = (action: PayloadAction): void => {
    if (increment.match(action)) {
        const ctrlIndex = action.payload.ctrlIndex || 0
        mainDisplayApi.handleMainDisplayController(action.payload.ctrlId, action.payload.value)
    }
}
