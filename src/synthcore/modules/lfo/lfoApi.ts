import { StageId } from './types'
import {
    NumericLfoPayload,
    selectGuiLfoId,
    selectGuiStageId,
    selectLfo,
    selectLfos,
    selectUiLfoId,
    setCurve,
    setDepth,
    setGuiLfo as setGuiLfoAction,
    setGuiStage,
    setOnce,
    setRate,
    setReset,
    setShape,
    setStageEnabled as setStageEnabledAction,
    setSync,
    setTime,
    setUiLfo as setUiLfoAction,
    unsetGuiStage,
} from './lfoReducer'
import { store } from '../../store'
import { curveFuncs } from '../../../components/curves/curveCalculator'
import { ApiSource } from '../../types'
import { dispatch, getBounded, getQuantized } from '../../utils'
import controllers from '../../../midi/controllers'
import { AnyAction } from '@reduxjs/toolkit'
import { ControllerConfigCCWithValue } from '../../../midi/types'
import { createIndexClickMapper, createIndexIncrementMapper } from '../common/utils'
import lfoControllers from './lfoControllers'

type LfoNumericProperty = {
    selector: (id: number) => number
    action: (payload: NumericLfoPayload) => AnyAction
}

type LfoTogglableProperty = {
    config: ControllerConfigCCWithValue,
    selector: (id: number) => number
    action: (payload: NumericLfoPayload) => AnyAction
}

