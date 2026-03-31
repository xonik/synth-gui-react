import { getDefaultController, mergeControllers } from '../controllers/controllersUtils'
import type { Controllers } from '../controllers/types'
import filtersControllers from './filtersControllers'

export const getDefaultFiltersState = (): Controllers =>
    mergeControllers([
        getDefaultController(filtersControllers.LPF.ENV_AMT, 0.33),
        getDefaultController(filtersControllers.LPF.CUTOFF, 1),
        getDefaultController(filtersControllers.SVF.ENV_AMT, 0.33),
        getDefaultController(filtersControllers.SVF.ENV_AMT, 0.33),
        getDefaultController(filtersControllers.FILTERS.ROUTING, 1),
    ])
