import { PayloadAction } from '@reduxjs/toolkit'
import { click, increment } from '../ui/uiReducer'
import { commonFxApi } from '../../synthcoreApi'
import { ApiSource } from '../../types'
import { CommonFxControllerIds } from './types'
import { ApiClickMapperType, ApiIncrementMapperType } from '../common/types'

const apiIncrementMapper: ApiIncrementMapperType = {
    [CommonFxControllerIds.DSP1_PARAM1]: (value: number) => commonFxApi.incrementDsp1Param1(value, ApiSource.UI),
    [CommonFxControllerIds.DSP1_PARAM2]: (value: number) => commonFxApi.incrementDsp1Param2(value, ApiSource.UI),
    [CommonFxControllerIds.DSP1_PARAM3]: (value: number) => commonFxApi.incrementDsp1Param3(value, ApiSource.UI),
    [CommonFxControllerIds.DSP1_EFFECT]: (value: number) => commonFxApi.incrementDsp1Effect(value, ApiSource.UI),

    [CommonFxControllerIds.DSP2_PARAM1]: (value: number) => commonFxApi.incrementDsp2Param1(value, ApiSource.UI),
    [CommonFxControllerIds.DSP2_PARAM2]: (value: number) => commonFxApi.incrementDsp2Param2(value, ApiSource.UI),
    [CommonFxControllerIds.DSP2_PARAM3]: (value: number) => commonFxApi.incrementDsp2Param3(value, ApiSource.UI),
    [CommonFxControllerIds.DSP2_EFFECT]: (value: number) => commonFxApi.incrementDsp2Effect(value, ApiSource.UI),

    [CommonFxControllerIds.CHORUS_RATE]: (value: number) => commonFxApi.incrementChorusRate(value, ApiSource.UI),
    [CommonFxControllerIds.CHORUS_DEPTH]: (value: number) => commonFxApi.incrementChorusDepth(value, ApiSource.UI),

    [CommonFxControllerIds.BIT_CRUSHER_BITS]: (value: number) => commonFxApi.incrementBitCrusherBits(value, ApiSource.UI),
    [CommonFxControllerIds.BIT_CRUSHER_RATE]: (value: number) => commonFxApi.incrementBitCrusherRate(value, ApiSource.UI),

    [CommonFxControllerIds.LEVEL_DSP1]: (value: number) => commonFxApi.incrementLevelDsp1(value, ApiSource.UI),
    [CommonFxControllerIds.LEVEL_DSP2]: (value: number) => commonFxApi.incrementLevelDsp2(value, ApiSource.UI),
    [CommonFxControllerIds.LEVEL_CHORUS]: (value: number) => commonFxApi.incrementLevelChorus(value, ApiSource.UI),
    [CommonFxControllerIds.LEVEL_BIT_CRUSHER]: (value: number) => commonFxApi.incrementLevelBitCrusher(value, ApiSource.UI),
}

const apiClickMapper: ApiClickMapperType = {
    [CommonFxControllerIds.DSP1_SOURCE]: () => commonFxApi.toggleDsp1Source(ApiSource.UI),
    [CommonFxControllerIds.DSP2_SOURCE]: () => commonFxApi.toggleDsp2Source(ApiSource.UI),
    [CommonFxControllerIds.DSP2_CHAIN]: () => commonFxApi.toggleDsp2Chain(ApiSource.UI),
    [CommonFxControllerIds.CHORUS_SOURCE]: () => commonFxApi.toggleChorusSource(ApiSource.UI),
    [CommonFxControllerIds.CHORUS_MODE]: () => commonFxApi.toggleChorusMode(ApiSource.UI),
    [CommonFxControllerIds.BIT_CRUSHER_SOURCE]: () => commonFxApi.toggleBitCrusherSource(ApiSource.UI),
}


export const commonFxMiddleware = (action: PayloadAction): void => {
    if (increment.match(action)) {
        apiIncrementMapper[action.payload.ctrlId](action.payload.value)
    } else if (click.match(action)) {
        apiClickMapper[action.payload.ctrlId]()
    }
}
