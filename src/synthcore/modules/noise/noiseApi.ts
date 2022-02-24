import { createSetterFuncs } from '../common/utils'
import { selectController, selectUiController, setController, setUiController } from '../controllers/controllersReducer'
import noiseControllers from './noiseControllers'

const setterFuncs = createSetterFuncs(
    [
        noiseControllers.COLOUR,
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