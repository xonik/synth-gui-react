import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { ControllerConfig } from '../../../midi/types'
import { Controllers, ValueIndexedControllers } from './types'
import { getDefaultController, getDefaultEnv, getDefaultEnvStages, getDefaultEnvUiStages } from '../env/envUtils'
import { envCtrls } from '../env/envControllers'
import { mergeControllers, mergeValueIndexedControllers } from './controllersUtils'
import { Stage, STAGES } from '../env/types'
import { NumericControllerPayload } from '../common/types'
import { getDefaultLfo, getDefaultLfoStages, getDefaultUiLfoStages } from '../lfo/lfoUtils'

type ControllersState = {

    // uiXxxxxx state is used by UI when the controller has a uiResponse, meaning the visual output on the
    // potmeter differs from the value in controllers. This is used for level/time on envelopes for example,
    // to give better sensitivity in lower parts of the scale.

    // controllers that have one instance per ctrlIndex
    // e.g. controllers[envId][loopMode]
    controllers: Controllers
    uiControllers: Controllers

    // controllers that have more than one instance per ctrlIndex, e.g.
    // stages for an envelope, e.g. valueIndexedControllers[envId][time][stageId]
    // These are accessed as valueIndexedControllers[ctrlIndex][ctrl.id][valueIndex]
    valueIndexedControllers: ValueIndexedControllers
    uiValueIndexedControllers: ValueIndexedControllers
}

export const initialState: ControllersState = {
    controllers: mergeControllers([
        getDefaultEnv(0),
        getDefaultEnv(1),
        getDefaultEnv(2),
        getDefaultEnv(3),
        getDefaultEnv(4),
        getDefaultController(envCtrls.SELECT_ENV3_ID, 2),

        getDefaultLfo(0),
        getDefaultLfo(1),
        getDefaultLfo(2),
        getDefaultLfo(3),

    ]),
    uiControllers: {},
    valueIndexedControllers: mergeValueIndexedControllers(
        [
            getDefaultEnvStages(0),
            getDefaultEnvStages(1),
            getDefaultEnvStages(2),
            getDefaultEnvStages(3),
            getDefaultEnvStages(4),

            getDefaultLfoStages(0),
            getDefaultLfoStages(1),
            getDefaultLfoStages(2),
            getDefaultLfoStages(3),
        ]
    ),
    uiValueIndexedControllers: mergeValueIndexedControllers(
        [
            getDefaultEnvUiStages(0),
            getDefaultEnvUiStages(1),
            getDefaultEnvUiStages(2),
            getDefaultEnvUiStages(3),
            getDefaultEnvUiStages(4),

            getDefaultUiLfoStages(0),
            getDefaultUiLfoStages(1),
            getDefaultUiLfoStages(2),
            getDefaultUiLfoStages(3),
        ]
    ),
}

export const controllersSlice = createSlice({
    name: 'controllers',
    initialState,
    reducers: {
        // Multiple payloads may be sent as one chunk so that only one update
        // is triggered
        setController: (state, { payload }: PayloadAction<NumericControllerPayload | NumericControllerPayload[]>) => {

            const payloads = Array.isArray(payload) ? payload : [payload]

            payloads.forEach((aPayload) => {
                if (aPayload.valueIndex === undefined) {
                    controllerState.set(state, aPayload)
                    if(aPayload.uiValue !== undefined) {
                        uiControllerState.set(state, aPayload, aPayload.uiValue)
                    }
                } else {
                    valueIndexedControllerState.set(state, aPayload)
                    if(aPayload.uiValue !== undefined) {
                        uiValueIndexedControllerState.set(state, aPayload, aPayload.uiValue)
                    }
                }
            })
        },
    }
})

export const {
    setController,
} = controllersSlice.actions

const controllerState = {
    set: (state: Draft<ControllersState>, payload: NumericControllerPayload) => {
        const { ctrlIndex = 0, ctrl, value } = payload
        if (state.controllers[ctrlIndex] === undefined) {
            state.controllers[ctrlIndex] = []
        }
        state.controllers[ctrlIndex][ctrl.id] = value
    },
    get: (state: RootState, ctrl: ControllerConfig, ctrlIndex: number) => {
        const ctrlValue = state.controllers.controllers[ctrlIndex]
        if (ctrlValue === undefined) {
            return 0
        }
        return ctrlValue[ctrl.id] || 0
    }
}

