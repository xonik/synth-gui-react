import { Controllers } from '../controllers/types'
import srcMixControllers from './srcMixControllers'
import { getDefaultController } from '../controllers/controllersUtils'
import { mergeControllers } from '../controllers/controllersUtils'

export const getDefaultSrcMixState = (): Controllers => mergeControllers([
    getDefaultController(srcMixControllers.LEVEL_OSC1, 1),
    getDefaultController(srcMixControllers.LEVEL_OSC2, 1),
])

export const getDefaultSrcMixUiState = (): Controllers => mergeControllers([
    getDefaultController(srcMixControllers.LEVEL_OSC1, 1),
    getDefaultController(srcMixControllers.LEVEL_OSC2, 1),
])

