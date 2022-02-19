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
    midi: filtersMidiApi.setLpfInput,
})
const lpfDrive = numericPropFuncs({
    selector: () => selectLpf(store.getState()).drive,
    action: setLpfDrive,
    midi: filtersMidiApi.setLpfDrive,
})
const lpfResonance = numericPropFuncs({
    selector: () => selectLpf(store.getState()).resonance,
    action: setLpfResonance,
    midi: filtersMidiApi.setLpfResonance,
})
const lpfCutoff = numericPropFuncs({
    selector: () => selectLpf(store.getState()).cutoff,
    action: setLpfCutoff,
    midi: filtersMidiApi.setLpfCutoff,
})
const lpfFmAmt = numericPropFuncs({
    selector: () => selectLpf(store.getState()).fmAmt,
    action: setLpfFmAmt,
    midi: filtersMidiApi.setLpfFmAmt,
})
const lpfEnvAmt = numericPropFuncs({
    selector: () => selectLpf(store.getState()).envAmt,
    action: setLpfEnvAmt,
    midi: filtersMidiApi.setLpfEnvAmt,
})
const lpfLfoAmt = numericPropFuncs({
    selector: () => selectLpf(store.getState()).lfoAmt,
    action: setLpfLfoAmt,
    midi: filtersMidiApi.setLpfLfoAmt,
})
const lpfKbdAmt = numericPropFuncs({
    selector: () => selectLpf(store.getState()).kbdAmt,
    action: setLpfKbdAmt,
    midi: filtersMidiApi.setLpfKbdAmt,
})
const lpfExtCv = togglePropFuncs({
    config: controllers.LPF.EXT_CV,
    selector: () => selectLpf(store.getState()).extCv,
    action: setLpfExtCv,
    midi: filtersMidiApi.setLpfExtCv,
})
const lpfWheel = togglePropFuncs({
    config: controllers.LPF.WHEEL,
    selector: () => selectLpf(store.getState()).wheel,
    action: setLpfWheel,
    midi: filtersMidiApi.setLpfWheel,
})
const lpfSlope = togglePropFuncs({
    config: controllers.LPF.SLOPE,
    selector: () => selectLpf(store.getState()).slope,
    action: setLpfSlope,
    midi: filtersMidiApi.setLpfSlope,
})

// BOTH FILTERS
const filtersLinkCutoff = togglePropFuncs({
    config: controllers.FILTERS.LINK_CUTOFF,
    selector: () => selectFilters(store.getState()).linkCutoff,
    action: setFiltersLinkCutoff,
    midi: filtersMidiApi.setFiltersLinkCutoff,
})
const filtersRouting = togglePropFuncs({
    config: controllers.FILTERS.ROUTING,
    selector: () => selectFilters(store.getState()).routing,
    action: setFiltersRouting,
    midi: filtersMidiApi.setFiltersRouting,
})

