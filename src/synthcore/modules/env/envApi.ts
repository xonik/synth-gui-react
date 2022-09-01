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
import { curveFuncs } from '../../../components/curves/curveCalculator'
import { ApiSource } from '../../types'
import { dispatch, getBounded, getQuantized } from '../../utils'
import { createSetterFuncs } from '../common/utils'
import { envCtrls } from './envControllers'
import { paramReceive, paramSend } from '../common/commonMidiApi'
import {
    selectController,
    selectUiController,
    setController,
} from '../controllers/controllersReducer'
import { ButtonInputProperty, NumericInputProperty } from '../common/types'


const cannotDisableStage = (stage: StageId) => stage === StageId.ATTACK || stage === StageId.RELEASE2 || stage === StageId.SUSTAIN

const stageLevel = (() => {

    const getBoundedController = (value: number, envId: number) => {
        const bipolar = selectController(envCtrls.BIPOLAR, envId)(store.getState()) === 1
        return bipolar
            ? getQuantized(getBounded(value, -1, 1), 32767)
            : getQuantized(getBounded(value), 32767)
    }

    const set = (input: NumericInputProperty, uiValue?: number) => {
        const { ctrlIndex: envId = 0, value, valueIndex: stageId = 0, ctrl } = input

        const r1enabled = selectController(
            envCtrls.TOGGLE_STAGE,
            envId,
            StageId.RELEASE1)(store.getState())

        if (
            stageId === StageId.DECAY2 ||
            stageId === StageId.SUSTAIN ||
            (stageId === StageId.RELEASE2 && r1enabled)
        ) {

            const boundedValue = getBoundedController(value, envId)
            const currentLevel = selectController(ctrl, envId, stageId)(store.getState())
            if (boundedValue === currentLevel) {
                return
            }

            // sustain level is not used directly. Instead it replaces r1 or r2 level depending on if
            // r1 is enabled or not.
            if (stageId === StageId.SUSTAIN) {
                const stage2Id = r1enabled ? StageId.RELEASE1 : StageId.RELEASE2
                dispatch(setController([
                    { ...input, valueIndex: StageId.SUSTAIN, value: boundedValue, uiValue },
                    { ...input, valueIndex: stage2Id, value: boundedValue }
                ]))
            } else {
                dispatch(setController({ ...input, value: boundedValue, uiValue }))
            }

            envParamSend({...input, value: boundedValue})
        }
    }

    const increment = (input: NumericInputProperty) => {
        const { ctrlIndex: envId = 0, valueIndex: stageId = 0, value: inc, ctrl } = input

        if (ctrl.uiResponse) {
            const currentValue = selectUiController(ctrl, envId, stageId)(store.getState())
            const uiValue = getBoundedController(currentValue + inc, envId)

            const bipolar = selectController(envCtrls.BIPOLAR, envId)(store.getState()) === 1
            const updatedValue = ctrl.uiResponse.output(uiValue, bipolar)
            set({ ...input, value: updatedValue }, uiValue)
        } else {
            const currentValue = selectController(ctrl, envId, stageId)(store.getState())
            set({ ...input, value: currentValue + inc })
        }

    }

    const setWithUiUpdate = (input: NumericInputProperty) => {

        const envId = selectController(envCtrls.SELECT)(store.getState())
        const bipolar = selectController(envCtrls.BIPOLAR, envId)(store.getState()) === 1
        const updatedLevel = input.ctrl.uiResponse?.input(input.value, bipolar) || 0
        const uiValue = getQuantized(getBounded(updatedLevel))
        set(input, uiValue)
    }

    envParamReceive(envCtrls.LEVEL, setWithUiUpdate)

    return {
        set,
        increment,
        toggle: (input: ButtonInputProperty) => {
        }
    }
})()

