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
})
const distortionLevel = numericPropFuncs({
    selector: () => selectDistortion(store.getState()).level,
    action: setDistortionLevel,
})
const bitCrusherBits = numericPropFuncs({
    selector: () => selectBitCrusher(store.getState()).bits,
    action: setBitCrusherBits,
})
const bitCrusherRate = numericPropFuncs({
    selector: () => selectBitCrusher(store.getState()).rate,
    action: setBitCrusherRate,
})
const bitCrusherLevel = numericPropFuncs({
    selector: () => selectBitCrusher(store.getState()).level,
    action: setBitCrusherLevel,
})

const distortionIn = togglePropFuncs({
    config: controllers.DISTORTION.IN,
    selector: () => selectDistortion(store.getState()).in,
    action: setDistortionIn,
})
const distortionClip = togglePropFuncs({
    config: controllers.DISTORTION.CLIP,
    selector: () => selectDistortion(store.getState()).clip,
    action: setDistortionClip,
})
const distortionOut = togglePropFuncs({
    config: controllers.DISTORTION.OUT,
    selector: () => selectDistortion(store.getState()).out,
    action: setDistortionOut,
})
const bitCrusherIn = togglePropFuncs({
    config: controllers.BIT_CRUSHER.IN,
    selector: () => selectBitCrusher(store.getState()).in,
    action: setBitCrusherIn,
})
const bitCrusherOut = togglePropFuncs({
    config: controllers.BIT_CRUSHER.OUT,
    selector: () => selectBitCrusher(store.getState()).out,
    action: setBitCrusherOut,
})


const increment = createIncrementMapper([
    [fxControllers.DISTORTION.DRIVE, ({value,  source}) => distortionDrive.increment(value, source)],
    [fxControllers.DISTORTION.LEVEL, ({value,  source}) => distortionLevel.increment(value, source)],
    [fxControllers.BIT_CRUSHER.BITS, ({value,  source}) => bitCrusherBits.increment(value, source)],
    [fxControllers.BIT_CRUSHER.RATE, ({value,  source}) => bitCrusherRate.increment(value, source)],
    [fxControllers.BIT_CRUSHER.LEVEL, ({value,  source}) => bitCrusherLevel.increment(value, source)],
])

const click = createClickMapper([
    [fxControllers.DISTORTION.IN, ({source}) => distortionIn.toggle(source)],
    [fxControllers.DISTORTION.CLIP, ({source}) => distortionClip.toggle(source)],
    [fxControllers.DISTORTION.OUT, ({source}) => distortionOut.toggle(source)],
    [fxControllers.BIT_CRUSHER.IN, ({source}) => bitCrusherIn.toggle(source)],
    [fxControllers.BIT_CRUSHER.OUT, ({source}) => bitCrusherOut.toggle(source)],
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