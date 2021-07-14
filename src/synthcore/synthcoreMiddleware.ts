import { Middleware } from 'redux'
import { click, increment } from './modules/controller/controllerReducer'
import { envApi } from './synthcoreApi'
import { StageId } from './modules/env/types'
import { toggleInvert, toggleLoopMode, toggleReleaseMode, toggleRetrigger, toggleStageEnabled, toggleStageSelected } from './modules/env/envelopesReducer'
import { mainDisplayApi } from './modules/mainDisplay/mainDisplayApi'
import { ApiSource } from './utils'
import { ControllerGroupIds, EnvControllerId } from './modules/mainDisplay/types'

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
    [EnvControllerId.ENV_SELECT]: (ctrlIndex: number, value: number) => {/* TODO: select next envelope (for env 3 ui)*/},
    [EnvControllerId.ENV_LOOP]: (ctrlIndex: number) => envApi.toggleLoopEnabled(ctrlIndex, ApiSource.GUI),
    [EnvControllerId.ENV_TRIGGER]: (ctrlIndex: number) => envApi.trigger(ctrlIndex, ApiSource.GUI),
    [EnvControllerId.ENV_INVERT]: (ctrlIndex: number) => envApi.toggleInvert(ctrlIndex, ApiSource.GUI)
}

export const synthcoreMiddleware: Middleware<{}, any> = storeAPI => next => action => {
    if (increment.match(action)) {
        const ctrlIndex = action.payload.ctrlIndex || 0

        // this may be against the redux rules, but we do not supply the storeAPI.dispatch
        // to the apis. Instead, they get dispatch directly from the store.
        if (action.payload.ctrlGroup === ControllerGroupIds.ENV) {
            envApiMapper[action.payload.ctrlId](ctrlIndex, action.payload.value)
        } else if (action.payload.ctrlGroup === ControllerGroupIds.MAIN_DISP) {
            mainDisplayApi.handleMainDisplayController(action.payload.ctrlId, action.payload.value)
        }
    } else if (click.match(action)){
        const ctrlIndex = action.payload.ctrlIndex || 0
        if (action.payload.ctrlGroup === ControllerGroupIds.ENV) {
            envApiMapper[action.payload.ctrlId](ctrlIndex, 0)
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
    } else if (toggleStageSelected.match(action)) {
        envApi.toggleStageSelected(action.payload.env, action.payload.stage, ApiSource.GUI)
    }
    return next(action)
}
