import { Middleware } from 'redux'
import { setLevel } from '../envelope/envelopesReducer'
import { StageId } from '../envelope/types'
import { increment } from '../controller/controllerReducer'
import { ControllerId } from './controllers'

export const synthcoreMiddleware: Middleware<{},any> = storeAPI => next => action => {
    if(increment.match(action)){
        if(action.payload.ctrlId === ControllerId.ENV_SUSTAIN){
            storeAPI.dispatch(setLevel({env: 0, stage: StageId.SUSTAIN, value: action.payload.value}))
        }
    }
    return next(action);
}
