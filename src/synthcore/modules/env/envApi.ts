import { NUMBER_OF_ENVELOPES, StageId } from './types'
import {
    deselectStage,
    selectCurrEnvId,
    selectCurrStageId,
    selectGuiEnv,
    selectStage,
} from './envReducer'
import { store } from '../../store'
import { envParamReceive, envParamSend } from './envMidiApi'
import envMidiApi from './envMidiApi'
import { ApiSource } from '../../types'
import { dispatch, getBounded, getQuantized } from '../../utils'
import { ControllerHandler, createDefaultHandlers, groupHandlers } from '../common/utils'
import { envCtrls } from './envControllers'
import { paramReceive, paramSend } from '../common/commonMidiApi'
import {
    selectUiController,
    setController, selectController, setControllers,
} from '../controllers/controllersReducer'
import { ButtonInputProperty, NumericInputProperty, PatchControllers } from '../common/types'
import deepmerge from 'deepmerge'

class StageLevelControllerHandler extends ControllerHandler {
    constructor() {
        super(envCtrls.LEVEL, {
            receive: envParamReceive
        })
    }

    private getBoundedController(voiceGroupIndex: number, value: number, envId: number) {
        const bipolar = selectController(envCtrls.BIPOLAR, envId)(store.getState(), voiceGroupIndex) === 1
        return bipolar
            ? getQuantized(getBounded(value, -1, 1), 32767)
            : getQuantized(getBounded(value), 32767)
    }

    defaultSet(input: NumericInputProperty, forceSet?: boolean, uiValue?: number) {
        const { ctrlIndex: envId = 0, value, valueIndex: stageId = 0, voiceGroupIndex } = input

        const r1enabled = selectController(
            envCtrls.TOGGLE_STAGE,
            envId,
            StageId.RELEASE1)(store.getState(), voiceGroupIndex)

        if (
            stageId === StageId.DECAY2 ||
            stageId === StageId.SUSTAIN ||
            (stageId === StageId.RELEASE2 && r1enabled)
        ) {

            const boundedValue = this.getBoundedController(voiceGroupIndex, value, envId)
            const currentLevel = selectController(this.ctrl, envId, stageId)(store.getState(), voiceGroupIndex)
            if (boundedValue === currentLevel) {
                return
            }

            // sustain level is not used directly. Instead, it replaces r1 or r2 level depending on if
            // r1 is enabled or not.
            if (stageId === StageId.SUSTAIN) {
                const stage2Id = r1enabled ? StageId.RELEASE1 : StageId.RELEASE2
                const payloads = [
                    { ...input, valueIndex: StageId.SUSTAIN, value: boundedValue, uiValue },
                    { ...input, valueIndex: stage2Id, value: boundedValue }
                ]
                dispatch(setControllers({ payloads, voiceGroupIndex }))
            } else {
                dispatch(setController({ ...input, value: boundedValue, uiValue }))
            }

            envParamSend({ ...input, value: boundedValue })
        }
    }

    increment(input: NumericInputProperty) {
        const { ctrlIndex: envId = 0, valueIndex: stageId = 0, value: inc, voiceGroupIndex } = input

        if (this.ctrl.uiResponse) {
            const currentValue = selectUiController(this.ctrl, envId, stageId)(store.getState(), voiceGroupIndex)
            const uiValue = this.getBoundedController(voiceGroupIndex, currentValue + inc, envId)

            const bipolar = selectController(envCtrls.BIPOLAR, envId)(store.getState(), voiceGroupIndex) === 1
            const updatedValue = this.ctrl.uiResponse.output(uiValue, bipolar)
            this.defaultSet({ ...input, value: updatedValue }, false, uiValue)
        } else {
            const currentValue = selectController(this.ctrl, envId, stageId)(store.getState(), voiceGroupIndex)
            this.defaultSet({ ...input, value: currentValue + inc })
        }
    }

    setWithUiUpdate(input: NumericInputProperty) {
        const envId = selectController(envCtrls.SELECT)(store.getState(), input.voiceGroupIndex)
        const bipolar = selectController(envCtrls.BIPOLAR, envId)(store.getState(), input.voiceGroupIndex) === 1
        const updatedLevel = this.ctrl.uiResponse?.input(input.value, bipolar) || 0
        const uiValue = getQuantized(getBounded(updatedLevel))
        this.defaultSet(input, false, uiValue)
    }
}

class StageTimeControllerHandler extends ControllerHandler {
    constructor() {
        super(envCtrls.TIME, {
            receive: envParamReceive
        })
    }

    private getBoundedController(value: number) {
        return getQuantized(getBounded(value))
    }

    defaultSet(input: NumericInputProperty, forceSet?: boolean, uiValue?: number) {
        const { ctrlIndex: envId = 0, value, valueIndex: stageId = 0, voiceGroupIndex } = input

        let boundedValue = this.getBoundedController(value)
        const currentTime = selectController(this.ctrl, envId, stageId)(store.getState(), voiceGroupIndex)

        if (boundedValue === currentTime) {
            return
        }

        const boundedInput = { ...input, value: boundedValue, uiValue }
        dispatch(setController(boundedInput))
        envParamSend(boundedInput)
    }

