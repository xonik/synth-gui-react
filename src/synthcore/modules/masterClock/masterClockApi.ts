import masterClockControllers from './masterClockControllers'
import { createSetterFuncs } from '../common/utils'

const setterFuncs = createSetterFuncs(
    [
        masterClockControllers.RATE,
        masterClockControllers.SOURCE,
    ])


const api = {
    ...setterFuncs,
}

export default api