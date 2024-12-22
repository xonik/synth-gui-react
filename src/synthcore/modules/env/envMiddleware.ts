import { envApi } from '../../synthcoreApi'
import { toggleStageSelected } from './envReducer'
import { ApiSource } from '../../types'
import { PayloadAction } from '@reduxjs/toolkit'

export const envMiddleware = (action: PayloadAction): void => {
    if (toggleStageSelected.match(action)) {
        const { voiceGroupIndex, env, stage } = action.payload
        envApi.toggleStageSelected(voiceGroupIndex, env, stage, ApiSource.GUI)
    }
}
