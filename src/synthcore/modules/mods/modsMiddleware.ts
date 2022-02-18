import { ApiSource } from '../../types'
import { PayloadAction } from '@reduxjs/toolkit'
import { setGuiMod } from './modsReducer'
import modsApi from './modsApi'
import { click, increment } from '../ui/uiReducer'
import { ApiIncrementMapperType } from '../common/types'
import { ModsControllerIds } from './types'

const incrementMapper: ApiIncrementMapperType = {
    [ModsControllerIds.AMOUNT]: (value: number) => modsApi.incrementUiAmount(value, ApiSource.UI),
}

export const modsMiddleware = (action: PayloadAction): void => {
    if (increment.match(action)) {
        incrementMapper[action.payload.ctrlId](action.payload.value)
    } else if (click.match(action)) {
        if(action.payload.ctrlId === ModsControllerIds.ROUTE_BUTTON) {
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
