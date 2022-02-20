import masterClockControllers from './masterClockControllers'
import { selectController, setController } from '../controllers/controllersReducer'
import { createSetterFuncs } from '../common/utils'

const setterFuncs = createSetterFuncs(
    [
        masterClockControllers.RATE,
        masterClockControllers.SOURCE,
    ],
    setController,
    selectController,
)


const api = {
    ...setterFuncs,
}

export default api