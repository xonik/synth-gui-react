import { ApiSource } from '../../types'
import { PayloadAction } from '@reduxjs/toolkit'
import { setGuiMod } from './modsReducer'
import modsApi from './modsApi'

export const modsMiddleware = (action: PayloadAction): void => {
    if (setGuiMod.match(action)) {
        modsApi.setGuiMod(
            action.payload.guiSource,
            action.payload.guiDstFunc,
            action.payload.guiDstParam,
            ApiSource.GUI
        )
    }
}
