import { PayloadAction } from '@reduxjs/toolkit'
import { click, increment } from '../ui/uiReducer'
import { fxApi } from '../../synthcoreApi'
import { ApiSource } from '../../types'
import { createClickMapper, createIncrementMapper } from '../common/utils'
import fxControllers from './fxControllers'

const apiIncrementMapper = createIncrementMapper([
    [fxControllers.DISTORTION.DRIVE, (value: number) => fxApi.incrementDistortionDrive(value, ApiSource.UI)],
    [fxControllers.DISTORTION.LEVEL, (value: number) => fxApi.incrementDistortionLevel(value, ApiSource.UI)],
    [fxControllers.BIT_CRUSHER.BITS, (value: number) => fxApi.incrementBitCrusherBits(value, ApiSource.UI)],
    [fxControllers.BIT_CRUSHER.RATE, (value: number) => fxApi.incrementBitCrusherRate(value, ApiSource.UI)],
    [fxControllers.BIT_CRUSHER.LEVEL, (value: number) => fxApi.incrementBitCrusherLevel(value, ApiSource.UI)],
])

const apiClickMapper = createClickMapper([
    [fxControllers.DISTORTION.IN, () => fxApi.toggleDistortionIn(ApiSource.UI)],
    [fxControllers.DISTORTION.CLIP, () => fxApi.toggleDistortionClip(ApiSource.UI)],
    [fxControllers.DISTORTION.OUT, () => fxApi.toggleDistortionOut(ApiSource.UI)],
    [fxControllers.BIT_CRUSHER.IN, () => fxApi.toggleBitCrusherIn(ApiSource.UI)],
    [fxControllers.BIT_CRUSHER.OUT, () => fxApi.toggleBitCrusherOut(ApiSource.UI)],
])


export const fxMiddleware = (action: PayloadAction): void => {
    if (increment.match(action)) {
        apiIncrementMapper(action.payload.ctrl, action.payload.value)
    } else if (click.match(action)) {
        apiClickMapper(action.payload.ctrl)
    }
}
