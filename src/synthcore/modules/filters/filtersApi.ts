import {
    setLpfInput,
    setLpfDrive,
    setLpfResonance,
    setLpfCutoff,
    setLpfFmAmt,
    setLpfEnvAmt,
    setLpfLfoAmt,
    setLpfKbdAmt,
    setLpfExtCv,
    setLpfWheel,
    setLpfSlope,

    // BOTH FILTERS
    setFiltersLinkCutoff,
    setFiltersRouting,

    // SVF
    setSvfInput,
    setSvfDrive,
    setSvfResonance,
    setSvfCutoff,
    setSvfFmAmt,
    setSvfEnvAmt,
    setSvfLfoAmt,
    setSvfKbdAmt,
    setSvfExtCv,
    setSvfWheel,
    setSvfSlope,

    selectLpf,
    selectFilters, selectSvf,
} from './filtersReducer'
import { store } from '../../store'
import filtersMidiApi from './filtersMidiApi'
import controllers from '../../../midi/controllers'
import { numericPropFuncs, togglePropFuncs } from '../common/commonApi'
import { ApiSource } from '../../types'
import { dispatch, getBounded, getQuantized } from '../../utils'
import { createClickMapper, createIncrementMapper } from '../common/utils'
import filtersControllers from './filtersControllers'


const lpfInput = numericPropFuncs({
    selector: () => selectLpf(store.getState()).input,
    action: setLpfInput,
})
const lpfDrive = numericPropFuncs({
    selector: () => selectLpf(store.getState()).drive,
    action: setLpfDrive,
})
const lpfResonance = numericPropFuncs({
    selector: () => selectLpf(store.getState()).resonance,
    action: setLpfResonance,
})
const lpfCutoff = numericPropFuncs({
    selector: () => selectLpf(store.getState()).cutoff,
    action: setLpfCutoff,
})
const lpfFmAmt = numericPropFuncs({
    selector: () => selectLpf(store.getState()).fmAmt,
    action: setLpfFmAmt,
})
const lpfEnvAmt = numericPropFuncs({
    selector: () => selectLpf(store.getState()).envAmt,
    action: setLpfEnvAmt,
})
const lpfLfoAmt = numericPropFuncs({
    selector: () => selectLpf(store.getState()).lfoAmt,
    action: setLpfLfoAmt,
})
const lpfKbdAmt = numericPropFuncs({
    selector: () => selectLpf(store.getState()).kbdAmt,
    action: setLpfKbdAmt,
})
const lpfExtCv = togglePropFuncs({
    config: controllers.LPF.EXT_CV,
    selector: () => selectLpf(store.getState()).extCv,
    action: setLpfExtCv,
})
const lpfWheel = togglePropFuncs({
    config: controllers.LPF.WHEEL,
    selector: () => selectLpf(store.getState()).wheel,
    action: setLpfWheel,
})
const lpfSlope = togglePropFuncs({
    config: controllers.LPF.SLOPE,
    selector: () => selectLpf(store.getState()).slope,
    action: setLpfSlope,
})

// BOTH FILTERS
const filtersLinkCutoff = togglePropFuncs({
    config: controllers.FILTERS.LINK_CUTOFF,
    selector: () => selectFilters(store.getState()).linkCutoff,
    action: setFiltersLinkCutoff,
})
const filtersRouting = togglePropFuncs({
    config: controllers.FILTERS.ROUTING,
    selector: () => selectFilters(store.getState()).routing,
    action: setFiltersRouting,
})

// SVF
const svfInput = numericPropFuncs({
    selector: () => selectSvf(store.getState()).input,
    action: setSvfInput,
})
const svfDrive = numericPropFuncs({
    selector: () => selectSvf(store.getState()).drive,
    action: setSvfDrive,
})
const svfResonance = numericPropFuncs({
    selector: () => selectSvf(store.getState()).resonance,
    action: setSvfResonance,
})
const svfCutoff = numericPropFuncs({
    selector: () => selectSvf(store.getState()).cutoff,
    action: setSvfCutoff,
})
const svfFmAmt = numericPropFuncs({
    selector: () => selectSvf(store.getState()).fmAmt,
    action: setSvfFmAmt,
})
const svfEnvAmt = numericPropFuncs({
    selector: () => selectSvf(store.getState()).envAmt,
    action: setSvfEnvAmt,
})
const svfLfoAmt = numericPropFuncs({
    selector: () => selectSvf(store.getState()).lfoAmt,
    action: setSvfLfoAmt,
})
const svfKbdAmt = numericPropFuncs({
    selector: () => selectSvf(store.getState()).kbdAmt,
    action: setSvfKbdAmt,
})
const svfExtCv = togglePropFuncs({
    config: controllers.SVF.EXT_CV,
    selector: () => selectSvf(store.getState()).extCv,
    action: setSvfExtCv,
})
const svfWheel = togglePropFuncs({
    config: controllers.SVF.WHEEL,
    selector: () => selectSvf(store.getState()).wheel,
    action: setSvfWheel,
})

