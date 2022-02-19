import { PayloadAction } from '@reduxjs/toolkit'
import { click, increment } from '../ui/uiReducer'
import { commonFxApi } from '../../synthcoreApi'
import { ApiSource } from '../../types'
import { createClickMapper, createIncrementMapper } from '../common/utils'
import commonFxControllers from './commonFxControllers'

const apiIncrementMapper = createIncrementMapper([
    [commonFxControllers.DSP1.PARAM1, (value: number) => commonFxApi.incrementDsp1Param1(value, ApiSource.UI)],
    [commonFxControllers.DSP1.PARAM2, (value: number) => commonFxApi.incrementDsp1Param2(value, ApiSource.UI)],
    [commonFxControllers.DSP1.PARAM3, (value: number) => commonFxApi.incrementDsp1Param3(value, ApiSource.UI)],
    [commonFxControllers.DSP1.EFFECT, (value: number) => commonFxApi.incrementDsp1Effect(value, ApiSource.UI)],

    [commonFxControllers.DSP2.PARAM1, (value: number) => commonFxApi.incrementDsp2Param1(value, ApiSource.UI)],
    [commonFxControllers.DSP2.PARAM2, (value: number) => commonFxApi.incrementDsp2Param2(value, ApiSource.UI)],
    [commonFxControllers.DSP2.PARAM3, (value: number) => commonFxApi.incrementDsp2Param3(value, ApiSource.UI)],
    [commonFxControllers.DSP2.EFFECT, (value: number) => commonFxApi.incrementDsp2Effect(value, ApiSource.UI)],

    [commonFxControllers.CHORUS.RATE, (value: number) => commonFxApi.incrementChorusRate(value, ApiSource.UI)],
    [commonFxControllers.CHORUS.DEPTH, (value: number) => commonFxApi.incrementChorusDepth(value, ApiSource.UI)],

    [commonFxControllers.FX_BIT_CRUSHER.BITS, (value: number) => commonFxApi.incrementBitCrusherBits(value, ApiSource.UI)],
    [commonFxControllers.FX_BIT_CRUSHER.RATE, (value: number) => commonFxApi.incrementBitCrusherRate(value, ApiSource.UI)],

    [commonFxControllers.FX_MIX.LEVEL_DSP1, (value: number) => commonFxApi.incrementLevelDsp1(value, ApiSource.UI)],
    [commonFxControllers.FX_MIX.LEVEL_DSP2, (value: number) => commonFxApi.incrementLevelDsp2(value, ApiSource.UI)],
    [commonFxControllers.FX_MIX.LEVEL_CHORUS, (value: number) => commonFxApi.incrementLevelChorus(value, ApiSource.UI)],
    [commonFxControllers.FX_MIX.LEVEL_BIT_CRUSHER, (value: number) => commonFxApi.incrementLevelBitCrusher(value, ApiSource.UI)],
])

const apiClickMapper = createClickMapper([
    [commonFxControllers.DSP1.SOURCE, () => commonFxApi.toggleDsp1Source(ApiSource.UI)],
    [commonFxControllers.DSP2.SOURCE, () => commonFxApi.toggleDsp2Source(ApiSource.UI)],
    [commonFxControllers.DSP2.CHAIN, () => commonFxApi.toggleDsp2Chain(ApiSource.UI)],
    [commonFxControllers.CHORUS.SOURCE, () => commonFxApi.toggleChorusSource(ApiSource.UI)],
    [commonFxControllers.CHORUS.MODE, () => commonFxApi.toggleChorusMode(ApiSource.UI)],
    [commonFxControllers.FX_BIT_CRUSHER.SOURCE, () => commonFxApi.toggleBitCrusherSource(ApiSource.UI)],
])

export const commonFxMiddleware = (action: PayloadAction): void => {
    if (increment.match(action)) {
        apiIncrementMapper(action.payload.ctrl, action.payload.value)
    } else if (click.match(action)) {
        apiClickMapper(action.payload.ctrl)
    }
}
