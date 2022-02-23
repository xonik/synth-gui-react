import { ControllerGroupIds } from '../../types'
import { selectLfoController } from '../lfo/lfoReducer'
import { selectController } from './controllersReducer'

export const getControllerSelector = (ctrlGroup: ControllerGroupIds) => {
    if(ctrlGroup === ControllerGroupIds.LFO) {
        return selectLfoController
    }
    return selectController
}