export const lfoNumericPropFuncs = (property: LfoNumericProperty) => {
    const set = (id: number, value: number, source: ApiSource) => {
        //const boundedValue = getQuantized(getBounded(value))
        const boundedValue = value; //getQuantized(getBounded(value))
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

export const lfoTogglePropFuncs = (property: LfoTogglableProperty) => {
    const set = (id: number, value: number, source: ApiSource) => {
        const currentValue = property.selector(id)
        if (value === currentValue) {
            return
        }
        const boundedValue = getBounded(value, 0, property.config.values.length - 1)

        dispatch(property.action({ lfo: id, value: boundedValue }))
    }

    const toggle = (id: number, source: ApiSource) => {
        const currentValue = property.selector(id)
        set(id, (currentValue + 1) % property.config.values.length, source)
    }

    return {
        set,
        toggle
    }
}

const cannotDisableStage = (stage: StageId) => stage === StageId.ATTACK

const setStageTime = (lfoId: number, stageId: StageId, requestedValue: number, source: ApiSource) => {
    const boundedValue = getQuantized(getBounded(requestedValue))
    const currentTime = selectLfo(lfoId)(store.getState()).stages[stageId].time
    if (boundedValue === currentTime) {
        return
    }

    dispatch(setTime({ lfo: lfoId, stage: stageId, value: boundedValue }))
    //midiApi.setTime(source, lfoId, stageId, boundedValue)
}

const incrementStageTime = (lfoId: number, stageId: StageId, incTime: number, source: ApiSource) => {
    const currentTime = selectLfo(lfoId)(store.getState()).stages[stageId].time
    setStageTime(lfoId, stageId, currentTime + incTime, source)
}

const setStageEnabled = (lfoId: number, stageId: StageId, enabled: boolean, source: ApiSource) => {
    if (cannotDisableStage(stageId)) {
        return
    }

    const lfo = selectLfos(store.getState()).lfos[lfoId]
    if (lfo.stages[stageId].enabled === enabled) {
        return
    }

    dispatch(setStageEnabledAction({ lfo: lfoId, stage: stageId, enabled }))

    //midiApi.setStageEnabled(source, lfoId, stageId, enabled)
}
const toggleStageEnabled = (lfoId: number, stageId: StageId, source: ApiSource) => {
    const lfo = selectLfos(store.getState()).lfos[lfoId]
    const stage = lfo.stages[stageId]
    const enabled = !stage.enabled
    setStageEnabled(lfoId, stageId, enabled, source)
}
const toggleStageSelected = (lfoId: number, stageId: StageId, source: ApiSource) => {
    const currStageId = selectGuiStageId(store.getState())
    if (currStageId === stageId) {
        dispatch(unsetGuiStage({ lfo: -1, stage: stageId }))
    } else {
        dispatch(setGuiStage({ lfo: -1, stage: stageId }))
    }
}
const setStageCurve = (lfoId: number, stageId: StageId, curve: number, source: ApiSource) => {
    const stage = selectLfo(lfoId)(store.getState()).stages[stageId]
    const boundedCurve = getBounded(curve, 0, curveFuncs.length - 1)
    if (stage.curve === boundedCurve) {
        return
    }

    dispatch(setCurve({ lfo: lfoId, stage: stageId, curve: boundedCurve }))
    //midiApi.setCurve(source, lfoId, stageId, curve)
}
const incrementStageCurve = (lfoId: number, stageId: StageId, increment: number, source: ApiSource) => {
    const stage = selectLfo(lfoId)(store.getState()).stages[stageId]
    setStageCurve(lfoId, stageId, stage.curve + increment, source)
}



const rate = lfoNumericPropFuncs({
    selector: (id: number) => selectLfo(id)(store.getState()).rate,
    action: setRate,
})
const depth = lfoNumericPropFuncs({
    selector: (id: number) => selectLfo(id)(store.getState()).depth,
    action: setDepth,
})

const incrementDelay = (id: number, inc: number, source: ApiSource) => {
    const currentValue = selectLfo(id)(store.getState()).stages[StageId.DELAY].time
    setStageTime(id, StageId.DELAY, currentValue + inc, source)
}

const shape = lfoTogglePropFuncs({
    config: controllers.LFO.SHAPE,
    selector: (id: number) => selectLfo(id)(store.getState()).shape,
    action: setShape,
})
const sync = lfoTogglePropFuncs({
    config: controllers.LFO.SYNC,
    selector: (id: number) => selectLfo(id)(store.getState()).sync,
    action: setSync,
})
const reset = lfoTogglePropFuncs({
    config: controllers.LFO.RESET,
    selector: (id: number) => selectLfo(id)(store.getState()).resetOnTrigger,
    action: setReset,
})
const once = lfoTogglePropFuncs({
    config: controllers.LFO.ONCE,
    selector: (id: number) => selectLfo(id)(store.getState()).once,
    action: setOnce,
})


const setGuiLfo = (lfoId: number, source: ApiSource) => {
    const boundedLfo = getBounded(lfoId, 0, selectLfos(store.getState()).lfos.length - 1)
    if (selectGuiLfoId(store.getState()) !== boundedLfo) {
        dispatch(setGuiLfoAction({ lfo: boundedLfo }))
    }
}
const incrementGuiLfo = (increment: number, source: ApiSource) => {
    setGuiLfo(selectGuiLfoId(store.getState()) + increment, source)
}

const setUiLfo = (id: number, source: ApiSource) => {
    const numberOfLfos = selectLfos(store.getState()).lfos.length
    const currentUiLfoId = selectUiLfoId(store.getState())
    if (id !== currentUiLfoId && id < numberOfLfos && id > -1) {
        dispatch(setUiLfoAction({ value: id }))
        //midiApi.setUiLfo(source, id)
    }
}
const toggleUiLfo = (source: ApiSource) => {
    const lfos = selectLfos(store.getState()).lfos.length
    const currentId = selectUiLfoId(store.getState())
    const nextId = (currentId + 1 + lfos) % lfos // + lfo to keep modulo positive
    setUiLfo(nextId, source)
}


const increment = createIndexIncrementMapper([
    [lfoControllers(0).RATE, ({ctrlIndex, value,  source}) => rate.increment(ctrlIndex || 0, value, source)],
    [lfoControllers(0).DEPTH, ({ctrlIndex, value,  source}) => depth.increment(ctrlIndex || 0, value, source)],
    [lfoControllers(0).DELAY, ({ctrlIndex, value,  source}) => incrementDelay(ctrlIndex || 0, value, source)],
])

const click = createIndexClickMapper([
    [lfoControllers(0).SHAPE, ({ctrlIndex,  source}) => shape.toggle(ctrlIndex || 0, source)],
    [lfoControllers(0).SYNC, ({ctrlIndex,  source}) => sync.toggle(ctrlIndex || 0, source)],
    [lfoControllers(0).RESET, ({ctrlIndex,  source}) => reset.toggle(ctrlIndex || 0, source)],
    [lfoControllers(0).ONCE, ({ctrlIndex,  source}) => once.toggle(ctrlIndex || 0, source)],
])

const lfoApi = {
    setStageTime,
    setStageEnabled,
    setStageCurve,

    setShape: shape.set,
    setSync: sync.set,
    setReset: reset.set,
    setOnce: once.set,

    toggleStageEnabled,
    toggleStageSelected,

    incrementStageTime,
    incrementStageCurve,

    setGuiLfo,
    incrementGuiLfo,
    setUiLfo,
    toggleUiLfo,
    
    increment,
    click,
}

export default lfoApi