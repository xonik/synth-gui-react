import { PayloadAction } from '@reduxjs/toolkit'
import { click, increment } from '../ui/uiReducer'
import { masterClockApi } from '../../synthcoreApi'

export const masterClockMiddleware = (action: PayloadAction): void => {
    if (increment.match(action)) {
        masterClockApi.increment(action.payload.ctrl, action.payload.value, action.payload.source)
    } else if (click.match(action)) {
        masterClockApi.click(action.payload.ctrl, action.payload.source)
    }
}
