import { PayloadAction } from '@reduxjs/toolkit'
import { increment } from '../ui/uiReducer'
import { ApiSource } from '../../types'
import { ApiIncrementMapperType } from '../common/types'
import { outApi } from '../../synthcoreApi'
import outControllers from './outControllers'

const apiIncrementMapper: ApiIncrementMapperType = {
    [outControllers.VOLUME.id]: (value: number) => outApi.incrementVolume(value, ApiSource.UI),
    [outControllers.SPREAD.id]: (value: number) => outApi.incrementSpread(value, ApiSource.UI),
    [outControllers.HEADPHONES.id]: (value: number) => outApi.incrementHeadphones(value, ApiSource.UI),
}

export const outMiddleware = (action: PayloadAction): void => {
    if (increment.match(action)) {
        apiIncrementMapper[action.payload.ctrlId](action.payload.value)
    }
}
