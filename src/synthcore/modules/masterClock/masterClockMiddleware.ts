import { PayloadAction } from '@reduxjs/toolkit'
import { click, increment } from '../ui/uiReducer'
import { masterClockApi } from '../../synthcoreApi'
import { ApiSource } from '../../types'
import { createClickMapper, createIncrementMapper } from '../common/utils'
import masterClockControllers from './masterClockControllers'

const incrementMapper = createIncrementMapper([
    [masterClockControllers.RATE, (value: number) => masterClockApi.incrementRate(value, ApiSource.UI)],
])

const clickMapper = createClickMapper([
    [masterClockControllers.SOURCE, () => masterClockApi.toggleSource(ApiSource.UI)],
])


export const masterClockMiddleware = (action: PayloadAction): void => {
    if (increment.match(action)) {
        incrementMapper(action.payload.ctrl, action.payload.value)
    } else if (click.match(action)) {
        clickMapper(action.payload.ctrl)
    }
}
