import outControllers from './outControllers'
import { createSetterFuncs } from '../common/utils'

const { set, toggle, increment } = createSetterFuncs(
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