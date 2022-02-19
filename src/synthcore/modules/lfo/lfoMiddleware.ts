import { click, increment } from '../ui/uiReducer'
import { lfoApi } from '../../synthcoreApi'
import { toggleStageEnabled, toggleStageSelected } from './lfoReducer'
import { ApiSource } from '../../types'
import { PayloadAction } from '@reduxjs/toolkit'
import lfoControllers from './lfoControllers'

export const lfoMiddleware = (action: PayloadAction): void => {
    if (increment.match(action)) {
        lfoApi.increment(action.payload)
    } else if (click.match(action)) {
        if(action.payload.ctrl === lfoControllers(0).LFO) {
            lfoApi.setUiLfo(action.payload.radioButtonIndex || 0, ApiSource.UI)
        } else {
            lfoApi.click(action.payload)
        }
    } else if (toggleStageEnabled.match(action)) {
        lfoApi.toggleStageEnabled(action.payload.lfo, action.payload.stage, ApiSource.GUI)
    } else if (toggleStageSelected.match(action)) {
        lfoApi.toggleStageSelected(action.payload.lfo, action.payload.stage, ApiSource.GUI)
    }
}
