import { PayloadAction } from '@reduxjs/toolkit'
import { increment } from '../ui/uiReducer'
import { ApiSource } from '../../types'
import { createIncrementMapper } from '../common/utils'
import { postMixApi } from '../../synthcoreApi'
import postMixControllers from './postMixControllers'

const apiIncrementMapper = createIncrementMapper([
    [postMixControllers.LPF, (value: number) => postMixApi.incrementLpfLevel(value, ApiSource.UI)],
    [postMixControllers.SVF, (value: number) => postMixApi.incrementSvfLevel(value, ApiSource.UI)],
    [postMixControllers.SINE1, (value: number) => postMixApi.incrementSine1Level(value, ApiSource.UI)],
    [postMixControllers.SINE2, (value: number) => postMixApi.incrementSine2Level(value, ApiSource.UI)],
    [postMixControllers.PAN, (value: number) => postMixApi.incrementPan(value, ApiSource.UI)],
    [postMixControllers.AMOUNT, (value: number) => postMixApi.incrementAmt(value, ApiSource.UI)],
    [postMixControllers.FX1_SEND, (value: number) => postMixApi.incrementFX1(value, ApiSource.UI)],
    [postMixControllers.FX2_SEND, (value: number) => postMixApi.incrementFX2(value, ApiSource.UI)],
])

export const postMixMiddleware = (action: PayloadAction): void => {
    if (increment.match(action)) {
        apiIncrementMapper(action.payload.ctrl, action.payload.value)
    }
}
