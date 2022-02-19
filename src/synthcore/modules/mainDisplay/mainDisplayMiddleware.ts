import { PayloadAction } from '@reduxjs/toolkit'
import { click, increment, release } from '../ui/uiReducer'
import { mainDisplayApi } from '../../synthcoreApi'
import { ApiSource } from '../../types'
import mainDisplayControllers from './mainDisplayControllers'

export const mainDisplayMiddleware = (action: PayloadAction): void => {
    if (increment.match(action)) {
        mainDisplayApi.handleMainDisplayController(action.payload.ctrl.id, action.payload.value, ApiSource.UI)
    } else if (click.match(action)) {
        if(action.payload.ctrl === mainDisplayControllers.GROUP_MENU){
            mainDisplayApi.setCurrentScreen(action.payload.radioButtonIndex || 0, ApiSource.UI)
        } else {
            mainDisplayApi.click(action.payload.ctrl, action.payload.source)
        }
    } else if (release.match(action)) {
        if (action.payload.ctrl === mainDisplayControllers.FUNC_SHIFT) {
            mainDisplayApi.handleShift(false, ApiSource.UI)
        }
    }
}
