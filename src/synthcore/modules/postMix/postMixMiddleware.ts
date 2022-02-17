import { PayloadAction } from '@reduxjs/toolkit'
import { increment } from '../ui/uiReducer'
import { ApiSource } from '../../types'
import { ApiIncrementMapperType } from '../common/types'
import { PostMixControllerIds } from './types'
import { postMixApi } from '../../synthcoreApi'

const apiIncrementMapper: ApiIncrementMapperType = {
    [PostMixControllerIds.LPF]: (value: number) => postMixApi.incrementLpfLevel(value, ApiSource.UI),
    [PostMixControllerIds.SVF]: (value: number) => postMixApi.incrementSvfLevel(value, ApiSource.UI),
    [PostMixControllerIds.SINE1]: (value: number) => postMixApi.incrementSine1Level(value, ApiSource.UI),
    [PostMixControllerIds.SINE2]: (value: number) => postMixApi.incrementSine2Level(value, ApiSource.UI),
    [PostMixControllerIds.PAN]: (value: number) => postMixApi.incrementPan(value, ApiSource.UI),
    [PostMixControllerIds.AMT]: (value: number) => postMixApi.incrementAmt(value, ApiSource.UI),
    [PostMixControllerIds.FX1]: (value: number) => postMixApi.incrementFX1(value, ApiSource.UI),
    [PostMixControllerIds.FX2]: (value: number) => postMixApi.incrementFX2(value, ApiSource.UI),
}

export const postMixMiddleware = (action: PayloadAction): void => {
    if (increment.match(action)) {
        apiIncrementMapper[action.payload.ctrlId](action.payload.value)
    }
}
