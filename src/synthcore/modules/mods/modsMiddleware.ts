import { ApiSource } from '../../types'
import { PayloadAction } from '@reduxjs/toolkit'
import { setGuiMod } from './modsReducer'
import modsApi from './modsApi'
import { click, increment, UiButtonControllerPayload, UiNumericControllerPayload } from '../ui/uiReducer'
import modsControllers from './modsControllers'
import { getVoiceGroupIndex } from "../voices/currentVoiceGroupIndex"

export const modsMiddleware = (action: PayloadAction<UiNumericControllerPayload | UiButtonControllerPayload>): void => {
    const voiceGroupIndex = getVoiceGroupIndex()
    if (increment.match(action)) {
        modsApi.increment({
            ...action.payload,
            voiceGroupIndex
        })
    } else if (click.match(action)) {
        if (action.payload.ctrl === modsControllers.ROUTE_BUTTON) {
            modsApi.toggleRouteButton((action.payload.radioButtonIndex || 0) + 1, ApiSource.UI)
        }
    } else if (setGuiMod.match(action)) {
        // TODO: Not sure why typescript doesn't complain here, as the payload is not part of the action definition above
        modsApi.setGuiMod(
            action.payload.guiSource,
            action.payload.guiDstFunc,
            action.payload.guiDstParam,
            ApiSource.GUI
        )
    }
}
