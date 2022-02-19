import {
    setLevelOsc1,
    setLevelOsc2,
    setLevelOsc3,
    setLevelNoise,
    setLevelRingMod,
    setLevelExtAudio,
    setOutOsc1,
    setOutOsc2,
    setOutOsc3,
    setOutNoise,
    setOutRingMod,
    setOutExtAudio, selectSrcMix,
} from './srcMixReducer'
import { store } from '../../store'
import srcMixMidiApi from './srcMixMidiApi'
import controllers from '../../../midi/controllers'
import { numericPropFuncs, togglePropFuncs } from '../common/commonApi'
import { createClickMapper, createIncrementMapper } from '../common/utils'
import srcMixControllers from './srcMixControllers'
import { ApiSource } from '../../types'

const levelOsc1 = numericPropFuncs({
    selector: () => selectSrcMix(store.getState()).levelOsc1,
    action: setLevelOsc1,
    midi: srcMixMidiApi.setLevelOsc1,
})
const levelOsc2 = numericPropFuncs({
    selector: () => selectSrcMix(store.getState()).levelOsc2,
    action: setLevelOsc2,
    midi: srcMixMidiApi.setLevelOsc2,
})
const levelOsc3 = numericPropFuncs({
    selector: () => selectSrcMix(store.getState()).levelOsc3,
    action: setLevelOsc3,
    midi: srcMixMidiApi.setLevelOsc3,
})
const levelNoise = numericPropFuncs({
    selector: () => selectSrcMix(store.getState()).levelNoise,
    action: setLevelNoise,
    midi: srcMixMidiApi.setLevelNoise,
})
const levelRingMod = numericPropFuncs({
    selector: () => selectSrcMix(store.getState()).levelRingMod,
    action: setLevelRingMod,
    midi: srcMixMidiApi.setLevelRingMod,
})
const levelExtAudio = numericPropFuncs({
    selector: () => selectSrcMix(store.getState()).levelExtAudio,
    action: setLevelExtAudio,
    midi: srcMixMidiApi.setLevelExtAudio,
})

const outOsc1 = togglePropFuncs({
    config: controllers.SOURCE_MIX.OUT_OSC1,
    selector: () => selectSrcMix(store.getState()).outOsc1,
    action: setOutOsc1,
    midi: srcMixMidiApi.setOutOsc1,
})
const outOsc2 = togglePropFuncs({
    config: controllers.SOURCE_MIX.OUT_OSC2,
    selector: () => selectSrcMix(store.getState()).outOsc2,
    action: setOutOsc2,
    midi: srcMixMidiApi.setOutOsc2,
})
const outOsc3 = togglePropFuncs({
    config: controllers.SOURCE_MIX.OUT_OSC3,
    selector: () => selectSrcMix(store.getState()).outOsc3,
    action: setOutOsc3,
    midi: srcMixMidiApi.setOutOsc3,
})
const outNoise = togglePropFuncs({
    config: controllers.SOURCE_MIX.OUT_NOISE,
    selector: () => selectSrcMix(store.getState()).outNoise,
    action: setOutNoise,
    midi: srcMixMidiApi.setOutNoise,
})
const outRingMod = togglePropFuncs({
    config: controllers.SOURCE_MIX.OUT_RING_MOD,
    selector: () => selectSrcMix(store.getState()).outRingMod,
    action: setOutRingMod,
    midi: srcMixMidiApi.setOutRingMod,
})
const outExtAudio = togglePropFuncs({
    config: controllers.SOURCE_MIX.OUT_EXT_AUDIO,
    selector: () => selectSrcMix(store.getState()).outExtAudio,
    action: setOutExtAudio,
    midi: srcMixMidiApi.setOutExtAudio,
})


const increment = createIncrementMapper([
    [srcMixControllers.LEVEL_OSC1, ({value, source}) => levelOsc1.increment(value, source)],
    [srcMixControllers.LEVEL_OSC2, ({value, source}) => levelOsc2.increment(value, source)],
    [srcMixControllers.LEVEL_OSC3, ({value, source}) => levelOsc3.increment(value, source)],
    [srcMixControllers.LEVEL_NOISE, ({value, source}) => levelNoise.increment(value, source)],
    [srcMixControllers.LEVEL_RING_MOD, ({value, source}) => levelRingMod.increment(value, source)],
    [srcMixControllers.LEVEL_EXT_AUDIO, ({value, source}) => levelExtAudio.increment(value, source)],
])

const click = createClickMapper([
    [srcMixControllers.OUT_OSC1, ({source}) => outOsc1.toggle(source)],
    [srcMixControllers.OUT_OSC2, ({source}) => outOsc2.toggle(source)],
    [srcMixControllers.OUT_OSC3, ({source}) => outOsc3.toggle(source)],
    [srcMixControllers.OUT_NOISE, ({source}) => outNoise.toggle(source)],
    [srcMixControllers.OUT_RING_MOD, ({source}) => outRingMod.toggle(source)],
    [srcMixControllers.OUT_EXT_AUDIO, ({source}) => outExtAudio.toggle(source)],
])

const srcMixApi = {
    setLevelOsc1: levelOsc1.set,
    setLevelOsc2: levelOsc2.set,
    setLevelOsc3: levelOsc3.set,
    setLevelNoise: levelNoise.set,
    setLevelRingMod: levelRingMod.set,
    setLevelExtAudio: levelExtAudio.set,

    setOutOsc1: outOsc1.set,
    setOutOsc2: outOsc2.set,
    setOutOsc3: outOsc3.set,
    setOutNoise: outNoise.set,
    setOutRingMod: outRingMod.set,
    setOutExtAudio: outExtAudio.set,

    increment,
    click,
}

export default srcMixApi