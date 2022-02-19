import { PayloadAction } from '@reduxjs/toolkit'
import { click, increment } from '../ui/uiReducer'
import { kbdApi } from '../../synthcoreApi'
import { ApiSource } from '../../types'
import { createClickMapper, createIncrementMapper } from '../common/utils'
import kbdControllers from './kbdControllers'


export const kbdMiddleware = (action: PayloadAction): void => {
    if (increment.match(action)) {
        kbdApi.increment(action.payload.ctrl, action.payload.value, action.payload.source)
    } else if (click.match(action)) {
        if (action.payload.ctrl === kbdControllers.TRANSPOSE) {
            if (action.payload.reverse) {
                kbdApi.decrementTranspose(ApiSource.UI)
            } else {
                kbdApi.incrementTranspose(ApiSource.UI)
            }
        } else {
            kbdApi.click(action.payload.ctrl, action.payload.source)
        }
    }
}
