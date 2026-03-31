import { getDefaultController, mergeControllers } from '../controllers/controllersUtils'
import type { Controllers } from '../controllers/types'
import fxControllers from './fxControllers'

export const getDefaultPreFxState = (): Controllers =>
    mergeControllers([
        getDefaultController(fxControllers.DISTORTION.IN, 0),
        getDefaultController(fxControllers.DISTORTION.OUT, 1),
        getDefaultController(fxControllers.BIT_CRUSHER.IN, 0),
        getDefaultController(fxControllers.BIT_CRUSHER.OUT, 1),
    ])