    setWithUiUpdate(input: NumericInputProperty) {
        const updatedTime = input.ctrl.uiResponse?.input(input.value) || 0
        let uiValue = this.getBoundedController(updatedTime)
        this.set(input, false, uiValue)
    }
}

class StageEnabledControllerHandler
    extends ControllerHandler {
    constructor() {
        super(envCtrls.TOGGLE_STAGE, {
            receive: envMidiApi.stageEnabled.receive
        })
    }

    defaultSet(input: NumericInputProperty) {
        const { ctrlIndex: envId = 0, value: enabled, valueIndex: stageId = 0, voiceGroupIndex } = input

        if (!this.ctrl.legalValueIndexes?.includes(stageId)) {
            return
        }

        const currentEnabled = selectController(this.ctrl, envId, stageId)(store.getState(), voiceGroupIndex)
        if (currentEnabled === enabled) {
            return
        }

        dispatch(setController(input))

        if (stageId === StageId.RELEASE1) {
            const sustainLevel = selectController(envCtrls.LEVEL, envId, StageId.SUSTAIN)(store.getState(), voiceGroupIndex)
            const levelAction = {
                ctrl: envCtrls.LEVEL, value: sustainLevel,
                ctrlIndex: envId,
                voiceGroupIndex: input.voiceGroupIndex
            }
            if (enabled) {
                dispatch(setController({
                    ...levelAction,
                    valueIndex: StageId.RELEASE1,
                }))
            } else {
                dispatch(setController({
                    ...levelAction,
                    valueIndex: StageId.RELEASE2,
                }))
            }
        }

        envMidiApi.stageEnabled.send(input)
    }

    toggle(input: ButtonInputProperty) {
        const { ctrlIndex: envId = 0, valueIndex: stageId = 0, voiceGroupIndex } = input

        const currentEnabled = selectController(this.ctrl, envId, stageId)(store.getState(), voiceGroupIndex)
        const enabled = (currentEnabled + 1) % 2
        this.set({ ...input, value: enabled })
    }
}

class StageCurveControllerHandler extends ControllerHandler {
    constructor() {
        super(envCtrls.CURVE, {
            receive: envMidiApi.curve.receive
        })
    }

    defaultSet(input: NumericInputProperty) {
        const { ctrlIndex: envId = 0, value: curve, valueIndex: stageId = 0, voiceGroupIndex } = input

        const currentCurve = selectController(this.ctrl, envId, stageId)(store.getState(), voiceGroupIndex)
        const boundedCurve = getBounded(curve, 0, (this.ctrl.values?.length || 0) - 1)
        if (currentCurve === boundedCurve) {
            return
        }
        const boundedInput = { ...input, value: boundedCurve }
        dispatch(setController(boundedInput))
        envMidiApi.curve.send(boundedInput)
    }
}

class MaxLoopsControllerHandler extends ControllerHandler {

    constructor() {
        super(envCtrls.MAX_LOOPS, {
            receive: (ctrl, apiSetValue) => envParamReceive(
                ctrl,
                apiSetValue,
                (midiValue: number) => ({ value: midiValue })
            )
        })
    }

    defaultSet(input: NumericInputProperty) {
        const { ctrlIndex: envId = 0, value, voiceGroupIndex } = input
        const currMaxLoops = selectController(
            this.ctrl,
            envId)(store.getState(), voiceGroupIndex)

        const boundedMaxLoops = getBounded(value, 1, 127)
        if (boundedMaxLoops === currMaxLoops) {
            return
        }
        const boundedInput = { ...input, value: boundedMaxLoops }
        dispatch(setController(boundedInput))
        envParamSend(boundedInput, (value: number) => value)
    }

    increment(input: NumericInputProperty) {
        const { ctrlIndex: envId = 0, value: inc, voiceGroupIndex } = input
        const currMaxLoops = selectController(
            this.ctrl,
            envId)(store.getState(), voiceGroupIndex)

        this.set({ ...input, value: currMaxLoops + inc })
    }
}

class InvertControllerHandler extends ControllerHandler {

    constructor() {
        super(envCtrls.INVERT, {
            receive: envParamReceive
        })
    }

    defaultSet(input: NumericInputProperty) {
        const { ctrlIndex: envId = 0, value, voiceGroupIndex } = input
        const currInvert = selectController(
            this.ctrl,
            envId)(store.getState(), voiceGroupIndex)

        const boundedInvert = getBounded(value, 0, input.ctrl.values?.length || 1)
        if (boundedInvert === currInvert) {
            return
        }

        const boundedInput = { ...input, value: boundedInvert }
        dispatch(setController(boundedInput))
        envParamSend(boundedInput, (value: number) => value)

        const resetLevel = boundedInvert ? 1 : 0
        dispatch(setController({
            voiceGroupIndex: input.voiceGroupIndex,
            ctrl: envCtrls.LEVEL,
            ctrlIndex: envId,
            valueIndex: StageId.DELAY,
            value: resetLevel
        }))
        dispatch(setController({
            voiceGroupIndex: input.voiceGroupIndex,
            ctrl: envCtrls.LEVEL,
            ctrlIndex: envId,
            valueIndex: StageId.ATTACK,
            value: resetLevel
        }))
        dispatch(setController({
            voiceGroupIndex: input.voiceGroupIndex,
            ctrl: envCtrls.LEVEL,
            ctrlIndex: envId,
            valueIndex: StageId.DECAY1,
            value: value ? 0 : 1
        }))
        dispatch(setController({
            voiceGroupIndex: input.voiceGroupIndex,
            ctrl: envCtrls.LEVEL,
            ctrlIndex: envId,
            valueIndex: StageId.STOPPED,
            value: resetLevel
        }))

    }

