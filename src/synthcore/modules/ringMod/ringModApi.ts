import {
    setSource,
    selectRingMod,
} from './ringModReducer'
import { store } from '../../store'
import ringModMidiApi from './ringModMidiApi'
import controllers from '../../../midi/controllers'
import { togglePropFuncs } from '../common/commonApi'
import { createClickMapper, createIncrementMapper } from '../common/utils'
import ringModControllers from './ringModControllers'
import { ApiSource } from '../../types'

const source = togglePropFuncs({
    config: controllers.RING_MOD.SOURCE,
    selector: () => selectRingMod(store.getState()).source,
    action: setSource,
    midi: ringModMidiApi.setSource,
})

const click = createClickMapper([
    [ringModControllers.SOURCE, ({source: apiSource}) => source.toggle(apiSource)],
])
const increment = createIncrementMapper([
])

const ringModApi = {
    setSource: source.set,
    click,
    increment
}

export default ringModApi