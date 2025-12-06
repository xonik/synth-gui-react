import { createGroupedHandlers } from '../common/utils'
import kbdControllers from './kbdControllers'

const handlers = createGroupedHandlers(
    [
        kbdControllers.TRANSPOSE,
        kbdControllers.PORTAMENTO,
        kbdControllers.UNISON_DETUNE,
        kbdControllers.HOLD,
        kbdControllers.CHORD,
        kbdControllers.MODE,
        kbdControllers.VOICE_STEALING,
    ])


const api = {
    ...handlers,
}

export default api