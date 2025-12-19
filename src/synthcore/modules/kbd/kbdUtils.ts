import { Controllers } from '../controllers/types'
import kbdControllers from './kbdControllers'
import { getDefaultController } from '../controllers/controllersUtils'
import { mergeControllers } from '../controllers/controllersUtils'

export const getDefaultKbdState = (): Controllers => mergeControllers([
    getDefaultController(kbdControllers.MODE, 1),
])

