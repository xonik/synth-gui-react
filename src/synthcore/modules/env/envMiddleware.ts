import { click, increment, release } from '../ui/uiReducer'
import { envApi } from '../../synthcoreApi'
import { StageId } from './types'
import { toggleInvert, toggleLoopEnabled, toggleLoopMode, toggleReleaseMode, toggleRetrigger, toggleStageEnabled, toggleStageSelected } from './envReducer'
import { ApiSource } from '../../types'
import { PayloadAction } from '@reduxjs/toolkit'
import envControllers from './envControllers'
import {
    createIndexClickMapper,
    createIndexIncrementMapper
} from '../common/utils'

const incrementMapper = createIndexIncrementMapper([
    [envControllers(0).DELAY_TIME, (ctrlIndex: number, value: number) => envApi.incrementStageTime(ctrlIndex, StageId.DELAY, value, ApiSource.UI)],
    [envControllers(0).ATTACK_TIME, (ctrlIndex: number, value: number) => envApi.incrementStageTime(ctrlIndex, StageId.ATTACK, value, ApiSource.UI)],
    [envControllers(0).DECAY1_TIME, (ctrlIndex: number, value: number) => envApi.incrementStageTime(ctrlIndex, StageId.DECAY1, value, ApiSource.UI)],
    [envControllers(0).DECAY2_TIME, (ctrlIndex: number, value: number) => envApi.incrementStageTime(ctrlIndex, StageId.DECAY2, value, ApiSource.UI)],
    [envControllers(0).SUSTAIN_LEVEL, (ctrlIndex: number, value: number) => envApi.incrementStageLevel(ctrlIndex, StageId.SUSTAIN, value, ApiSource.UI)],
    [envControllers(0).RELEASE1_TIME, (ctrlIndex: number, value: number) => envApi.incrementStageTime(ctrlIndex, StageId.RELEASE1, value, ApiSource.UI)],
    [envControllers(0).RELEASE2_TIME, (ctrlIndex: number, value: number) => envApi.incrementStageTime(ctrlIndex, StageId.RELEASE2, value, ApiSource.UI)],
    [envControllers(0).DECAY2_LEVEL, (ctrlIndex: number, value: number) => envApi.incrementStageLevel(ctrlIndex, StageId.DECAY2, value, ApiSource.UI)],
    [envControllers(0).RELEASE2_LEVEL, (ctrlIndex: number, value: number) => envApi.incrementStageLevel(ctrlIndex, StageId.RELEASE2, value, ApiSource.UI)],
])

const clickMapper = createIndexClickMapper([
    [envControllers(0).SELECT_ENV3_ID, (ctrlIndex: number) => envApi.toggleEnv3Id(ApiSource.UI)],
    [envControllers(0).LOOP, (ctrlIndex: number) => envApi.toggleLoopEnabled(ctrlIndex, ApiSource.UI)],
    [envControllers(0).TRIGGER, (ctrlIndex: number) => envApi.trigger(ctrlIndex, ApiSource.UI)],
    [envControllers(0).INVERT, (ctrlIndex: number) => envApi.toggleInvert(ctrlIndex, ApiSource.UI)],
])

export const envMiddleware = (action: PayloadAction): void => {
    if (increment.match(action)) {
        const ctrlIndex = action.payload.ctrlIndex || 0
        incrementMapper(action.payload.ctrl, ctrlIndex, action.payload.value)
    } else if (click.match(action)) {
        const ctrlIndex = action.payload.ctrlIndex || 0
        clickMapper(action.payload.ctrl, ctrlIndex)
    } else if (release.match(action)) {
        const ctrlIndex = action.payload.ctrlIndex || 0
        if(action.payload.ctrl === envControllers(0).TRIGGER){
            envApi.release(ctrlIndex, ApiSource.UI)
        }
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
