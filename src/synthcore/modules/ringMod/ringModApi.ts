import {
    setSource,
    selectRingMod,
} from './ringModReducer'
import { store } from '../../store'
import ringModMidiApi from './ringModMidiApi'
import controllers from '../../../midi/controllers'
import { togglePropFuncs } from '../common/commonApi'
import { createClickMapper } from '../common/utils'
import ringModControllers from './ringModControllers'
import { ApiSource } from '../../types'

const source = togglePropFuncs({
    config: controllers.RING_MOD.SOURCE,
    selector: () => selectRingMod(store.getState()).source,
    action: setSource,
    midi: ringModMidiApi.setSource,
})

const click = createClickMapper([
    [ringModControllers.SOURCE, (apiSource: ApiSource) => source.toggle(apiSource)],
])

const ringModApi = {
    setSource: source.set,
    click,
}

export default ringModApi