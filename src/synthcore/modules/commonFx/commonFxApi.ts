import {
    setDsp1Param1,
    setDsp1Param2,
    setDsp1Param3,
    setDsp1Effect,
    setDsp1Source,

    setDsp2Param1,
    setDsp2Param2,
    setDsp2Param3,
    setDsp2Effect,
    setDsp2Source,

    setChorusRate,
    setChorusDepth,
    setChorusSource,
    setChorusMode,

    setBitCrusherBits,
    setBitCrusherRate,
    setBitCrusherSource,

    setLevelDsp1,
    setLevelDsp2,
    setLevelChorus,
    setLevelBitCrusher,

    selectDsp1,
    selectDsp2,
    selectChorus,
    selectBitCrusher,
    selectMix, setDsp2Chain,
} from './commonFxReducer'
import { store } from '../../store'
import commonFxMidiApi from './commonFxMidiApi'
import controllers from '../../../midi/controllers'
import { numericPropFuncs, togglePropFuncs } from '../common/commonApi'

const dsp1Param1 = numericPropFuncs({
    selector: () => selectDsp1(store.getState()).param1,
    action: setDsp1Param1,
    midi: commonFxMidiApi.setDsp1Param1,
})
const dsp1Param2 = numericPropFuncs({
    selector: () => selectDsp1(store.getState()).param2,
    action: setDsp1Param2,
    midi: commonFxMidiApi.setDsp1Param2,
})
const dsp1Param3 = numericPropFuncs({
    selector: () => selectDsp1(store.getState()).param3,
    action: setDsp1Param3,
    midi: commonFxMidiApi.setDsp1Param3,
})
const dsp1Effect = numericPropFuncs({
    selector: () => selectDsp1(store.getState()).effect,
    action: setDsp1Effect,
    midi: commonFxMidiApi.setDsp1Effect,
})

const dsp2Param1 = numericPropFuncs({
    selector: () => selectDsp2(store.getState()).param1,
    action: setDsp2Param1,
    midi: commonFxMidiApi.setDsp2Param1,
})
const dsp2Param2 = numericPropFuncs({
    selector: () => selectDsp2(store.getState()).param2,
    action: setDsp2Param2,
    midi: commonFxMidiApi.setDsp2Param2,
})
const dsp2Param3 = numericPropFuncs({
    selector: () => selectDsp2(store.getState()).param3,
    action: setDsp2Param3,
    midi: commonFxMidiApi.setDsp2Param3,
})
const dsp2Effect = numericPropFuncs({
    selector: () => selectDsp2(store.getState()).effect,
    action: setDsp2Effect,
    midi: commonFxMidiApi.setDsp2Effect,
})
    
const chorusRate = numericPropFuncs({
    selector: () => selectChorus(store.getState()).rate,
    action: setChorusRate,
    midi: commonFxMidiApi.setChorusRate,
})
const chorusDepth = numericPropFuncs({
    selector: () => selectChorus(store.getState()).depth,
    action: setChorusDepth,
    midi: commonFxMidiApi.setChorusDepth,
})

const bitCrusherBits = numericPropFuncs({
    selector: () => selectBitCrusher(store.getState()).bits,
    action: setBitCrusherBits,
    midi: commonFxMidiApi.setBitCrusherBits,
})
const bitCrusherRate = numericPropFuncs({
    selector: () => selectBitCrusher(store.getState()).rate,
    action: setBitCrusherRate,
    midi: commonFxMidiApi.setBitCrusherRate,
})

const levelDsp1 = numericPropFuncs({
    selector: () => selectMix(store.getState()).levelDsp1,
    action: setLevelDsp1,
    midi: commonFxMidiApi.setLevelDsp1,
})
const levelDsp2 = numericPropFuncs({
    selector: () => selectMix(store.getState()).levelDsp2,
    action: setLevelDsp2,
    midi: commonFxMidiApi.setLevelDsp2,
})
const levelChorus = numericPropFuncs({
    selector: () => selectMix(store.getState()).levelChorus,
    action: setLevelChorus,
    midi: commonFxMidiApi.setLevelChorus,
})
const levelBitCrusher = numericPropFuncs({
    selector: () => selectMix(store.getState()).levelBitCrusher,
    action: setLevelBitCrusher,
    midi: commonFxMidiApi.setLevelBitCrusher,
})

