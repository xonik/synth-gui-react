import { NUMBER_OF_LFOS, StageId } from './types'
import {
    deselectStage,
    selectCurrGuiLfoId,
    selectCurrGuiStageId,
    selectStage,
    selectCurrUiLfoId,
    setGuiLfo as setGuiLfoAction,
    setUiLfo as setUiLfoAction,
} from './lfoReducer'
import { store } from '../../store'
import { ApiSource } from '../../types'
import { dispatch, getBounded } from '../../utils'
import { createSetterFuncs } from '../common/utils'
import { lfoCtrls } from './lfoControllers'
import { selectController, setController } from '../controllers/controllersReducer'
import { ButtonInputProperty, NumericInputProperty } from '../common/types'
import lfoMidiApi, { lfoParamReceive, lfoParamSend } from './lfoMidiApi'
import { curveFuncs } from '../../../components/curves/curveCalculator'

const toggleStageSelected = (lfoId: number, stageId: StageId, source: ApiSource) => {
    const currStageId = selectCurrGuiStageId(store.getState())
    if (currStageId === stageId) {
        dispatch(deselectStage({ lfo: -1, stage: stageId }))
    } else {
        dispatch(selectStage({ lfo: -1, stage: stageId }))
    }
}

const setGuiLfo = (lfoId: number, source: ApiSource) => {
    const boundedLfo = getBounded(lfoId, 0, NUMBER_OF_LFOS - 1)
    if (selectCurrGuiLfoId(store.getState()) !== boundedLfo) {
        dispatch(setGuiLfoAction({ lfo: boundedLfo }))
    }
}

const incrementGuiLfo = (increment: number, source: ApiSource) => {
    setGuiLfo(selectCurrGuiLfoId(store.getState()) + increment, source)
}

const setUiLfo = (id: number, source: ApiSource) => {
    const currentUiLfoId = selectCurrUiLfoId(store.getState())
    if (id !== currentUiLfoId && id < NUMBER_OF_LFOS && id > -1) {
        dispatch(setUiLfoAction({ value: id }))
    }
}

const toggleUiLfo = (source: ApiSource) => {
    const currentId = selectCurrUiLfoId(store.getState())
    const nextId = (currentId + 1 + NUMBER_OF_LFOS) % NUMBER_OF_LFOS // + lfo to keep modulo positive
    setUiLfo(nextId, source)
}

const cannotDisableStage = (stage: StageId) => stage === StageId.ATTACK || stage === StageId.STOPPED

const stageCurve = (() => {
    const set = (input: NumericInputProperty) => {

        const { ctrlIndex: lfoId = 0, value: curve, valueIndex: stageId = 0, ctrl } = input

        const currentCurve = selectController(ctrl, lfoId, stageId)(store.getState())
        const boundedCurve = getBounded(curve, 0, curveFuncs.length - 1)
        if (currentCurve === boundedCurve) {
            return
        }
        const boundedInput = { ...input, value: boundedCurve }
        dispatch(setController(boundedInput))
        lfoMidiApi.curve.send(boundedInput)
    }

    const increment = (input: NumericInputProperty) => {
        const { ctrlIndex: lfoId = 0, valueIndex: stageId = 0, value: inc, ctrl } = input
        const currentCurve = selectController(ctrl, lfoId, stageId)(store.getState())
        set({ ...input, value: currentCurve + inc })
    }

    lfoMidiApi.curve.receive(set)

    return {
        set,
        increment,
        toggle: (input: ButtonInputProperty) => {
        }
    }
})()

const stageEnabled = (() => {

    const set = (input: NumericInputProperty) => {
        const { ctrlIndex: lfoId = 0, value: enabled, valueIndex: stageId = 0, ctrl } = input

        if (cannotDisableStage(stageId)) {
            return
        }

        const currentEnabled = selectController(ctrl, lfoId, stageId)(store.getState())
        if (currentEnabled === enabled) {
            return
        }

        dispatch(setController(input))

        lfoMidiApi.stageEnabled.send(input)
    }

    const toggle = (input: ButtonInputProperty) => {
        const { ctrlIndex: lfoId = 0, valueIndex: stageId = 0, ctrl } = input

        const currentEnabled = selectController(ctrl, lfoId, stageId)(store.getState())
        const enabled = (currentEnabled + 1) % 2
        set({ ...input, value: enabled })
    }

    lfoMidiApi.stageEnabled.receive(set)

    return {
        set,
        toggle,
        increment: (input: NumericInputProperty) => {
        }
    }
})()

const invert = (() => {
    const set = (input: NumericInputProperty) => {
        const { ctrlIndex: lfoId = 0, value } = input
        const currInvert = selectController(
            input.ctrl,
            lfoId)(store.getState())

        const boundedInvert = getBounded(value, 0, input.ctrl.values?.length || 1)
        console.log('inv', boundedInvert)
        if (boundedInvert === currInvert) {
            return
        }

        const boundedInput = { ...input, value: boundedInvert }
        dispatch(setController(boundedInput))
        lfoParamSend(boundedInput, (value: number) => value)
    }

    const toggle = (input: ButtonInputProperty) => {
        const { ctrlIndex: lfoId = 0, ctrl } = input

        const currentEnabled = selectController(ctrl, lfoId)(store.getState())
        const enabled = (currentEnabled + 1) % (input.ctrl.values?.length || 1)
        set({ ...input, value: enabled })
    }

    lfoParamReceive(lfoCtrls.INVERT, set)

    return {
        set,
        increment: (input: NumericInputProperty) => {

        },
        toggle,
    }
})()

