import {
    setColour,
    selectNoise,
} from './noiseReducer'
import { store } from '../../store'
import noiseMidiApi from './noiseMidiApi'
import controllers from '../../../midi/controllers'
import { togglePropFuncs } from '../common/commonApi'
import { createClickMapper, createIncrementMapper } from '../common/utils'
import noiseControllers from './noiseControllers'
import { ApiSource } from '../../types'

const colour = togglePropFuncs({
    config: controllers.NOISE.COLOUR,
    selector: () => selectNoise(store.getState()).colour,
    action: setColour,
    midi: noiseMidiApi.setColour,
})

const increment = createIncrementMapper([
])
const click = createClickMapper([
    [noiseControllers.COLOUR, (source: ApiSource) => colour.toggle(source)],
])

const noiseApi = {
    setColour: colour.set,
    click,
    increment
}

export default noiseApi