const stageTime = (() => {

    const getBoundedController = (value: number) => getQuantized(getBounded(value))

    const set = (input: NumericInputProperty, uiValue?: number) => {
        const { ctrlIndex: envId = 0, value, valueIndex: stageId = 0, ctrl } = input

        let boundedValue = getBoundedController(value)
        const currentTime = selectController(ctrl, envId, stageId)(store.getState())

        if (boundedValue === currentTime) {
            return
        }

        const boundedInput = { ...input, value: boundedValue, uiValue }
        dispatch(setController(boundedInput))

        envParamSend(boundedInput)
    }

    const setWithUiUpdate = (input: NumericInputProperty) => {
        const updatedTime = input.ctrl.uiResponse?.input(input.value) || 0
        let uiValue = getBoundedController(updatedTime)
        set(input, uiValue)
    }

    const increment = (input: NumericInputProperty) => {
        const { ctrlIndex: envId = 0, valueIndex: stageId = 0, value: inc, ctrl } = input
        if (ctrl.uiResponse) {
            const currentTime = selectUiController(ctrl, envId, stageId)(store.getState())
            const uiValue = getBoundedController(currentTime + inc)
            const updatedTime = ctrl.uiResponse.output(uiValue)
            set({ ...input, value: updatedTime }, uiValue)
        } else {
            const currentTime = selectController(ctrl, envId, stageId)(store.getState())
            set({ ...input, value: currentTime + inc })
        }
    }

    envParamReceive(envCtrls.TIME, setWithUiUpdate)

    return {
        set,
        increment,
        toggle: (input: ButtonInputProperty) => {
        }
    }
})()

const stageEnabled = (() => {

    const set = (input: NumericInputProperty) => {
        const { ctrlIndex: envId = 0, value: enabled, valueIndex: stageId = 0, ctrl } = input

        if (cannotDisableStage(stageId)) {
            return
        }

        const currentEnabled = selectController(ctrl, envId, stageId)(store.getState())
        if (currentEnabled === enabled) {
            return
        }

        dispatch(setController(input))

        if (stageId === StageId.RELEASE1) {
            const sustainLevel = selectController(envCtrls.LEVEL, envId, StageId.SUSTAIN)(store.getState())
            const levelAction = {
                ctrl: envCtrls.LEVEL, value: sustainLevel,
                ctrlIndex: envId,
            }
            if (enabled) {
                dispatch(setController({ ...levelAction, valueIndex: StageId.RELEASE1 }))
            } else {
                dispatch(setController({ ...levelAction, valueIndex: StageId.RELEASE2 }))
            }
        }

        envMidiApi.stageEnabled.send(input)
    }

    const toggle = (input: ButtonInputProperty) => {
        const { ctrlIndex: envId = 0, valueIndex: stageId = 0, ctrl } = input

        const currentEnabled = selectController(ctrl, envId, stageId)(store.getState())
        const enabled = (currentEnabled + 1) % 2
        set({ ...input, value: enabled })
    }

    envMidiApi.stageEnabled.receive(set)

    return {
        set,
        toggle,
        increment: (input: NumericInputProperty) => {
        }
    }
})()

const stageCurve = (() => {
    const set = (input: NumericInputProperty) => {

        const { ctrlIndex: envId = 0, value: curve, valueIndex: stageId = 0, ctrl } = input

        const currentCurve = selectController(ctrl, envId, stageId)(store.getState())
        const boundedCurve = getBounded(curve, 0, curveFuncs.length - 1)
        if (currentCurve === boundedCurve) {
            return
        }
        const boundedInput = { ...input, value: boundedCurve }
        dispatch(setController(boundedInput))
        envMidiApi.curve.send(boundedInput)
    }

    const increment = (input: NumericInputProperty) => {
        const { ctrlIndex: envId = 0, valueIndex: stageId = 0, value: inc, ctrl } = input
        const currentCurve = selectController(ctrl, envId, stageId)(store.getState())
        set({ ...input, value: currentCurve + inc })
    }

    envMidiApi.curve.receive(set)

    return {
        set,
        increment,
        toggle: (input: ButtonInputProperty) => {
        }
    }
})()

const maxLoops = (() => {
    const set = (input: NumericInputProperty) => {
        const { ctrlIndex: envId = 0, value } = input
        const currMaxLoops = selectController(
            envCtrls.MAX_LOOPS,
            envId)(store.getState())

        const boundedMaxLoops = getBounded(value, 1, 127)
        if (boundedMaxLoops === currMaxLoops) {
            return
        }
        const boundedInput = { ...input, value: boundedMaxLoops }
        dispatch(setController(boundedInput))
        envParamSend(boundedInput, (value: number) => value)
    }

    const increment = (input: NumericInputProperty) => {
        const { ctrlIndex: envId = 0, value: inc } = input
        const currMaxLoops = selectController(
            envCtrls.MAX_LOOPS,
            envId)(store.getState())

        set({ ...input, value: currMaxLoops + inc })
    }

    envParamReceive(envCtrls.MAX_LOOPS, set, (midiValue: number) => ({ value: midiValue }))

    return {
        set,
        increment,
        toggle: (input: ButtonInputProperty) => {
        }
    }
})()

