import masterClockControllers from './masterClockControllers'
import { createGroupedHandlers } from '../common/utils'

const handlers = createGroupedHandlers(
    [
        masterClockControllers.RATE,
        masterClockControllers.SOURCE,
    ])


const api = {
    ...handlers,
}

export default api