import { PayloadAction } from '@reduxjs/toolkit'
import { click, increment } from '../ui/uiReducer'
import { arpApi } from '../../synthcoreApi'
import { ApiSource } from '../../types'
import { ArpControllerIds } from './types'
import { ApiClickMapperType, ApiIncrementMapperType } from '../common/types'

const incrementMapper: ApiIncrementMapperType = {
    [ArpControllerIds.TEMPO]: (value: number) => arpApi.incrementTempo(value, ApiSource.UI),
}

const clickMapper: ApiClickMapperType = {
    [ArpControllerIds.ON_OFF]: () => arpApi.toggleOnOff(ApiSource.UI),
    [ArpControllerIds.TRIGGER]: () => arpApi.toggleTrigger(ApiSource.UI),
    [ArpControllerIds.SYNC]: () => arpApi.toggleSync(ApiSource.UI),
    [ArpControllerIds.RANGE]: () => arpApi.toggleRange(ApiSource.UI),
    [ArpControllerIds.MODE]: () => arpApi.toggleMode(ApiSource.UI),
}


export const arpMiddleware = (action: PayloadAction): void => {
    if (increment.match(action)) {
        incrementMapper[action.payload.ctrlId](action.payload.value)
    } else if (click.match(action)) {
        clickMapper[action.payload.ctrlId]()
    }
}
