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

    incrementLpfInput: lpfInput.increment,
    incrementLpfDrive: lpfDrive.increment,
    incrementLpfResonance: lpfResonance.increment,
    incrementLpfCutoff: lpfCutoff.increment,
    incrementLpfFmAmt: lpfFmAmt.increment,
    incrementLpfEnvAmt: lpfEnvAmt.increment,
    incrementLpfLfoAmt: lpfLfoAmt.increment,
    incrementLpfKbdAmt: lpfKbdAmt.increment,

    incrementSvfInput: svfInput.increment,
    incrementSvfDrive: svfDrive.increment,
    incrementSvfResonance: svfResonance.increment,
    incrementSvfCutoff: svfCutoff.increment,
    incrementSvfFmAmt: svfFmAmt.increment,
    incrementSvfEnvAmt: svfEnvAmt.increment,
    incrementSvfLfoAmt: svfLfoAmt.increment,
    incrementSvfKbdAmt: svfKbdAmt.increment,
    incrementSvfSlope: incrementSvfSlope,

    toggleLpfExtCv: lpfExtCv.toggle,
    toggleLpfWheel: lpfWheel.toggle,
    toggleLpfSlope: lpfSlope.toggle,

    toggleFiltersLinkCutoff: filtersLinkCutoff.toggle,
    toggleFiltersRouting: filtersRouting.toggle,

    toggleSvfExtCv: svfExtCv.toggle,
    toggleSvfWheel: svfWheel.toggle,
}

export default filtersApi