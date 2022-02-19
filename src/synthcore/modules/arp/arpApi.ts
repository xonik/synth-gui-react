import {
    setTempo,
    setOnOff,
    setSync,
    setRange,
    setMode,
    selectArp,
    setTrigger
} from './arpReducer'
import { store } from '../../store'
import controllers from '../../../midi/controllers'
import { ButtonInputProperty, NumericInputProperty, numericPropFuncs, togglePropFuncs } from '../common/commonApi'
import { createClickMapper, createIncrementMapper, createSetMapper, createSetterFuncs } from '../common/utils'
import arpControllers from './arpControllers'

const tempo = numericPropFuncs({
    selector: () => selectArp(store.getState()).tempo,
    action: setTempo,
})

const onOff = togglePropFuncs({
    config: controllers.ARP.ON_OFF,
    selector: () => selectArp(store.getState()).onOff,
    action: setOnOff,
})
const sync = togglePropFuncs({
    config: controllers.ARP.SYNC,
    selector: () => selectArp(store.getState()).sync,
    action: setSync,
})
const range = togglePropFuncs({
    config: controllers.ARP.RANGE,
    selector: () => selectArp(store.getState()).range,
    action: setRange,
})

const mode = togglePropFuncs({
    config: controllers.ARP.MODE,
    selector: () => selectArp(store.getState()).mode,
    action: setMode,
})

const trigger = togglePropFuncs({
    config: controllers.ARP.TRIGGER,
    selector: () => selectArp(store.getState()).trigger,
    action: setTrigger,
})

const increment = createIncrementMapper([
    [arpControllers.TEMPO, ({ value, source }: NumericInputProperty) => tempo.increment(value, source)],
])

const click = createClickMapper([
    [arpControllers.ON_OFF, ({ source }: ButtonInputProperty) => onOff.toggle(source)],
    [arpControllers.TRIGGER, ({ source }: ButtonInputProperty) => trigger.toggle(source)],
    [arpControllers.SYNC, ({ source }: ButtonInputProperty) => sync.toggle(source)],
    [arpControllers.RANGE, ({ source }: ButtonInputProperty) => range.toggle(source)],
    [arpControllers.MODE, ({ source }: ButtonInputProperty) => mode.toggle(source)],
])

const set = createSetMapper([
    [arpControllers.TEMPO, ({ value, source }: NumericInputProperty) => tempo.set(value, source)],
    [arpControllers.ON_OFF, ({ value, source }: NumericInputProperty) => onOff.toggle(source)],
    [arpControllers.TRIGGER, ({ value, source }: NumericInputProperty) => trigger.toggle(source)],
    [arpControllers.SYNC, ({ value, source }: NumericInputProperty) => sync.toggle(source)],
    [arpControllers.RANGE, ({ value, source }: NumericInputProperty) => range.toggle(source)],
    [arpControllers.MODE, ({ value, source }: NumericInputProperty) => mode.toggle(source)],
    [arpControllers.TRIGGER, ({ value, source }: NumericInputProperty) => trigger.toggle(source)],
])

const arpApi = {
    click,
    increment,
    set,
}

export default arpApi