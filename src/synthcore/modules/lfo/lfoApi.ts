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
import { ControllerHandler, createDefaultHandlers, groupHandlers } from '../common/utils'
import { lfoCtrls } from './lfoControllers'
import { selectController, selectLfoStages, setController } from '../controllers/controllersReducer'
import { ButtonInputProperty, NumericInputProperty, PatchControllers } from '../common/types'
import lfoMidiApi, { lfoParamReceive, lfoParamSend } from './lfoMidiApi'
import { curveFuncs } from '../../../components/curves/curveCalculator'
import { BUTTONS } from '../../../midi/buttons'
import deepmerge from 'deepmerge'

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

const cannotDisableStage = (stage: StageId) => !lfoCtrls.TOGGLE_STAGE.legalValueIndexes?.includes(stage)

class StageCurveControllerHandler extends ControllerHandler {

    constructor() {
        super(lfoCtrls.CURVE, {
            receive: lfoMidiApi.curve.receive
        })
    }

    defaultSet(input: NumericInputProperty) {

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
            const detectedShape = shapeControllerHandler.detectCurrent(lfoId)
            if (detectedShape) {
                shapeControllerHandler.setInStoreIfChanged(lfoId, detectedShape)
            }
            shapeControllerHandler.saveCustomShapeParams(lfoId)
            lfoMidiApi.curve.send(boundedInput)
        }
    }

    setFromOtherAction(input: NumericInputProperty, stageId: StageId, curve: Curve) {
        this.set({
            ctrlGroup: ControllerGroupIds.LFO,
            ctrl: lfoCtrls.CURVE,
            ctrlIndex: input.ctrlIndex,
            valueIndex: stageId,
            value: curve,
            source: ApiSource.INTERNAL
        })
    }
}

const stagesCurveControllerHandler = new StageCurveControllerHandler()

class StageEnabledControllerHandler extends ControllerHandler {

    constructor() {
        super(lfoCtrls.TOGGLE_STAGE, {
            receive: lfoMidiApi.stageEnabled.receive
        })
    }

    defaultSet(input: NumericInputProperty) {
        const { ctrlIndex: lfoId = 0, value: enabled, valueIndex: stageId = 0, source } = input

        if (cannotDisableStage(stageId)) {
            return
        }

        const currentEnabled = selectController(this.ctrl, lfoId, stageId)(store.getState())
        if (currentEnabled === enabled) {
            return
        }

        dispatch(setController(input))

        // Update shape as it may have changed
        if (source !== ApiSource.INTERNAL) {
            const detectedShape = shapeControllerHandler.detectCurrent(lfoId)
            if (detectedShape) {
                shapeControllerHandler.setInStoreIfChanged(lfoId, detectedShape)
            }

            shapeControllerHandler.saveCustomShapeParams(lfoId)
            lfoMidiApi.stageEnabled.send(input)
        }

    }

