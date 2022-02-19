import { PayloadAction } from '@reduxjs/toolkit'
import { click, increment, release } from '../ui/uiReducer'
import { mainDisplayApi } from '../../synthcoreApi'
import { ApiSource } from '../../types'
import mainDisplayControllers from './mainDisplayControllers'
import { createClickMapper } from '../common/utils'

const clickMapper = createClickMapper([
    [mainDisplayControllers.FUNC_HOME, () => mainDisplayApi.handleHomeClick(ApiSource.UI)],
    [mainDisplayControllers.FUNC_SETTINGS, () => mainDisplayApi.handleSettingsClick(ApiSource.UI)],
    [mainDisplayControllers.FUNC_SHIFT, () => mainDisplayApi.handleShift(true, ApiSource.UI)],
    [mainDisplayControllers.FUNC_PERFORM, () => mainDisplayApi.handlePerformClick(ApiSource.UI)],
    [mainDisplayControllers.FUNC_LOAD, () => mainDisplayApi.handleLoadClick(ApiSource.UI)],
    [mainDisplayControllers.FUNC_SAVE, () => mainDisplayApi.handleSaveClick(ApiSource.UI)],
    [mainDisplayControllers.FUNC_COMPARE, () => mainDisplayApi.handleCompareClick(ApiSource.UI)],
    [mainDisplayControllers.FUNC_ROUTE, () => mainDisplayApi.handleRouteClick(ApiSource.UI)],
])


export const mainDisplayMiddleware = (action: PayloadAction): void => {
    if (increment.match(action)) {
        mainDisplayApi.handleMainDisplayController(action.payload.ctrl.id, action.payload.value, ApiSource.UI)
    } else if (click.match(action)) {
        if(action.payload.ctrl === mainDisplayControllers.GROUP_MENU){
            mainDisplayApi.setCurrentScreen(action.payload.radioButtonIndex || 0, ApiSource.UI)
        } else {
            clickMapper(action.payload.ctrl)
        }
    } else if (release.match(action)) {
        if (action.payload.ctrl === mainDisplayControllers.FUNC_SHIFT) {
            mainDisplayApi.handleShift(false, ApiSource.UI)
        }
    }
}
