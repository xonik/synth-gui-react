import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { ControllerConfig } from '../../../midi/types'
import { Controllers, ValueIndexedControllers } from './types'
import { getDefaultController, getDefaultEnv, getDefaultStages, getDefaultUiStages } from '../env/envUtils'
import { envCtrls } from '../env/envControllers'
import { mergeControllers, mergeValueIndexedControllers } from './controllersUtils'
import { Stage, StageId, STAGES } from '../env/types'
import { NumericControllerPayload } from '../common/types'

type ControllersState = {

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
    ]),
    uiControllers: {},
    valueIndexedControllers: mergeValueIndexedControllers(
        [
            getDefaultStages(0),
            getDefaultStages(1),
            getDefaultStages(2),
            getDefaultStages(3),
            getDefaultStages(4),
        ]
    ),
    uiValueIndexedControllers: mergeValueIndexedControllers(
        [
            getDefaultUiStages(0),
            getDefaultUiStages(1),
            getDefaultUiStages(2),
            getDefaultUiStages(3),
            getDefaultUiStages(4),
        ]
    ),
}

const setControllerState = (state: Draft<ControllersState>, payload: NumericControllerPayload) => {
    const { ctrlIndex = 0, ctrl, value } = payload
    if(state.controllers[ctrlIndex] === undefined) {
        state.controllers[ctrlIndex] = []
    }
    state.controllers[ctrlIndex][ctrl.id] = value
}
const setUiControllerState = (state: Draft<ControllersState>, payload: NumericControllerPayload) => {
    const { ctrlIndex = 0, ctrl, value } = payload
    if(state.uiControllers[ctrlIndex] === undefined) {
        state.uiControllers[ctrlIndex] = []
    }
    state.uiControllers[ctrlIndex][ctrl.id] = value
}

const getController = (state: RootState, ctrl: ControllerConfig, ctrlIndex: number) => {
    const ctrlValue = state.controllers.controllers[ctrlIndex]
    if(ctrlValue === undefined) {
        return 0
    }
    return ctrlValue[ctrl.id] || 0
}

const getUiController = (state: RootState, ctrl: ControllerConfig, ctrlIndex: number) => {
    const ctrlValue = state.controllers.uiControllers[ctrlIndex]
    if(ctrlValue === undefined) {
        return 0
    }
    return ctrlValue[ctrl.id] || 0
}

const setValueIndexedControllerState = (state: Draft<ControllersState>, payload: NumericControllerPayload) => {
    const { ctrlIndex = 0, ctrl, valueIndex = 0, value } = payload
    if(state.valueIndexedControllers[ctrlIndex] === undefined){
        state.valueIndexedControllers[ctrlIndex] = []
    }
    const indexedCtrls = state.valueIndexedControllers[ctrlIndex]
    if (indexedCtrls[ctrl.id] === undefined) {
        state.valueIndexedControllers[ctrlIndex][ctrl.id] = { [valueIndex]: value }
    } else {
        state.valueIndexedControllers[ctrlIndex][ctrl.id][valueIndex] = value
    }
}

const setUiValueIndexedControllerState = (state: Draft<ControllersState>, payload: NumericControllerPayload) => {
    const { ctrlIndex = 0, ctrl, valueIndex = 0, value } = payload
    if(state.uiValueIndexedControllers[ctrlIndex] === undefined){
        state.uiValueIndexedControllers[ctrlIndex] = []
    }
    const indexedCtrls = state.uiValueIndexedControllers[ctrlIndex]
    if (indexedCtrls[ctrl.id] === undefined) {
        state.uiValueIndexedControllers[ctrlIndex][ctrl.id] = { [valueIndex]: value }
    } else {
        state.uiValueIndexedControllers[ctrlIndex][ctrl.id][valueIndex] = value
    }
}

const getValueIndexedController = (state: RootState, ctrl: ControllerConfig, ctrlIndex: number, valueIndex: number) => {
    const ctrlValue = state.controllers.valueIndexedControllers[ctrlIndex]
    if (ctrlValue === undefined || ctrlValue[ctrl.id] === undefined) {
        return 0
    } else {
        return state.controllers.valueIndexedControllers[ctrlIndex][ctrl.id][valueIndex] || 0
    }
}

const getUiValueIndexedController = (state: RootState, ctrl: ControllerConfig, ctrlIndex: number, valueIndex: number) => {
    const ctrlValue = state.controllers.uiValueIndexedControllers[ctrlIndex]
    if (ctrlValue === undefined || ctrlValue[ctrl.id] === undefined) {
        return 0
    } else {
        return state.controllers.uiValueIndexedControllers[ctrlIndex][ctrl.id][valueIndex] || 0
    }
}

const setLevel = (state: Draft<ControllersState>, payload: NumericControllerPayload, stageId: StageId, value: number) => setValueIndexedControllerState(state, {
    ...payload,
    ctrl: envCtrls.LEVEL,
    valueIndex: stageId,
    value
})

export const controllersSlice = createSlice({
    name: 'controllers',
    initialState,
    reducers: {
        setController: (state, { payload }: PayloadAction<NumericControllerPayload>) => {
            if (payload.valueIndex === undefined) {
                setControllerState(state, payload)
            } else {
                setValueIndexedControllerState(state, payload)
            }
        },
        setUiController: (state, { payload }: PayloadAction<NumericControllerPayload>) => {
            if (payload.valueIndex === undefined) {
                setUiControllerState(state, payload)
            } else {
                setUiValueIndexedControllerState(state, payload)
            }
        },
    }
})

export const {
    setController,
    setUiController,
} = controllersSlice.actions

export const selectController = (ctrl: ControllerConfig, ctrlIndex: number = 0, valueIndex?: number) => (state: RootState): number => {
    if (valueIndex === undefined) {
        return getController(state, ctrl, ctrlIndex)
    } else {
        return getValueIndexedController(state, ctrl, ctrlIndex, valueIndex)
    }
}

export const selectUiController = (ctrl: ControllerConfig, ctrlIndex: number = 0, valueIndex?: number) => (state: RootState): number => {
    if (valueIndex === undefined) {
        if(ctrl.uiResponse){
            return getUiController(state, ctrl, ctrlIndex)
        } else {
            return getController(state, ctrl, ctrlIndex)
        }
    } else {
        if(ctrl.uiResponse){
            return getUiValueIndexedController(state, ctrl, ctrlIndex, valueIndex)
        } else {
            return getValueIndexedController(state, ctrl, ctrlIndex, valueIndex)
        }
    }
}

export const selectStageById = (envId: number, stageId: number) => (state: RootState): Stage => {

    return{
        id: stageId,
        enabled: getValueIndexedController(state, envCtrls.TOGGLE_STAGE, envId, stageId),
        curve: getValueIndexedController(state, envCtrls.CURVE, envId, stageId),
        level: getValueIndexedController(state, envCtrls.LEVEL, envId, stageId),
        time: getValueIndexedController(state, envCtrls.TIME, envId, stageId),
    }
}

export const selectStages = (envId: number) => (state: RootState): Stage[] => {
    const stages: Stage[] = [];
    for(let i = 0; i<STAGES; i++){
        stages.push(selectStageById(envId, i)(state))
    }
    return stages
}


export default controllersSlice.reducer