import { Middleware } from 'redux'
import { increment } from '../controller/controllerReducer'
import { ControllerGroupIds, EnvControllerId } from './controllers'
import { ApiSource, envApi } from './synthcoreApi'
import { StageId } from '../envelope/types'
import { toggleInvert, toggleLoopMode, toggleReleaseMode, toggleRetrigger, toggleStageEnabled, toggleStageSelected } from '../envelope/envelopesReducer'
import { mainDisplayApi } from './controllerApi'

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
        envApi.toggleStageEnabled(action.payload.env, action.payload.stage, ApiSource.GUI);
    } else if(toggleInvert.match(action)){
        envApi.toggleInvert(action.payload.env, ApiSource.GUI);
    } else if(toggleRetrigger.match(action)){
        envApi.toggleRetrigger(action.payload.env, ApiSource.GUI);
    } else if(toggleReleaseMode.match(action)){
        envApi.toggleReleaseMode(action.payload.env, ApiSource.GUI);
    } else if(toggleLoopMode.match(action)){
        envApi.toggleLoopMode(action.payload.env, ApiSource.GUI);
    } else if(toggleStageSelected.match(action)) {
        envApi.toggleStageSelected(action.payload.env, action.payload.stage, ApiSource.GUI)
    }
    return next(action);
}
