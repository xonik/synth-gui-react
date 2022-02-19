import { PayloadAction } from '@reduxjs/toolkit'
import { click } from '../ui/uiReducer'
import { noiseApi } from '../../synthcoreApi'
import { ApiSource } from '../../types'
import { ApiClickMapperType } from '../common/types'
import noiseControllers from './noiseControllers'

const clickMapper: ApiClickMapperType = {
    [noiseControllers.COLOUR.id]: () => noiseApi.toggleColour(ApiSource.UI),
}

export const noiseMiddleware = (action: PayloadAction): void => {
    if (click.match(action)) {
        clickMapper[action.payload.ctrlId]()
    }
}
