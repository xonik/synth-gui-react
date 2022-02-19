import { PayloadAction } from '@reduxjs/toolkit'
import { click, increment, release } from '../ui/uiReducer'
import { mainDisplayApi } from '../../synthcoreApi'
import { ApiSource } from '../../types'
import mainDisplayControllers from './mainDisplayControllers'

type MainDisplayApiMapperType = {
    [key: number]: (ctrlIndex: number, value: number) => void
}

const clickMapper: MainDisplayApiMapperType = {
    [mainDisplayControllers.FUNC_HOME.id]: () => mainDisplayApi.handleHomeClick(ApiSource.UI),
    [mainDisplayControllers.FUNC_SETTINGS.id]: () => mainDisplayApi.handleSettingsClick(ApiSource.UI),
    [mainDisplayControllers.FUNC_SHIFT.id]: () => mainDisplayApi.handleShift(true, ApiSource.UI),
    [mainDisplayControllers.FUNC_PERFORM.id]: () => mainDisplayApi.handlePerformClick(ApiSource.UI),
    [mainDisplayControllers.FUNC_LOAD.id]: () => mainDisplayApi.handleLoadClick(ApiSource.UI),
    [mainDisplayControllers.FUNC_SAVE.id]: () => mainDisplayApi.handleSaveClick(ApiSource.UI),
    [mainDisplayControllers.FUNC_COMPARE.id]: () => mainDisplayApi.handleCompareClick(ApiSource.UI),
    [mainDisplayControllers.FUNC_ROUTE.id]: () => mainDisplayApi.handleRouteClick(ApiSource.UI),
}


export const mainDisplayMiddleware = (action: PayloadAction): void => {
    if (increment.match(action)) {
        mainDisplayApi.handleMainDisplayController(action.payload.ctrlId, action.payload.value, ApiSource.UI)
    } else if (click.match(action)) {
        if(action.payload.ctrlId === mainDisplayControllers.GROUP_MENU.id){
            mainDisplayApi.setCurrentScreen(action.payload.radioButtonIndex || 0, ApiSource.UI)
        } else {
            clickMapper[action.payload.ctrlId](0, 0)
        }
    } else if (release.match(action)) {
        if (action.payload.ctrlId === mainDisplayControllers.FUNC_SHIFT.id) {
            mainDisplayApi.handleShift(false, ApiSource.UI)
        }
    }
}
