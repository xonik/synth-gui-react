import { createHandlers } from '../common/utils'
import noiseControllers from './noiseControllers'

const handlers = createHandlers(
    [
        noiseControllers.COLOUR,
    ])


const api = {
    ...handlers,
}

export default api