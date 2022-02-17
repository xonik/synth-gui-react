import { PayloadAction } from '@reduxjs/toolkit'
import { increment } from '../ui/uiReducer'
import { ApiSource } from '../../types'
import { ApiIncrementMapperType } from '../common/types'
import { OutControllerIds } from './types'
import { outApi } from '../../synthcoreApi'

const apiIncrementMapper: ApiIncrementMapperType = {
    [OutControllerIds.VOLUME]: (value: number) => outApi.incrementVolume(value, ApiSource.UI),
    [OutControllerIds.SPREAD]: (value: number) => outApi.incrementSpread(value, ApiSource.UI),
    [OutControllerIds.HEADPHONES]: (value: number) => outApi.incrementHeadphones(value, ApiSource.UI),
}

export const outMiddleware = (action: PayloadAction): void => {
    if (increment.match(action)) {
        apiIncrementMapper[action.payload.ctrlId](action.payload.value)
    }
}
