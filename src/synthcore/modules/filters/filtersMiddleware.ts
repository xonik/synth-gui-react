import { PayloadAction } from '@reduxjs/toolkit'
import { click, increment } from '../ui/uiReducer'
import { filtersApi } from '../../synthcoreApi'

export const filtersMiddleware = (action: PayloadAction): void => {
    if (increment.match(action)) {
        filtersApi.increment(action.payload.ctrl, action.payload.value, action.payload.source)
    } else if (click.match(action)) {
        filtersApi.click(action.payload.ctrl, action.payload.source)
    }
}
