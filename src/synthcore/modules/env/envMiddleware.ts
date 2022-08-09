import { envApi } from '../../synthcoreApi'
import { toggleStageSelected } from './envReducer'
import { ApiSource } from '../../types'
import { PayloadAction } from '@reduxjs/toolkit'

export const envMiddleware = (action: PayloadAction): void => {
    if (toggleStageSelected.match(action)) {
        envApi.toggleStageSelected(action.payload.env, action.payload.stage, ApiSource.GUI)
    }
}
