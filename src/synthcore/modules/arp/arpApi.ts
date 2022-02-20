import { createSetterFuncs } from '../common/utils'
import arpControllers from './arpControllers'
import { selectController, setController } from '../controllers/controllersReducer'

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
)

const api = {
    toggle,
    increment,
    set,
}

export default api