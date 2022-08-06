import { Controllers } from '../controllers/types'
import fxControllers from './fxControllers'
import { getDefaultController } from '../controllers/controllersUtils'
import { mergeControllers } from '../controllers/controllersUtils'

export const getDefaultPreFxState = (): Controllers => mergeControllers([
    getDefaultController(fxControllers.DISTORTION.IN, 1),
    getDefaultController(fxControllers.DISTORTION.OUT, 1),
    getDefaultController(fxControllers.BIT_CRUSHER.IN, 1),
    getDefaultController(fxControllers.BIT_CRUSHER.OUT, 1),
])

