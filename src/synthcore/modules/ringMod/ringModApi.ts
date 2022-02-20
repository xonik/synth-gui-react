import { createSetterFuncs } from '../common/utils'
import { selectController, setController } from '../controllers/controllersReducer'
import ringModControllers from './ringModControllers'

const setterFuncs = createSetterFuncs(
    [
        ringModControllers.SOURCE,
    ],
    setController,
    selectController,
)


const api = {
    ...setterFuncs,
}

export default api