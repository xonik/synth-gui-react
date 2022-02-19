import { PayloadAction } from '@reduxjs/toolkit'
import { increment } from '../ui/uiReducer'
import { ApiSource } from '../../types'
import { createIncrementMapper } from '../common/utils'
import { outApi } from '../../synthcoreApi'
import outControllers from './outControllers'

const apiIncrementMapper = createIncrementMapper([
    [outControllers.VOLUME, (value: number) => outApi.incrementVolume(value, ApiSource.UI)],
    [outControllers.SPREAD, (value: number) => outApi.incrementSpread(value, ApiSource.UI)],
    [outControllers.HEADPHONES, (value: number) => outApi.incrementHeadphones(value, ApiSource.UI)],
])

export const outMiddleware = (action: PayloadAction): void => {
    if (increment.match(action)) {
        apiIncrementMapper(action.payload.ctrl, action.payload.value)
    }
}
