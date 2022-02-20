import { ControllerGroupIds } from '../../types'
import { selectLfoController } from '../lfo/lfoReducer'
import { selectController } from '../controllers/controllersReducer'
import { selectEnvController } from '../env/envReducer'

export const getControllerSelector = (ctrlGroup: ControllerGroupIds) => {
    if(ctrlGroup === ControllerGroupIds.LFO) {
        return selectLfoController
    }
    if(ctrlGroup === ControllerGroupIds.ENV){
        return selectEnvController
    }
    return selectController
}