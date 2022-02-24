import { createSetterFuncs } from '../common/utils'
import { selectController, selectUiController, setController, setUiController } from '../controllers/controllersReducer'
import ringModControllers from './ringModControllers'

const setterFuncs = createSetterFuncs(
    [
        ringModControllers.SOURCE,
    ])


const api = {
    ...setterFuncs,
}

export default api