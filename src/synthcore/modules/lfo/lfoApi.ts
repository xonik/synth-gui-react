import { Curve, NUMBER_OF_LFOS, StageId } from './types'
import {
    deselectStage,
    selectCurrGuiLfoId,
    selectCurrGuiStageId,
    selectCurrUiLfoId,
    selectCustomShapeParams,
    selectStage,
    setCustomShapeParams,
    setGuiLfo as setGuiLfoAction,
    setUiLfo as setUiLfoAction,
} from './lfoReducer'
import { store } from '../../store'
import { ApiSource, ControllerGroupIds } from '../../types'
import { dispatch, getBounded } from '../../utils'
import { createHandlers } from '../common/utils'
import { lfoCtrls } from './lfoControllers'
import { selectController, selectLfoStages, setController } from '../controllers/controllersReducer'
import { ButtonInputProperty, NumericInputProperty } from '../common/types'
import lfoMidiApi, { lfoParamReceive, lfoParamSend } from './lfoMidiApi'
import { curveFuncs } from '../../../components/curves/curveCalculator'
import { BUTTONS } from '../../../midi/buttons'

// helper function - we use indexOf to make sure code works even if ordering of shapes changes
const customShapeIndex = lfoCtrls.SHAPE.values.indexOf(BUTTONS.BUTTONS_LEFT.values.LFO_SHAPE_CUSTOM)

const selectShape = (lfoId: number) => selectController(
    lfoCtrls.SHAPE,
    lfoId)(store.getState())

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

        const { ctrlIndex: lfoId = 0, value: curve, valueIndex: stageId = 0, ctrl, source } = input

        const currentCurve = selectController(ctrl, lfoId, stageId)(store.getState())
        const boundedCurve = getBounded(curve, 0, curveFuncs.length - 1)
        if (currentCurve === boundedCurve) {
            return
        }
        const boundedInput = { ...input, value: boundedCurve }
        dispatch(setController(boundedInput))

        // Update shape as it may have changed
        if (source !== ApiSource.INTERNAL) {
            const detectedShape = shape.detectCurrent(lfoId)
            if (detectedShape) {
                shape.setInStoreIfChanged(lfoId, detectedShape)
            }
            shape.saveCustomShapeParams(lfoId)
            lfoMidiApi.curve.send(boundedInput)
        }
    }

    const setFromOtherAction = (input: NumericInputProperty, stageId: StageId, curve: Curve) => {
        set({
            ctrlGroup: ControllerGroupIds.LFO,
            ctrl: lfoCtrls.CURVE,
            ctrlIndex: input.ctrlIndex,
            valueIndex: stageId,
            value: curve,
            source: ApiSource.INTERNAL
        })
    }

    // TODO: Increment og toggle samme som normal
    const increment = (input: NumericInputProperty) => {
        const { ctrlIndex: lfoId = 0, valueIndex: stageId = 0, value: inc, ctrl } = input
        const currentCurve = selectController(ctrl, lfoId, stageId)(store.getState())
        set({ ...input, value: currentCurve + inc })
    }

    lfoMidiApi.curve.receive(set)

    return {
        set,
        setFromOtherAction,
        increment,
        toggle: (input: ButtonInputProperty) => {
        }
    }
})()

