import {
    setLpfLevel,
    setSvfLevel,
    setSine1Level,
    setSine2Level,
    setPan,
    setAmt,
    setFX1,
    setFX2,
    selectPostMixMix,
    selectPostMixOut,
} from './postMixReducer'
import { store } from '../../store'
import postMixMidiApi from './postMixMidiApi'
import { numericPropFuncs } from '../common/commonApi'
import { createClickMapper, createIncrementMapper } from '../common/utils'
import postMixControllers from './postMixControllers'
import { ApiSource } from '../../types'

const lpfLevel = numericPropFuncs({
    selector: () => selectPostMixMix(store.getState()).lpfLevel,
    action: setLpfLevel,
    midi: postMixMidiApi.setLpfLevel,
})
const svfLevel = numericPropFuncs({
    selector: () => selectPostMixMix(store.getState()).svfLevel,
    action: setSvfLevel,
    midi: postMixMidiApi.setSvfLevel,
})
const sine1Level = numericPropFuncs({
    selector: () => selectPostMixMix(store.getState()).sine1Level,
    action: setSine1Level,
    midi: postMixMidiApi.setSine1Level,
})
const sine2Level = numericPropFuncs({
    selector: () => selectPostMixMix(store.getState()).sine2Level,
    action: setSine2Level,
    midi: postMixMidiApi.setSine2Level,
})

const pan = numericPropFuncs({
    selector: () => selectPostMixOut(store.getState()).pan,
    action: setPan,
    midi: postMixMidiApi.setPan,
})
const amt = numericPropFuncs({
    selector: () => selectPostMixOut(store.getState()).amt,
    action: setAmt,
    midi: postMixMidiApi.setAmt,
})
const fx1 = numericPropFuncs({
    selector: () => selectPostMixOut(store.getState()).fx1,
    action: setFX1,
    midi: postMixMidiApi.setFX1,
})
const fx2 = numericPropFuncs({
    selector: () => selectPostMixOut(store.getState()).fx2,
    action: setFX2,
    midi: postMixMidiApi.setFX2,
})


const increment = createIncrementMapper([
    [postMixControllers.LPF, ({value, source}) => lpfLevel.increment(value, source)],
    [postMixControllers.SVF, ({value, source}) => svfLevel.increment(value, source)],
    [postMixControllers.SINE1, ({value, source}) => sine1Level.increment(value, source)],
    [postMixControllers.SINE2, ({value, source}) => sine2Level.increment(value, source)],
    [postMixControllers.PAN, ({value, source}) => pan.increment(value, source)],
    [postMixControllers.AMOUNT, ({value, source}) => amt.increment(value, source)],
    [postMixControllers.FX1_SEND, ({value, source}) => fx1.increment(value, source)],
    [postMixControllers.FX2_SEND, ({value, source}) => fx2.increment(value, source)],
])

const click = createClickMapper([
])

const postMixApi = {
    setLpfLevel: lpfLevel.set,
    setSvfLevel: svfLevel.set,
    setSine1Level: sine1Level.set,
    setSine2Level: sine2Level.set,

    setPan: pan.set,
    setAmt: amt.set,
    setFX1: fx1.set,
    setFX2: fx2.set,

    increment,
    click,
}

export default postMixApi