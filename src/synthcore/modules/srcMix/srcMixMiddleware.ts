import { PayloadAction } from '@reduxjs/toolkit'
import { click, increment } from '../ui/uiReducer'
import { srcMixApi } from '../../synthcoreApi'
import { ApiSource } from '../../types'
import { createClickMapper, createIncrementMapper } from '../common/utils'
import srcMixControllers from './srcMixControllers'

const incrementMapper = createIncrementMapper([
    [srcMixControllers.LEVEL_OSC1, (value: number) => srcMixApi.incrementLevelOsc1(value, ApiSource.UI)],
    [srcMixControllers.LEVEL_OSC2, (value: number) => srcMixApi.incrementLevelOsc2(value, ApiSource.UI)],
    [srcMixControllers.LEVEL_OSC3, (value: number) => srcMixApi.incrementLevelOsc3(value, ApiSource.UI)],
    [srcMixControllers.LEVEL_NOISE, (value: number) => srcMixApi.incrementLevelNoise(value, ApiSource.UI)],
    [srcMixControllers.LEVEL_RING_MOD, (value: number) => srcMixApi.incrementLevelRingMod(value, ApiSource.UI)],
    [srcMixControllers.LEVEL_EXT_AUDIO, (value: number) => srcMixApi.incrementLevelExtAudio(value, ApiSource.UI)],
])

const clickMapper = createClickMapper([
    [srcMixControllers.OUT_OSC1, () => srcMixApi.toggleOutOsc1(ApiSource.UI)],
    [srcMixControllers.OUT_OSC2, () => srcMixApi.toggleOutOsc2(ApiSource.UI)],
    [srcMixControllers.OUT_OSC3, () => srcMixApi.toggleOutOsc3(ApiSource.UI)],
    [srcMixControllers.OUT_NOISE, () => srcMixApi.toggleOutNoise(ApiSource.UI)],
    [srcMixControllers.OUT_RING_MOD, () => srcMixApi.toggleOutRingMod(ApiSource.UI)],
    [srcMixControllers.OUT_EXT_AUDIO, () => srcMixApi.toggleOutExtAudio(ApiSource.UI)],
])

export const srcMixMiddleware = (action: PayloadAction): void => {
    if (increment.match(action)) {
        incrementMapper(action.payload.ctrl, action.payload.value)
    } else if (click.match(action)) {
        clickMapper(action.payload.ctrl)
    }
}
