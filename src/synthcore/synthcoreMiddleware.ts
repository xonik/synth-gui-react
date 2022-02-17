import { Middleware } from 'redux'
import { ControllerGroupIds } from './types'
import { envMiddleware } from './modules/env/envMiddleware'
import { mainDisplayMiddleware } from './modules/mainDisplay/mainDisplayMiddleware'
import { modsMiddleware } from './modules/mods/modsMiddleware'
import { oscMiddleware } from './modules/osc/oscMiddleware'
import { filtersMiddleware } from './modules/filters/filtersMiddleware'

export const synthcoreMiddleware: Middleware<{}, any> = storeAPI => next => action => {
    if (action.payload.ctrlGroup === ControllerGroupIds.ENV || action.type.indexOf('envelopes/') > -1) {
        envMiddleware(action)
    } else if (action.payload.ctrlGroup === ControllerGroupIds.MODS || action.type.indexOf('mods/') > -1) {
        modsMiddleware(action)
    } else if (action.payload.ctrlGroup === ControllerGroupIds.OSC || action.type.indexOf('osc/') > -1) {
        oscMiddleware(action)
    } else if (action.payload.ctrlGroup === ControllerGroupIds.FILTERS || action.type.indexOf('filters/') > -1) {
        filtersMiddleware(action)
    } else if(action.payload.ctrlGroup === ControllerGroupIds.MAIN_DISP) {
        mainDisplayMiddleware(action)
    }
    return next(action)
}
