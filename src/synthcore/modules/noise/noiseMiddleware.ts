import { PayloadAction } from '@reduxjs/toolkit'
import { click } from '../ui/uiReducer'
import { noiseApi } from '../../synthcoreApi'

export const noiseMiddleware = (action: PayloadAction): void => {
    if (click.match(action)) {
        noiseApi.click(action.payload.ctrl, action.payload.source)
    }
}