    toggle(input: ButtonInputProperty) {
        const { ctrlIndex: envId = 0, ctrl, voiceGroupIndex } = input

        const currentEnabled = selectController(ctrl, envId)(store.getState(), voiceGroupIndex)
        const enabled = (currentEnabled + 1) % (input.ctrl.values?.length || 1)
        this.set({ ...input, value: enabled })
    }
}

class Env3IdControllerHandler extends ControllerHandler {

    constructor() {
        super(envCtrls.SELECT_ENV3_ID, {
            receive: (ctrl, apiSetValue) => paramReceive(
                ctrl,
                apiSetValue,
                (midiValue: number) => ({ value: midiValue })
            )
        })
    }

    defaultSet(input: NumericInputProperty) {
        const { value: id, voiceGroupIndex } = input

        const currentEnv3Id = selectController(this.ctrl, 0)(store.getState(), voiceGroupIndex)
        if (id !== currentEnv3Id && id < NUMBER_OF_ENVELOPES && id > 1) {
            dispatch(setController(input))
            paramSend(input, (value: number) => value)
        }
    }

    toggle(input: ButtonInputProperty) {
        const currentEnv3Id = selectController(this.ctrl, 0)(store.getState(), input.voiceGroupIndex)
        let nextEnv3Id = (currentEnv3Id + 1)
        if (nextEnv3Id > NUMBER_OF_ENVELOPES - 1) {
            nextEnv3Id = 2
        }
        this.set({ ...input, value: nextEnv3Id })
    }
}

// GUI STUFF
const setCurrentEnv = (voiceGroupIndex: number, envId: number, source: ApiSource) => {
    const boundedEnv = getBounded(envId, 0, NUMBER_OF_ENVELOPES - 1)
    if (selectCurrEnvId(store.getState(), voiceGroupIndex) !== boundedEnv) {
        dispatch(selectGuiEnv({ env: boundedEnv, voiceGroupIndex }))
    }
}
const incrementCurrentEnvelope = (voiceGroupIndex: number, increment: number, source: ApiSource) => {
    setCurrentEnv(voiceGroupIndex, selectCurrEnvId(store.getState(), voiceGroupIndex) + increment, source)
}

const toggleStageSelected = (voiceGroupIndex: number, envId: number, stageId: StageId, source: ApiSource) => {
    const currStageId = selectCurrStageId(store.getState(), voiceGroupIndex)
    if (currStageId === stageId) {
        dispatch(deselectStage({ env: -1, stage: stageId, voiceGroupIndex }))
    } else {
        dispatch(selectStage({ env: -1, stage: stageId, voiceGroupIndex }))
    }
}

const handlers = groupHandlers({
    [envCtrls.LEVEL.id]: new StageLevelControllerHandler(),
    [envCtrls.TIME.id]: new StageTimeControllerHandler(),
    [envCtrls.TOGGLE_STAGE.id]: new StageEnabledControllerHandler(),
    [envCtrls.CURVE.id]: new StageCurveControllerHandler(),
    [envCtrls.INVERT.id]: new InvertControllerHandler(),
    [envCtrls.MAX_LOOPS.id]: new MaxLoopsControllerHandler(),
    [envCtrls.SELECT_ENV3_ID.id]: new Env3IdControllerHandler(),
    ...createDefaultHandlers([
            envCtrls.LOOP,
            envCtrls.ENV_GATE,
            envCtrls.RESET_ON_TRIGGER,
            envCtrls.RELEASE_MODE,
            envCtrls.LOOP_MODE,
            envCtrls.OFFSET,
        ],
        { send: envParamSend, receive: envParamReceive }),
})

const getForSave = (): PatchControllers => {

    let patchControllers = {}

    for (let ctrlIndex = 0; ctrlIndex < NUMBER_OF_ENVELOPES; ctrlIndex++) {
        const newControllers = handlers.getForSave(ctrlIndex)
        console.log(`Env controllers ${ctrlIndex}`, newControllers)
        patchControllers = deepmerge(patchControllers, newControllers)
    }
    return patchControllers
}

const envApi = {
    // stage stuff
    toggleStageSelected,

    setCurrentEnv,
    incrementCurrentEnvelope,

    release: handlers.release,
    increment: handlers.increment,
    toggle: handlers.toggle,
    set: handlers.set,

    getForSave,
    setFromLoad: handlers.setFromLoad,
}

export default envApi