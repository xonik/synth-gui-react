import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'
import { RootState, store } from '../../store'
import { ControllerConfig } from '../../../midi/types'
import { Controllers } from './types'
import { getDefaultEnv, getDefaultEnvStages, getDefaultEnvUiStages } from '../env/envUtils'
import { envCtrls } from '../env/envControllers'
import { mergeControllers } from './controllersUtils'
import { Stage, NUMBER_OF_ENVELOPE_STAGES } from '../env/types'
import { Stage as LfoStage, NUMBER_OF_LFO_STAGES as LFO_STAGES } from '../lfo/types'
import { MultipleControllersPayload, NumericControllerPayload, PatchControllerValues } from '../common/types'
import { getDefaultLfo, getDefaultLfoStages, getDefaultUiLfoStages } from '../lfo/lfoUtils'
import { getDefaultController } from './controllersUtils'
import { getDefaultOscState } from '../osc/oscUtils'
import { getDefaultFiltersState } from '../filters/filtersUtils'
import { getDefaultSrcMixState, getDefaultSrcMixUiState } from '../srcMix/srcMixUtils'
import { getDefaultPreFxState } from "../fx/fxUtils";
import { lfoCtrls } from '../lfo/lfoControllers'
import { VOICE_GROUPS } from "../../../utils/constants";
import { getVoiceGroupIndex } from "../voices/currentVoiceGroupIndex";

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

const initialState = (() => {
    const state: ControllersStates = {
        globalControllers: initialStateCreator(), // TODO: Remove non global controllers
        voiceGroupControllers: []
    }
    for (let i = 0; i < VOICE_GROUPS; i++) {
        state.voiceGroupControllers.push(initialStateCreator())
    }
    return state
})()

export const controllersSlice = createSlice({
    name: 'controllers',
    initialState,
    reducers: {
        setController: (state, { payload }: PayloadAction<NumericControllerPayload>) => {
            const existingControllersState = getControllersState(payload.voiceGroupIndex, state, payload.ctrl)
            controllerState.set(existingControllersState, payload)

            if (payload.uiValue !== undefined) {
                uiControllerState.set(existingControllersState, payload, payload.uiValue)
            }
        },

        // Multiple payloads may be sent as one chunk so that only one update
        // is triggered
        setControllers: (state, { payload }: PayloadAction<MultipleControllersPayload>) => {
            const payloads = payload.payloads
            payloads.forEach((aPayload) => {
                const existingControllersState = getControllersState(payload.voiceGroupIndex, state, aPayload.ctrl)
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
    setControllers,
} = controllersSlice.actions

// Selects the correct placement for controllers, as we have separate controllers per voice group and
// another for global controllers that should not be affected by changing the current voice group.
function getControllersState(voiceGroupIndex: number, controllersStates: ControllersStates, ctrl: ControllerConfig) {
    if (ctrl.global) {
        return controllersStates.globalControllers
    } else {
        return controllersStates?.voiceGroupControllers[voiceGroupIndex] || -1
    }
}

export const controllerState = {
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
    get: (voiceGroupIndex: number, state: RootState, ctrl: ControllerConfig, ctrlIndex: number = 0, valueIndex: number = 0) => {
        const ctrlValue = getControllersState(voiceGroupIndex, state.controllers, ctrl).controllers[ctrlIndex]
        return ctrlValue?.[ctrl.id]?.[valueIndex] || 0
    },
    getValueIndexValues: (voiceGroupIndex: number, state: RootState, ctrl: ControllerConfig, ctrlIndex: number = 0): PatchControllerValues => {
        const ctrlValue = getControllersState(voiceGroupIndex, state.controllers, ctrl).controllers[ctrlIndex]
        if (ctrlValue === undefined || ctrlValue[ctrl.id] === undefined) {
            return { 0: 0 }
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
    get: (voiceGroupIndex: number, state: RootState, ctrl: ControllerConfig, ctrlIndex: number = 0, valueIndex: number = 0) => {
        const ctrlValue = getControllersState(voiceGroupIndex, state.controllers, ctrl).uiControllers[ctrlIndex]
        return ctrlValue?.[ctrl.id]?.[valueIndex] || 0
    }
}

export const selectController = (ctrl: ControllerConfig, ctrlIndex: number = 0, valueIndex: number = 0) =>
    (state: RootState, voiceGroupIndex = getVoiceGroupIndex()): number => {
        return controllerState.get(voiceGroupIndex, state, ctrl, ctrlIndex, valueIndex)
    }

export const selectControllerValueIndexValues = (ctrl: ControllerConfig, ctrlIndex: number = 0) => (state: RootState, voiceGroupIndex: number): PatchControllerValues => {
    return controllerState.getValueIndexValues(voiceGroupIndex, state, ctrl, ctrlIndex)
}

export const selectUiController = (ctrl: ControllerConfig, ctrlIndex: number = 0, valueIndex: number = 0) =>
    (state: RootState, voiceGroupIndex = getVoiceGroupIndex()): number => {
        if (ctrl.uiResponse) {
            return uiControllerState.get(voiceGroupIndex, state, ctrl, ctrlIndex, valueIndex)
        } else {
            return controllerState.get(voiceGroupIndex, state, ctrl, ctrlIndex, valueIndex)
        }
    }

export const selectEnvStageById = (envId: number, stageId: number) => (state: RootState, voiceGroupIndex = getVoiceGroupIndex()): Stage => {

    return {
        id: stageId,
        enabled: controllerState.get(voiceGroupIndex, state, envCtrls.TOGGLE_STAGE, envId, stageId),
        curve: controllerState.get(voiceGroupIndex, state, envCtrls.CURVE, envId, stageId),
        level: controllerState.get(voiceGroupIndex, state, envCtrls.LEVEL, envId, stageId),
        time: controllerState.get(voiceGroupIndex, state, envCtrls.TIME, envId, stageId),
    }
}

export const selectEnvStages = (envId: number) => (state: RootState): Stage[] => {
    const stages: Stage[] = []
    for (let i = 0; i < NUMBER_OF_ENVELOPE_STAGES; i++) {
        stages.push(selectEnvStageById(envId, i)(state))
    }
    return stages
}

export const selectLfoStageById = (lfoId: number, stageId: number) => (state: RootState, voiceGroupIndex = getVoiceGroupIndex()): LfoStage => {

    return {
        id: stageId,
        enabled: controllerState.get(voiceGroupIndex, state, lfoCtrls.TOGGLE_STAGE, lfoId, stageId),
        curve: controllerState.get(voiceGroupIndex, state, lfoCtrls.CURVE, lfoId, stageId),

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