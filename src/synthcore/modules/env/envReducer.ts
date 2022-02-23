import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'
import { Stage, StageId, STAGES } from './types'
import { RootState } from '../../store'
import { NumericControllerPayload } from '../common/CommonReducer'
import { envCtrls } from './envControllers'
import { ControllerConfig } from '../../../midi/types'
import { Controllers, ValueIndexedControllers } from '../controllers/types'
import { mergeControllers, mergeValueIndexedControllers } from '../controllers/controllersUtils'
import { getDefaultController, getDefaultEnv, getDefaultStages } from './envUtils'

type EnvelopesState = {
    gui: {
        currEnvId: number;
        currStageId: StageId;
    }

    // controllers that have one instance per ctrlIndex
    // e.g. controllers[envId][loopMode]
    controllers: Controllers

    // controllers that have more than one instance per ctrlIndex, e.g.
    // stages for an envelope, e.g. valueIndexedControllers[envId][time][stageId]
    // These are accessed as valueIndexedControllers[ctrlIndex][ctrl.id][valueIndex]
    valueIndexedControllers: ValueIndexedControllers
}

const conts = mergeControllers([
    getDefaultEnv(0),
    getDefaultEnv(1),
    getDefaultEnv(2),
    getDefaultEnv(3),
    getDefaultEnv(4),
])
console.log('cnts', conts)

export const initialState: EnvelopesState = {
    gui: {
        currEnvId: 0,
        currStageId: StageId.STOPPED,
    },
    controllers: mergeControllers([
        getDefaultEnv(0),
        getDefaultEnv(1),
        getDefaultEnv(2),
        getDefaultEnv(3),
        getDefaultEnv(4),
        getDefaultController(envCtrls.SELECT_ENV3_ID, 2),
    ]),
    valueIndexedControllers: mergeValueIndexedControllers(
        [
            getDefaultStages(0),
            getDefaultStages(1),
            getDefaultStages(2),
            getDefaultStages(3),
            getDefaultStages(4),
        ]
    ),
}

type StagePayload = {
    env: number;
    stage: StageId;
}

type EnvPayload = {
    env: number;
}


const setController = (state: Draft<EnvelopesState>, payload: NumericControllerPayload) => {
    const { ctrlIndex = 0, ctrl, value } = payload
    if(state.controllers[ctrlIndex] === undefined) {
        state.controllers[ctrlIndex] = []
    }
    state.controllers[ctrlIndex][ctrl.id] = value
}

const getController = (state: RootState, ctrl: ControllerConfig, ctrlIndex: number) => {
    const ctrlValue = state.envelopes.controllers[ctrlIndex]
    if(ctrlValue === undefined) {
        return 0
    }
    return ctrlValue[ctrl.id] || 0
}

const setValueIndexedController = (state: Draft<EnvelopesState>, payload: NumericControllerPayload) => {
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

const getValueIndexedController = (state: RootState, ctrl: ControllerConfig, ctrlIndex: number, valueIndex: number) => {
    const ctrlValue = state.envelopes.valueIndexedControllers[ctrlIndex]
    if (ctrlValue === undefined || ctrlValue[ctrl.id] === undefined) {
        return 0
    } else {
        return state.envelopes.valueIndexedControllers[ctrlIndex][ctrl.id][valueIndex] || 0
    }
}


const setLevel = (state: Draft<EnvelopesState>, payload: NumericControllerPayload, stageId: StageId, value: number) => setValueIndexedController(state, {
    ...payload,
    ctrl: envCtrls.LEVEL,
    valueIndex: stageId,
    value
})

export const envelopesSlice = createSlice({
    name: 'envelopes',
    initialState,
    reducers: {
        selectStage: (state, { payload }: PayloadAction<StagePayload>) => {
            state.gui.currStageId = payload.stage
        },
        deselectStage: (state, { payload }: PayloadAction<StagePayload>) => {
            state.gui.currStageId = StageId.STOPPED
        },
        selectGuiEnv: (state, { payload }: PayloadAction<EnvPayload>) => {
            state.gui.currEnvId = payload.env
        },

        setEnvController: (state, { payload }: PayloadAction<NumericControllerPayload>) => {

            if (payload.valueIndex === undefined) {
                setController(state, payload)
            } else {
                setValueIndexedController(state, payload)
            }

            // TODO: Not very nice to have this here!
            if (payload.ctrl.id === envCtrls.INVERT.id) {
                const resetLevel = payload.value ? 1 : 0
                setLevel(state, payload, StageId.DELAY, resetLevel)
                setLevel(state, payload, StageId.ATTACK, resetLevel)
                setLevel(state, payload, StageId.DECAY1, payload.value ? 0 : 1)
                setLevel(state, payload, StageId.STOPPED, resetLevel)
            }
        },

        // actions only consumed by api
        toggleStageSelected: (state, { payload }: PayloadAction<StagePayload>) => {
        },
    }
})

console.log(initialState)

export const {
    selectStage,
    deselectStage,

    selectGuiEnv,

    setEnvController,

    toggleStageSelected,
} = envelopesSlice.actions

export const selectCurrStageId = (state: RootState) => state.envelopes.gui.currStageId
export const selectCurrEnvId = (state: RootState) => state.envelopes.gui.currEnvId

export const selectEnvController = (ctrl: ControllerConfig, ctrlIndex: number, valueIndex?: number) => (state: RootState): number => {
    if (valueIndex === undefined) {
        return getController(state, ctrl, ctrlIndex)
    } else {
        return getValueIndexedController(state, ctrl, ctrlIndex, valueIndex)
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

export default envelopesSlice.reducer