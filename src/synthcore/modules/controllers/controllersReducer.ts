import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { ControllerConfig } from '../../../midi/types'
import { Controllers } from './types'
import { getDefaultEnv, getDefaultEnvStages, getDefaultEnvUiStages } from '../env/envUtils'
import { envCtrls } from '../env/envControllers'
import { mergeControllers } from './controllersUtils'
import { Stage, NUMBER_OF_ENVELOPE_STAGES } from '../env/types'
import { Stage as LfoStage, NUMBER_OF_LFO_STAGES as LFO_STAGES } from '../lfo/types'
import { NumericControllerPayload, PatchControllerValues } from '../common/types'
import { getDefaultLfo, getDefaultLfoStages, getDefaultUiLfoStages } from '../lfo/lfoUtils'
import { getDefaultController } from './controllersUtils'
import { getDefaultOscState } from '../osc/oscUtils'
import { getDefaultFiltersState } from '../filters/filtersUtils'
import { getDefaultSrcMixState, getDefaultSrcMixUiState } from '../srcMix/srcMixUtils'
import { getDefaultPreFxState } from "../fx/fxUtils";
import { lfoCtrls } from '../lfo/lfoControllers'
import { getVoiceGroupId } from "../../selectedVoiceGroup";

type ControllersState = {

    // uiXxxxxx state is used by UI when the controller has a uiResponse, meaning the visual output on the
    // potmeter differs from the value in controllers. This is used for level/time on envelopes for example,
    // to give better sensitivity in lower parts of the scale.

    // Controllers are structured as a three-dimensional array:
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

type ControllersStates = {
    globalControllers: ControllersState,
    voiceGroupControllers: ControllersState[]
}

export const initialStateCreator =
    (): ControllersState => {

        const controllers = [
            getDefaultOscState(),
            getDefaultSrcMixState(),
            getDefaultFiltersState(),
            getDefaultPreFxState(),
            getDefaultController(envCtrls.SELECT_ENV3_ID, 2)
        ]
        const uiControllers = [
            getDefaultSrcMixUiState()
        ]
        for (let envId = 0; envId < 5; envId++) {
            controllers.push(getDefaultEnv(envId))
            controllers.push(getDefaultEnvStages(envId))
            uiControllers.push(getDefaultEnvUiStages(envId))
        }
        for (let lfoId = 0; lfoId < 4; lfoId++) {
            controllers.push(getDefaultLfo(lfoId))
            controllers.push(getDefaultLfoStages(lfoId))
            uiControllers.push(getDefaultUiLfoStages(lfoId))
        }

        return {
            controllers: mergeControllers(controllers),
            uiControllers: mergeControllers(uiControllers)
        }
    }

const initialState = {
    globalControllers: initialStateCreator(), // TODO: Remove non global controllers
    voiceGroupControllers: [
        initialStateCreator(),
        initialStateCreator(),
        initialStateCreator(),
        initialStateCreator(),
        initialStateCreator(),
        initialStateCreator(),
        initialStateCreator(),
        initialStateCreator(),
        initialStateCreator(), // The last group is used for storing global params (params that affect all/no voices)
    ]
}


export const controllersSlice = createSlice({
    name: 'controllers',
    initialState,
    reducers: {
        // Multiple payloads may be sent as one chunk so that only one update
        // is triggered
        setController: (state, {payload}: PayloadAction<NumericControllerPayload | NumericControllerPayload[]>) => {
            const payloads = Array.isArray(payload) ? payload : [payload]
            payloads.forEach((aPayload) => {
                const existingControllersState = getControllersState(state, aPayload.ctrl)
                controllerState.set(existingControllersState, aPayload)

                if (aPayload.uiValue !== undefined) {
                    uiControllerState.set(existingControllersState, aPayload, aPayload.uiValue)
                }
            })
        },
    }
})

export const {
    setController,
} = controllersSlice.actions

// Selects the correct placement for controllers, as we have separate controllers per voice group and
// another for global controllers that should not be affected by changing the current voice group.
function getControllersState(controllersStates: ControllersStates, ctrl: ControllerConfig){
    if(ctrl.global){
        return controllersStates.globalControllers
    } else {
        return controllersStates.voiceGroupControllers[getVoiceGroupId(ctrl)]
    }
}

const controllerState = {
    set: (state: Draft<ControllersState>, payload: NumericControllerPayload) => {
        const {ctrlIndex = 0, ctrl, valueIndex = 0, value} = payload
        if (state.controllers[ctrlIndex] === undefined) {
            state.controllers[ctrlIndex] = []
        }
        const indexedCtrls = state.controllers[ctrlIndex]
        if (indexedCtrls[ctrl.id] === undefined) {
            state.controllers[ctrlIndex][ctrl.id] = {[valueIndex]: value}
        } else {
            state.controllers[ctrlIndex][ctrl.id][valueIndex] = value
        }
    },
    get: (state: RootState, ctrl: ControllerConfig, ctrlIndex: number = 0, valueIndex: number = 0) => {
        const ctrlValue = getControllersState(state.controllers, ctrl).controllers[ctrlIndex]
        return ctrlValue?.[ctrl.id]?.[valueIndex] || 0
    },
    getValueIndexValues: (state: RootState, ctrl: ControllerConfig, ctrlIndex: number = 0): PatchControllerValues => {
        const ctrlValue = getControllersState(state.controllers, ctrl).controllers[ctrlIndex]
        if (ctrlValue === undefined || ctrlValue[ctrl.id] === undefined) {
            return {0: 0}
        } else {
            let valueIndexValues: PatchControllerValues = {}
            if (ctrl.legalValueIndexes) {
                ctrl.legalValueIndexes?.forEach((valueIndex) => {
                    valueIndexValues[valueIndex] = ctrlValue[ctrl.id][valueIndex] || 0
                })
            } else {
                valueIndexValues[0] = ctrlValue[ctrl.id][0] || 0
            }
            return valueIndexValues
        }
    }
}

const uiControllerState = {
    set: (state: Draft<ControllersState>, payload: NumericControllerPayload, value: number) => {
        const {ctrlIndex = 0, ctrl, valueIndex = 0} = payload
        if (state.uiControllers[ctrlIndex] === undefined) {
            state.uiControllers[ctrlIndex] = []
        }
        const indexedCtrls = state.uiControllers[ctrlIndex]
        if (indexedCtrls[ctrl.id] === undefined) {
            state.uiControllers[ctrlIndex][ctrl.id] = {[valueIndex]: value}
        } else {
            state.uiControllers[ctrlIndex][ctrl.id][valueIndex] = value
        }
    },
    get: (state: RootState, ctrl: ControllerConfig, ctrlIndex: number = 0, valueIndex: number = 0) => {
        const ctrlValue = getControllersState(state.controllers, ctrl).uiControllers[ctrlIndex]
        return ctrlValue?.[ctrl.id]?.[valueIndex] || 0
    }
}

export const selectController = (ctrl: ControllerConfig, ctrlIndex: number = 0, valueIndex: number = 0) => (state: RootState): number => {
    return controllerState.get(state, ctrl, ctrlIndex, valueIndex)
}

export const selectControllerValueIndexValues = (ctrl: ControllerConfig, ctrlIndex: number = 0) => (state: RootState): PatchControllerValues => {
    return controllerState.getValueIndexValues(state, ctrl, ctrlIndex)
}

export const selectUiController = (ctrl: ControllerConfig, ctrlIndex: number = 0, valueIndex: number = 0) => (state: RootState): number => {
    if (ctrl.uiResponse) {
        return uiControllerState.get(state, ctrl, ctrlIndex, valueIndex)
    } else {
        return controllerState.get(state, ctrl, ctrlIndex, valueIndex)
    }
}

export const selectEnvStageById = (envId: number, stageId: number) => (state: RootState): Stage => {

    return {
        id: stageId,
        enabled: controllerState.get(state, envCtrls.TOGGLE_STAGE, envId, stageId),
        curve: controllerState.get(state, envCtrls.CURVE, envId, stageId),
        level: controllerState.get(state, envCtrls.LEVEL, envId, stageId),
        time: controllerState.get(state, envCtrls.TIME, envId, stageId),
    }
}

export const selectEnvStages = (envId: number) => (state: RootState): Stage[] => {
    const stages: Stage[] = []
    for (let i = 0; i < NUMBER_OF_ENVELOPE_STAGES; i++) {
        stages.push(selectEnvStageById(envId, i)(state))
    }
    return stages
}

export const selectLfoStageById = (lfoId: number, stageId: number) => (state: RootState): LfoStage => {

    return {
        id: stageId,
        enabled: controllerState.get(state, lfoCtrls.TOGGLE_STAGE, lfoId, stageId),
        curve: controllerState.get(state, lfoCtrls.CURVE, lfoId, stageId),

        // TODO: FIX, is used for delay time?
        time: 0.5//controllerState.get(state, lfoCtrls.CURVE, lfoId, stageId),
    }
}

export const selectLfoStages = (lfoId: number) => (state: RootState): LfoStage[] => {
    const stages: LfoStage[] = []
    for (let i = 0; i < LFO_STAGES; i++) {
        stages.push(selectLfoStageById(lfoId, i)(state))
    }
    return stages
}


export default controllersSlice.reducer