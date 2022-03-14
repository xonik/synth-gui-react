import { Controllers } from '../controllers/types'
import oscControllers from './oscControllers'
import { getDefaultController } from '../controllers/controllersUtils'
import { mergeControllers } from '../controllers/controllersUtils'

export const getDefaultOscState = (): Controllers => mergeControllers([
    getDefaultController(oscControllers.DCO1.KBD, 1),
    getDefaultController(oscControllers.DCO2.KBD, 1),
    getDefaultController(oscControllers.VCO.KBD, 1),
])