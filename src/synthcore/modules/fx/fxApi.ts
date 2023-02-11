import { createHandlers } from '../common/utils'
import fxControllers from './fxControllers'

const handlers = createHandlers(
    [
        fxControllers.DISTORTION.IN,
        fxControllers.DISTORTION.DRIVE,
        fxControllers.DISTORTION.OUT,
        fxControllers.DISTORTION.LEVEL,
        fxControllers.BIT_CRUSHER.IN,
        fxControllers.BIT_CRUSHER.BITS,
        fxControllers.BIT_CRUSHER.RATE,
        fxControllers.BIT_CRUSHER.RECON,
        fxControllers.BIT_CRUSHER.LEVEL,
        fxControllers.BIT_CRUSHER.OUT,
    ])

const api = {
    ...handlers,
}

export default api