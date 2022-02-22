import { Envelope, StageId } from './types'
import {
    deselectStage,
    selectCurrEnvId,
    selectCurrStageId,
    selectGuiEnv,
    selectEnvelope,
    selectEnvelopes,
    selectStage,
    setCurve,
    setDualLevels,
    setLevel,
    setTime,
    setStageEnabled as setStageEnabledAction,
    setEnv3Id as setEnv3IdAction,
    selectEnv3Id, setEnvController, selectEnvController,
} from '../env/envReducer'
import { store } from '../../store'
import midiApi from './envMidiApi'
import { curveFuncs } from '../../../components/curves/curveCalculator'
import { ApiSource } from '../../types'
import { dispatch, getBounded, getQuantized } from '../../utils'
import { createSetterFuncs } from '../common/utils'
import envControllers from './envControllers'
import { ButtonInputProperty, NumericInputProperty } from '../common/commonApi'
import { paramReceive, paramSend } from '../common/commonMidiApi'
import { getLinearToDBMapper, getLinearToExpMapper, getMapperWithFade } from '../../../midi/slopeCalculator'

const envLevelMapper = getMapperWithFade(
    getLinearToDBMapper(32767, 32767, 23, true, false),
    32767,
    true,
    10,
)

// NB: Input is 0 to maxInput!
const envTimeMapper = getLinearToExpMapper(65534, 65534, 3.5)

const updateReleaseLevels = (env: Envelope, value: number) => {
    if (env.stages[StageId.RELEASE1].enabled) {
        dispatch(setLevel({ env: env.id, stage: StageId.RELEASE1, value }))
    } else {
        dispatch(setLevel({ env: env.id, stage: StageId.RELEASE2, value }))
    }
}

const cannotDisableStage = (stage: StageId) => stage === StageId.ATTACK || stage === StageId.RELEASE2 || stage === StageId.SUSTAIN

const selectEnv = (envId: number, source: ApiSource) => {
    // TODO: Only send if not just sent
    paramSend(source, envControllers(0).SELECT, envId)
}

const stageLevel = (() => {
    const set = ({ctrlIndex: envId = 0, value, valueIndex: stageId = 0, source}: NumericInputProperty) => {
        const env = selectEnvelopes(store.getState()).envs[envId]
        const r1enabled = env.stages[StageId.RELEASE1].enabled
        if (
            stageId === StageId.DECAY2 ||
            stageId === StageId.SUSTAIN ||
            (stageId === StageId.RELEASE2 && r1enabled)
        ) {
            let boundedValue = env.bipolar
                ? getQuantized(getBounded(value, -1, 1), 32767)
                : getQuantized(getBounded(value), 32767)

            const currentLevel = env.stages[stageId].level
            if (boundedValue === currentLevel) {
                return
            }

            // sustain level is not used directly. Instead it replaces r1 or r2 level depending on if
            // r1 is enabled or not.
            if (stageId === StageId.SUSTAIN) {
                const stage2Id = r1enabled ? StageId.RELEASE1 : StageId.RELEASE2
                dispatch(setDualLevels({ env: env.id, stage1: StageId.SUSTAIN, stage2: stage2Id, value: boundedValue }))
            } else {
                dispatch(setLevel({ env: envId, stage: stageId, value: boundedValue }))
            }

            if (stageId === StageId.SUSTAIN) {
                updateReleaseLevels(env, boundedValue)
            }

            // TODO: hard coded curve mapping only for VCA and VCF envs. Should configurable and placed elsewhere!
            if(envId === 0 || envId === 1) {
                boundedValue = Math.floor(envLevelMapper(boundedValue - 32767) + 32767)
            }
            selectEnv(envId, source)
            paramSend(source, envControllers(0).LEVEL, boundedValue, stageId)
        }
    }

    const increment = (input: NumericInputProperty) => {
        const { ctrlIndex: envId = 0, valueIndex: stageId = 0, value: inc } = input
        const currentLevel = selectEnvelope(envId)(store.getState()).stages[stageId].level
        set({...input, value: currentLevel + inc})
    }

    paramReceive(envControllers(0).LEVEL, set)

    return {
        set,
        increment,
        click: (input: ButtonInputProperty) => {}
    }
})()

const stageTime = (() => {
    const set = ({ ctrlIndex: envId = 0, value, valueIndex: stageId = 0, source }: NumericInputProperty) => {
        let boundedValue = getQuantized(getBounded(value))
        const currentTime = selectEnvelope(envId)(store.getState()).stages[stageId].time

        if (boundedValue === currentTime) {
            return
        }

        dispatch(setTime({ env: envId, stage: stageId, value: boundedValue }))

        // TODO: This should be configurable!
        boundedValue = Math.floor(envTimeMapper(boundedValue * 65535))

        selectEnv(envId, source)
        paramSend(source, envControllers(0).TIME, boundedValue, stageId)
    }

    const increment = (input: NumericInputProperty) => {
        const { ctrlIndex: envId = 0, valueIndex: stageId = 0, value: inc } = input

        const currentTime = selectEnvelope(envId)(store.getState()).stages[stageId].time
        set({ ...input, value: currentTime + inc })
    }

    return {
        set,
        increment,
        click: (input: ButtonInputProperty) => {
        }
    }
})()

