import outControllers from './outControllers'
import { createSetterFuncs } from '../common/utils'
import { selectController, selectUiController, setController, setUiController } from '../controllers/controllersReducer'

const { set, toggle, increment } = createSetterFuncs(
    [
        outControllers.VOLUME,
        outControllers.SPREAD,
        outControllers.HEADPHONES,
    ],
    setController,
    selectController,
    setUiController,
    selectUiController,
)

const outApi = {
    set,
    increment,
    toggle,
}

export default outApi