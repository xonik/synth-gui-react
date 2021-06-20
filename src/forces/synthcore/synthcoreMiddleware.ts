import { Middleware } from 'redux'
import { increment } from '../controller/controllerReducer'
import { ControllerId, envControllerIds } from './controllers'
import { envApi } from './synthcoreApi'
import { StageId } from '../envelope/types'
import { toggleStageEnabled } from '../envelope/envelopesReducer'

const envApiMapper = {
    [ControllerId.ENV_DELAY]: (ctrlIndex: number, value: number) => envApi.setStageTime(ctrlIndex, StageId.DELAY, value),
    [ControllerId.ENV_ATTACK]: (ctrlIndex: number, value: number) => envApi.setStageTime(ctrlIndex, StageId.ATTACK, value),
    [ControllerId.ENV_DECAY1]: (ctrlIndex: number, value: number) => envApi.setStageTime(ctrlIndex, StageId.DECAY1, value),
    [ControllerId.ENV_DECAY2]: (ctrlIndex: number, value: number) => envApi.setStageTime(ctrlIndex, StageId.DECAY2, value),
    [ControllerId.ENV_SUSTAIN]: (ctrlIndex: number, value: number) => envApi.setStageLevel(ctrlIndex, StageId.SUSTAIN, value),
    [ControllerId.ENV_RELEASE1]: (ctrlIndex: number, value: number) => envApi.setStageTime(ctrlIndex, StageId.RELEASE1, value),
    [ControllerId.ENV_RELEASE2]: (ctrlIndex: number, value: number) => envApi.setStageTime(ctrlIndex, StageId.RELEASE2, value),
    [ControllerId.ENV_D2_LEVEL]: (ctrlIndex: number, value: number) => envApi.setStageLevel(ctrlIndex, StageId.DECAY2, value),
    [ControllerId.ENV_R2_LEVEL]: (ctrlIndex: number, value: number) => envApi.setStageLevel(ctrlIndex, StageId.RELEASE2, value),
}

export const synthcoreMiddleware: Middleware<{},any> = storeAPI => next => action => {
    if(increment.match(action)){
        const ctrlIndex = action.payload.ctrlIndex || 0;

        // this may be against the redux rules, but we do not supply the storeAPI.dispatch
        // to the apis. Instead, they get dispatch directly from the store.
        if(envControllerIds.includes(action.payload.ctrlId)){
            envApiMapper[action.payload.ctrlId](ctrlIndex, action.payload.value);
        }
    }
    if(toggleStageEnabled.match(action)){
        envApi.toggleStageEnabled(action.payload.env, action.payload.stage);
    }
    return next(action);
}
