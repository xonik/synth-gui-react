// createSlice
// separate reducer for stage

import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'
import { Curve, Envelope, Stage, StageId, STAGES } from './types'
import { getDefaultEnvelope } from './envUtils'
import { RootState } from '../../store'
import { NumericControllerPayload } from '../common/CommonReducer'
import envControllers, { envCtrls } from './envControllers'
import { ControllerConfig } from '../../../midi/types'
import { useAppSelector } from '../../hooks'

type EnvelopesState = {
    envs: Envelope[];
    gui: {
        currEnvId: number;
        currStageId: StageId;
    }

    // controllers that have one instance per ctrlIndex
    // e.g. controllers[envId][loopMode]
    controllers: {
        [ctrlId: number]: number
    }[]

    // controllers that have more than one instance per ctrlIndex, e.g.
    // stages for an envelope, e.g. valueIndexedControllers[envId][time][stageId]
    // These are accessed as valueIndexedControllers[ctrlIndex][ctrl.id][valueIndex]
    valueIndexedControllers: {
        [ctrlId: number]: { [valueIndex: number]: number }
    }[]
}

export const initialState: EnvelopesState = {
    envs: [
        getDefaultEnvelope(0),
        getDefaultEnvelope(1),
        getDefaultEnvelope(2),
        getDefaultEnvelope(3),
        getDefaultEnvelope(4),
    ],
    gui: {
        currEnvId: 0,
        currStageId: StageId.STOPPED,
    },
    controllers: [],
    valueIndexedControllers: [],
}

type StagePayload = {
    env: number;
    stage: StageId;
}

type EnvPayload = {
    env: number;
}

const setValueIndexedController = (state: Draft<EnvelopesState>, payload: NumericControllerPayload) => {
    const { ctrlIndex = 0, ctrl, valueIndex = 0, value } = payload
    const indexedCtrls = state.valueIndexedControllers[ctrlIndex]
    if (indexedCtrls[ctrl.id] === undefined) {
        indexedCtrls[ctrl.id] = { [valueIndex]: value }
    } else {
        indexedCtrls[ctrl.id][valueIndex] = value
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
                const { ctrlIndex = 0, ctrl, value } = payload
                const ctrls = state.controllers[ctrlIndex]
                ctrls[ctrl.id] = value
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

export const {
    selectStage,
    deselectStage,

    selectGuiEnv,

    setEnvController,

    toggleStageSelected,
} = envelopesSlice.actions

export const selectEnvelopes = (state: RootState) => state.envelopes
export const selectEnvelope = (envId: number) => (state: RootState) => state.envelopes.envs[envId]

export const selectCurrStageId = (state: RootState) => state.envelopes.gui.currStageId
export const selectCurrEnvId = (state: RootState) => state.envelopes.gui.currEnvId

const getValueIndexedController = (ctrl: ControllerConfig, ctrlIndex: number, valueIndex: number, state: RootState) => {
    const ctrlValue = state.envelopes.valueIndexedControllers[ctrlIndex]
    if (ctrlValue === undefined || ctrlValue[ctrl.id] === undefined) {
        return 0
    } else {
        return ctrlValue[ctrl.id][valueIndex]
    }
}

export const selectEnvController = (ctrl: ControllerConfig, ctrlIndex: number, valueIndex?: number) => (state: RootState): number => {
    if (valueIndex === undefined) {
        const ctrlValue = state.envelopes.controllers[ctrlIndex]
        if(ctrlValue === undefined) {
            return 0
        }
        return ctrlValue[ctrl.id] || 0
    } else {
        return getValueIndexedController(ctrl, ctrlIndex, valueIndex, state)
    }
}

export const selectStageById = (envId: number, stageId: number) => (state: RootState): Stage => {

    return{
        id: stageId,
        enabled: getValueIndexedController(envCtrls.TOGGLE_STAGE, envId, stageId, state),
        curve: getValueIndexedController(envCtrls.CURVE, envId, stageId, state),
        level: getValueIndexedController(envCtrls.LEVEL, envId, stageId, state),
        time: getValueIndexedController(envCtrls.TIME, envId, stageId, state),
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