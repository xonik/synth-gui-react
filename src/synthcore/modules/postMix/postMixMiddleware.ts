import { PayloadAction } from '@reduxjs/toolkit'
import { increment } from '../ui/uiReducer'
import { ApiSource } from '../../types'
import { ApiIncrementMapperType } from '../common/types'
import { postMixApi } from '../../synthcoreApi'
import postMixControllers from './postMixControllers'

const apiIncrementMapper: ApiIncrementMapperType = {
    [postMixControllers.LPF.id]: (value: number) => postMixApi.incrementLpfLevel(value, ApiSource.UI),
    [postMixControllers.SVF.id]: (value: number) => postMixApi.incrementSvfLevel(value, ApiSource.UI),
    [postMixControllers.SINE1.id]: (value: number) => postMixApi.incrementSine1Level(value, ApiSource.UI),
    [postMixControllers.SINE2.id]: (value: number) => postMixApi.incrementSine2Level(value, ApiSource.UI),
    [postMixControllers.PAN.id]: (value: number) => postMixApi.incrementPan(value, ApiSource.UI),
    [postMixControllers.AMOUNT.id]: (value: number) => postMixApi.incrementAmt(value, ApiSource.UI),
    [postMixControllers.FX1_SEND.id]: (value: number) => postMixApi.incrementFX1(value, ApiSource.UI),
    [postMixControllers.FX2_SEND.id]: (value: number) => postMixApi.incrementFX2(value, ApiSource.UI),
}

export const postMixMiddleware = (action: PayloadAction): void => {
    if (increment.match(action)) {
        apiIncrementMapper[action.payload.ctrlId](action.payload.value)
    }
}
