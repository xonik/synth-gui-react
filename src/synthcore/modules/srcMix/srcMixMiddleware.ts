import { PayloadAction } from '@reduxjs/toolkit'
import { click, increment } from '../ui/uiReducer'
import { srcMixApi } from '../../synthcoreApi'

export const srcMixMiddleware = (action: PayloadAction): void => {
    if (increment.match(action)) {
        srcMixApi.increment(action.payload.ctrl, action.payload.value, action.payload.source)
    } else if (click.match(action)) {
        srcMixApi.click(action.payload.ctrl, action.payload.source)
    }
}
