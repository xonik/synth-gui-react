import { PayloadAction } from '@reduxjs/toolkit'
import { click, increment } from '../ui/uiReducer'
import { kbdApi } from '../../synthcoreApi'
import { ApiSource } from '../../types'
import { createClickMapper, createIncrementMapper } from '../common/utils'
import kbdControllers from './kbdControllers'

const incrementMapper = createIncrementMapper([
    [kbdControllers.PORTAMENTO, (value: number) => kbdApi.incrementPortamento(value, ApiSource.UI)],
    [kbdControllers.UNISON_DETUNE, (value: number) => kbdApi.incrementUnisonDetune(value, ApiSource.UI)],
])

const clickMapper = createClickMapper([
    [kbdControllers.HOLD, () => kbdApi.toggleHold(ApiSource.UI)],
    [kbdControllers.CHORD, () => kbdApi.toggleChord(ApiSource.UI)],
    [kbdControllers.MODE, () => kbdApi.toggleMode(ApiSource.UI)],
])

export const kbdMiddleware = (action: PayloadAction): void => {
    if (increment.match(action)) {
        incrementMapper(action.payload.ctrl, action.payload.value)
    } else if (click.match(action)) {
        if (action.payload.ctrl === kbdControllers.TRANSPOSE) {
            if (action.payload.reverse) {
                kbdApi.decrementTranspose(ApiSource.UI)
            } else {
                kbdApi.incrementTranspose(ApiSource.UI)
            }
        } else {
            clickMapper(action.payload.ctrl)
        }
    }
}
