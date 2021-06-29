import { Middleware } from 'redux'
import { increment } from '../controller/controllerReducer'
import { ControllerGroupIds, EnvControllerId } from './controllers'
import { envApi, mainDisplayApi } from './synthcoreApi'
import { StageId } from '../envelope/types'
import { toggleInvert, toggleLoopMode, toggleReleaseMode, toggleRetrigger, toggleStageEnabled, toggleStageSelected } from '../envelope/envelopesReducer'

type EnvApiMapperType = {
    [key: number]: (ctrlIndex: number, value: number) => void
}

const envApiMapper: EnvApiMapperType = {
    [EnvControllerId.ENV_DELAY]: (ctrlIndex: number, value: number) => envApi.incrementStageTime(ctrlIndex, StageId.DELAY, value),
    [EnvControllerId.ENV_ATTACK]: (ctrlIndex: number, value: number) => envApi.incrementStageTime(ctrlIndex, StageId.ATTACK, value),
    [EnvControllerId.ENV_DECAY1]: (ctrlIndex: number, value: number) => envApi.incrementStageTime(ctrlIndex, StageId.DECAY1, value),
    [EnvControllerId.ENV_DECAY2]: (ctrlIndex: number, value: number) => envApi.incrementStageTime(ctrlIndex, StageId.DECAY2, value),
    [EnvControllerId.ENV_SUSTAIN]: (ctrlIndex: number, value: number) => envApi.incrementStageLevel(ctrlIndex, StageId.SUSTAIN, value),
    [EnvControllerId.ENV_RELEASE1]: (ctrlIndex: number, value: number) => envApi.incrementStageTime(ctrlIndex, StageId.RELEASE1, value),
    [EnvControllerId.ENV_RELEASE2]: (ctrlIndex: number, value: number) => envApi.incrementStageTime(ctrlIndex, StageId.RELEASE2, value),
    [EnvControllerId.ENV_D2_LEVEL]: (ctrlIndex: number, value: number) => envApi.incrementStageLevel(ctrlIndex, StageId.DECAY2, value),
    [EnvControllerId.ENV_R2_LEVEL]: (ctrlIndex: number, value: number) => envApi.incrementStageLevel(ctrlIndex, StageId.RELEASE2, value),
}

export const synthcoreMiddleware: Middleware<{},any> = storeAPI => next => action => {
    if(increment.match(action)){
        const ctrlIndex = action.payload.ctrlIndex || 0;

        // this may be against the redux rules, but we do not supply the storeAPI.dispatch
        // to the apis. Instead, they get dispatch directly from the store.
        if(action.payload.ctrlGroup === ControllerGroupIds.ENV){
            envApiMapper[action.payload.ctrlId](ctrlIndex, action.payload.value);
        } else if(action.payload.ctrlGroup === ControllerGroupIds.MAIN_DISP){
            mainDisplayApi.handleMainDisplayController(action.payload.ctrlId, action.payload.value);
        }
    } else if(toggleStageEnabled.match(action)){
        envApi.toggleStageEnabled(action.payload.env, action.payload.stage);
    } else if(toggleInvert.match(action)){
        envApi.toggleInvert(action.payload.env);
    } else if(toggleRetrigger.match(action)){
        envApi.toggleRetrigger(action.payload.env);
    } else if(toggleReleaseMode.match(action)){
        envApi.toggleReleaseMode(action.payload.env);
    } else if(toggleLoopMode.match(action)){
        envApi.toggleLoopMode(action.payload.env);
    } else if(toggleStageSelected.match(action)) {
        envApi.toggleStageSelected(action.payload.env, action.payload.stage)
    }
    return next(action);
}
