import outControllers from './outControllers'
import { selectOutController, setController } from './outReducer'
import { createSetterFuncs } from '../common/utils'

const { set, toggle, increment } = createSetterFuncs(
    [
        outControllers.VOLUME,
        outControllers.SPREAD,
        outControllers.HEADPHONES,
    ],
    setController,
    selectOutController,
)

const outApi = {
    set,
    increment,
    click: toggle,
}

export default outApi