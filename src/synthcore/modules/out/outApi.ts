import outControllers from './outControllers'
import { createHandlers } from '../common/utils'

const { set, toggle, increment } = createHandlers(
    [
        outControllers.VOLUME,
        outControllers.SPREAD,
        outControllers.HEADPHONES,
    ])

const outApi = {
    set,
    increment,
    toggle,
}

export default outApi