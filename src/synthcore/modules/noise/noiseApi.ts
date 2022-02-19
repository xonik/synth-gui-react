import {
    setColour,
    selectNoise,
} from './noiseReducer'
import { store } from '../../store'
import noiseMidiApi from './noiseMidiApi'
import controllers from '../../../midi/controllers'
import { togglePropFuncs } from '../common/commonApi'
import { createClickMapper } from '../common/utils'
import noiseControllers from './noiseControllers'
import { ApiSource } from '../../types'

const colour = togglePropFuncs({
    config: controllers.NOISE.COLOUR,
    selector: () => selectNoise(store.getState()).colour,
    action: setColour,
    midi: noiseMidiApi.setColour,
})

const click = createClickMapper([
    [noiseControllers.COLOUR, (source: ApiSource) => colour.toggle(source)],
])

const noiseApi = {
    setColour: colour.set,
    click,
}

export default noiseApi