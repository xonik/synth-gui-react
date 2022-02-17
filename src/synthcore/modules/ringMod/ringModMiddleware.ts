import { PayloadAction } from '@reduxjs/toolkit'
import { click } from '../ui/uiReducer'
import { ringModApi } from '../../synthcoreApi'
import { ApiSource } from '../../types'
import { RingModControllerIds } from './types'
import { ApiClickMapperType } from '../common/types'

const clickMapper: ApiClickMapperType = {
    [RingModControllerIds.SOURCE]: () => ringModApi.toggleSource(ApiSource.UI),
}

export const ringModMiddleware = (action: PayloadAction): void => {
    if (click.match(action)) {
        clickMapper[action.payload.ctrlId]()
    }
}
