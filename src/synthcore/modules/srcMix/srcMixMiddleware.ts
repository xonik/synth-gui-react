import { PayloadAction } from '@reduxjs/toolkit'
import { click, increment } from '../ui/uiReducer'
import { srcMixApi } from '../../synthcoreApi'
import { ApiSource } from '../../types'
import { SrcMixControllerIds } from './types'

type SrcMixApiMapperType = {
    [key: number]: (value: number) => void
}

type SrcMixApiClickMapperType = {
    [key: number]: () => void
}

const srcMixApiMapper: SrcMixApiMapperType = {
    [SrcMixControllerIds.LEVEL_OSC1]: (value: number) => srcMixApi.incrementLevelOsc1(value, ApiSource.UI),
    [SrcMixControllerIds.LEVEL_OSC2]: (value: number) => srcMixApi.incrementLevelOsc2(value, ApiSource.UI),
    [SrcMixControllerIds.LEVEL_OSC3]: (value: number) => srcMixApi.incrementLevelOsc3(value, ApiSource.UI),
    [SrcMixControllerIds.LEVEL_NOISE]: (value: number) => srcMixApi.incrementLevelNoise(value, ApiSource.UI),
    [SrcMixControllerIds.LEVEL_RING_MOD]: (value: number) => srcMixApi.incrementLevelRingMod(value, ApiSource.UI),
    [SrcMixControllerIds.LEVEL_EXT_AUDIO]: (value: number) => srcMixApi.incrementLevelExtAudio(value, ApiSource.UI),
}

const srcMixApiClickMapper: SrcMixApiClickMapperType = {
    [SrcMixControllerIds.OUT_OSC1]: () => srcMixApi.toggleOutOsc1(ApiSource.UI),
    [SrcMixControllerIds.OUT_OSC2]: () => srcMixApi.toggleOutOsc2(ApiSource.UI),
    [SrcMixControllerIds.OUT_OSC3]: () => srcMixApi.toggleOutOsc3(ApiSource.UI),
    [SrcMixControllerIds.OUT_NOISE]: () => srcMixApi.toggleOutNoise(ApiSource.UI),
    [SrcMixControllerIds.OUT_RING_MOD]: () => srcMixApi.toggleOutRingMod(ApiSource.UI),
    [SrcMixControllerIds.OUT_EXT_AUDIO]: () => srcMixApi.toggleOutExtAudio(ApiSource.UI),
}


export const srcMixMiddleware = (action: PayloadAction): void => {
    if (increment.match(action)) {
        srcMixApiMapper[action.payload.ctrlId](action.payload.value)
    } else if (click.match(action)) {
        srcMixApiClickMapper[action.payload.ctrlId]()
    }
}
