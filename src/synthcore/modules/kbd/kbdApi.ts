import {
    selectKbd,
    setChord,
    setMode,
    setHold,
    setUnisonDetune,
    setPortamento,
    setTranspose as setTransposeAction
} from './kbdReducer'
import { store } from '../../store'
import kbdMidiApi from './kbdMidiApi'
import controllers from '../../../midi/controllers'
import { numericPropFuncs, togglePropFuncs } from '../common/commonApi'
import { ApiSource } from '../../types'
import { dispatch, getBounded } from '../../utils'
import kbdControllers from './kbdControllers'
import { createClickMapper, createIncrementMapper } from '../common/utils'

const portamento = numericPropFuncs({
    selector: () => selectKbd(store.getState()).portamento,
    action: setPortamento,
    midi: kbdMidiApi.setPortamento,
})
const unisonDetune = numericPropFuncs({
    selector: () => selectKbd(store.getState()).unisonDetune,
    action: setUnisonDetune,
    midi: kbdMidiApi.setUnisonDetune,
})

const hold = togglePropFuncs({
    config: controllers.KBD.HOLD,
    selector: () => selectKbd(store.getState()).hold,
    action: setHold,
    midi: kbdMidiApi.setHold,
})
const chord = togglePropFuncs({
    config: controllers.KBD.CHORD,
    selector: () => selectKbd(store.getState()).chord,
    action: setChord,
    midi: kbdMidiApi.setChord,
})
const mode = togglePropFuncs({
    config: controllers.KBD.MODE,
    selector: () => selectKbd(store.getState()).mode,
    action: setMode,
    midi: kbdMidiApi.setMode,
})

const setTranspose = (value: number, source: ApiSource) => {
    const currentValue = selectKbd(store.getState()).transpose
    const boundedValue = getBounded(value, 0, kbdControllers.TRANSPOSE.values.length - 1)
    if (boundedValue === currentValue) {
        return
    }

    dispatch(setTransposeAction({ value: boundedValue }))
    kbdMidiApi.setTranspose(source, boundedValue)
}

const incrementTranspose = (source: ApiSource) => {
    const currentValue = selectKbd(store.getState()).transpose
    setTranspose((currentValue + 1), source)
}

const decrementTranspose = (source: ApiSource) => {
    const currentValue = selectKbd(store.getState()).transpose
    setTranspose((currentValue - 1), source)
}


const increment = createIncrementMapper([
    [kbdControllers.PORTAMENTO, ({value,  source}) => portamento.increment(value, source)],
    [kbdControllers.UNISON_DETUNE, ({value,  source}) => unisonDetune.increment(value, source)],
])

const click = createClickMapper([
    [kbdControllers.HOLD, ({source}) => hold.toggle(source)],
    [kbdControllers.CHORD, ({source}) => chord.toggle(source)],
    [kbdControllers.MODE, ({source}) => mode.toggle(source)],
])

const kbdApi = {
    setPortamento: portamento.set,
    setUnisonDetune: unisonDetune.set,
    setHold: hold.set,
    setChord: chord.set,
    setMode: mode.set,

    click,
    increment,

    setTranspose: mode.set,
    incrementTranspose,
    decrementTranspose,
}

export default kbdApi