import { createHandlers } from '../common/utils'
import kbdControllers from './kbdControllers'

const handlers = createHandlers(
    [
        kbdControllers.TRANSPOSE,
        kbdControllers.PORTAMENTO,
        kbdControllers.UNISON_DETUNE,
        kbdControllers.HOLD,
        kbdControllers.CHORD,
        kbdControllers.MODE,
    ])


const api = {
    ...handlers,
}

export default api