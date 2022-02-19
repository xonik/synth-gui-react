import { PayloadAction } from '@reduxjs/toolkit'
import { increment } from '../ui/uiReducer'
import { postMixApi } from '../../synthcoreApi'

export const postMixMiddleware = (action: PayloadAction): void => {
    if (increment.match(action)) {
        postMixApi.increment(action.payload.ctrl, action.payload.value, action.payload.source)
    }
}
