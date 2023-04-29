import outControllers from './outControllers'
import { createGroupedHandlers } from '../common/utils'

const { set, toggle, increment, getForSave, setFromLoad } = createGroupedHandlers(
    [
        outControllers.VOLUME,
        outControllers.SPREAD,
        outControllers.HEADPHONES,
    ])

const outApi = {
    set,
    increment,
    toggle,
    getForSave,
    setFromLoad
}

export default outApi