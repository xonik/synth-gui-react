import { createSetterFuncs } from '../common/utils'
import filtersControllers from './filtersControllers'

const setterFuncs = createSetterFuncs(
    [
        filtersControllers.LPF.INPUT,
        filtersControllers.LPF.DRIVE,
        filtersControllers.LPF.RESONANCE,
        filtersControllers.LPF.CUTOFF,
        filtersControllers.LPF.FM_AMT,
        filtersControllers.LPF.ENV_AMT,
        filtersControllers.LPF.LFO_AMT,
        filtersControllers.LPF.KBD_AMT,
        filtersControllers.LPF.EXT_CV,
        filtersControllers.LPF.WHEEL,
        filtersControllers.LPF.SLOPE,

        filtersControllers.FILTERS.LINK_CUTOFF,
        filtersControllers.FILTERS.ROUTING,

        filtersControllers.SVF.INPUT,
        filtersControllers.SVF.DRIVE,
        filtersControllers.SVF.RESONANCE,
        filtersControllers.SVF.CUTOFF,
        filtersControllers.SVF.FM_AMT,
        filtersControllers.SVF.ENV_AMT,
        filtersControllers.SVF.LFO_AMT,
        filtersControllers.SVF.KBD_AMT,
        filtersControllers.SVF.EXT_CV,
        filtersControllers.SVF.WHEEL,
        filtersControllers.SVF.SLOPE,
        filtersControllers.SVF.INVERT,
    ])

const filtersApi = {
    ...setterFuncs,
}

export default filtersApi