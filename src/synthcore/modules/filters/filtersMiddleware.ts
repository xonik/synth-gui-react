import { PayloadAction } from '@reduxjs/toolkit'
import { click, increment } from '../ui/uiReducer'
import { filtersApi } from '../../synthcoreApi'
import { ApiSource } from '../../types'
import { FiltersControllerIds } from './types'
import { ApiClickMapperType, ApiIncrementMapperType } from '../common/types'

const incrementMapper: ApiIncrementMapperType = {
    [FiltersControllerIds.LPF_INPUT]: (value: number) => filtersApi.incrementLpfInput(value, ApiSource.UI),
    [FiltersControllerIds.LPF_DRIVE]: (value: number) => filtersApi.incrementLpfDrive(value, ApiSource.UI),
    [FiltersControllerIds.LPF_RESONANCE]: (value: number) => filtersApi.incrementLpfResonance(value, ApiSource.UI),
    [FiltersControllerIds.LPF_CUTOFF]: (value: number) => filtersApi.incrementLpfCutoff(value, ApiSource.UI),
    [FiltersControllerIds.LPF_FM_AMT]: (value: number) => filtersApi.incrementLpfFmAmt(value, ApiSource.UI),
    [FiltersControllerIds.LPF_ENV_AMT]: (value: number) => filtersApi.incrementLpfEnvAmt(value, ApiSource.UI),
    [FiltersControllerIds.LPF_LFO_AMT]: (value: number) => filtersApi.incrementLpfLfoAmt(value, ApiSource.UI),
    [FiltersControllerIds.LPF_KBD_AMT]: (value: number) => filtersApi.incrementLpfKbdAmt(value, ApiSource.UI),

    [FiltersControllerIds.SVF_INPUT]: (value: number) => filtersApi.incrementSvfInput(value, ApiSource.UI),
    [FiltersControllerIds.SVF_DRIVE]: (value: number) => filtersApi.incrementSvfDrive(value, ApiSource.UI),
    [FiltersControllerIds.SVF_RESONANCE]: (value: number) => filtersApi.incrementSvfResonance(value, ApiSource.UI),
    [FiltersControllerIds.SVF_CUTOFF]: (value: number) => filtersApi.incrementSvfCutoff(value, ApiSource.UI),
    [FiltersControllerIds.SVF_FM_AMT]: (value: number) => filtersApi.incrementSvfFmAmt(value, ApiSource.UI),
    [FiltersControllerIds.SVF_ENV_AMT]: (value: number) => filtersApi.incrementSvfEnvAmt(value, ApiSource.UI),
    [FiltersControllerIds.SVF_LFO_AMT]: (value: number) => filtersApi.incrementSvfLfoAmt(value, ApiSource.UI),
    [FiltersControllerIds.SVF_KBD_AMT]: (value: number) => filtersApi.incrementSvfKbdAmt(value, ApiSource.UI),
    [FiltersControllerIds.SVF_SLOPE]: (value: number) => filtersApi.incrementSvfSlope(value, ApiSource.UI),
}

const clickMapper: ApiClickMapperType = {
    [FiltersControllerIds.LPF_EXT_CV]: () => filtersApi.toggleLpfExtCv(ApiSource.UI),
    [FiltersControllerIds.LPF_WHEEL]: () => filtersApi.toggleLpfWheel(ApiSource.UI),
    [FiltersControllerIds.LPF_SLOPE]: () => filtersApi.toggleLpfSlope(ApiSource.UI),

    [FiltersControllerIds.FILTERS_LINK_CUTOFF]: () => filtersApi.toggleFiltersLinkCutoff(ApiSource.UI),
    [FiltersControllerIds.FILTERS_ROUTING]: () => filtersApi.toggleFiltersRouting(ApiSource.UI),

    [FiltersControllerIds.SVF_EXT_CV]: () => filtersApi.toggleSvfExtCv(ApiSource.UI),
    [FiltersControllerIds.SVF_WHEEL]: () => filtersApi.toggleSvfWheel(ApiSource.UI),
}


export const filtersMiddleware = (action: PayloadAction): void => {
    if (increment.match(action)) {
        incrementMapper[action.payload.ctrlId](action.payload.value)
    } else if (click.match(action)) {
        clickMapper[action.payload.ctrlId]()
    }
}
