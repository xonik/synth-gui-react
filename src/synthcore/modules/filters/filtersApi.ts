import { createGroupedHandlers } from '../common/utils'
import filtersControllers from './filtersControllers'

const handlers = createGroupedHandlers(
    [
        filtersControllers.LPF.INPUT,
        filtersControllers.LPF.RESONANCE,
        filtersControllers.LPF.CUTOFF,
        filtersControllers.LPF.FM_AMT,
        filtersControllers.LPF.WHEEL_AMT,
        filtersControllers.LPF.ENV_AMT,
        filtersControllers.LPF.LFO_AMT,
        filtersControllers.LPF.KBD_AMT,
        filtersControllers.LPF.EXT_CV,
        filtersControllers.LPF.SLOPE,
        filtersControllers.LPF.FILTER_TYPE,
        filtersControllers.LPF.FM_MODE,
        filtersControllers.LPF.FM_SRC,

        filtersControllers.FILTERS.LINK_CUTOFF,
        filtersControllers.FILTERS.ROUTING,

        filtersControllers.SVF.INPUT,
        filtersControllers.SVF.RESONANCE,
        filtersControllers.SVF.CUTOFF,
        filtersControllers.SVF.FM_AMT,
        filtersControllers.SVF.WHEEL_AMT,
        filtersControllers.SVF.ENV_AMT,
        filtersControllers.SVF.LFO_AMT,
        filtersControllers.SVF.KBD_AMT,
        filtersControllers.SVF.EXT_CV,
        filtersControllers.SVF.SLOPE,
        filtersControllers.SVF.FM_MODE,
        filtersControllers.SVF.FM_SRC,
        filtersControllers.SVF.INVERT,
    ])

const filtersApi = {
    ...handlers,
}

export default filtersApi