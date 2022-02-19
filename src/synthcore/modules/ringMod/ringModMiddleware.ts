import { PayloadAction } from '@reduxjs/toolkit'
import { click } from '../ui/uiReducer'
import { ringModApi } from '../../synthcoreApi'
import { ApiSource } from '../../types'
import ringModControllers from './ringModControllers'
import { createClickMapper } from '../common/utils'

const clickMapper = createClickMapper([
    [ringModControllers.SOURCE, () => ringModApi.toggleSource(ApiSource.UI)],
])

export const ringModMiddleware = (action: PayloadAction): void => {
    if (click.match(action)) {
        clickMapper(action.payload.ctrl)
    }
}
