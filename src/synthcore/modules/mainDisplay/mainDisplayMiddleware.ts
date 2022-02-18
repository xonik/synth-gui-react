import { PayloadAction } from '@reduxjs/toolkit'
import { click, increment, release } from '../ui/uiReducer'
import { envApi, mainDisplayApi } from '../../synthcoreApi'
import { MainDisplayControllerIds, MainDisplayScreenId } from './types'
import { ApiSource } from '../../types'
import { EnvControllerId } from '../env/types'

type MainDisplayApiMapperType = {
    [key: number]: (ctrlIndex: number, value: number) => void
}

const clickMapper: MainDisplayApiMapperType = {
    [MainDisplayControllerIds.MENU_LFO]: () => mainDisplayApi.setCurrentScreen(MainDisplayScreenId.LFO, ApiSource.UI),
    [MainDisplayControllerIds.MENU_OSC]: () => mainDisplayApi.setCurrentScreen(MainDisplayScreenId.OSC, ApiSource.UI),
    [MainDisplayControllerIds.MENU_FILTER]: () => mainDisplayApi.setCurrentScreen(MainDisplayScreenId.FILTER, ApiSource.UI),
    [MainDisplayControllerIds.MENU_ENVELOPE]: () => mainDisplayApi.setCurrentScreen(MainDisplayScreenId.ENV, ApiSource.UI),
    [MainDisplayControllerIds.MENU_MOD]: () => mainDisplayApi.setCurrentScreen(MainDisplayScreenId.MOD, ApiSource.UI),
    [MainDisplayControllerIds.MENU_FX]: () => mainDisplayApi.setCurrentScreen(MainDisplayScreenId.FX, ApiSource.UI),
    [MainDisplayControllerIds.FUNC_HOME]: () => mainDisplayApi.handleHomeClick(ApiSource.UI),
    [MainDisplayControllerIds.FUNC_SETTINGS]: () => mainDisplayApi.handleSettingsClick(ApiSource.UI),
    [MainDisplayControllerIds.FUNC_SHIFT]: () => mainDisplayApi.handleShift(true, ApiSource.UI),
    [MainDisplayControllerIds.FUNC_PERFORM]: () => mainDisplayApi.handlePerformClick(ApiSource.UI),
    [MainDisplayControllerIds.FUNC_LOAD]: () => mainDisplayApi.handleLoadClick(ApiSource.UI),
    [MainDisplayControllerIds.FUNC_SAVE]: () => mainDisplayApi.handleSaveClick(ApiSource.UI),
    [MainDisplayControllerIds.FUNC_COMPARE]: () => mainDisplayApi.handleCompareClick(ApiSource.UI),
    [MainDisplayControllerIds.FUNC_ROUTE]: () => mainDisplayApi.handleRouteClick(ApiSource.UI),
}


export const mainDisplayMiddleware = (action: PayloadAction): void => {
    if (increment.match(action)) {
        mainDisplayApi.handleMainDisplayController(action.payload.ctrlId, action.payload.value, ApiSource.UI)
    } else if (click.match(action)) {
        clickMapper[action.payload.ctrlId](0, 0)
    } else if (release.match(action)) {
        if (action.payload.ctrlId === MainDisplayControllerIds.FUNC_SHIFT) {
            mainDisplayApi.handleShift(false, ApiSource.UI)
        }
    }
}
