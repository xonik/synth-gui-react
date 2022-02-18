import { click, increment } from '../ui/uiReducer'
import { lfoApi } from '../../synthcoreApi'
import { toggleStageEnabled, toggleStageSelected } from './lfoReducer'
import { ApiSource } from '../../types'
import { LfoControllerId } from './types'
import { PayloadAction } from '@reduxjs/toolkit'

type LfoIncrementMapperType = {
    [key: number]: (ctrlIndex: number, value: number) => void
}

type LfoClickMapperType = {
    [key: number]: (ctrlIndex: number) => void
}

const lfoIncrementMapper: LfoIncrementMapperType = {
    [LfoControllerId.RATE]: (ctrlIndex: number, value: number) => lfoApi.incrementRate(ctrlIndex, value, ApiSource.UI),
    [LfoControllerId.DEPTH]: (ctrlIndex: number, value: number) => lfoApi.incrementDepth(ctrlIndex, value, ApiSource.UI),
    [LfoControllerId.DELAY]: (ctrlIndex: number, value: number) => lfoApi.incrementDelay(ctrlIndex, value, ApiSource.UI),
}

const lfoClickMapper: LfoClickMapperType = {
    [LfoControllerId.SHAPE]: (ctrlIndex: number) => lfoApi.toggleShape(ctrlIndex, ApiSource.UI),
    [LfoControllerId.SYNC]: (ctrlIndex: number) => lfoApi.toggleSync(ctrlIndex, ApiSource.UI),
    [LfoControllerId.RESET]: (ctrlIndex: number) => lfoApi.toggleReset(ctrlIndex, ApiSource.UI),
    [LfoControllerId.ONCE]: (ctrlIndex: number) => lfoApi.toggleOnce(ctrlIndex, ApiSource.UI),
}

export const lfoMiddleware = (action: PayloadAction): void => {
    if (increment.match(action)) {
        const ctrlIndex = action.payload.ctrlIndex || 0
        lfoIncrementMapper[action.payload.ctrlId](ctrlIndex, action.payload.value)
    } else if (click.match(action)) {
        const ctrlIndex = action.payload.ctrlIndex || 0
        if(action.payload.ctrlId === LfoControllerId.LFO_ID) {
            lfoApi.setUiLfo(action.payload.radioButtonIndex || 0, ApiSource.UI)
        } else {
            lfoClickMapper[action.payload.ctrlId](ctrlIndex)
        }
    } else if (toggleStageEnabled.match(action)) {
        lfoApi.toggleStageEnabled(action.payload.lfo, action.payload.stage, ApiSource.GUI)
    } else if (toggleStageSelected.match(action)) {
        lfoApi.toggleStageSelected(action.payload.lfo, action.payload.stage, ApiSource.GUI)
    }
}
