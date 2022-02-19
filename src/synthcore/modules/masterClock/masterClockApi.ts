import {
    setRate,
    setSource,
    selectMasterClock
} from './masterClockReducer'
import { store } from '../../store'
import masterClockMidiApi from './masterClockMidiApi'
import controllers from '../../../midi/controllers'
import { numericPropFuncs, togglePropFuncs } from '../common/commonApi'
import { createClickMapper, createIncrementMapper, createSetMapper } from '../common/utils'
import masterClockControllers from './masterClockControllers'
import { ApiSource } from '../../types'

const rate = numericPropFuncs({
    selector: () => selectMasterClock(store.getState()).rate,
    action: setRate,
    midi: masterClockMidiApi.setRate,
})
const source = togglePropFuncs({
    config: controllers.MASTER_CLOCK.SOURCE,
    selector: () => selectMasterClock(store.getState()).source,
    action: setSource,
    midi: masterClockMidiApi.setSource,
})


const increment = createIncrementMapper([
    [masterClockControllers.RATE, ({value,  source}) => rate.increment(value, source)],
])

const click = createClickMapper([
    [masterClockControllers.SOURCE, ({source: apiSource}) => source.toggle(apiSource)],
])

const set = createSetMapper([
    [masterClockControllers.RATE, ({value,  source}) => rate.set(value, source)],
    [masterClockControllers.SOURCE, ({value, source : apiSource}) => source.set(value, apiSource)],
])

const masterClockApi = {
    setRate: rate.set,
    setSource: source.set,
    incrementRate: rate.increment,
    toggleSource: source.toggle,
    increment,
    click,
    set,
}

export default masterClockApi