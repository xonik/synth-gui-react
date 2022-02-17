import { PayloadAction } from '@reduxjs/toolkit'
import { click, increment } from '../ui/uiReducer'
import { arpApi } from '../../synthcoreApi'
import { ApiSource } from '../../types'
import { ArpControllerIds } from './types'
import { ApiClickMapperType, ApiIncrementMapperType } from '../common/types'

const apiIncrementMapper: ApiIncrementMapperType = {
    [ArpControllerIds.TEMPO]: (value: number) => arpApi.incrementTempo(value, ApiSource.UI),
    [ArpControllerIds.OUTPUT]: (value: number) => arpApi.incrementOutput(value, ApiSource.UI),
}

const apiClickMapper: ApiClickMapperType = {
    [ArpControllerIds.ON_OFF]: () => arpApi.toggleOnOff(ApiSource.UI),
    [ArpControllerIds.TRIGGER]: () => arpApi.toggleTrigger(ApiSource.UI),
    [ArpControllerIds.SYNC]: () => arpApi.toggleSync(ApiSource.UI),
    [ArpControllerIds.RANGE]: () => arpApi.toggleRange(ApiSource.UI),
    [ArpControllerIds.MODE]: () => arpApi.toggleMode(ApiSource.UI),
}


export const arpMiddleware = (action: PayloadAction): void => {
    if (increment.match(action)) {
        apiIncrementMapper[action.payload.ctrlId](action.payload.value)
    } else if (click.match(action)) {
        apiClickMapper[action.payload.ctrlId]()
    }
}
