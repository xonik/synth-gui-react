import { PayloadAction } from '@reduxjs/toolkit'
import { click, increment } from '../ui/uiReducer'
import { commonFxApi } from '../../synthcoreApi'
import { ApiSource } from '../../types'
import { ApiClickMapperType, ApiIncrementMapperType } from '../common/types'
import commonFxControllers from './commonFxControllers'

const apiIncrementMapper: ApiIncrementMapperType = {
    [commonFxControllers.DSP1.PARAM1.id]: (value: number) => commonFxApi.incrementDsp1Param1(value, ApiSource.UI),
    [commonFxControllers.DSP1.PARAM2.id]: (value: number) => commonFxApi.incrementDsp1Param2(value, ApiSource.UI),
    [commonFxControllers.DSP1.PARAM3.id]: (value: number) => commonFxApi.incrementDsp1Param3(value, ApiSource.UI),
    [commonFxControllers.DSP1.EFFECT.id]: (value: number) => commonFxApi.incrementDsp1Effect(value, ApiSource.UI),

    [commonFxControllers.DSP2.PARAM1.id]: (value: number) => commonFxApi.incrementDsp2Param1(value, ApiSource.UI),
    [commonFxControllers.DSP2.PARAM2.id]: (value: number) => commonFxApi.incrementDsp2Param2(value, ApiSource.UI),
    [commonFxControllers.DSP2.PARAM3.id]: (value: number) => commonFxApi.incrementDsp2Param3(value, ApiSource.UI),
    [commonFxControllers.DSP2.EFFECT.id]: (value: number) => commonFxApi.incrementDsp2Effect(value, ApiSource.UI),

    [commonFxControllers.CHORUS.RATE.id]: (value: number) => commonFxApi.incrementChorusRate(value, ApiSource.UI),
    [commonFxControllers.CHORUS.DEPTH.id]: (value: number) => commonFxApi.incrementChorusDepth(value, ApiSource.UI),

    [commonFxControllers.FX_BIT_CRUSHER.BITS.id]: (value: number) => commonFxApi.incrementBitCrusherBits(value, ApiSource.UI),
    [commonFxControllers.FX_BIT_CRUSHER.RATE.id]: (value: number) => commonFxApi.incrementBitCrusherRate(value, ApiSource.UI),

    [commonFxControllers.FX_MIX.LEVEL_DSP1.id]: (value: number) => commonFxApi.incrementLevelDsp1(value, ApiSource.UI),
    [commonFxControllers.FX_MIX.LEVEL_DSP2.id]: (value: number) => commonFxApi.incrementLevelDsp2(value, ApiSource.UI),
    [commonFxControllers.FX_MIX.LEVEL_CHORUS.id]: (value: number) => commonFxApi.incrementLevelChorus(value, ApiSource.UI),
    [commonFxControllers.FX_MIX.LEVEL_BIT_CRUSHER.id]: (value: number) => commonFxApi.incrementLevelBitCrusher(value, ApiSource.UI),
}

const apiClickMapper: ApiClickMapperType = {
    [commonFxControllers.DSP1.SOURCE.id]: () => commonFxApi.toggleDsp1Source(ApiSource.UI),
    [commonFxControllers.DSP2.SOURCE.id]: () => commonFxApi.toggleDsp2Source(ApiSource.UI),
    [commonFxControllers.DSP2.CHAIN.id]: () => commonFxApi.toggleDsp2Chain(ApiSource.UI),
    [commonFxControllers.CHORUS.SOURCE.id]: () => commonFxApi.toggleChorusSource(ApiSource.UI),
    [commonFxControllers.CHORUS.MODE.id]: () => commonFxApi.toggleChorusMode(ApiSource.UI),
    [commonFxControllers.FX_BIT_CRUSHER.SOURCE.id]: () => commonFxApi.toggleBitCrusherSource(ApiSource.UI),
}


export const commonFxMiddleware = (action: PayloadAction): void => {
    if (increment.match(action)) {
        apiIncrementMapper[action.payload.ctrlId](action.payload.value)
    } else if (click.match(action)) {
        apiClickMapper[action.payload.ctrlId]()
    }
}
