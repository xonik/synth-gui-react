import { Middleware } from 'redux'
import { ControllerGroupIds } from './types'
import { envMiddleware } from './modules/env/envMiddleware'
import { mainDisplayMiddleware } from './modules/mainDisplay/mainDisplayMiddleware'

export const synthcoreMiddleware: Middleware<{}, any> = storeAPI => next => action => {
    if (action.payload.ctrlGroup === ControllerGroupIds.ENV || action.type.indexOf('envelopes/') > -1) {
        envMiddleware(action)
    } else if(action.payload.ctrlGroup === ControllerGroupIds.MAIN_DISP) {
        mainDisplayMiddleware(action)
    }
    return next(action)
}
