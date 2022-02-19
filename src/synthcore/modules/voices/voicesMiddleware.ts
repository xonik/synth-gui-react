import { PayloadAction } from '@reduxjs/toolkit'
import { click } from '../ui/uiReducer'
import { voicesApi } from '../../synthcoreApi'
import { ApiSource } from '../../types'
import voicesControllers from './voicesControllers'
import { createClickMapper } from '../common/utils'

const clickMapper = createClickMapper([
    [voicesControllers.VOICE1, () => voicesApi.toggleVoiceState(0, ApiSource.UI)],
    [voicesControllers.VOICE2, () => voicesApi.toggleVoiceState(1, ApiSource.UI)],
    [voicesControllers.VOICE3, () => voicesApi.toggleVoiceState(2, ApiSource.UI)],
    [voicesControllers.VOICE4, () => voicesApi.toggleVoiceState(3, ApiSource.UI)],
    [voicesControllers.VOICE5, () => voicesApi.toggleVoiceState(4, ApiSource.UI)],
    [voicesControllers.VOICE6, () => voicesApi.toggleVoiceState(5, ApiSource.UI)],
    [voicesControllers.VOICE7, () => voicesApi.toggleVoiceState(6, ApiSource.UI)],
    [voicesControllers.VOICE8, () => voicesApi.toggleVoiceState(7, ApiSource.UI)],
])

export const voicesMiddleware = (action: PayloadAction): void => {
    if (click.match(action)) {
        clickMapper(action.payload.ctrl)
    }
}
