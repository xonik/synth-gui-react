import { PayloadAction } from '@reduxjs/toolkit'
import { click } from '../ui/uiReducer'
import { voicesApi } from '../../synthcoreApi'

export const voicesMiddleware = (action: PayloadAction): void => {
    if (click.match(action)) {
        voicesApi.click(action.payload.ctrl, action.payload.source)
    }
}
