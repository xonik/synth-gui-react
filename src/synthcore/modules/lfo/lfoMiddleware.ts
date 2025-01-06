import { lfoApi } from '../../synthcoreApi'
import { toggleStageSelected } from './lfoReducer'
import { ApiSource } from '../../types'
import { PayloadAction } from '@reduxjs/toolkit'

export const lfoMiddleware = (action: PayloadAction): void => {
    if (toggleStageSelected.match(action)) {
        const { voiceGroupIndex, lfo, stage } = action.payload
        lfoApi.toggleStageSelected(voiceGroupIndex, lfo, stage, ApiSource.GUI)
    }
}
