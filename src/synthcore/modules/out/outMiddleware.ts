import { PayloadAction } from '@reduxjs/toolkit'
import { increment } from '../ui/uiReducer'
import { outApi } from '../../synthcoreApi'

export const outMiddleware = (action: PayloadAction): void => {
    if (increment.match(action)) {
        outApi.increment(action.payload.ctrl, action.payload.value, action.payload.source)
    }
}