const dsp1Source = togglePropFuncs({
    config: controllers.DSP1.SOURCE,
    selector: () => selectDsp1(store.getState()).source,
    action: setDsp1Source,
    midi: commonFxMidiApi.setDsp1Source,
})
const dsp2Source = togglePropFuncs({
    config: controllers.DSP2.SOURCE,
    selector: () => selectDsp2(store.getState()).source,
    action: setDsp2Source,
    midi: commonFxMidiApi.setDsp2Source,
})
const dsp2Chain = togglePropFuncs({
    config: controllers.DSP2.CHAIN,
    selector: () => selectDsp2(store.getState()).chain,
    action: setDsp2Chain,
    midi: commonFxMidiApi.setDsp2Chain,
})
const chorusSource = togglePropFuncs({
    config: controllers.CHORUS.SOURCE,
    selector: () => selectChorus(store.getState()).source,
    action: setChorusSource,
    midi: commonFxMidiApi.setChorusSource,
})
const chorusMode = togglePropFuncs({
    config: controllers.CHORUS.MODE,
    selector: () => selectChorus(store.getState()).mode,
    action: setChorusMode,
    midi: commonFxMidiApi.setChorusMode,
})
const bitCrusherSource = togglePropFuncs({
    config: controllers.DSP2.SOURCE,
    selector: () => selectBitCrusher(store.getState()).source,
    action: setBitCrusherSource,
    midi: commonFxMidiApi.setBitCrusherSource,
})

const commonFxApi = {
    setDsp1Param1: dsp1Param1.set,
    setDsp1Param2: dsp1Param2.set,
    setDsp1Param3: dsp1Param3.set,
    setDsp1Effect: dsp1Effect.set,
    setDsp1Source: dsp1Source.set,

    setDsp2Param1: dsp2Param1.set,
    setDsp2Param2: dsp2Param2.set,
    setDsp2Param3: dsp2Param3.set,
    setDsp2Effect: dsp2Effect.set,
    setDsp2Source: dsp2Source.set,
    setDsp2Chain: dsp2Chain.set,

    setChorusRate: chorusRate.set,
    setChorusDepth: chorusDepth.set,
    setChorusSource: chorusSource.set,
    setChorusMode: chorusMode.set,

    setBitCrusherBits: bitCrusherBits.set,
    setBitCrusherRate: bitCrusherRate.set,
    setBitCrusherSource: bitCrusherSource.set,

    setLevelDsp1: levelDsp1.set,
    setLevelDsp2: levelDsp2.set,
    setLevelChorus: levelChorus.set,
    setLevelBitCrusher: levelBitCrusher.set,
    
    incrementDsp1Param1: dsp1Param1.increment,
    incrementDsp1Param2: dsp1Param2.increment,
    incrementDsp1Param3: dsp1Param3.increment,
    incrementDsp1Effect: dsp1Effect.increment,

    incrementDsp2Param1: dsp2Param1.increment,
    incrementDsp2Param2: dsp2Param2.increment,
    incrementDsp2Param3: dsp2Param3.increment,
    incrementDsp2Effect: dsp2Effect.increment,

    incrementChorusRate: chorusRate.increment,
    incrementChorusDepth: chorusDepth.increment,

    incrementBitCrusherBits: bitCrusherBits.increment,
    incrementBitCrusherRate: bitCrusherRate.increment,

    incrementLevelDsp1: levelDsp1.increment,
    incrementLevelDsp2: levelDsp2.increment,
    incrementLevelChorus: levelChorus.increment,
    incrementLevelBitCrusher: levelBitCrusher.increment,

    toggleDsp1Source: dsp1Source.toggle,
    toggleDsp2Source: dsp2Source.toggle,
    toggleDsp2Chain: dsp2Chain.toggle,
    toggleChorusSource: chorusSource.toggle,
    toggleChorusMode: chorusMode.toggle,
    toggleBitCrusherSource: bitCrusherSource.toggle,
}

export default commonFxApi