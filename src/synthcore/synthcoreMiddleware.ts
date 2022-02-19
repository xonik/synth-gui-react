import { Middleware } from 'redux'
import { ControllerGroupIds } from './types'
import { envMiddleware } from './modules/env/envMiddleware'
import { mainDisplayMiddleware } from './modules/mainDisplay/mainDisplayMiddleware'
import { modsMiddleware } from './modules/mods/modsMiddleware'
import { kbdMiddleware } from './modules/kbd/kbdMiddleware'
import { lfoMiddleware } from './modules/lfo/lfoMiddleware'
import { AnyAction } from '@reduxjs/toolkit'
import modsApi from './modules/mods/modsApi'
import {
    arpApi, commonFxApi,
    filtersApi,
    fxApi,
    kbdApi, mainDisplayApi,
    masterClockApi,
    noiseApi,
    oscApi, outApi, postMixApi,
    ringModApi,
    srcMixApi, voicesApi
} from './synthcoreApi'
import { click, increment } from './modules/ui/uiReducer'

const forApi = (action: AnyAction, ctrlGroup: number, path: string): boolean => {
    return action.payload.ctrlGroup === ctrlGroup || action.type.indexOf(`${path}/`) > -1
}

const getApi = (action: AnyAction) => {
    if (forApi(action, ControllerGroupIds.MODS, 'mods')) {
        return modsApi
    } else if (forApi(action, ControllerGroupIds.OSC, 'osc')) {
        return oscApi
    } else if (forApi(action, ControllerGroupIds.FILTERS, 'filters')) {
        return filtersApi
    } else if (forApi(action, ControllerGroupIds.SRC_MIX, 'srcMix')) {
        return srcMixApi
    } else if (forApi(action, ControllerGroupIds.FX, 'fx')) {
        return fxApi
    } else if (forApi(action, ControllerGroupIds.RING_MOD, 'ringMod')) {
        return ringModApi
    } else if (forApi(action, ControllerGroupIds.NOISE, 'noise')) {
        return noiseApi
    } else if (forApi(action, ControllerGroupIds.MASTER_CLOCK, 'masterClock')) {
        return masterClockApi
    } else if (forApi(action, ControllerGroupIds.ARP, 'arp')) {
        return arpApi
    } else if (forApi(action, ControllerGroupIds.KBD, 'kbd')) {
        return kbdApi
    } else if (forApi(action, ControllerGroupIds.POST_MIX, 'postMix')) {
        return postMixApi
    } else if (forApi(action, ControllerGroupIds.COMMON_FX, 'commonFx')) {
        return commonFxApi
    } else if (forApi(action, ControllerGroupIds.OUT, 'out')) {
        return outApi
    } else if (forApi(action, ControllerGroupIds.VOICES, 'voices')) {
        return voicesApi
    } else if(action.payload.ctrlGroup === ControllerGroupIds.MAIN_DISP) {
        return mainDisplayApi
    }
}

export const synthcoreMiddleware: Middleware<{}, any> = storeAPI => next => action => {
    if (increment.match(action)) {
        getApi(action)?.increment(action.payload)
    } else if (click.match(action)) {
        getApi(action)?.click(action.payload)
    }
    if (action.payload.ctrlGroup === ControllerGroupIds.ENV || action.type.indexOf('envelopes/') > -1) {
        envMiddleware(action)
    } else if (action.payload.ctrlGroup === ControllerGroupIds.MODS || action.type.indexOf('mods/') > -1) {
        modsMiddleware(action)
    } else if (action.payload.ctrlGroup === ControllerGroupIds.KBD || action.type.indexOf('kbd/') > -1) {
        kbdMiddleware(action)
    } else if (action.payload.ctrlGroup === ControllerGroupIds.LFO || action.type.indexOf('lfos/') > -1) {
        lfoMiddleware(action)
    } else if(action.payload.ctrlGroup === ControllerGroupIds.MAIN_DISP) {
        mainDisplayMiddleware(action)
    }
    return next(action)
}
