import {
    setSource,
    selectRingMod,
} from './ringModReducer'
import { store } from '../../store'
import ringModMidiApi from './ringModMidiApi'
import controllers from '../../../midi/controllers'
import { togglePropFuncs } from '../common/commonApi'

const source = togglePropFuncs({
    config: controllers.RING_MOD.SOURCE,
    selector: () => selectRingMod(store.getState()).source,
    action: setSource,
    midi: ringModMidiApi.setSource,
})

const ringModApi = {
    setSource: source.set,
    toggleSource: source.toggle,
}

export default ringModApi