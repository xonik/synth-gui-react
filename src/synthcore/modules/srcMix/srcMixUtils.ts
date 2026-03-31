import { getDefaultController, mergeControllers } from '../controllers/controllersUtils'
import type { Controllers } from '../controllers/types'
import srcMixControllers from './srcMixControllers'

export const getDefaultSrcMixState = (): Controllers =>
    mergeControllers([
        getDefaultController(srcMixControllers.LEVEL_OSC1, 1),
        getDefaultController(srcMixControllers.LEVEL_OSC2, 0),
        getDefaultController(srcMixControllers.OUT_OSC1, 3),
        getDefaultController(srcMixControllers.OUT_OSC2, 3),
        getDefaultController(srcMixControllers.OUT_OSC3, 1),
        getDefaultController(srcMixControllers.OUT_NOISE, 1),
        getDefaultController(srcMixControllers.OUT_RING_MOD, 1),
        getDefaultController(srcMixControllers.OUT_EXT_AUDIO, 1),
    ])

export const getDefaultSrcMixUiState = (): Controllers =>
    mergeControllers([
        getDefaultController(srcMixControllers.LEVEL_OSC1, 1),
        getDefaultController(srcMixControllers.LEVEL_OSC2, 0),
    ])