const uiControllerState = {
    set: (state: Draft<ControllersState>, payload: NumericControllerPayload, value: number) => {
        const { ctrlIndex = 0, ctrl } = payload
        if (state.uiControllers[ctrlIndex] === undefined) {
            state.uiControllers[ctrlIndex] = []
        }
        state.uiControllers[ctrlIndex][ctrl.id] = value
    },
    get: (state: RootState, ctrl: ControllerConfig, ctrlIndex: number) => {
        const ctrlValue = state.controllers.uiControllers[ctrlIndex]
        if (ctrlValue === undefined) {
            return 0
        }
        return ctrlValue[ctrl.id] || 0
    }
}

const valueIndexedControllerState = {
    set: (state: Draft<ControllersState>, payload: NumericControllerPayload) => {
        const { ctrlIndex = 0, ctrl, valueIndex = 0, value } = payload
        if (state.valueIndexedControllers[ctrlIndex] === undefined) {
            state.valueIndexedControllers[ctrlIndex] = []
        }
        const indexedCtrls = state.valueIndexedControllers[ctrlIndex]
        if (indexedCtrls[ctrl.id] === undefined) {
            state.valueIndexedControllers[ctrlIndex][ctrl.id] = { [valueIndex]: value }
        } else {
            state.valueIndexedControllers[ctrlIndex][ctrl.id][valueIndex] = value
        }
    },
    get: (state: RootState, ctrl: ControllerConfig, ctrlIndex: number, valueIndex: number) => {
        const ctrlValue = state.controllers.valueIndexedControllers[ctrlIndex]
        if (ctrlValue === undefined || ctrlValue[ctrl.id] === undefined) {
            return 0
        } else {
            return state.controllers.valueIndexedControllers[ctrlIndex][ctrl.id][valueIndex] || 0
        }
    }
}

const uiValueIndexedControllerState = {
    set: (state: Draft<ControllersState>, payload: NumericControllerPayload, value: number) => {
        const { ctrlIndex = 0, ctrl, valueIndex = 0 } = payload
        if (state.uiValueIndexedControllers[ctrlIndex] === undefined) {
            state.uiValueIndexedControllers[ctrlIndex] = []
        }
        const indexedCtrls = state.uiValueIndexedControllers[ctrlIndex]
        if (indexedCtrls[ctrl.id] === undefined) {
            state.uiValueIndexedControllers[ctrlIndex][ctrl.id] = { [valueIndex]: value }
        } else {
            state.uiValueIndexedControllers[ctrlIndex][ctrl.id][valueIndex] = value
        }
    },
    get: (state: RootState, ctrl: ControllerConfig, ctrlIndex: number, valueIndex: number) => {
        const ctrlValue = state.controllers.uiValueIndexedControllers[ctrlIndex]
        if (ctrlValue === undefined || ctrlValue[ctrl.id] === undefined) {
            return 0
        } else {
            return state.controllers.uiValueIndexedControllers[ctrlIndex][ctrl.id][valueIndex] || 0
        }
    }
}

export const selectController = (ctrl: ControllerConfig, ctrlIndex: number = 0, valueIndex?: number) => (state: RootState): number => {
    if (valueIndex === undefined) {
        return controllerState.get(state, ctrl, ctrlIndex)
    } else {
        return valueIndexedControllerState.get(state, ctrl, ctrlIndex, valueIndex)
    }
}

export const selectUiController = (ctrl: ControllerConfig, ctrlIndex: number = 0, valueIndex?: number) => (state: RootState): number => {
    if (valueIndex === undefined) {
        if (ctrl.uiResponse) {
            return uiControllerState.get(state, ctrl, ctrlIndex)
        } else {
            return controllerState.get(state, ctrl, ctrlIndex)
        }
    } else {
        if (ctrl.uiResponse) {
            return uiValueIndexedControllerState.get(state, ctrl, ctrlIndex, valueIndex)
        } else {
            return valueIndexedControllerState.get(state, ctrl, ctrlIndex, valueIndex)
        }
    }
}

export const selectStageById = (envId: number, stageId: number) => (state: RootState): Stage => {

    return {
        id: stageId,
        enabled: valueIndexedControllerState.get(state, envCtrls.TOGGLE_STAGE, envId, stageId),
        curve: valueIndexedControllerState.get(state, envCtrls.CURVE, envId, stageId),
        level: valueIndexedControllerState.get(state, envCtrls.LEVEL, envId, stageId),
        time: valueIndexedControllerState.get(state, envCtrls.TIME, envId, stageId),
    }
}

export const selectStages = (envId: number) => (state: RootState): Stage[] => {
    const stages: Stage[] = []
    for (let i = 0; i < STAGES; i++) {
        stages.push(selectStageById(envId, i)(state))
    }
    return stages
}


export default controllersSlice.reducer