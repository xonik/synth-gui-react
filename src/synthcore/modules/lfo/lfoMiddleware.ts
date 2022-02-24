import { lfoApi } from '../../synthcoreApi'
import { toggleStageSelected } from './lfoReducer'
import { ApiSource } from '../../types'
import { PayloadAction } from '@reduxjs/toolkit'
import { lfoCtrls } from './lfoControllers'
import { click } from '../ui/uiReducer'

export const lfoMiddleware = (action: PayloadAction): void => {
    if (click.match(action)) {
        if (action.payload.ctrl.id === lfoCtrls.LFO.id) {
            lfoApi.setUiLfo(action.payload.radioButtonIndex || 0, ApiSource.UI)
        }
    } else if (toggleStageSelected.match(action)) {
        lfoApi.toggleStageSelected(action.payload.lfo, action.payload.stage, ApiSource.GUI)
    }
}
