import { createHandlers } from '../common/utils'
import arpControllers from './arpControllers'

const { set, toggle, increment, getForSave, setFromLoad } = createHandlers(
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
    getForSave,
    setFromLoad
}

export default api