import { lfoApi } from '../../synthcoreApi'
import { toggleStageSelected } from './lfoReducer'
import { ApiSource } from '../../types'
import { PayloadAction } from '@reduxjs/toolkit'
import { lfoCtrls } from './lfoControllers'
import { click } from '../ui/uiReducer'

export const lfoMiddleware = (action: PayloadAction): void => {
    if (toggleStageSelected.match(action)) {
        lfoApi.toggleStageSelected(action.payload.lfo, action.payload.stage, ApiSource.GUI)
    }
}
