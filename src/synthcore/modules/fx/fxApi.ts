import { createSetterFuncs } from '../common/utils'
import fxControllers from './fxControllers'
import { selectController, selectUiController, setController, setUiController } from '../controllers/controllersReducer'

const setterFuncs = createSetterFuncs(
    [
        fxControllers.DISTORTION.IN,
        fxControllers.DISTORTION.DRIVE,
        fxControllers.DISTORTION.CLIP,
        fxControllers.DISTORTION.OUT,
        fxControllers.DISTORTION.LEVEL,
        fxControllers.BIT_CRUSHER.IN,
        fxControllers.BIT_CRUSHER.BITS,
        fxControllers.BIT_CRUSHER.RATE,
        fxControllers.BIT_CRUSHER.LEVEL,
        fxControllers.BIT_CRUSHER.OUT,
    ],
    setController,
    selectController,
    setUiController,
    selectUiController,
)

const api = {
    ...setterFuncs,
}

export default api