import { createSetterFuncs } from '../common/utils'
import kbdControllers from './kbdControllers'

const setterFuncs = createSetterFuncs(
    [
        kbdControllers.TRANSPOSE,
        kbdControllers.PORTAMENTO,
        kbdControllers.UNISON_DETUNE,
        kbdControllers.HOLD,
        kbdControllers.CHORD,
        kbdControllers.MODE,
    ])


const api = {
    ...setterFuncs,
}

export default api