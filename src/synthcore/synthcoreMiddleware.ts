import { Middleware } from 'redux'
import { ControllerGroupIds } from './types'
import { envMiddleware } from './modules/env/envMiddleware'
import { mainDisplayMiddleware } from './modules/mainDisplay/mainDisplayMiddleware'
import { modsMiddleware } from './modules/mods/modsMiddleware'
import { oscMiddleware } from './modules/osc/oscMiddleware'
import { filtersMiddleware } from './modules/filters/filtersMiddleware'
import { srcMixMiddleware } from './modules/srcMix/srcMixMiddleware'
import { fxMiddleware } from './modules/fx/fxMiddleware'
import { ringModMiddleware } from './modules/ringMod/ringModMiddleware'
import { noiseMiddleware } from './modules/noise/noiseMiddleware'
import { masterClockMiddleware } from './modules/masterClock/masterClockMiddleware'
import { arpMiddleware } from './modules/arp/arpMiddleware'
import { kbdMiddleware } from './modules/kbd/kbdMiddleware'
import { postMixMiddleware } from './modules/postMix/postMixMiddleware'

export const synthcoreMiddleware: Middleware<{}, any> = storeAPI => next => action => {
    if (action.payload.ctrlGroup === ControllerGroupIds.ENV || action.type.indexOf('envelopes/') > -1) {
        envMiddleware(action)
    } else if (action.payload.ctrlGroup === ControllerGroupIds.MODS || action.type.indexOf('mods/') > -1) {
        modsMiddleware(action)
    } else if (action.payload.ctrlGroup === ControllerGroupIds.OSC || action.type.indexOf('osc/') > -1) {
        oscMiddleware(action)
    } else if (action.payload.ctrlGroup === ControllerGroupIds.FILTERS || action.type.indexOf('filters/') > -1) {
        filtersMiddleware(action)
    } else if (action.payload.ctrlGroup === ControllerGroupIds.SRC_MIX || action.type.indexOf('srcMix/') > -1) {
        srcMixMiddleware(action)
    } else if (action.payload.ctrlGroup === ControllerGroupIds.FX || action.type.indexOf('fx/') > -1) {
        fxMiddleware(action)
    } else if (action.payload.ctrlGroup === ControllerGroupIds.RING_MOD || action.type.indexOf('ringMod/') > -1) {
        ringModMiddleware(action)
    } else if (action.payload.ctrlGroup === ControllerGroupIds.NOISE || action.type.indexOf('noise/') > -1) {
        noiseMiddleware(action)
    } else if (action.payload.ctrlGroup === ControllerGroupIds.MASTER_CLOCK || action.type.indexOf('masterClock/') > -1) {
        masterClockMiddleware(action)
    } else if (action.payload.ctrlGroup === ControllerGroupIds.ARP || action.type.indexOf('arp/') > -1) {
        arpMiddleware(action)
    } else if (action.payload.ctrlGroup === ControllerGroupIds.KBD || action.type.indexOf('kbd/') > -1) {
        kbdMiddleware(action)
    } else if (action.payload.ctrlGroup === ControllerGroupIds.POST_MIX || action.type.indexOf('postMix/') > -1) {
        postMixMiddleware(action)
    } else if(action.payload.ctrlGroup === ControllerGroupIds.MAIN_DISP) {
        mainDisplayMiddleware(action)
    }
    return next(action)
}
