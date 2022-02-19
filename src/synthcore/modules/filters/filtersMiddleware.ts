import { PayloadAction } from '@reduxjs/toolkit'
import { click, increment } from '../ui/uiReducer'
import { filtersApi } from '../../synthcoreApi'
import { ApiSource } from '../../types'
import { ApiClickMapperType, ApiIncrementMapperType } from '../common/types'
import filtersControllers from './filtersControllers'

const incrementMapper: ApiIncrementMapperType = {
    [filtersControllers.LPF.INPUT.id]: (value: number) => filtersApi.incrementLpfInput(value, ApiSource.UI),
    [filtersControllers.LPF.DRIVE.id]: (value: number) => filtersApi.incrementLpfDrive(value, ApiSource.UI),
    [filtersControllers.LPF.RESONANCE.id]: (value: number) => filtersApi.incrementLpfResonance(value, ApiSource.UI),
    [filtersControllers.LPF.CUTOFF.id]: (value: number) => filtersApi.incrementLpfCutoff(value, ApiSource.UI),
    [filtersControllers.LPF.FM_AMT.id]: (value: number) => filtersApi.incrementLpfFmAmt(value, ApiSource.UI),
    [filtersControllers.LPF.ENV_AMT.id]: (value: number) => filtersApi.incrementLpfEnvAmt(value, ApiSource.UI),
    [filtersControllers.LPF.LFO_AMT.id]: (value: number) => filtersApi.incrementLpfLfoAmt(value, ApiSource.UI),
    [filtersControllers.LPF.KBD_AMT.id]: (value: number) => filtersApi.incrementLpfKbdAmt(value, ApiSource.UI),

    [filtersControllers.SVF.INPUT.id]: (value: number) => filtersApi.incrementSvfInput(value, ApiSource.UI),
    [filtersControllers.SVF.DRIVE.id]: (value: number) => filtersApi.incrementSvfDrive(value, ApiSource.UI),
    [filtersControllers.SVF.RESONANCE.id]: (value: number) => filtersApi.incrementSvfResonance(value, ApiSource.UI),
    [filtersControllers.SVF.CUTOFF.id]: (value: number) => filtersApi.incrementSvfCutoff(value, ApiSource.UI),
    [filtersControllers.SVF.FM_AMT.id]: (value: number) => filtersApi.incrementSvfFmAmt(value, ApiSource.UI),
    [filtersControllers.SVF.ENV_AMT.id]: (value: number) => filtersApi.incrementSvfEnvAmt(value, ApiSource.UI),
    [filtersControllers.SVF.LFO_AMT.id]: (value: number) => filtersApi.incrementSvfLfoAmt(value, ApiSource.UI),
    [filtersControllers.SVF.KBD_AMT.id]: (value: number) => filtersApi.incrementSvfKbdAmt(value, ApiSource.UI),
    [filtersControllers.SVF.SLOPE.id]: (value: number) => filtersApi.incrementSvfSlope(value, ApiSource.UI),
}

const clickMapper: ApiClickMapperType = {
    [filtersControllers.LPF.EXT_CV.id]: () => filtersApi.toggleLpfExtCv(ApiSource.UI),
    [filtersControllers.LPF.WHEEL.id]: () => filtersApi.toggleLpfWheel(ApiSource.UI),
    [filtersControllers.LPF.SLOPE.id]: () => filtersApi.toggleLpfSlope(ApiSource.UI),

    [filtersControllers.FILTERS.LINK_CUTOFF.id]: () => filtersApi.toggleFiltersLinkCutoff(ApiSource.UI),
    [filtersControllers.FILTERS.ROUTING.id]: () => filtersApi.toggleFiltersRouting(ApiSource.UI),

    [filtersControllers.SVF.EXT_CV.id]: () => filtersApi.toggleSvfExtCv(ApiSource.UI),
    [filtersControllers.SVF.WHEEL.id]: () => filtersApi.toggleSvfWheel(ApiSource.UI),
}


export const filtersMiddleware = (action: PayloadAction): void => {
    if (increment.match(action)) {
        incrementMapper[action.payload.ctrlId](action.payload.value)
    } else if (click.match(action)) {
        clickMapper[action.payload.ctrlId]()
    }
}
