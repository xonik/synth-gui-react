import masterClockControllers from './masterClockControllers'
import { selectController, selectUiController, setController, setUiController } from '../controllers/controllersReducer'
import { createSetterFuncs } from '../common/utils'

const setterFuncs = createSetterFuncs(
    [
        masterClockControllers.RATE,
        masterClockControllers.SOURCE,
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