import { createSetterFuncs } from '../common/utils'
import ringModControllers from './ringModControllers'

const setterFuncs = createSetterFuncs(
    [
        ringModControllers.SOURCE,
    ])


const api = {
    ...setterFuncs,
}

export default api