const maxLoops = (() => {
    const set = (input: NumericInputProperty) => {
        const { ctrlIndex: lfoId = 0, value } = input
        const currMaxLoops = selectController(
            lfoCtrls.MAX_LOOPS,
            lfoId)(store.getState())

        const boundedMaxLoops = getBounded(value, 1, 127)
        if (boundedMaxLoops === currMaxLoops) {
            return
        }
        const boundedInput = { ...input, value: boundedMaxLoops }
        dispatch(setController(boundedInput))
        lfoParamSend(boundedInput, (value: number) => value)
    }

    const increment = (input: NumericInputProperty) => {
        const { ctrlIndex: lfoId = 0, value: inc } = input
        const currMaxLoops = selectController(
            lfoCtrls.MAX_LOOPS,
            lfoId)(store.getState())

        set({ ...input, value: currMaxLoops + inc })
    }

    lfoParamReceive(lfoCtrls.MAX_LOOPS, set, (midiValue: number) => ({ value: midiValue }))

    return {
        set,
        increment,
        toggle: (input: ButtonInputProperty) => {
        }
    }
})()

// TODO: Could listen to set-event from 'normal' handler instead.
const shape = (() => {
    const set = (input: NumericInputProperty) => {
        const { ctrlIndex: lfoId = 0, value } = input
        const currShape = selectController(
            lfoCtrls.SHAPE,
            lfoId)(store.getState())

        const boundedShape = getBounded(value, 0, lfoCtrls.SHAPE.values.length-1)
        if (boundedShape === currShape) {
            return
        }
        // TODO: Update LFO here!
        const boundedInput = { ...input, value: boundedShape }
        dispatch(setController(boundedInput))
        lfoParamSend(boundedInput, (value: number) => value)
    }

    const increment = (input: NumericInputProperty) => {
        console.log("Inc to")
        const { ctrlIndex: lfoId = 0, value: inc } = input
        const currShape = selectController(
            lfoCtrls.SHAPE,
            lfoId)(store.getState())

        set({ ...input, value: currShape + inc })
    }

    lfoParamReceive(lfoCtrls.SHAPE, set, (midiValue: number) => ({ value: midiValue }))

    const toggle = (input: ButtonInputProperty) => {
        const { ctrlIndex: envId = 0, ctrl } = input

        const currentEnabled = selectController(ctrl, envId)(store.getState())
        const enabled = (currentEnabled + 1) % (input.ctrl.values?.length || 1)
        set({ ...input, value: enabled })
    }

    return {
        set,
        increment,
        toggle,
    }
})()

const { increment: commonInc, toggle: commonToggle, set: commonSet } = createSetterFuncs([
        lfoCtrls.RATE,
        lfoCtrls.DELAY,
        lfoCtrls.SYNC,
        lfoCtrls.RESET,
        lfoCtrls.RESET_ON_TRIGGER,
        lfoCtrls.RESET_ON_STOP,
        lfoCtrls.RESET_LEVEL_ON_CLOCK,
        lfoCtrls.SYNC_TO_CLOCK,
        lfoCtrls.GATED,
        lfoCtrls.LOOP,
        lfoCtrls.LOOP_MODE,
        lfoCtrls.RANDOM_PHASE,
        lfoCtrls.PHASE_OFFSET,
        lfoCtrls.LEVEL_OFFSET,
        lfoCtrls.BALANCE,
        lfoCtrls.BIPOLAR,
        lfoCtrls.DEPTH,
    ],
    { send: lfoParamSend, receive: lfoParamReceive })

const customSetterFuncs = {
    [lfoCtrls.CURVE.id]: stageCurve,
    [lfoCtrls.TOGGLE_STAGE.id]: stageEnabled,
    [lfoCtrls.INVERT.id]: invert,
    [lfoCtrls.MAX_LOOPS.id]: maxLoops,
    [lfoCtrls.SHAPE.id]: shape,
}

const increment = (input: NumericInputProperty) => {
    customSetterFuncs[input.ctrl.id]?.increment(input)
    commonInc(input)
}

const toggle = (input: ButtonInputProperty) => {
    customSetterFuncs[input.ctrl.id]?.toggle(input)
    commonToggle(input)
}

const set = (input: NumericInputProperty) => {
    customSetterFuncs[input.ctrl.id]?.set(input)
    commonSet(input)
}

const lfoApi = {

    toggleStageSelected,

    setGuiLfo,
    incrementGuiLfo,
    setUiLfo,
    toggleUiLfo,

    increment,
    toggle,
    set,
}

export default lfoApi