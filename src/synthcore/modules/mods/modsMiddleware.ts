import { ApiSource } from '../../types'
import { PayloadAction } from '@reduxjs/toolkit'
import { setGuiMod } from './modsReducer'
import modsApi from './modsApi'
import { click, increment } from '../ui/uiReducer'
import { createIncrementMapper } from '../common/utils'
import modsControllers from './modsControllers'

const incrementMapper = createIncrementMapper([
    [modsControllers.UI_AMOUNT, (value: number) => modsApi.incrementUiAmount(value, ApiSource.UI)],
])

export const modsMiddleware = (action: PayloadAction): void => {
    if (increment.match(action)) {
        incrementMapper(action.payload.ctrl, action.payload.value)
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