const stageEnabled = (() => {
    const set = (input: NumericInputProperty) => {
        const { ctrlIndex: envId = 0, value: enabled, valueIndex: stageId = 0 } = input
        if (cannotDisableStage(stageId)) {
            return
        }

        const env = selectEnvelopes(store.getState()).envs[envId]
        if (env.stages[stageId].enabled === enabled) {
            return
        }

        dispatch(setStageEnabledAction({ env: envId, stage: stageId, enabled }))

        if (stageId === StageId.RELEASE1) {
            if (enabled) {
                dispatch(setLevel({ env: envId, stage: StageId.RELEASE1, value: env.stages[StageId.SUSTAIN].level }))
            } else {
                dispatch(setLevel({ env: envId, stage: StageId.RELEASE2, value: env.stages[StageId.SUSTAIN].level }))
            }
        }

        midiApi.stageEnabled.send(input)
    }
    const click = (input: ButtonInputProperty) => {
        const { ctrlIndex: envId = 0, valueIndex: stageId = 0 } = input        

        const env = selectEnvelopes(store.getState()).envs[envId]
        const stage = env.stages[stageId]
        const enabled = (stage.enabled + 1) % 2
        set({ ...input, value: enabled })
    }

    midiApi.stageEnabled.receive(set)

    return {
        set,
        click,
        increment: (input: NumericInputProperty) => {
        }
    }
})()

const stageCurve = (() => {
    const set = (input: NumericInputProperty) => {
        const { ctrlIndex: envId = 0, value: curve, valueIndex: stageId = 0 } = input
        const stage = selectEnvelope(envId)(store.getState()).stages[stageId]
        const boundedCurve = getBounded(curve, 0, curveFuncs.length - 1)
        if (stage.curve === boundedCurve) {
            return
        }

        dispatch(setCurve({ env: envId, stage: stageId, curve: boundedCurve }))
        midiApi.curve.send({...input, value: boundedCurve})
    }
    const increment = (input: NumericInputProperty) => {
        const { ctrlIndex: envId = 0, valueIndex: stageId = 0, value: inc } = input
        const curve = selectEnvelope(envId)(store.getState()).stages[stageId].curve
        set({ ...input, value: curve + inc })
    }

    midiApi.curve.receive(set)

    return {
        set,
        increment,
        click: (input: ButtonInputProperty) => {
        }
    }
})()

const maxLoops = (() => {
    const set = (input: NumericInputProperty) => {
        const { ctrlIndex: envId = 0, value } = input
        const currMaxLoops = selectEnvelope(envId)(store.getState()).controllers[envControllers(0).MAX_LOOPS.id]
        const boundedMaxLoops = getBounded(value, 2, 128)
        if (boundedMaxLoops === currMaxLoops) {
            return
        }

        dispatch(setEnvController({ ...input, value: boundedMaxLoops }))
        paramSend(input.source, input.ctrl, boundedMaxLoops)
    }

    const increment = (input: NumericInputProperty) => {
        const { ctrlIndex: envId = 0, value: inc } = input

        const currMaxLoops = selectEnvelope(envId)(store.getState()).controllers[envControllers(0).MAX_LOOPS.id]
        set({...input, value: currMaxLoops + inc})
    }
    
    paramReceive(envControllers(0).MAX_LOOPS, set)

    return {
        set,
        increment,
        click: (input: ButtonInputProperty) => {
        }
    }
})()

const env3Id = (() => {
    const set = (input: NumericInputProperty) => {
        const { value: id, source, ctrl } = input

        const envelopes = selectEnvelopes(store.getState()).envs.length
        const currentEnv3Id = selectEnv3Id(store.getState())
        if (id !== currentEnv3Id && id < envelopes && id > 1) {
            dispatch(setEnv3IdAction({ id }))
            paramSend(source, ctrl, id )
        }
    }
    
    const click = (input: ButtonInputProperty) => {
        const envelopes = selectEnvelopes(store.getState()).envs.length
        const currEnv3Id = selectEnv3Id(store.getState())
        let nextEnv3Id = (currEnv3Id + 1)
        if (nextEnv3Id > envelopes - 1) {
            nextEnv3Id = 2
        }
        set({...input, value: nextEnv3Id})
    }
    paramReceive(envControllers(0).SELECT_ENV3_ID, set)

    return {
        set,
        click,
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
    const boundedEnv = getBounded(envId, 0, selectEnvelopes(store.getState()).envs.length - 1)
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

const { increment: commonInc, toggle: commonClick, set: commonSet } = createSetterFuncs([
        envControllers(0).LOOP,
        envControllers(0).TRIGGER,
        envControllers(0).INVERT,
        envControllers(0).RESET_ON_TRIGGER,
        envControllers(0).RELEASE_MODE,
        envControllers(0).LOOP_MODE,
    ],
    setEnvController,
    selectEnvController,
)

const customSetterFuncs = {
    [envControllers(0).LEVEL.id]: stageLevel,
    [envControllers(0).TIME.id]: stageTime,
    [envControllers(0).TOGGLE_STAGE.id]: stageEnabled,
    [envControllers(0).CURVE.id]: stageCurve,
    [envControllers(0).MAX_LOOPS.id]: maxLoops,
    [envControllers(0).SELECT_ENV3_ID.id]: env3Id,
}

const increment = (input: NumericInputProperty) => {
    customSetterFuncs[input.ctrl.id]?.increment(input)
    commonInc(input)
}

const click = (input: ButtonInputProperty) => {
    customSetterFuncs[input.ctrl.id]?.click(input)
    commonClick(input)
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
    click,
    set,
}

export default envApi