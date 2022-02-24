import { createSetterFuncs } from '../common/utils'
import { selectController, selectUiController, setController, setUiController } from '../controllers/controllersReducer'
import kbdControllers from './kbdControllers'

const setterFuncs = createSetterFuncs(
    [
        kbdControllers.TRANSPOSE,
        kbdControllers.PORTAMENTO,
        kbdControllers.UNISON_DETUNE,
        kbdControllers.HOLD,
        kbdControllers.CHORD,
        kbdControllers.MODE,
    ],
    setController,
    selectController,
    setUiController,
    selectUiController,
)


const api = {
    ...setterFuncs,
}

export default api