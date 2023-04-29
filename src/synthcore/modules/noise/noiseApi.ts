import { createGroupedHandlers } from '../common/utils'
import noiseControllers from './noiseControllers'

const handlers = createGroupedHandlers(
    [
        noiseControllers.COLOUR,
    ])


const api = {
    ...handlers,
}

export default api