const setSvfSlopeFunc = (value: number, source: ApiSource) => {
    const boundedValue = getQuantized(getBounded(value, 0, controllers.SVF.SLOPE.values.length))
    const currentValue = selectSvf(store.getState()).slope

    if (boundedValue === currentValue) {
        return
    }

    dispatch(setSvfSlope({ value: boundedValue }))
    filtersMidiApi.setSvfSlope(source, boundedValue)
}

const incrementSvfSlope = (inc: number, source: ApiSource) => {
    const currentValue = selectSvf(store.getState()).slope

    // Javascript % is so fucked up - it may return negative values so we need
    // to add a full "rotation" to guarantee that the nextValue is positive
    const valuesPerRotation = controllers.SVF.SLOPE.values.length
    const nextValue = (currentValue + inc + valuesPerRotation) % valuesPerRotation
    setSvfSlopeFunc(nextValue, source)
}

const increment = createIncrementMapper([
    [filtersControllers.LPF.INPUT, ({value,  source}) => lpfInput.increment(value, source)],
    [filtersControllers.LPF.DRIVE, ({value,  source}) => lpfDrive.increment(value, source)],
    [filtersControllers.LPF.RESONANCE, ({value,  source}) => lpfResonance.increment(value, source)],
    [filtersControllers.LPF.CUTOFF, ({value,  source}) => lpfCutoff.increment(value, source)],
    [filtersControllers.LPF.FM_AMT, ({value,  source}) => lpfFmAmt.increment(value, source)],
    [filtersControllers.LPF.ENV_AMT, ({value,  source}) => lpfEnvAmt.increment(value, source)],
    [filtersControllers.LPF.LFO_AMT, ({value,  source}) => lpfLfoAmt.increment(value, source)],
    [filtersControllers.LPF.KBD_AMT, ({value,  source}) => lpfKbdAmt.increment(value, source)],

    [filtersControllers.SVF.INPUT, ({value,  source}) => svfInput.increment(value, source)],
    [filtersControllers.SVF.DRIVE, ({value,  source}) => svfDrive.increment(value, source)],
    [filtersControllers.SVF.RESONANCE, ({value,  source}) => svfResonance.increment(value, source)],
    [filtersControllers.SVF.CUTOFF, ({value,  source}) => svfCutoff.increment(value, source)],
    [filtersControllers.SVF.FM_AMT, ({value,  source}) => svfFmAmt.increment(value, source)],
    [filtersControllers.SVF.ENV_AMT, ({value,  source}) => svfEnvAmt.increment(value, source)],
    [filtersControllers.SVF.LFO_AMT, ({value,  source}) => svfLfoAmt.increment(value, source)],
    [filtersControllers.SVF.KBD_AMT, ({value,  source}) => svfKbdAmt.increment(value, source)],
    [filtersControllers.SVF.SLOPE, ({value,  source}) => incrementSvfSlope(value, source)],
])

const click = createClickMapper([
    [filtersControllers.LPF.EXT_CV, ({source}) => lpfExtCv.toggle(source)],
    [filtersControllers.LPF.WHEEL, ({source}) => lpfWheel.toggle(source)],
    [filtersControllers.LPF.SLOPE, ({source}) => lpfSlope.toggle(source)],

    [filtersControllers.FILTERS.LINK_CUTOFF, ({source}) => filtersLinkCutoff.toggle(source)],
    [filtersControllers.FILTERS.ROUTING, ({source}) => filtersRouting.toggle(source)],

    [filtersControllers.SVF.EXT_CV, ({source}) => svfExtCv.toggle(source)],
    [filtersControllers.SVF.WHEEL, ({source}) => svfWheel.toggle(source)],
])

const filtersApi = {
    setLpfInput: lpfInput.set,
    setLpfDrive: lpfDrive.set,
    setLpfResonance: lpfResonance.set,
    setLpfCutoff: lpfCutoff.set,
    setLpfFmAmt: lpfFmAmt.set,
    setLpfEnvAmt: lpfEnvAmt.set,
    setLpfLfoAmt: lpfLfoAmt.set,
    setLpfKbdAmt: lpfKbdAmt.set,
    setLpfExtCv: lpfExtCv.set,
    setLpfWheel: lpfWheel.set,
    setLpfSlope: lpfSlope.set,

    // BOTH FILTERS
    setFiltersLinkCutoff: filtersLinkCutoff.set,
    setFiltersRouting: filtersRouting.set,

    // SVF
    setSvfInput: svfInput.set,
    setSvfDrive: svfDrive.set,
    setSvfResonance: svfResonance.set,
    setSvfCutoff: svfCutoff.set,
    setSvfFmAmt: svfFmAmt.set,
    setSvfEnvAmt: svfEnvAmt.set,
    setSvfLfoAmt: svfLfoAmt.set,
    setSvfKbdAmt: svfKbdAmt.set,
    setSvfExtCv: svfExtCv.set,
    setSvfWheel: svfWheel.set,
    setSvfSlope: setSvfSlopeFunc,

    increment,
    click,
}

export default filtersApi