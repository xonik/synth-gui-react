import {
    setRate,
    setSource,
    selectMasterClock
} from './masterClockReducer'
import { store } from '../../store'
import masterClockMidiApi from './masterClockMidiApi'
import controllers from '../../../midi/controllers'
import { numericPropFuncs, togglePropFuncs } from '../common/commonApi'

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

const masterClockApi = {
    setRate: rate.set,
    setSource: source.set,
    incrementRate: rate.increment,
    toggleSource: source.toggle,
}

export default masterClockApi