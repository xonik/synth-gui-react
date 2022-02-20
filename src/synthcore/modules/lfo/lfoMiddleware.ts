import { lfoApi } from '../../synthcoreApi'
import { toggleStageEnabled, toggleStageSelected } from './lfoReducer'
import { ApiSource } from '../../types'
import { PayloadAction } from '@reduxjs/toolkit'
import lfoControllers from './lfoControllers'
import { click } from '../ui/uiReducer'

export const lfoMiddleware = (action: PayloadAction): void => {
    if (click.match(action)) {
        // TODO:
        // Not sure why we can't compare ctrl directly, referece is
        // changed somewhere???
        if (action.payload.ctrl.id === lfoControllers(0).LFO.id) {
            lfoApi.setUiLfo(action.payload.radioButtonIndex || 0, ApiSource.UI)
        }
    }
    if (toggleStageEnabled.match(action)) {
        lfoApi.toggleStageEnabled(action.payload.lfo, action.payload.stage, ApiSource.GUI)
    } else if (toggleStageSelected.match(action)) {
        lfoApi.toggleStageSelected(action.payload.lfo, action.payload.stage, ApiSource.GUI)
    }
}
