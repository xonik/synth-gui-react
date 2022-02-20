import { createSetterFuncs } from '../common/utils'
import { selectController, setController } from '../controllers/controllersReducer'
import kbdControllers from './kbdControllers'

const setterFuncs = createSetterFuncs(
    [
        kbdControllers.PORTAMENTO,
        kbdControllers.UNISON_DETUNE,
        kbdControllers.HOLD,
        kbdControllers.CHORD,
        kbdControllers.MODE,
    ],
    setController,
    selectController,
)


const api = {
    ...setterFuncs,
}

export default api