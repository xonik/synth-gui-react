import { PayloadAction } from '@reduxjs/toolkit'
import { click, increment } from '../ui/uiReducer'
import { fxApi } from '../../synthcoreApi'


export const fxMiddleware = (action: PayloadAction): void => {
    if (increment.match(action)) {
        fxApi.increment(action.payload.ctrl, action.payload.value, action.payload.source)
    } else if (click.match(action)) {
        fxApi.click(action.payload.ctrl, action.payload.source)
    }
}
