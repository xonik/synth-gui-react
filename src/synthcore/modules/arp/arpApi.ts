import { createSetterFuncs } from '../common/utils'
import arpControllers from './arpControllers'

const { set, toggle, increment } = createSetterFuncs(
    [
        arpControllers.TEMPO,
        arpControllers.ON_OFF,
        arpControllers.TRIGGER,
        arpControllers.SYNC,
        arpControllers.RANGE,
        arpControllers.MODE,
        arpControllers.TRIGGER,
    ])

const api = {
    toggle,
    increment,
    set,
}

export default api