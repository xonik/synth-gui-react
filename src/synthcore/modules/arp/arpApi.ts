import { createGroupedHandlers } from '../common/utils'
import arpControllers from './arpControllers'

const { set, toggle, increment, getForSave, setFromLoad } = createGroupedHandlers(
    [
        arpControllers.BPM,
        arpControllers.ON_OFF,
        arpControllers.TRIGGER,
        arpControllers.SYNC,
        arpControllers.RANGE,
        arpControllers.MODE,
        arpControllers.EXTENDED_MODE,
        arpControllers.SEQUENCE,
        arpControllers.NOTE_ORDERING,
        arpControllers.SYNC_TO_BIG_TICK,
        arpControllers.RESOLUTION,
    ])

const api = {
    toggle,
    increment,
    set,
    getForSave,
    setFromLoad
}

export default api