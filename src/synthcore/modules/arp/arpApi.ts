import {
    setTempo,
    setOnOff,
    setSync,
    setRange,
    setMode,
    setOutput,
    selectArp, setTrigger
} from './arpReducer'
import { store } from '../../store'
import arpMidiApi from './arpMidiApi'
import controllers from '../../../midi/controllers'
import { numericPropFuncs, togglePropFuncs } from '../common/commonApi'
import { ApiSource } from '../../types'

const tempo = numericPropFuncs({
    selector: () => selectArp(store.getState()).tempo,
    action: setTempo,
    midi: arpMidiApi.setTempo,
})
const output = numericPropFuncs({
    selector: () => selectArp(store.getState()).output,
    action: setOutput,
    midi: arpMidiApi.setOutput,
})

const onOff = togglePropFuncs({
    config: controllers.ARP.ON_OFF,
    selector: () => selectArp(store.getState()).onOff,
    action: setOnOff,
    midi: arpMidiApi.setOnOff,
})
const sync = togglePropFuncs({
    config: controllers.ARP.SYNC,
    selector: () => selectArp(store.getState()).sync,
    action: setSync,
    midi: arpMidiApi.setSync,
})
const range = togglePropFuncs({
    config: controllers.ARP.RANGE,
    selector: () => selectArp(store.getState()).range,
    action: setRange,
    midi: arpMidiApi.setRange,
})

const mode = togglePropFuncs({
    config: controllers.ARP.MODE,
    selector: () => selectArp(store.getState()).mode,
    action: setMode,
    midi: arpMidiApi.setMode,
})

const trigger = togglePropFuncs({
    config: controllers.ARP.TRIGGER,
    selector: () => selectArp(store.getState()).trigger,
    action: setTrigger,
    midi: arpMidiApi.setTrigger,
})

const arpApi = {
    setTempo: tempo.set,
    setOnOff: onOff.set,
    setSync: sync.set,
    setRange: range.set,
    setMode: mode.set,
    setOutput: output.set,
    setTrigger: trigger.set,

    incrementTempo: tempo.increment,
    incrementOutput: output.increment,

    toggleOnOff: onOff.toggle,
    toggleSync: sync.toggle,
    toggleRange: range.toggle,
    toggleMode: mode.toggle,
    toggleTrigger: trigger.toggle,
}

export default arpApi