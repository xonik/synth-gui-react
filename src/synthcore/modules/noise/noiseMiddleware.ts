import { PayloadAction } from '@reduxjs/toolkit'
import { click } from '../ui/uiReducer'
import { noiseApi } from '../../synthcoreApi'
import { ApiSource } from '../../types'
import { NoiseControllerIds } from './types'
import { ApiClickMapperType } from '../common/types'

const clickMapper: ApiClickMapperType = {
    [NoiseControllerIds.COLOUR]: () => noiseApi.toggleColour(ApiSource.UI),
}

export const noiseMiddleware = (action: PayloadAction): void => {
    if (click.match(action)) {
        clickMapper[action.payload.ctrlId]()
    }
}
