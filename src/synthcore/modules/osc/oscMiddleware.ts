import { PayloadAction } from '@reduxjs/toolkit'
import oscApi from './oscApi'
import { click, increment } from '../ui/uiReducer'

export const oscMiddleware = (action: PayloadAction): void => {
    if (increment.match(action)) {
        oscApi.increment(action.payload.ctrl, action.payload.value, action.payload.source)
    } else if (click.match(action)) {
        oscApi.click(action.payload.ctrl, action.payload.source)
    }
}