const invert = (() => {
    const set = (input: NumericInputProperty) => {
        const { ctrlIndex: envId = 0, value } = input
        const currInvert = selectController(
            input.ctrl,
            envId)(store.getState())

        const boundedInvert = getBounded(value, 0, input.ctrl.values?.length || 1)
        if (boundedInvert === currInvert) {
            return
        }

        const boundedInput = { ...input, value: boundedInvert }
        dispatch(setController(boundedInput))
        envParamSend(boundedInput, (value: number) => value)

        const resetLevel = boundedInvert ? 1 : 0
        dispatch(setController({ ctrl: envCtrls.LEVEL, ctrlIndex: envId, valueIndex: StageId.DELAY, value: resetLevel }))
        dispatch(setController({ ctrl: envCtrls.LEVEL, ctrlIndex: envId, valueIndex: StageId.ATTACK, value: resetLevel }))
        dispatch(setController({ ctrl: envCtrls.LEVEL, ctrlIndex: envId, valueIndex: StageId.DECAY1, value: value ? 0 : 1 }))
        dispatch(setController({ ctrl: envCtrls.LEVEL, ctrlIndex: envId, valueIndex: StageId.STOPPED, value: resetLevel }))

    }

    const toggle = (input: ButtonInputProperty) => {
        const { ctrlIndex: envId = 0, ctrl } = input

        const currentEnabled = selectController(ctrl, envId)(store.getState())
        const enabled = (currentEnabled + 1) % (input.ctrl.values?.length || 1)
        set({ ...input, value: enabled })
    }

    envParamReceive(envCtrls.INVERT, set)

    return {
        set,
        increment: (input: NumericInputProperty) => {

        },
        toggle,
    }
})()

const env3Id = (() => {
    const set = (input: NumericInputProperty) => {
        const { value: id } = input

        const currentEnv3Id = selectController(input.ctrl, 0)(store.getState())
        if (id !== currentEnv3Id && id < NUMBER_OF_ENVELOPES && id > 1) {
            dispatch(setController(input))
            paramSend(input, (value: number) => value)
        }
    }

    const toggle = (input: ButtonInputProperty) => {
        const currentEnv3Id = selectController(input.ctrl, 0)(store.getState())
        let nextEnv3Id = (currentEnv3Id + 1)
        if (nextEnv3Id > NUMBER_OF_ENVELOPES - 1) {
            nextEnv3Id = 2
        }
        set({ ...input, value: nextEnv3Id })
    }
    paramReceive(envCtrls.SELECT_ENV3_ID, set, (midiValue: number) => ({ value: midiValue }))

    return {
        set,
        toggle,
        increment: (input: NumericInputProperty) => {
        }
    }
})()

// GUI STUFF
const setCurrentEnv = (envId: number, source: ApiSource) => {
    const boundedEnv = getBounded(envId, 0, NUMBER_OF_ENVELOPES - 1)
    if (selectCurrEnvId(store.getState()) !== boundedEnv) {
        dispatch(selectGuiEnv({ env: boundedEnv }))
    }
}
const incrementCurrentEnvelope = (increment: number, source: ApiSource) => {
    setCurrentEnv(selectCurrEnvId(store.getState()) + increment, source)
}

const toggleStageSelected = (envId: number, stageId: StageId, source: ApiSource) => {
    const currStageId = selectCurrStageId(store.getState())
    if (currStageId === stageId) {
        dispatch(deselectStage({ env: -1, stage: stageId }))
    } else {
        dispatch(selectStage({ env: -1, stage: stageId }))
    }
}

const { increment: commonInc, toggle: commonToggle, set: commonSet, release } = createSetterFuncs([
        envCtrls.LOOP,
        envCtrls.ENV_GATE,
        envCtrls.RESET_ON_TRIGGER,
        envCtrls.RELEASE_MODE,
        envCtrls.LOOP_MODE,
    ],
    {send: envParamSend, receive: envParamReceive})

const customSetterFuncs = {
    [envCtrls.LEVEL.id]: stageLevel,
    [envCtrls.TIME.id]: stageTime,
    [envCtrls.TOGGLE_STAGE.id]: stageEnabled,
    [envCtrls.CURVE.id]: stageCurve,
    [envCtrls.INVERT.id]: invert,
    [envCtrls.MAX_LOOPS.id]: maxLoops,
    [envCtrls.SELECT_ENV3_ID.id]: env3Id,
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

const envApi = {
    // stage stuff
    toggleStageSelected,

    setCurrentEnv,
    incrementCurrentEnvelope,

    release,

    increment,
    toggle,
    set,
}

export default envApi