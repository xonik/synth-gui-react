import { PayloadAction } from '@reduxjs/toolkit'
import { click, increment } from '../ui/uiReducer'
import { arpApi } from '../../synthcoreApi'
import { ApiSource } from '../../types'
import { ApiClickMapperType, ApiIncrementMapperType } from '../common/types'
import arpControllers from './arpControllers'

const incrementMapper: ApiIncrementMapperType = {
    [arpControllers.TEMPO.id]: (value: number) => arpApi.incrementTempo(value, ApiSource.UI),
}

const clickMapper: ApiClickMapperType = {
    [arpControllers.ON_OFF.id]: () => arpApi.toggleOnOff(ApiSource.UI),
    [arpControllers.TRIGGER.id]: () => arpApi.toggleTrigger(ApiSource.UI),
    [arpControllers.SYNC.id]: () => arpApi.toggleSync(ApiSource.UI),
    [arpControllers.RANGE.id]: () => arpApi.toggleRange(ApiSource.UI),
    [arpControllers.MODE.id]: () => arpApi.toggleMode(ApiSource.UI),
}


export const arpMiddleware = (action: PayloadAction): void => {
    if (increment.match(action)) {
        incrementMapper[action.payload.ctrlId](action.payload.value)
    } else if (click.match(action)) {
        clickMapper[action.payload.ctrlId]()
    }
}
