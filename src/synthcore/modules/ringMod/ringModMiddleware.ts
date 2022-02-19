import { PayloadAction } from '@reduxjs/toolkit'
import { click } from '../ui/uiReducer'
import { ringModApi } from '../../synthcoreApi'

export const ringModMiddleware = (action: PayloadAction): void => {
    if (click.match(action)) {
        ringModApi.click(action.payload.ctrl, action.payload.source)
    }
}
