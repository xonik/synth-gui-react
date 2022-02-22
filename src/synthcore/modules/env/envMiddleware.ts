import { release } from '../ui/uiReducer'
import { envApi } from '../../synthcoreApi'
import { toggleStageSelected } from './envReducer'
import { ApiSource } from '../../types'
import { PayloadAction } from '@reduxjs/toolkit'
import { envCtrls } from './envControllers'

export const envMiddleware = (action: PayloadAction): void => {
    if (release.match(action)) {
        const ctrlIndex = action.payload.ctrlIndex || 0
        if(action.payload.ctrl === envCtrls.TRIGGER){
            envApi.release(ctrlIndex, ApiSource.UI)
        }
    } else if (toggleStageSelected.match(action)) {
        envApi.toggleStageSelected(action.payload.env, action.payload.stage, ApiSource.GUI)
    }
}
