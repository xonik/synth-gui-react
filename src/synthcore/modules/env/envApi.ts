import { NUMBER_OF_ENVELOPES, StageId } from './types'
import {
    deselectStage,
    selectCurrEnvId,
    selectCurrStageId,
    selectGuiEnv,
    selectStage,
} from './envReducer'
import { store } from '../../store'
import midiApi from './envMidiApi'
import { curveFuncs } from '../../../components/curves/curveCalculator'
import { ApiSource } from '../../types'
import { dispatch, getBounded, getQuantized } from '../../utils'
import { createSetterFuncs } from '../common/utils'
import { envCtrls } from './envControllers'
import { paramReceive, paramSend } from '../common/commonMidiApi'
import { selectController, selectUiController, setController, setUiController } from '../controllers/controllersReducer'
import { ButtonInputProperty, NumericInputProperty } from '../common/types'

const updateReleaseLevels = (envId: number, value: number) => {
    const action = {
        ctrl: envCtrls.LEVEL,
        ctrlIndex: envId,
        value
    }
    const release1Enabled = selectController(envCtrls.TOGGLE_STAGE, envId, StageId.RELEASE1)(store.getState())
    if (release1Enabled === 1) {
        dispatch(setController({ ...action, valueIndex: StageId.RELEASE1 }))
    } else {
        dispatch(setController({ ...action, valueIndex: StageId.RELEASE2 }))
    }
}

const cannotDisableStage = (stage: StageId) => stage === StageId.ATTACK || stage === StageId.RELEASE2 || stage === StageId.SUSTAIN

const selectEnv = (envId: number, source: ApiSource) => {
    // TODO: Only send if not just sent
    paramSend(source, envCtrls.SELECT, envId / 127)
}

const stageLevel = (() => {
    const set = (input: NumericInputProperty) => {
        const { ctrlIndex: envId = 0, value, valueIndex: stageId = 0, source, ctrl } = input

        const r1enabled = selectController(
            envCtrls.TOGGLE_STAGE,
            envId,
            StageId.RELEASE1)(store.getState())

        if (
            stageId === StageId.DECAY2 ||
            stageId === StageId.SUSTAIN ||
            (stageId === StageId.RELEASE2 && r1enabled)
        ) {
            const bipolar = selectController(envCtrls.BIPOLAR, envId)(store.getState()) === 1
            let boundedValue = bipolar
                ? getQuantized(getBounded(value, -1, 1), 32767)
                : getQuantized(getBounded(value), 32767)

            const currentLevel = selectController(ctrl, envId, stageId)(store.getState())
            if (boundedValue === currentLevel) {
                return
            }

            // sustain level is not used directly. Instead it replaces r1 or r2 level depending on if
            // r1 is enabled or not.
            if (stageId === StageId.SUSTAIN) {
                const stage2Id = r1enabled ? StageId.RELEASE1 : StageId.RELEASE2
                dispatch(setController({ ...input, valueIndex: StageId.SUSTAIN, value: boundedValue }))
                dispatch(setController({ ...input, valueIndex: stage2Id, value: boundedValue }))
            } else {
                dispatch(setController({ ...input, value: boundedValue }))
            }

            if (stageId === StageId.SUSTAIN) {
                updateReleaseLevels(envId, boundedValue)
            }

            // TODO: hard coded curve mapping only for VCA and VCF envs. Should be  and placed elsewhere!
            /*if(envId === 0 || envId === 1) {
                boundedValue = Math.floor(envLevelMapper(boundedValue * 32767) + 32767)
            }*/
            selectEnv(envId, source)
            paramSend(source, envCtrls.LEVEL, boundedValue, stageId)
        }
    }

    const increment = (input: NumericInputProperty) => {
        const { ctrlIndex: envId = 0, valueIndex: stageId = 0, value: inc, ctrl } = input

        if(ctrl.uiResponse){
            const currentLevel = selectUiController(ctrl, envId, stageId)(store.getState())
            const bipolar = selectController(envCtrls.BIPOLAR, envId)(store.getState()) === 1
            let boundedValue = bipolar
                ? getQuantized(getBounded(currentLevel + inc, -1, 1), 32767)
                : getQuantized(getBounded(currentLevel + inc), 32767)

            dispatch(setUiController({ ...input, value: boundedValue }))
            const updatedLevel = ctrl.uiResponse.output(boundedValue)
            set({...input, value: updatedLevel})
        } else {
            const currentTime = selectController(ctrl, envId, stageId)(store.getState())
            set({...input, value: currentTime + inc})
        }

    }

    const setWithUiUpdate = (input: NumericInputProperty) => {
        set(input)
        const updatedLevel = input.ctrl.uiResponse?.input(input.value) || 0
        let boundedValue = getQuantized(getBounded(updatedLevel))
        dispatch(setUiController({ ...input, value: boundedValue }))
    }

    paramReceive(envCtrls.LEVEL, setWithUiUpdate)

    return {
        set,
        increment,
        toggle: (input: ButtonInputProperty) => {
        }
    }
})()

