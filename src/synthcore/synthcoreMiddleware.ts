import { Middleware } from 'redux'
import { ControllerGroupIds } from './types'
import { envMiddleware } from './modules/env/envMiddleware'
import { mainDisplayMiddleware } from './modules/mainDisplay/mainDisplayMiddleware'
import { modsMiddleware } from './modules/mods/modsMiddleware'
import { lfoMiddleware } from './modules/lfo/lfoMiddleware'
import { AnyAction } from '@reduxjs/toolkit'
import modsApi from './modules/mods/modsApi'
import {
    arpApi,
    commonFxApi,
    envApi,
    filtersApi,
    fxApi,
    kbdApi, lfoApi,
    mainDisplayApi,
    masterClockApi,
    noiseApi,
    oscApi,
    outApi,
    postMixApi,
    ringModApi,
    srcMixApi,
    voicesApi
} from './synthcoreApi'
import { click, increment, release } from './modules/ui/uiReducer'
import settingsApi from './modules/settings/settingsApi'
import { ButtonInputProperty, NumericInputProperty } from './modules/common/types'
import { getVoiceGroupIndex } from "./modules/voices/currentVoiceGroupIndex";

const forApi = (action: AnyAction, ctrlGroup: number, path: string): boolean => {
    return action.payload.ctrlGroup === ctrlGroup || action.type.indexOf(`${path}/`) > -1
}

interface CtrlApi {
    toggle: (input: ButtonInputProperty) => void
    release?: (input: ButtonInputProperty) => void
    increment: (input: NumericInputProperty) => void
}

const getApi = (action: AnyAction): CtrlApi | undefined => {
    if (forApi(action, ControllerGroupIds.MODS, 'mods')) {
        return modsApi
    } else if (forApi(action, ControllerGroupIds.ENV, 'envelopes')) {
        return envApi
    } else if (forApi(action, ControllerGroupIds.OSC, 'osc')) {
        return oscApi
    } else if (forApi(action, ControllerGroupIds.LFO, 'lfos')) {
        return lfoApi
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
    } else if (forApi(action, ControllerGroupIds.SETTINGS, 'voices')) {
        return settingsApi
    } else if (action.payload.ctrlGroup === ControllerGroupIds.MAIN_DISP) {
        return mainDisplayApi
    }
}

export const synthcoreMiddleware: Middleware<{}, any> = storeAPI => next => originalAction => {

    // Sets currently selected voice group as target for actions
    const voiceGroupIndex = getVoiceGroupIndex()
    const action = { ...originalAction, payload: { ...originalAction.payload, voiceGroupIndex } }

    if (increment.match(action)) {
        // necessary to build the input value here as TS gets confused and thinks we're passing an action without voiceGroupIndex
        getApi(action)?.increment({ ...originalAction.payload, voiceGroupIndex })
    } else if (click.match(action)) {
        // necessary to build the input value here as TS gets confused and thinks we're passing an action without voiceGroupIndex
        getApi(action)?.toggle({ ...originalAction.payload, voiceGroupIndex })
    } else if (release.match(action)) {
        // necessary to build the input value here as TS gets confused and thinks we're passing an action without voiceGroupIndex
        getApi(action)?.release?.({ ...originalAction.payload, voiceGroupIndex })
    }

    if (action.payload.ctrlGroup === ControllerGroupIds.ENV || action.type.indexOf('envelopes/') > -1) {
        envMiddleware(action)
    } else if (action.payload.ctrlGroup === ControllerGroupIds.MODS || action.type.indexOf('mods/') > -1) {
        modsMiddleware(action)
    } else if (action.payload.ctrlGroup === ControllerGroupIds.LFO || action.type.indexOf('lfos/') > -1) {
        lfoMiddleware(action)
    } else if (action.payload.ctrlGroup === ControllerGroupIds.MAIN_DISP) {
        mainDisplayMiddleware(action)
    }
    return next(action)
}

