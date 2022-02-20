import outControllers from './outControllers'
import { createSetterFuncs } from '../common/utils'
import { selectController, setController } from '../controllers/controllersReducer'

const { set, toggle, increment } = createSetterFuncs(
    [
        outControllers.VOLUME,
        outControllers.SPREAD,
        outControllers.HEADPHONES,
    ],
    setController,
    selectController,
)

const outApi = {
    set,
    increment,
    toggle,
}

export default outApi