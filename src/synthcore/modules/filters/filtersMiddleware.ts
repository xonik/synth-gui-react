import { PayloadAction } from '@reduxjs/toolkit'
import { click, increment } from '../ui/uiReducer'
import { filtersApi } from '../../synthcoreApi'
import { ApiSource } from '../../types'
import { createClickMapper, createIncrementMapper } from '../common/utils'
import filtersControllers from './filtersControllers'

const incrementMapper = createIncrementMapper([
    [filtersControllers.LPF.INPUT, (value: number) => filtersApi.incrementLpfInput(value, ApiSource.UI)],
    [filtersControllers.LPF.DRIVE, (value: number) => filtersApi.incrementLpfDrive(value, ApiSource.UI)],
    [filtersControllers.LPF.RESONANCE, (value: number) => filtersApi.incrementLpfResonance(value, ApiSource.UI)],
    [filtersControllers.LPF.CUTOFF, (value: number) => filtersApi.incrementLpfCutoff(value, ApiSource.UI)],
    [filtersControllers.LPF.FM_AMT, (value: number) => filtersApi.incrementLpfFmAmt(value, ApiSource.UI)],
    [filtersControllers.LPF.ENV_AMT, (value: number) => filtersApi.incrementLpfEnvAmt(value, ApiSource.UI)],
    [filtersControllers.LPF.LFO_AMT, (value: number) => filtersApi.incrementLpfLfoAmt(value, ApiSource.UI)],
    [filtersControllers.LPF.KBD_AMT, (value: number) => filtersApi.incrementLpfKbdAmt(value, ApiSource.UI)],

    [filtersControllers.SVF.INPUT, (value: number) => filtersApi.incrementSvfInput(value, ApiSource.UI)],
    [filtersControllers.SVF.DRIVE, (value: number) => filtersApi.incrementSvfDrive(value, ApiSource.UI)],
    [filtersControllers.SVF.RESONANCE, (value: number) => filtersApi.incrementSvfResonance(value, ApiSource.UI)],
    [filtersControllers.SVF.CUTOFF, (value: number) => filtersApi.incrementSvfCutoff(value, ApiSource.UI)],
    [filtersControllers.SVF.FM_AMT, (value: number) => filtersApi.incrementSvfFmAmt(value, ApiSource.UI)],
    [filtersControllers.SVF.ENV_AMT, (value: number) => filtersApi.incrementSvfEnvAmt(value, ApiSource.UI)],
    [filtersControllers.SVF.LFO_AMT, (value: number) => filtersApi.incrementSvfLfoAmt(value, ApiSource.UI)],
    [filtersControllers.SVF.KBD_AMT, (value: number) => filtersApi.incrementSvfKbdAmt(value, ApiSource.UI)],
    [filtersControllers.SVF.SLOPE, (value: number) => filtersApi.incrementSvfSlope(value, ApiSource.UI)],
])

const clickMapper = createClickMapper([
    [filtersControllers.LPF.EXT_CV, () => filtersApi.toggleLpfExtCv(ApiSource.UI)],
    [filtersControllers.LPF.WHEEL, () => filtersApi.toggleLpfWheel(ApiSource.UI)],
    [filtersControllers.LPF.SLOPE, () => filtersApi.toggleLpfSlope(ApiSource.UI)],

    [filtersControllers.FILTERS.LINK_CUTOFF, () => filtersApi.toggleFiltersLinkCutoff(ApiSource.UI)],
    [filtersControllers.FILTERS.ROUTING, () => filtersApi.toggleFiltersRouting(ApiSource.UI)],

    [filtersControllers.SVF.EXT_CV, () => filtersApi.toggleSvfExtCv(ApiSource.UI)],
    [filtersControllers.SVF.WHEEL, () => filtersApi.toggleSvfWheel(ApiSource.UI)],
])

export const filtersMiddleware = (action: PayloadAction): void => {
    if (increment.match(action)) {
        incrementMapper(action.payload.ctrl, action.payload.value)
    } else if (click.match(action)) {
        clickMapper(action.payload.ctrl)
    }
}
