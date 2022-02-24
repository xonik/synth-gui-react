import { createSetterFuncs } from '../common/utils'
import arpControllers from './arpControllers'
import { selectController, selectUiController, setController, setUiController } from '../controllers/controllersReducer'

const { set, toggle, increment } = createSetterFuncs(
    [
        arpControllers.TEMPO,
        arpControllers.ON_OFF,
        arpControllers.TRIGGER,
        arpControllers.SYNC,
        arpControllers.RANGE,
        arpControllers.MODE,
        arpControllers.TRIGGER,
    ],
    setController,
    selectController,
    setUiController,
    selectUiController,
)

const api = {
    toggle,
    increment,
    set,
}

export default api