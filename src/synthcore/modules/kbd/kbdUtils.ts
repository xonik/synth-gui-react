import { getDefaultController, mergeControllers } from '../controllers/controllersUtils'
import type { Controllers } from '../controllers/types'
import kbdControllers from './kbdControllers'

export const getDefaultKbdState = (): Controllers => mergeControllers([getDefaultController(kbdControllers.MODE, 1)])
