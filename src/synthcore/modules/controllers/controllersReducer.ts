import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { ControllerConfig } from '../../../midi/types'
import { Controllers } from './types'
import { getDefaultEnv, getDefaultEnvStages, getDefaultEnvUiStages } from '../env/envUtils'
import { envCtrls } from '../env/envControllers'
import { mergeControllers } from './controllersUtils'
import { Stage, STAGES } from '../env/types'
import { NumericControllerPayload } from '../common/types'
import { getDefaultLfo, getDefaultLfoStages, getDefaultUiLfoStages } from '../lfo/lfoUtils'
import { getDefaultController } from './controllersUtils'
import { getDefaultOscState } from '../osc/oscUtils'
import { getDefaultFiltersState } from '../filters/filtersUtils'
import { getDefaultSrcMixState, getDefaultSrcMixUiState } from '../srcMix/srcMixUtils'

type ControllersState = {

    // uiXxxxxx state is used by UI when the controller has a uiResponse, meaning the visual output on the
    // potmeter differs from the value in controllers. This is used for level/time on envelopes for example,
    // to give better sensitivity in lower parts of the scale.

    // Controllers are structured as a three dimensional array:
    // - First index is the ctrlIndex, e.g. envId
    // - Second is the ctrlId, e.g. level
    // - Third is the valueIndex, if there are multiple instances of a value for a ctrlIndex, e.g. attack
    //
    // controllers[envId][level][attack]
    //
    // controllers with only one ctrlIndex, for example ring mod level, will end up
    // as ctrlIndex 0 even if no ctrlIndex is supplied in the action or selector.
    //
    // Similarly, controllers with only one valueIndex will get valueIndex 0.
    controllers: Controllers
    uiControllers: Controllers
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

        getDefaultEnvStages(0),
        getDefaultEnvStages(1),
        getDefaultEnvStages(2),
        getDefaultEnvStages(3),
        getDefaultEnvStages(4),

        getDefaultLfoStages(0),
        getDefaultLfoStages(1),
        getDefaultLfoStages(2),
        getDefaultLfoStages(3),

        getDefaultOscState(),

        getDefaultSrcMixState(),

        getDefaultFiltersState(),
    ]),
    uiControllers: mergeControllers(
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

            getDefaultSrcMixUiState(),
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
                controllerState.set(state, aPayload)
                if(aPayload.uiValue !== undefined) {
                    uiControllerState.set(state, aPayload, aPayload.uiValue)
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
        const { ctrlIndex = 0, ctrl, valueIndex = 0, value } = payload
        if (state.controllers[ctrlIndex] === undefined) {
            state.controllers[ctrlIndex] = []
        }
        const indexedCtrls = state.controllers[ctrlIndex]
        if (indexedCtrls[ctrl.id] === undefined) {
            state.controllers[ctrlIndex][ctrl.id] = { [valueIndex]: value }
        } else {
            state.controllers[ctrlIndex][ctrl.id][valueIndex] = value
        }
    },
    get: (state: RootState, ctrl: ControllerConfig, ctrlIndex: number = 0, valueIndex: number = 0) => {
        const ctrlValue = state.controllers.controllers[ctrlIndex]
        if (ctrlValue === undefined || ctrlValue[ctrl.id] === undefined) {
            return 0
        } else {
            return state.controllers.controllers[ctrlIndex][ctrl.id][valueIndex] || 0
        }
    }
}

const uiControllerState = {
    set: (state: Draft<ControllersState>, payload: NumericControllerPayload, value: number) => {
        const { ctrlIndex = 0, ctrl, valueIndex = 0 } = payload
        if (state.uiControllers[ctrlIndex] === undefined) {
            state.uiControllers[ctrlIndex] = []
        }
        const indexedCtrls = state.uiControllers[ctrlIndex]
        if (indexedCtrls[ctrl.id] === undefined) {
            state.uiControllers[ctrlIndex][ctrl.id] = { [valueIndex]: value }
        } else {
            state.uiControllers[ctrlIndex][ctrl.id][valueIndex] = value
        }
    },
    get: (state: RootState, ctrl: ControllerConfig, ctrlIndex: number = 0, valueIndex: number = 0) => {
        const ctrlValue = state.controllers.uiControllers[ctrlIndex]
        if (ctrlValue === undefined || ctrlValue[ctrl.id] === undefined) {
            return 0
        } else {
            return state.controllers.uiControllers[ctrlIndex][ctrl.id][valueIndex] || 0
        }
    }
}

export const selectController = (ctrl: ControllerConfig, ctrlIndex: number = 0, valueIndex: number = 0) => (state: RootState): number => {
    return controllerState.get(state, ctrl, ctrlIndex, valueIndex)
}

export const selectUiController = (ctrl: ControllerConfig, ctrlIndex: number = 0, valueIndex: number = 0) => (state: RootState): number => {
    if (ctrl.uiResponse) {
        return uiControllerState.get(state, ctrl, ctrlIndex, valueIndex)
    } else {
        return controllerState.get(state, ctrl, ctrlIndex, valueIndex)
    }
}

export const selectStageById = (envId: number, stageId: number) => (state: RootState): Stage => {

    return {
        id: stageId,
        enabled: controllerState.get(state, envCtrls.TOGGLE_STAGE, envId, stageId),
        curve: controllerState.get(state, envCtrls.CURVE, envId, stageId),
        level: controllerState.get(state, envCtrls.LEVEL, envId, stageId),
        time: controllerState.get(state, envCtrls.TIME, envId, stageId),
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