import { PayloadAction } from '@reduxjs/toolkit'
import { click, increment } from '../ui/uiReducer'
import { kbdApi } from '../../synthcoreApi'
import { ApiSource } from '../../types'
import { ApiClickMapperType, ApiIncrementMapperType } from '../common/types'
import kbdControllers from './kbdControllers'

const incrementMapper: ApiIncrementMapperType = {
    [kbdControllers.PORTAMENTO.id]: (value: number) => kbdApi.incrementPortamento(value, ApiSource.UI),
    [kbdControllers.UNISON_DETUNE.id]: (value: number) => kbdApi.incrementUnisonDetune(value, ApiSource.UI),
}

const clickMapper: ApiClickMapperType = {
    [kbdControllers.HOLD.id]: () => kbdApi.toggleHold(ApiSource.UI),
    [kbdControllers.CHORD.id]: () => kbdApi.toggleChord(ApiSource.UI),
    [kbdControllers.MODE.id]: () => kbdApi.toggleMode(ApiSource.UI),
}

export const kbdMiddleware = (action: PayloadAction): void => {
    if (increment.match(action)) {
        incrementMapper[action.payload.ctrlId](action.payload.value)
    } else if (click.match(action)) {
        if (action.payload.ctrlId === kbdControllers.TRANSPOSE.id) {
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
