import { click, increment } from '../ui/uiReducer'
import { envApi } from '../../synthcoreApi'
import { StageId } from './types'
import { toggleInvert, toggleLoopEnabled, toggleLoopMode, toggleReleaseMode, toggleRetrigger, toggleStageEnabled, toggleStageSelected } from './envelopesReducer'
import { ApiSource } from '../../types'
import { EnvControllerId } from './types'
import { PayloadAction } from '@reduxjs/toolkit'

type EnvApiMapperType = {
    [key: number]: (ctrlIndex: number, value: number) => void
}

const envApiMapper: EnvApiMapperType = {
    [EnvControllerId.ENV_DELAY]: (ctrlIndex: number, value: number) => envApi.incrementStageTime(ctrlIndex, StageId.DELAY, value, ApiSource.GUI),
    [EnvControllerId.ENV_ATTACK]: (ctrlIndex: number, value: number) => envApi.incrementStageTime(ctrlIndex, StageId.ATTACK, value, ApiSource.GUI),
    [EnvControllerId.ENV_DECAY1]: (ctrlIndex: number, value: number) => envApi.incrementStageTime(ctrlIndex, StageId.DECAY1, value, ApiSource.GUI),
    [EnvControllerId.ENV_DECAY2]: (ctrlIndex: number, value: number) => envApi.incrementStageTime(ctrlIndex, StageId.DECAY2, value, ApiSource.GUI),
    [EnvControllerId.ENV_SUSTAIN]: (ctrlIndex: number, value: number) => envApi.incrementStageLevel(ctrlIndex, StageId.SUSTAIN, value, ApiSource.GUI),
    [EnvControllerId.ENV_RELEASE1]: (ctrlIndex: number, value: number) => envApi.incrementStageTime(ctrlIndex, StageId.RELEASE1, value, ApiSource.GUI),
    [EnvControllerId.ENV_RELEASE2]: (ctrlIndex: number, value: number) => envApi.incrementStageTime(ctrlIndex, StageId.RELEASE2, value, ApiSource.GUI),
    [EnvControllerId.ENV_D2_LEVEL]: (ctrlIndex: number, value: number) => envApi.incrementStageLevel(ctrlIndex, StageId.DECAY2, value, ApiSource.GUI),
    [EnvControllerId.ENV_R2_LEVEL]: (ctrlIndex: number, value: number) => envApi.incrementStageLevel(ctrlIndex, StageId.RELEASE2, value, ApiSource.GUI),
    [EnvControllerId.ENV_SELECT_ENV3ID]: () => envApi.toggleEnv3Id(ApiSource.GUI),
    [EnvControllerId.ENV_LOOP]: (ctrlIndex: number) => envApi.toggleLoopEnabled(ctrlIndex, ApiSource.GUI),
    [EnvControllerId.ENV_TRIGGER]: (ctrlIndex: number) => envApi.trigger(ctrlIndex, ApiSource.GUI),
    [EnvControllerId.ENV_INVERT]: (ctrlIndex: number) => envApi.toggleInvert(ctrlIndex, ApiSource.GUI)
}

export const envMiddleware = (action: PayloadAction): void => {
    if (increment.match(action)) {
        const ctrlIndex = action.payload.ctrlIndex || 0
        envApiMapper[action.payload.ctrlId](ctrlIndex, action.payload.value)
    } else if (click.match(action)) {
        const ctrlIndex = action.payload.ctrlIndex || 0
        envApiMapper[action.payload.ctrlId](ctrlIndex, 0)
    } else if (toggleStageEnabled.match(action)) {
        envApi.toggleStageEnabled(action.payload.env, action.payload.stage, ApiSource.GUI)
    } else if (toggleInvert.match(action)) {
        envApi.toggleInvert(action.payload.env, ApiSource.GUI)
    } else if (toggleRetrigger.match(action)) {
        envApi.toggleRetrigger(action.payload.env, ApiSource.GUI)
    } else if (toggleReleaseMode.match(action)) {
        envApi.toggleReleaseMode(action.payload.env, ApiSource.GUI)
    } else if (toggleLoopMode.match(action)) {
        envApi.toggleLoopMode(action.payload.env, ApiSource.GUI)
    } else if (toggleLoopEnabled.match(action)) {
        envApi.toggleLoopEnabled(action.payload.env, ApiSource.GUI)
    } else if (toggleStageSelected.match(action)) {
        envApi.toggleStageSelected(action.payload.env, action.payload.stage, ApiSource.GUI)
    }
}
