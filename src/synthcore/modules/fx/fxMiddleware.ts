import { PayloadAction } from '@reduxjs/toolkit'
import { click, increment } from '../ui/uiReducer'
import { fxApi } from '../../synthcoreApi'
import { ApiSource } from '../../types'
import { ApiClickMapperType, ApiIncrementMapperType } from '../common/types'
import fxControllers from './fxControllers'

const apiIncrementMapper: ApiIncrementMapperType = {
    [fxControllers.DISTORTION.DRIVE.id]: (value: number) => fxApi.incrementDistortionDrive(value, ApiSource.UI),
    [fxControllers.DISTORTION.LEVEL.id]: (value: number) => fxApi.incrementDistortionLevel(value, ApiSource.UI),
    [fxControllers.BIT_CRUSHER.BITS.id]: (value: number) => fxApi.incrementBitCrusherBits(value, ApiSource.UI),
    [fxControllers.BIT_CRUSHER.RATE.id]: (value: number) => fxApi.incrementBitCrusherRate(value, ApiSource.UI),
    [fxControllers.BIT_CRUSHER.LEVEL.id]: (value: number) => fxApi.incrementBitCrusherLevel(value, ApiSource.UI),
}

const apiClickMapper: ApiClickMapperType = {
    [fxControllers.DISTORTION.IN.id]: () => fxApi.toggleDistortionIn(ApiSource.UI),
    [fxControllers.DISTORTION.CLIP.id]: () => fxApi.toggleDistortionClip(ApiSource.UI),
    [fxControllers.DISTORTION.OUT.id]: () => fxApi.toggleDistortionOut(ApiSource.UI),
    [fxControllers.BIT_CRUSHER.IN.id]: () => fxApi.toggleBitCrusherIn(ApiSource.UI),
    [fxControllers.BIT_CRUSHER.OUT.id]: () => fxApi.toggleBitCrusherOut(ApiSource.UI),
}


export const fxMiddleware = (action: PayloadAction): void => {
    if (increment.match(action)) {
        apiIncrementMapper[action.payload.ctrlId](action.payload.value)
    } else if (click.match(action)) {
        apiClickMapper[action.payload.ctrlId]()
    }
}
