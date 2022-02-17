import { PayloadAction } from '@reduxjs/toolkit'
import { click, increment } from '../ui/uiReducer'
import { fxApi } from '../../synthcoreApi'
import { ApiSource } from '../../types'
import { FxControllerIds } from './types'
import { ApiClickMapperType, ApiMapperType } from '../common/types'

const srcMixApiMapper: ApiMapperType = {
    [FxControllerIds.DISTORTION_DRIVE]: (value: number) => fxApi.incrementDistortionDrive(value, ApiSource.UI),
    [FxControllerIds.DISTORTION_LEVEL]: (value: number) => fxApi.incrementDistortionLevel(value, ApiSource.UI),
    [FxControllerIds.BIT_CRUSHER_BITS]: (value: number) => fxApi.incrementBitCrusherBits(value, ApiSource.UI),
    [FxControllerIds.BIT_CRUSHER_RATE]: (value: number) => fxApi.incrementBitCrusherRate(value, ApiSource.UI),
    [FxControllerIds.BIT_CRUSHER_LEVEL]: (value: number) => fxApi.incrementBitCrusherLevel(value, ApiSource.UI),
}

const srcMixApiClickMapper: ApiClickMapperType = {
    [FxControllerIds.DISTORTION_IN]: () => fxApi.toggleDistortionIn(ApiSource.UI),
    [FxControllerIds.DISTORTION_CLIP]: () => fxApi.toggleDistortionClip(ApiSource.UI),
    [FxControllerIds.DISTORTION_OUT]: () => fxApi.toggleDistortionOut(ApiSource.UI),
    [FxControllerIds.BIT_CRUSHER_IN]: () => fxApi.toggleBitCrusherIn(ApiSource.UI),
    [FxControllerIds.BIT_CRUSHER_OUT]: () => fxApi.toggleBitCrusherOut(ApiSource.UI),
}


export const fxMiddleware = (action: PayloadAction): void => {
    if (increment.match(action)) {
        srcMixApiMapper[action.payload.ctrlId](action.payload.value)
    } else if (click.match(action)) {
        srcMixApiClickMapper[action.payload.ctrlId]()
    }
}
