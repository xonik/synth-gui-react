import { click, increment } from '../ui/uiReducer'
import { lfoApi } from '../../synthcoreApi'
import { toggleStageEnabled, toggleStageSelected } from './lfoReducer'
import { ApiSource } from '../../types'
import { PayloadAction } from '@reduxjs/toolkit'
import lfoControllers from './lfoControllers'

type LfoIncrementMapperType = {
    [key: number]: (ctrlIndex: number, value: number) => void
}

type LfoClickMapperType = {
    [key: number]: (ctrlIndex: number) => void
}

const lfoIncrementMapper: LfoIncrementMapperType = {
    [lfoControllers(0).RATE.id]: (ctrlIndex: number, value: number) => lfoApi.incrementRate(ctrlIndex, value, ApiSource.UI),
    [lfoControllers(0).DEPTH.id]: (ctrlIndex: number, value: number) => lfoApi.incrementDepth(ctrlIndex, value, ApiSource.UI),
    [lfoControllers(0).DELAY.id]: (ctrlIndex: number, value: number) => lfoApi.incrementDelay(ctrlIndex, value, ApiSource.UI),
}

const lfoClickMapper: LfoClickMapperType = {
    [lfoControllers(0).SHAPE.id]: (ctrlIndex: number) => lfoApi.toggleShape(ctrlIndex, ApiSource.UI),
    [lfoControllers(0).SYNC.id]: (ctrlIndex: number) => lfoApi.toggleSync(ctrlIndex, ApiSource.UI),
    [lfoControllers(0).RESET.id]: (ctrlIndex: number) => lfoApi.toggleReset(ctrlIndex, ApiSource.UI),
    [lfoControllers(0).ONCE.id]: (ctrlIndex: number) => lfoApi.toggleOnce(ctrlIndex, ApiSource.UI),
}

export const lfoMiddleware = (action: PayloadAction): void => {
    if (increment.match(action)) {
        const ctrlIndex = action.payload.ctrlIndex || 0
        lfoIncrementMapper[action.payload.ctrlId](ctrlIndex, action.payload.value)
    } else if (click.match(action)) {
        const ctrlIndex = action.payload.ctrlIndex || 0
        if(action.payload.ctrlId === lfoControllers(0).LFO.id) {
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
