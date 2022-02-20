import { release } from '../ui/uiReducer'
import { envApi } from '../../synthcoreApi'
import { toggleStageEnabled, toggleStageSelected } from './envReducer'
import { ApiSource } from '../../types'
import { PayloadAction } from '@reduxjs/toolkit'
import envControllers from './envControllers'

export const envMiddleware = (action: PayloadAction): void => {
    if (release.match(action)) {
        const ctrlIndex = action.payload.ctrlIndex || 0
        if(action.payload.ctrl === envControllers(0).TRIGGER){
            envApi.release(ctrlIndex, ApiSource.UI)
        }
    } else if (toggleStageEnabled.match(action)) {
        envApi.toggleStageEnabled(action.payload.env, action.payload.stage, ApiSource.GUI)
    } else if (toggleStageSelected.match(action)) {
        envApi.toggleStageSelected(action.payload.env, action.payload.stage, ApiSource.GUI)
    }
}
