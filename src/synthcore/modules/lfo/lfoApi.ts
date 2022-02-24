import { NUMBER_OF_LFOS, StageId } from './types'
import {
    deselectStage,
    NumericLfoPayload,
    selectGuiLfoId,
    selectGuiStageId,
    selectStage,
    selectUiLfoId,
    setGuiLfo as setGuiLfoAction,
    setUiLfo as setUiLfoAction,
} from './lfoReducer'
import { store } from '../../store'
import { ApiSource } from '../../types'
import { dispatch, getBounded } from '../../utils'
import { AnyAction } from '@reduxjs/toolkit'
import { createSetterFuncs } from '../common/utils'
import { lfoCtrls } from './lfoControllers'
import { selectController, selectUiController, setController, setUiController } from '../controllers/controllersReducer'

type LfoNumericProperty = {
    selector: (id: number) => number
    action: (payload: NumericLfoPayload) => AnyAction
}

export const lfoNumericPropFuncs = (property: LfoNumericProperty) => {
    const set = (id: number, value: number, source: ApiSource) => {
        //const boundedValue = getQuantized(getBounded(value))
        const boundedValue = value //getQuantized(getBounded(value))
        const currentValue = property.selector(id)

        if (boundedValue === currentValue) {
            return
        }

        dispatch(property.action({ lfo: id, value: boundedValue }))
    }

    const increment = (id: number, inc: number, source: ApiSource) => {
        const currentValue = property.selector(id)
        set(id, currentValue + inc, source)
    }

    return {
        set,
        increment
    }
}

const toggleStageSelected = (lfoId: number, stageId: StageId, source: ApiSource) => {
    const currStageId = selectGuiStageId(store.getState())
    if (currStageId === stageId) {
        dispatch(selectStage({ lfo: -1, stage: stageId }))
    } else {
        dispatch(deselectStage({ lfo: -1, stage: stageId }))
    }
}

const setGuiLfo = (lfoId: number, source: ApiSource) => {
    const boundedLfo = getBounded(lfoId, 0, NUMBER_OF_LFOS - 1)
    if (selectGuiLfoId(store.getState()) !== boundedLfo) {
        dispatch(setGuiLfoAction({ lfo: boundedLfo }))
    }
}

const incrementGuiLfo = (increment: number, source: ApiSource) => {
    setGuiLfo(selectGuiLfoId(store.getState()) + increment, source)
}

const setUiLfo = (id: number, source: ApiSource) => {
    const currentUiLfoId = selectUiLfoId(store.getState())
    if (id !== currentUiLfoId && id < NUMBER_OF_LFOS && id > -1) {
        dispatch(setUiLfoAction({ value: id }))
    }
}

const toggleUiLfo = (source: ApiSource) => {
    const currentId = selectUiLfoId(store.getState())
    const nextId = (currentId + 1 + NUMBER_OF_LFOS) % NUMBER_OF_LFOS // + lfo to keep modulo positive
    setUiLfo(nextId, source)
}

const setterFuncs = createSetterFuncs([
        lfoCtrls.RATE,
        lfoCtrls.DEPTH,
        lfoCtrls.DELAY,
        lfoCtrls.SHAPE,
        lfoCtrls.SYNC,
        lfoCtrls.RESET,
        lfoCtrls.ONCE,
    ],
    setController,
    selectController,
    setUiController,
    selectUiController,
)

const lfoApi = {
    toggleStageSelected,

    setGuiLfo,
    incrementGuiLfo,
    setUiLfo,
    toggleUiLfo,

    ...setterFuncs,
}

export default lfoApi