const stageTime = (() => {
    const set = (input: NumericInputProperty) => {
        const { ctrlIndex: envId = 0, value, valueIndex: stageId = 0, source, ctrl } = input

        let boundedValue = getQuantized(getBounded(value))
        const currentTime = selectController(ctrl, envId, stageId)(store.getState())

        if (boundedValue === currentTime) {
            return
        }

        dispatch(setController({ ...input, value: boundedValue }))

        // TODO: This should be configurable!
        //boundedValue = Math.floor(envTimeMapper(boundedValue * 65535))

        selectEnv(envId, source)
        paramSend(source, envCtrls.TIME, boundedValue, stageId)
    }

    const setWithUiUpdate = (input: NumericInputProperty) => {
        set(input)
        const updatedTime = input.ctrl.uiResponse?.input(input.value) || 0
        let boundedValue = getQuantized(getBounded(updatedTime))
        dispatch(setUiController({ ...input, value: boundedValue }))
    }

    const increment = (input: NumericInputProperty) => {
        const { ctrlIndex: envId = 0, valueIndex: stageId = 0, value: inc, ctrl } = input
        if(ctrl.uiResponse){
            const currentTime = selectUiController(ctrl, envId, stageId)(store.getState())
            let boundedValue = getQuantized(getBounded(currentTime + inc))
            dispatch(setUiController({ ...input, value: boundedValue }))
            const updatedTime = ctrl.uiResponse.output(boundedValue)
            set({...input, value: updatedTime})
        } else {
            const currentTime = selectController(ctrl, envId, stageId)(store.getState())
            set({...input, value: currentTime + inc})
        }
    }

    paramReceive(envCtrls.TIME, setWithUiUpdate)

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
                ctrl: envCtrls.LEVEL, value: sustainLevel
            }
            if (enabled) {
                dispatch(setController({ ...levelAction, valueIndex: StageId.RELEASE1 }))
            } else {
                dispatch(setController({ ...levelAction, valueIndex: StageId.RELEASE2 }))
            }
        }

        midiApi.stageEnabled.send(input)
    }

    const toggle = (input: ButtonInputProperty) => {
        const { ctrlIndex: envId = 0, valueIndex: stageId = 0, ctrl } = input

        const currentEnabled = selectController(ctrl, envId, stageId)(store.getState())
        const enabled = (currentEnabled + 1) % 2
        set({ ...input, value: enabled })
    }

    midiApi.stageEnabled.receive(set)

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

        dispatch(setController({ ...input, value: boundedCurve }))
        midiApi.curve.send({ ...input, value: boundedCurve })
    }
    const increment = (input: NumericInputProperty) => {
        const { ctrlIndex: envId = 0, valueIndex: stageId = 0, value: inc, ctrl } = input
        const currentCurve = selectController(ctrl, envId, stageId)(store.getState())
        set({ ...input, value: currentCurve + inc })
    }

    midiApi.curve.receive(set)

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

        dispatch(setController({ ...input, value: boundedMaxLoops }))
        paramSend(input.source, input.ctrl, boundedMaxLoops, undefined, (value: number) => value)
    }

    const increment = (input: NumericInputProperty) => {
        const { ctrlIndex: envId = 0, value: inc } = input
        const currMaxLoops = selectController(
            envCtrls.MAX_LOOPS,
            envId)(store.getState())

        set({ ...input, value: currMaxLoops + inc })
    }

    paramReceive(envCtrls.MAX_LOOPS, set, (midiValue: number) => ({ value: midiValue }))

    return {
        set,
        increment,
        toggle: (input: ButtonInputProperty) => {
        }
    }
})()

const env3Id = (() => {
    const set = (input: NumericInputProperty) => {
        const { value: id, source, ctrl } = input

        const currentEnv3Id = selectController(input.ctrl, 0)(store.getState())
        if (id !== currentEnv3Id && id < NUMBER_OF_ENVELOPES && id > 1) {
            dispatch(setController(input))
            paramSend(source, ctrl, id, undefined, (value: number) => value)
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

// DIRECT TO MIDI STUFF

const trigger = (envId: number, source: ApiSource) => {
    midiApi.trigger.send(source, envId)
}
const release = (envId: number, source: ApiSource) => {
    midiApi.release.send(source, envId)
}

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

const { increment: commonInc, toggle: commonToggle, set: commonSet } = createSetterFuncs([
        envCtrls.LOOP,
        envCtrls.TRIGGER,
        envCtrls.INVERT,
        envCtrls.RESET_ON_TRIGGER,
        envCtrls.RELEASE_MODE,
        envCtrls.LOOP_MODE,
    ],
    setController,
    selectController,
    setUiController,
    selectUiController,
)

const customSetterFuncs = {
    [envCtrls.LEVEL.id]: stageLevel,
    [envCtrls.TIME.id]: stageTime,
    [envCtrls.TOGGLE_STAGE.id]: stageEnabled,
    [envCtrls.CURVE.id]: stageCurve,
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

    trigger,
    release,

    increment,
    toggle,
    set,
}

export default envApi