import masterClockControllers from './masterClockControllers'
import { createHandlers } from '../common/utils'

const handlers = createHandlers(
    [
        masterClockControllers.RATE,
        masterClockControllers.SOURCE,
    ])


const api = {
    ...handlers,
}

export default api