import { createSetterFuncs } from '../common/utils'
import noiseControllers from './noiseControllers'

const setterFuncs = createSetterFuncs(
    [
        noiseControllers.COLOUR,
    ])


const api = {
    ...setterFuncs,
}

export default api