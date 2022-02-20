import { ControllerGroupIds } from '../../types'
import { selectLfoController } from '../lfo/lfoReducer'
import { selectController } from '../controllers/controllersReducer'

export const getControllerSelector = (ctrlGroup: ControllerGroupIds) => {
    if(ctrlGroup === ControllerGroupIds.LFO) {
        return selectLfoController
    }
    return selectController
}