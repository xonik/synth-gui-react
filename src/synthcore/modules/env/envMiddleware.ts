import { click, increment, release } from '../ui/uiReducer'
import { envApi } from '../../synthcoreApi'
import { StageId } from './types'
import { toggleInvert, toggleLoopEnabled, toggleLoopMode, toggleReleaseMode, toggleRetrigger, toggleStageEnabled, toggleStageSelected } from './envReducer'
import { ApiSource } from '../../types'
import { PayloadAction } from '@reduxjs/toolkit'
import envControllers from './envControllers'

export const envMiddleware = (action: PayloadAction): void => {
    if (increment.match(action)) {
        const ctrlIndex = action.payload.ctrlIndex || 0
        envApi.increment(action.payload.ctrl, ctrlIndex, action.payload.value, action.payload.source)
    } else if (click.match(action)) {
        const ctrlIndex = action.payload.ctrlIndex || 0
        envApi.click(action.payload.ctrl, ctrlIndex, action.payload.source)
    } else if (release.match(action)) {
        const ctrlIndex = action.payload.ctrlIndex || 0
        if(action.payload.ctrl === envControllers(0).TRIGGER){
            envApi.release(ctrlIndex, ApiSource.UI)
        }
    } else if (toggleStageEnabled.match(action)) {
        envApi.toggleStageEnabled(action.payload.env, action.payload.stage, ApiSource.GUI)
    } else if (toggleInvert.match(action)) {
        envApi.toggleInvert(action.payload.env, ApiSource.GUI)
    } else if (toggleRetrigger.match(action)) {
        envApi.toggleRetrigger(action.payload.env, ApiSource.GUI)
    } else if (toggleReleaseMode.match(action)) {
        envApi.toggleReleaseMode(action.payload.env, ApiSource.GUI)
    } else if (toggleLoopMode.match(action)) {
        envApi.toggleLoopMode(action.payload.env, ApiSource.GUI)
    } else if (toggleLoopEnabled.match(action)) {
        envApi.toggleLoopEnabled(action.payload.env, ApiSource.GUI)
    } else if (toggleStageSelected.match(action)) {
        envApi.toggleStageSelected(action.payload.env, action.payload.stage, ApiSource.GUI)
    }
}
