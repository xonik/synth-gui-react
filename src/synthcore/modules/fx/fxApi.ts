import {
    setDistortionDrive,
    setDistortionLevel,
    setDistortionIn,
    setDistortionClip,
    setDistortionOut,
    setBitCrusherBits,
    setBitCrusherRate,
    setBitCrusherLevel,
    setBitCrusherIn,
    setBitCrusherOut, 
    selectDistortion, 
    selectBitCrusher,
} from './fxReducer'
import { store } from '../../store'
import fxMidiApi from './fxMidiApi'
import controllers from '../../../midi/controllers'
import { numericPropFuncs, togglePropFuncs } from '../common/commonApi'
import { createClickMapper, createIncrementMapper } from '../common/utils'
import fxControllers from './fxControllers'
import { ApiSource } from '../../types'

const distortionDrive = numericPropFuncs({
    selector: () => selectDistortion(store.getState()).drive,
    action: setDistortionDrive,
    midi: fxMidiApi.setDistortionDrive,
})
const distortionLevel = numericPropFuncs({
    selector: () => selectDistortion(store.getState()).level,
    action: setDistortionLevel,
    midi: fxMidiApi.setDistortionLevel,
})
const bitCrusherBits = numericPropFuncs({
    selector: () => selectBitCrusher(store.getState()).bits,
    action: setBitCrusherBits,
    midi: fxMidiApi.setBitCrusherBits,
})
const bitCrusherRate = numericPropFuncs({
    selector: () => selectBitCrusher(store.getState()).rate,
    action: setBitCrusherRate,
    midi: fxMidiApi.setBitCrusherRate,
})
const bitCrusherLevel = numericPropFuncs({
    selector: () => selectBitCrusher(store.getState()).level,
    action: setBitCrusherLevel,
    midi: fxMidiApi.setBitCrusherLevel,
})

const distortionIn = togglePropFuncs({
    config: controllers.DISTORTION.IN,
    selector: () => selectDistortion(store.getState()).in,
    action: setDistortionIn,
    midi: fxMidiApi.setDistortionIn,
})
const distortionClip = togglePropFuncs({
    config: controllers.DISTORTION.CLIP,
    selector: () => selectDistortion(store.getState()).clip,
    action: setDistortionClip,
    midi: fxMidiApi.setDistortionClip,
})
const distortionOut = togglePropFuncs({
    config: controllers.DISTORTION.OUT,
    selector: () => selectDistortion(store.getState()).out,
    action: setDistortionOut,
    midi: fxMidiApi.setDistortionOut,
})
const bitCrusherIn = togglePropFuncs({
    config: controllers.BIT_CRUSHER.IN,
    selector: () => selectBitCrusher(store.getState()).in,
    action: setBitCrusherIn,
    midi: fxMidiApi.setBitCrusherIn,
})
const bitCrusherOut = togglePropFuncs({
    config: controllers.BIT_CRUSHER.OUT,
    selector: () => selectBitCrusher(store.getState()).out,
    action: setBitCrusherOut,
    midi: fxMidiApi.setBitCrusherOut,
})


const increment = createIncrementMapper([
    [fxControllers.DISTORTION.DRIVE, (value: number, source: ApiSource) => distortionDrive.increment(value, source)],
    [fxControllers.DISTORTION.LEVEL, (value: number, source: ApiSource) => distortionLevel.increment(value, source)],
    [fxControllers.BIT_CRUSHER.BITS, (value: number, source: ApiSource) => bitCrusherBits.increment(value, source)],
    [fxControllers.BIT_CRUSHER.RATE, (value: number, source: ApiSource) => bitCrusherRate.increment(value, source)],
    [fxControllers.BIT_CRUSHER.LEVEL, (value: number, source: ApiSource) => bitCrusherLevel.increment(value, source)],
])

const click = createClickMapper([
    [fxControllers.DISTORTION.IN, (source: ApiSource) => distortionIn.toggle(source)],
    [fxControllers.DISTORTION.CLIP, (source: ApiSource) => distortionClip.toggle(source)],
    [fxControllers.DISTORTION.OUT, (source: ApiSource) => distortionOut.toggle(source)],
    [fxControllers.BIT_CRUSHER.IN, (source: ApiSource) => bitCrusherIn.toggle(source)],
    [fxControllers.BIT_CRUSHER.OUT, (source: ApiSource) => bitCrusherOut.toggle(source)],
])


const fxApi = {
    setDistortionDrive: distortionDrive.set,
    setDistortionLevel: distortionLevel.set,
    setBitCrusherBits: bitCrusherBits.set,
    setBitCrusherRate: bitCrusherRate.set,
    setBitCrusherLevel: bitCrusherLevel.set,

    setDistortionIn: distortionIn.set,
    setDistortionClip: distortionClip.set,
    setDistortionOut: distortionOut.set,
    setBitCrusherIn: bitCrusherIn.set,
    setBitCrusherOut: bitCrusherOut.set,

    increment,
    click,
}

export default fxApi