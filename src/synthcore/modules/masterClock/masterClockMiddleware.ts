import { PayloadAction } from '@reduxjs/toolkit'
import { click, increment } from '../ui/uiReducer'
import { masterClockApi } from '../../synthcoreApi'
import { ApiSource } from '../../types'
import { MasterClockControllerIds } from './types'
import { ApiClickMapperType, ApiIncrementMapperType } from '../common/types'

const incrementMapper: ApiIncrementMapperType = {
    [MasterClockControllerIds.RATE]: (value: number) => masterClockApi.incrementRate(value, ApiSource.UI),
}

const clickMapper: ApiClickMapperType = {
    [MasterClockControllerIds.SOURCE]: () => masterClockApi.toggleSource(ApiSource.UI),
}


export const masterClockMiddleware = (action: PayloadAction): void => {
    if (increment.match(action)) {
        incrementMapper[action.payload.ctrlId](action.payload.value)
    } else if (click.match(action)) {
        clickMapper[action.payload.ctrlId]()
    }
}
