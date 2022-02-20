import { createSetterFuncs } from '../common/utils'
import { selectController, setController } from '../controllers/controllersReducer'
import noiseControllers from './noiseControllers'

const setterFuncs = createSetterFuncs(
    [
        noiseControllers.COLOUR,
    ],
    setController,
    selectController,
)


const api = {
    ...setterFuncs,
}

export default api