// SVF
const svfInput = numericPropFuncs({
    selector: () => selectSvf(store.getState()).input,
    action: setSvfInput,
    midi: filtersMidiApi.setSvfInput,
})
const svfDrive = numericPropFuncs({
    selector: () => selectSvf(store.getState()).drive,
    action: setSvfDrive,
    midi: filtersMidiApi.setSvfDrive,
})
const svfResonance = numericPropFuncs({
    selector: () => selectSvf(store.getState()).resonance,
    action: setSvfResonance,
    midi: filtersMidiApi.setSvfResonance,
})
const svfCutoff = numericPropFuncs({
    selector: () => selectSvf(store.getState()).cutoff,
    action: setSvfCutoff,
    midi: filtersMidiApi.setSvfCutoff,
})
const svfFmAmt = numericPropFuncs({
    selector: () => selectSvf(store.getState()).fmAmt,
    action: setSvfFmAmt,
    midi: filtersMidiApi.setSvfFmAmt,
})
const svfEnvAmt = numericPropFuncs({
    selector: () => selectSvf(store.getState()).envAmt,
    action: setSvfEnvAmt,
    midi: filtersMidiApi.setSvfEnvAmt,
})
const svfLfoAmt = numericPropFuncs({
    selector: () => selectSvf(store.getState()).lfoAmt,
    action: setSvfLfoAmt,
    midi: filtersMidiApi.setSvfLfoAmt,
})
const svfKbdAmt = numericPropFuncs({
    selector: () => selectSvf(store.getState()).kbdAmt,
    action: setSvfKbdAmt,
    midi: filtersMidiApi.setSvfKbdAmt,
})
const svfExtCv = togglePropFuncs({
    config: controllers.SVF.EXT_CV,
    selector: () => selectSvf(store.getState()).extCv,
    action: setSvfExtCv,
    midi: filtersMidiApi.setSvfExtCv,
})
const svfWheel = togglePropFuncs({
    config: controllers.SVF.WHEEL,
    selector: () => selectSvf(store.getState()).wheel,
    action: setSvfWheel,
    midi: filtersMidiApi.setSvfWheel,
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
    [filtersControllers.LPF.INPUT, (value: number, source: ApiSource) => lpfInput.increment(value, source)],
    [filtersControllers.LPF.DRIVE, (value: number, source: ApiSource) => lpfDrive.increment(value, source)],
    [filtersControllers.LPF.RESONANCE, (value: number, source: ApiSource) => lpfResonance.increment(value, source)],
    [filtersControllers.LPF.CUTOFF, (value: number, source: ApiSource) => lpfCutoff.increment(value, source)],
    [filtersControllers.LPF.FM_AMT, (value: number, source: ApiSource) => lpfFmAmt.increment(value, source)],
    [filtersControllers.LPF.ENV_AMT, (value: number, source: ApiSource) => lpfEnvAmt.increment(value, source)],
    [filtersControllers.LPF.LFO_AMT, (value: number, source: ApiSource) => lpfLfoAmt.increment(value, source)],
    [filtersControllers.LPF.KBD_AMT, (value: number, source: ApiSource) => lpfKbdAmt.increment(value, source)],

    [filtersControllers.SVF.INPUT, (value: number, source: ApiSource) => svfInput.increment(value, source)],
    [filtersControllers.SVF.DRIVE, (value: number, source: ApiSource) => svfDrive.increment(value, source)],
    [filtersControllers.SVF.RESONANCE, (value: number, source: ApiSource) => svfResonance.increment(value, source)],
    [filtersControllers.SVF.CUTOFF, (value: number, source: ApiSource) => svfCutoff.increment(value, source)],
    [filtersControllers.SVF.FM_AMT, (value: number, source: ApiSource) => svfFmAmt.increment(value, source)],
    [filtersControllers.SVF.ENV_AMT, (value: number, source: ApiSource) => svfEnvAmt.increment(value, source)],
    [filtersControllers.SVF.LFO_AMT, (value: number, source: ApiSource) => svfLfoAmt.increment(value, source)],
    [filtersControllers.SVF.KBD_AMT, (value: number, source: ApiSource) => svfKbdAmt.increment(value, source)],
    [filtersControllers.SVF.SLOPE, (value: number, source: ApiSource) => incrementSvfSlope(value, source)],
])

const click = createClickMapper([
    [filtersControllers.LPF.EXT_CV, (source: ApiSource) => lpfExtCv.toggle(source)],
    [filtersControllers.LPF.WHEEL, (source: ApiSource) => lpfWheel.toggle(source)],
    [filtersControllers.LPF.SLOPE, (source: ApiSource) => lpfSlope.toggle(source)],

    [filtersControllers.FILTERS.LINK_CUTOFF, (source: ApiSource) => filtersLinkCutoff.toggle(source)],
    [filtersControllers.FILTERS.ROUTING, (source: ApiSource) => filtersRouting.toggle(source)],

    [filtersControllers.SVF.EXT_CV, (source: ApiSource) => svfExtCv.toggle(source)],
    [filtersControllers.SVF.WHEEL, (source: ApiSource) => svfWheel.toggle(source)],
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