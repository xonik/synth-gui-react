import { PayloadAction } from '@reduxjs/toolkit'
import { click, increment } from '../ui/uiReducer'
import { mainDisplayApi } from '../../synthcoreApi'
import { MainDisplayControllerIds, MainDisplayScreenId } from './types'

type MainDisplayApiMapperType = {
    [key: number]: (ctrlIndex: number, value: number) => void
}

const mainDisplayApiMapper: MainDisplayApiMapperType = {
    [MainDisplayControllerIds.MENU_LFO]: () => mainDisplayApi.setCurrentScreen(MainDisplayScreenId.LFO),
    [MainDisplayControllerIds.MENU_OSC]: () => mainDisplayApi.setCurrentScreen(MainDisplayScreenId.OSC),
    [MainDisplayControllerIds.MENU_FILTER]: () => mainDisplayApi.setCurrentScreen(MainDisplayScreenId.FILTER),
    [MainDisplayControllerIds.MENU_ENVELOPE]: () => mainDisplayApi.setCurrentScreen(MainDisplayScreenId.ENV),
    [MainDisplayControllerIds.MENU_MOD]: () => mainDisplayApi.setCurrentScreen(MainDisplayScreenId.MOD),
    [MainDisplayControllerIds.MENU_FX]: () => mainDisplayApi.setCurrentScreen(MainDisplayScreenId.FX),
}
export const mainDisplayMiddleware = (action: PayloadAction): void => {
    if (increment.match(action)) {
        mainDisplayApi.handleMainDisplayController(action.payload.ctrlId, action.payload.value)
    } else if (click.match(action)) {
        mainDisplayApiMapper[action.payload.ctrlId](0, 0)
    }
}
