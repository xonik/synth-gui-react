import { ControllerGroupIds } from '../../types'
import { selectUiController } from './controllersReducer'

export const getControllerSelector = (ctrlGroup: ControllerGroupIds) => {
    return selectUiController
}