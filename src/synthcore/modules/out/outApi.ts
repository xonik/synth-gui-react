import outControllers from './outControllers'
import { createHandlers } from '../common/utils'

const { set, toggle, increment, getForSave, setFromLoad } = createHandlers(
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