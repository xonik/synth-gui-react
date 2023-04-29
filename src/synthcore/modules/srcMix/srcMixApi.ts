import { createGroupedHandlers } from '../common/utils'
import srcMixControllers from './srcMixControllers'

const handlers = createGroupedHandlers(
    [
        srcMixControllers.LEVEL_OSC1,
        srcMixControllers.LEVEL_OSC2,
        srcMixControllers.LEVEL_OSC3,
        srcMixControllers.LEVEL_NOISE,
        srcMixControllers.LEVEL_RING_MOD,
        srcMixControllers.LEVEL_EXT_AUDIO,

        srcMixControllers.OUT_OSC1,
        srcMixControllers.OUT_OSC2,
        srcMixControllers.OUT_OSC3,
        srcMixControllers.OUT_NOISE,
        srcMixControllers.OUT_RING_MOD,
        srcMixControllers.OUT_EXT_AUDIO,
    ])


const api = {
    ...handlers,
}

export default api
