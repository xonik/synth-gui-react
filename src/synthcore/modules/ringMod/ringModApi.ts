import { createGroupedHandlers } from '../common/utils'
import ringModControllers from './ringModControllers'

const handlers = createGroupedHandlers(
    [
        ringModControllers.SOURCE,
    ])


const api = {
    ...handlers,
}

export default api