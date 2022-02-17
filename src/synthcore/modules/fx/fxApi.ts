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

    incrementDistortionDrive: distortionDrive.increment,
    incrementDistortionLevel: distortionLevel.increment,
    incrementBitCrusherBits: bitCrusherBits.increment,
    incrementBitCrusherRate: bitCrusherRate.increment,
    incrementBitCrusherLevel: bitCrusherLevel.increment,

    toggleDistortionIn: distortionIn.toggle,
    toggleDistortionClip: distortionClip.toggle,
    toggleDistortionOut: distortionOut.toggle,
    toggleBitCrusherIn: bitCrusherIn.toggle,
    toggleBitCrusherOut: bitCrusherOut.toggle,
}

export default fxApi