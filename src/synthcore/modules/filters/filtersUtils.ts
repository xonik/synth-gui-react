import { Controllers } from '../controllers/types'
import filtersControllers from './filtersControllers'
import { getDefaultController } from '../controllers/controllersUtils'
import { mergeControllers } from '../controllers/controllersUtils'

export const getDefaultFiltersState = (): Controllers => mergeControllers([
    getDefaultController(filtersControllers.LPF.ENV_AMT, 0.33),
    getDefaultController(filtersControllers.LPF.CUTOFF, 1),
    getDefaultController(filtersControllers.SVF.ENV_AMT, 0.33),
    getDefaultController(filtersControllers.SVF.ENV_AMT, 0.33),
    getDefaultController(filtersControllers.FILTERS.ROUTING, 1),
])
