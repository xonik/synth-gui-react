import { PayloadAction } from '@reduxjs/toolkit'
import { click, increment } from '../ui/uiReducer'
import { commonFxApi } from '../../synthcoreApi'
import { ApiSource } from '../../types'
import { createClickMapper, createIncrementMapper } from '../common/utils'
import commonFxControllers from './commonFxControllers'

const apiIncrementMapper = createIncrementMapper([

])

const apiClickMapper = createClickMapper([

])

export const commonFxMiddleware = (action: PayloadAction): void => {
    if (increment.match(action)) {
        apiIncrementMapper(action.payload.ctrl, action.payload.value, action.payload.source)
    } else if (click.match(action)) {
        apiClickMapper(action.payload.ctrl, action.payload.source)
    }
}
