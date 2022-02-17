import { PayloadAction } from '@reduxjs/toolkit'
import { click } from '../ui/uiReducer'
import { noiseApi } from '../../synthcoreApi'
import { ApiSource } from '../../types'
import { NoiseControllerIds } from './types'
import { ApiClickMapperType } from '../common/types'

const noiseApiClickMapper: ApiClickMapperType = {
    [NoiseControllerIds.COLOUR]: () => noiseApi.toggleColour(ApiSource.UI),
}

export const noiseMiddleware = (action: PayloadAction): void => {
    if (click.match(action)) {
        noiseApiClickMapper[action.payload.ctrlId]()
    }
}
