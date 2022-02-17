import {
    selectKbd,
    setChord,
    setMode,
    setHold,
    setUnisonDetune,
    setPortamento,
} from './kbdReducer'
import { store } from '../../store'
import kbdMidiApi from './kbdMidiApi'
import controllers from '../../../midi/controllers'
import { numericPropFuncs, togglePropFuncs } from '../common/commonApi'

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

const kbdApi = {
    setPortamento: portamento.set,
    setUnisonDetune: unisonDetune.set,
    setHold: hold.set,
    setChord: chord.set,
    setMode: mode.set,

    incrementPortamento: portamento.increment,
    incrementUnisonDetune: unisonDetune.increment,

    toggleHold: hold.toggle,
    toggleChord: chord.toggle,
    toggleMode: mode.toggle,
}

export default kbdApi