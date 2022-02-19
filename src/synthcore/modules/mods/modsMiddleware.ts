import { ApiSource } from '../../types'
import { PayloadAction } from '@reduxjs/toolkit'
import { setGuiMod } from './modsReducer'
import modsApi from './modsApi'
import { click, increment } from '../ui/uiReducer'
import modsControllers from './modsControllers'

export const modsMiddleware = (action: PayloadAction): void => {
    if (increment.match(action)) {
        modsApi.increment(action.payload.ctrl, action.payload.value, action.payload.source)
    } else if (click.match(action)) {
        if(action.payload.ctrl === modsControllers.ROUTE_BUTTON) {
            modsApi.toggleRouteButton((action.payload.radioButtonIndex || 0) + 1, ApiSource.UI)
        }
    } else if (setGuiMod.match(action)) {
        modsApi.setGuiMod(
            action.payload.guiSource,
            action.payload.guiDstFunc,
            action.payload.guiDstParam,
            ApiSource.GUI
        )
    }
}
