import { createHandlers } from '../common/utils'
import ringModControllers from './ringModControllers'

const handlers = createHandlers(
    [
        ringModControllers.SOURCE,
    ])


const api = {
    ...handlers,
}

export default api