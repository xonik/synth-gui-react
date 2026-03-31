import { getDefaultController, mergeControllers } from '../controllers/controllersUtils'
import type { Controllers } from '../controllers/types'
import oscControllers from './oscControllers'

export const getDefaultOscState = (): Controllers =>
    mergeControllers([
        getDefaultController(oscControllers.DCO1.KBD, 1),
        getDefaultController(oscControllers.DCO2.KBD, 1),
        getDefaultController(oscControllers.VCO.KBD, 1),
    ])