const stageEnabled = (() => {

    const set = (input: NumericInputProperty) => {
        const { ctrlIndex: lfoId = 0, value: enabled, valueIndex: stageId = 0, ctrl, source } = input

        if (cannotDisableStage(stageId)) {
            return
        }

        const currentEnabled = selectController(ctrl, lfoId, stageId)(store.getState())
        if (currentEnabled === enabled) {
            return
        }

        dispatch(setController(input))

        // Update shape as it may have changed
        if (source !== ApiSource.INTERNAL) {
            const detectedShape = shape.detectCurrent(lfoId)
            if (detectedShape) {
                shape.setInStoreIfChanged(lfoId, detectedShape)
            }

            shape.saveCustomShapeParams(lfoId)
            lfoMidiApi.stageEnabled.send(input)
        }

    }

    const setFromOtherAction = (input: NumericInputProperty, stageId: StageId, enabled: boolean) => {
        set({
            ctrlGroup: ControllerGroupIds.LFO,
            ctrl: lfoCtrls.TOGGLE_STAGE,
            ctrlIndex: input.ctrlIndex,
            valueIndex: stageId,
            value: enabled ? 1 : 0,
            source: ApiSource.INTERNAL
        })
    }

    // Increment ok samme som global
    // TODO: som global men må sette loop på button
    const toggle = (input: ButtonInputProperty) => {
        const { ctrlIndex: lfoId = 0, valueIndex: stageId = 0, ctrl } = input

        const currentEnabled = selectController(ctrl, lfoId, stageId)(store.getState())
        const enabled = (currentEnabled + 1) % 2
        set({ ...input, value: enabled })
    }

    lfoMidiApi.stageEnabled.receive(set)

    return {
        set,
        setFromOtherAction,
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
    type ShapeParams = {
        decayEnabled: boolean,
        curves: { [key: number]: Curve }
    }

    // Shapes are indexed on the button MIDI VALUE, not button value  (e.g. not 0-indexed but from whatever
    // BUTTONS.BUTTONS_LEFT.values.LFO_SHAPE_SAW is
    const shapes: { [key: number]: ShapeParams } = {
        [BUTTONS.BUTTONS_LEFT.values.LFO_SHAPE_SAW]: {
            decayEnabled: false,
            curves: {
                [StageId.ATTACK]: Curve.LIN
            }
        },
        [BUTTONS.BUTTONS_LEFT.values.LFO_SHAPE_TRI]: {
            decayEnabled: true,
            curves: {
                [StageId.ATTACK]: Curve.LIN,
                [StageId.DECAY]: Curve.LIN
            }
        },
        [BUTTONS.BUTTONS_LEFT.values.LFO_SHAPE_SQR]: {
            decayEnabled: true,
            curves: {
                [StageId.ATTACK]: Curve.SQUARE,
                [StageId.DECAY]: Curve.SQUARE
            }
        },
        [BUTTONS.BUTTONS_LEFT.values.LFO_SHAPE_SIN]: {
            decayEnabled: true,
            curves: {
                [StageId.ATTACK]: Curve.COSINE,
                [StageId.DECAY]: Curve.COSINE
            }
        },
        [BUTTONS.BUTTONS_LEFT.values.LFO_SHAPE_RANDOM]: {
            decayEnabled: false,
            curves: {
                [StageId.ATTACK]: Curve.RANDOM
            }
        },
    }

    const dispatchShapeActions = (input: NumericInputProperty, boundedShape: number) => {
        if (boundedShape === customShapeIndex) {
            const customShapeParams = selectCustomShapeParams(store.getState())(input.ctrlIndex || 0)
            stageEnabled.setFromOtherAction(input, StageId.DECAY, customShapeParams.decayEnabled);
            stageCurve.setFromOtherAction(input, StageId.ATTACK, customShapeParams.attackCurve)
            stageCurve.setFromOtherAction(input, StageId.DECAY, customShapeParams.decayCurve)
        } else {
            const shapeParams = shapes[lfoCtrls.SHAPE.values[boundedShape]]
            if (shapeParams) {
                stageEnabled.setFromOtherAction(input, StageId.DECAY, shapeParams.decayEnabled);
                Object.entries(shapeParams.curves).forEach(([stageId, curve]) => {
                    stageCurve.setFromOtherAction(input, Number.parseInt(stageId), curve)
                })
            }
        }
    }

    // Use this to update shape whenever decay enabled or curves change
    const detectCurrent = (lfoId: number): number | undefined => {

        const lfoStages = selectLfoStages(lfoId)(store.getState())

        const decayEnabled = lfoStages[StageId.DECAY].enabled === 1
        const attackCurve = lfoStages[StageId.ATTACK].curve
        const decayCurve = lfoStages[StageId.DECAY].curve

        const detectedShape = Object.entries(shapes).find(([, shapeParams]) =>
            shapeParams.decayEnabled === decayEnabled &&
            shapeParams.curves[StageId.ATTACK] === attackCurve &&
            (
                (shapeParams.curves[StageId.DECAY] === decayCurve && decayEnabled) ||
                shapeParams.curves[StageId.DECAY] === undefined
            )
        )

        let shapeId
        if (detectedShape) {
            const shapeMidiValue = Number.parseInt(detectedShape[0])
            shapeId = lfoCtrls.SHAPE.values.indexOf(shapeMidiValue)
        } else {
            shapeId = customShapeIndex
        }

        return shapeId
    }

    const setInStoreIfChanged = (lfoId: number, shapeId: number) => {
        const currShape = selectShape(lfoId)

        if (currShape !== shapeId) {
            dispatch(setController({
                ctrl: lfoCtrls.SHAPE,
                ctrlIndex: lfoId,
                value: shapeId,
            }))
        }
    }

    const saveCustomShapeParams = (lfoId: number) => {
        const lfoStages = selectLfoStages(lfoId)(store.getState())

        const decayEnabled = lfoStages[StageId.DECAY].enabled === 1
        const attackCurve = lfoStages[StageId.ATTACK].curve
        const decayCurve = lfoStages[StageId.DECAY].curve

        const action = setCustomShapeParams({
            lfoId, params: {
                decayEnabled,
                decayCurve,
                attackCurve,
            }
        })
        console.log(action)
        dispatch(action)
    }

    // TODO: CHECK
    const set = (input: NumericInputProperty) => {
        const { ctrlIndex: lfoId = 0, value } = input
        const currShape = selectShape(lfoId)

        const boundedShape = getBounded(value, 0, lfoCtrls.SHAPE.values.length - 1)
        if (boundedShape === currShape) {
            return
        }

        const boundedInput = { ...input, value: boundedShape }

        dispatch(setController(boundedInput))
        dispatchShapeActions(input, boundedShape)

        // TODO: CHECK if possible to replace with internal
        lfoParamSend(boundedInput, (value: number) => value)
    }

    const increment = (input: NumericInputProperty) => {
        const { ctrlIndex: lfoId = 0, value: inc } = input
        const currShape = selectShape(lfoId)

        set({ ...input, value: currShape + inc })
    }

    lfoParamReceive(lfoCtrls.SHAPE, set, (midiValue: number) => ({ value: midiValue }))

    const toggle = (input: ButtonInputProperty) => {
        const { ctrlIndex: lfoId = 0, ctrl } = input

        const currentShape = selectController(ctrl, lfoId)(store.getState())
        const shape = (currentShape + 1) % (input.ctrl.values?.length || 1)
        set({ ...input, value: shape })
    }

    return {
        set,
        setInStoreIfChanged,
        detectCurrent,
        saveCustomShapeParams,
        increment,
        toggle,
    }
})()

const { increment: commonInc, toggle: commonToggle, set: commonSet } = createHandlers([
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

const customHandlers = {
    [lfoCtrls.CURVE.id]: stageCurve,
    [lfoCtrls.TOGGLE_STAGE.id]: stageEnabled,
    [lfoCtrls.INVERT.id]: invert,
    [lfoCtrls.MAX_LOOPS.id]: maxLoops,
    [lfoCtrls.SHAPE.id]: shape,
}

const increment = (input: NumericInputProperty) => {
    customHandlers[input.ctrl.id]?.increment(input)
    commonInc(input)
}

const toggle = (input: ButtonInputProperty) => {
    customHandlers[input.ctrl.id]?.toggle(input)
    commonToggle(input)
}

const set = (input: NumericInputProperty) => {
    customHandlers[input.ctrl.id]?.set(input)
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

    // TODO getForSave, setFromLoad
    getForSave: () => {},
    setFromLoad: (patchController: any) => {}
}

export default lfoApi