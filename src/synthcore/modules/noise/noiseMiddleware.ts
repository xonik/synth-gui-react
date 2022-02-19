import { PayloadAction } from '@reduxjs/toolkit'
import { click } from '../ui/uiReducer'
import { noiseApi } from '../../synthcoreApi'
import { ApiSource } from '../../types'
import noiseControllers from './noiseControllers'
import { createClickMapper } from '../common/utils'

const clickMapper = createClickMapper([
    [noiseControllers.COLOUR, () => noiseApi.toggleColour(ApiSource.UI)],
])

export const noiseMiddleware = (action: PayloadAction): void => {
    if (click.match(action)) {
        clickMapper(action.payload.ctrl)
    }
}

