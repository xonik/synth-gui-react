import { PayloadAction } from '@reduxjs/toolkit'
import { click, increment, release } from '../ui/uiReducer'
import { mainDisplayApi } from '../../synthcoreApi'
import { ApiSource } from '../../types'
import mainDisplayControllers from './mainDisplayControllers'
import { MainDisplayScreenId } from './types'

export const mainDisplayMiddleware = (action: PayloadAction): void => {
    if (increment.match(action)) {
        mainDisplayApi.handleMainDisplayController(action.payload.ctrl.id, action.payload.value, ApiSource.UI)
    } else if (click.match(action)) {
        // NB: Click is also handled in default click handler in synthcoreMiddleware
        if(action.payload.ctrl === mainDisplayControllers.GROUP_MENU) {
            mainDisplayApi.setCurrentScreen(action.payload.radioButtonIndex || 0, ApiSource.UI)
        } else if(action.payload.ctrl === mainDisplayControllers.FUNC_SETTINGS){
            mainDisplayApi.setCurrentScreen(MainDisplayScreenId.SETTINGS, ApiSource.UI)
        }
    } else if (release.match(action)) {
        if (action.payload.ctrl === mainDisplayControllers.FUNC_SHIFT) {
            mainDisplayApi.handleShift(false, ApiSource.UI)
        }
    }
}