    setFromOtherAction(input: NumericInputProperty, stageId: StageId, enabled: boolean) {
        this.set({
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
    toggle(input: ButtonInputProperty) {
        const { ctrlIndex: lfoId = 0, valueIndex: stageId = 0 } = input

        const currentEnabled = selectController(this.ctrl, lfoId, stageId)(store.getState())
        const enabled = (currentEnabled + 1) % 2
        this.set({ ...input, value: enabled })
    }
}

const stagesEnabledControllerHandler = new StageEnabledControllerHandler()

class InvertControllerHandler extends ControllerHandler {

    constructor() {
        super(lfoCtrls.INVERT, {
            receive: lfoParamReceive
        })
    }

    defaultSet(input: NumericInputProperty) {
        const { ctrlIndex: lfoId = 0, value } = input
        const currInvert = selectController(
            this.ctrl,
            lfoId)(store.getState())

        const boundedInvert = getBounded(value, 0, this.ctrl.values?.length || 1)
        console.log('inv', boundedInvert)
        if (boundedInvert === currInvert) {
            return
        }

        const boundedInput = { ...input, value: boundedInvert }
        dispatch(setController(boundedInput))
        lfoParamSend(boundedInput, (value: number) => value)
    }

    toggle(input: ButtonInputProperty) {
        const { ctrlIndex: lfoId = 0 } = input

        const currentEnabled = selectController(this.ctrl, lfoId)(store.getState())
        const enabled = (currentEnabled + 1) % (this.ctrl.values?.length || 1)
        this.set({ ...input, value: enabled })
    }
}

class MaxLoopsControllerHandler extends ControllerHandler {

    constructor() {
        super(lfoCtrls.MAX_LOOPS, {
            receive: (ctrl, apiSetValue) => lfoParamReceive(
                ctrl, apiSetValue,
                (midiValue: number) => ({ value: midiValue }))
        })
    }

    defaultSet(input: NumericInputProperty) {
        const { ctrlIndex: lfoId = 0, value } = input
        const currMaxLoops = selectController(
            this.ctrl,
            lfoId)(store.getState())

        const boundedMaxLoops = getBounded(value, 1, 127)
        if (boundedMaxLoops === currMaxLoops) {
            return
        }
        const boundedInput = { ...input, value: boundedMaxLoops }
        dispatch(setController(boundedInput))
        lfoParamSend(boundedInput, (value: number) => value)
    }
}

// TODO: Could listen to set-event from 'normal' handler instead.
type ShapeParams = {
    decayEnabled: boolean,
    curves: { [key: number]: Curve }
}

class ShapeControllerHandler extends ControllerHandler {

    constructor() {
        super(lfoCtrls.SHAPE, {
            receive: (ctrl, apiSetValue) => lfoParamReceive(
                ctrl, apiSetValue,
                (midiValue: number) => ({ value: midiValue }))
        })
    }

    // Shapes are indexed on the button MIDI VALUE, not button value  (e.g. not 0-indexed but from whatever
    // BUTTONS.BUTTONS_LEFT.values.LFO_SHAPE_SAW is
    private shapes: { [key: number]: ShapeParams } = {
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
                [StageId.ATTACK]: Curve.LFO_SQUARE,
                [StageId.DECAY]: Curve.LFO_SQUARE
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
                [StageId.ATTACK]: Curve.LFO_RANDOM
            }
        },
    }

    private dispatchShapeActions(input: NumericInputProperty, boundedShape: number) {
        if (boundedShape === customShapeIndex) {
            const customShapeParams = selectCustomShapeParams(store.getState())(input.ctrlIndex || 0)
            stagesEnabledControllerHandler.setFromOtherAction(input, StageId.DECAY, customShapeParams.decayEnabled);
            stagesCurveControllerHandler.setFromOtherAction(input, StageId.ATTACK, customShapeParams.attackCurve)
            stagesCurveControllerHandler.setFromOtherAction(input, StageId.DECAY, customShapeParams.decayCurve)
        } else {
            const shapeParams = this.shapes[lfoCtrls.SHAPE.values[boundedShape]]
            if (shapeParams) {
                stagesEnabledControllerHandler.setFromOtherAction(input, StageId.DECAY, shapeParams.decayEnabled);
                Object.entries(shapeParams.curves).forEach(([stageId, curve]) => {
                    stagesCurveControllerHandler.setFromOtherAction(input, Number.parseInt(stageId), curve)
                })
            }
        }
    }

    // Use this to update shape whenever decay enabled or curves change
    detectCurrent(lfoId: number): number | undefined {
        const lfoStages = selectLfoStages(lfoId)(store.getState())

        const decayEnabled = lfoStages[StageId.DECAY].enabled === 1
        const attackCurve = lfoStages[StageId.ATTACK].curve
        const decayCurve = lfoStages[StageId.DECAY].curve

        const detectedShape = Object.entries(this.shapes).find(([, shapeParams]) =>
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
            shapeId = this.ctrl.values?.indexOf(shapeMidiValue) || 0 // values should never be undefined.
        } else {
            shapeId = customShapeIndex
        }

        return shapeId
    }

    setInStoreIfChanged(lfoId: number, shapeId: number) {
        const currShape = selectShape(lfoId)

        if (currShape !== shapeId) {
            dispatch(setController({
                ctrl: this.ctrl,
                ctrlIndex: lfoId,
                value: shapeId,
            }))
        }
    }

    saveCustomShapeParams(lfoId: number) {
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
    defaultSet(input: NumericInputProperty) {
        const { ctrlIndex: lfoId = 0, value } = input
        const currShape = selectShape(lfoId)

        const boundedShape = getBounded(value, 0, (this.ctrl.values?.length || 0) - 1)
        if (boundedShape === currShape) {
            return
        }

        const boundedInput = { ...input, value: boundedShape }

        dispatch(setController(boundedInput))
        this.dispatchShapeActions(input, boundedShape)

        // TODO: CHECK if possible to replace with internal
        lfoParamSend(boundedInput, (value: number) => value)
    }

    toggle(input: ButtonInputProperty) {
        const { ctrlIndex: lfoId = 0 } = input

        const currentShape = selectController(this.ctrl, lfoId)(store.getState())
        const shape = (currentShape + 1) % (this.ctrl.values?.length || 1)
        this.set({ ...input, value: shape })
    }
}

const shapeControllerHandler = new ShapeControllerHandler()

const handlers = groupHandlers({
        [lfoCtrls.CURVE.id]: stagesCurveControllerHandler,
        [lfoCtrls.TOGGLE_STAGE.id]: stagesEnabledControllerHandler,
        [lfoCtrls.INVERT.id]: new InvertControllerHandler(),
        [lfoCtrls.MAX_LOOPS.id]: new MaxLoopsControllerHandler(),
        [lfoCtrls.SHAPE.id]: shapeControllerHandler,
        ...createDefaultHandlers([
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
    }
)

const getForSave = (): PatchControllers => {

    let patchControllers = {}

    for (let ctrlIndex = 0; ctrlIndex < NUMBER_OF_LFOS; ctrlIndex++) {
        const newControllers = handlers.getForSave(ctrlIndex)
        console.log(`Lfo controllers ${ctrlIndex}`, newControllers)
        patchControllers = deepmerge(patchControllers, newControllers)
    }
    return patchControllers
}

const lfoApi = {

    toggleStageSelected,

    setGuiLfo,
    incrementGuiLfo,
    setUiLfo,
    toggleUiLfo,

    increment: handlers.increment,
    toggle: handlers.toggle,
    set: handlers.set,

    getForSave,
    setFromLoad: handlers.setFromLoad,
}

export default lfoApi