import { PayloadAction } from '@reduxjs/toolkit'
import { click } from '../ui/uiReducer'
import { voicesApi } from '../../synthcoreApi'
import { ApiSource } from '../../types'
import { ApiClickMapperType } from '../common/types'
import { VoicesControllerIds } from './types'

const clickMapper: ApiClickMapperType = {
    [VoicesControllerIds.VOICE1]: () => voicesApi.toggleVoiceState(0, ApiSource.UI),
    [VoicesControllerIds.VOICE2]: () => voicesApi.toggleVoiceState(1, ApiSource.UI),
    [VoicesControllerIds.VOICE3]: () => voicesApi.toggleVoiceState(2, ApiSource.UI),
    [VoicesControllerIds.VOICE4]: () => voicesApi.toggleVoiceState(3, ApiSource.UI),
    [VoicesControllerIds.VOICE5]: () => voicesApi.toggleVoiceState(4, ApiSource.UI),
    [VoicesControllerIds.VOICE6]: () => voicesApi.toggleVoiceState(5, ApiSource.UI),
    [VoicesControllerIds.VOICE7]: () => voicesApi.toggleVoiceState(6, ApiSource.UI),
    [VoicesControllerIds.VOICE8]: () => voicesApi.toggleVoiceState(7, ApiSource.UI)
}

export const voicesMiddleware = (action: PayloadAction): void => {
    if (click.match(action)) {
        clickMapper[action.payload.ctrlId]()
    }
}
