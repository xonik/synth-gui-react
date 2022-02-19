import { PayloadAction } from '@reduxjs/toolkit'
import { click, increment } from '../ui/uiReducer'
import { arpApi } from '../../synthcoreApi'

export const arpMiddleware = (action: PayloadAction): void => {
    if (increment.match(action)) {
        arpApi.increment(action.payload.ctrl, action.payload.value, action.payload.source)
    } else if (click.match(action)) {
        arpApi.click(action.payload.ctrl, action.payload.source)
    }
}
