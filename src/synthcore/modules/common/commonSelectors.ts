import { ControllerGroupIds } from '../../types'
import { selectCommonFxController } from '../commonFx/commonFxReducer'
import { selectOutController } from '../out/outReducer'
import { RootState } from '../../store'

export const getControllerSelector = (ctrlGroup: ControllerGroupIds) => {
    if(ctrlGroup === ControllerGroupIds.COMMON_FX) return selectCommonFxController
    if(ctrlGroup === ControllerGroupIds.OUT) return selectOutController
    return (ctrlId: number) => (state: RootState) => 0
}