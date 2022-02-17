import {
    setColour,
    selectNoise,
} from './noiseReducer'
import { store } from '../../store'
import noiseMidiApi from './noiseMidiApi'
import controllers from '../../../midi/controllers'
import { togglePropFuncs } from '../common/commonApi'

const colour = togglePropFuncs({
    config: controllers.NOISE.COLOUR,
    selector: () => selectNoise(store.getState()).colour,
    action: setColour,
    midi: noiseMidiApi.setColour,
})

const noiseApi = {
    setColour: colour.set,
    toggleColour: colour.toggle,
}

export default noiseApi