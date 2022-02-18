import { PayloadAction } from '@reduxjs/toolkit'
import { click, increment } from '../ui/uiReducer'
import { kbdApi } from '../../synthcoreApi'
import { ApiSource } from '../../types'
import { ApiClickMapperType, ApiIncrementMapperType } from '../common/types'
import { KbdControllerIds } from './types'

const incrementMapper: ApiIncrementMapperType = {
    [KbdControllerIds.PORTAMENTO]: (value: number) => kbdApi.incrementPortamento(value, ApiSource.UI),
    [KbdControllerIds.UNISON_DETUNE]: (value: number) => kbdApi.incrementUnisonDetune(value, ApiSource.UI),
}

const clickMapper: ApiClickMapperType = {
    [KbdControllerIds.HOLD]: () => kbdApi.toggleHold(ApiSource.UI),
    [KbdControllerIds.CHORD]: () => kbdApi.toggleChord(ApiSource.UI),
    [KbdControllerIds.MODE]: () => kbdApi.toggleMode(ApiSource.UI),
}

export const kbdMiddleware = (action: PayloadAction): void => {
    if (increment.match(action)) {
        incrementMapper[action.payload.ctrlId](action.payload.value)
    } else if (click.match(action)) {
        if (action.payload.ctrlId === KbdControllerIds.TRANSPOSE) {
            if (action.payload.reverse) {
                kbdApi.decrementTranspose(ApiSource.UI)
            } else {
                kbdApi.incrementTranspose(ApiSource.UI)
            }
        } else {
            clickMapper[action.payload.ctrlId]()
        }
    }
}
