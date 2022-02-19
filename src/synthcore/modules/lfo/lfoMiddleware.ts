import { click, increment } from '../ui/uiReducer'
import { lfoApi } from '../../synthcoreApi'
import { toggleStageEnabled, toggleStageSelected } from './lfoReducer'
import { ApiSource } from '../../types'
import { PayloadAction } from '@reduxjs/toolkit'
import lfoControllers from './lfoControllers'
import { createIndexClickMapper, createIndexIncrementMapper } from '../common/utils'

const incrementMapper = createIndexIncrementMapper([
    [lfoControllers(0).RATE, (ctrlIndex: number, value: number) => lfoApi.incrementRate(ctrlIndex, value, ApiSource.UI)],
    [lfoControllers(0).DEPTH, (ctrlIndex: number, value: number) => lfoApi.incrementDepth(ctrlIndex, value, ApiSource.UI)],
    [lfoControllers(0).DELAY, (ctrlIndex: number, value: number) => lfoApi.incrementDelay(ctrlIndex, value, ApiSource.UI)],
])

const clickMapper = createIndexClickMapper([
    [lfoControllers(0).SHAPE, (ctrlIndex: number) => lfoApi.toggleShape(ctrlIndex, ApiSource.UI)],
    [lfoControllers(0).SYNC, (ctrlIndex: number) => lfoApi.toggleSync(ctrlIndex, ApiSource.UI)],
    [lfoControllers(0).RESET, (ctrlIndex: number) => lfoApi.toggleReset(ctrlIndex, ApiSource.UI)],
    [lfoControllers(0).ONCE, (ctrlIndex: number) => lfoApi.toggleOnce(ctrlIndex, ApiSource.UI)],
])

export const lfoMiddleware = (action: PayloadAction): void => {
    if (increment.match(action)) {
        const ctrlIndex = action.payload.ctrlIndex || 0
        incrementMapper(action.payload.ctrl, ctrlIndex, action.payload.value)
    } else if (click.match(action)) {
        const ctrlIndex = action.payload.ctrlIndex || 0
        if(action.payload.ctrl === lfoControllers(0).LFO) {
            lfoApi.setUiLfo(action.payload.radioButtonIndex || 0, ApiSource.UI)
        } else {
            clickMapper(action.payload.ctrl, ctrlIndex)
        }
    } else if (toggleStageEnabled.match(action)) {
        lfoApi.toggleStageEnabled(action.payload.lfo, action.payload.stage, ApiSource.GUI)
    } else if (toggleStageSelected.match(action)) {
        lfoApi.toggleStageSelected(action.payload.lfo, action.payload.stage, ApiSource.GUI)
    }
}
