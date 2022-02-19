import { PayloadAction } from '@reduxjs/toolkit'
import { click, increment } from '../ui/uiReducer'
import { arpApi } from '../../synthcoreApi'
import { ApiSource } from '../../types'

import arpControllers from './arpControllers'
import { createClickMapper, createIncrementMapper } from '../common/utils'

const incrementMapper = createIncrementMapper([
    [arpControllers.TEMPO,  (value: number) => arpApi.incrementTempo(value, ApiSource.UI)],
])

const clickMapper = createClickMapper([
    [arpControllers.ON_OFF, () => arpApi.toggleOnOff(ApiSource.UI)],
    [arpControllers.TRIGGER, () => arpApi.toggleTrigger(ApiSource.UI)],
    [arpControllers.SYNC, () => arpApi.toggleSync(ApiSource.UI)],
    [arpControllers.RANGE, () => arpApi.toggleRange(ApiSource.UI)],
    [arpControllers.MODE, () => arpApi.toggleMode(ApiSource.UI)],
])


export const arpMiddleware = (action: PayloadAction): void => {
    if (increment.match(action)) {
        incrementMapper(action.payload.ctrl, action.payload.value)
    } else if (click.match(action)) {
        clickMapper(action.payload.ctrl)
    }
}
