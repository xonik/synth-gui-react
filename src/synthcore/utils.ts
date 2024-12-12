import { AnyAction, Dispatch } from '@reduxjs/toolkit'
import { store } from './store'
import { getDefaultController, mergeControllers } from "./modules/controllers/controllersUtils";
import { getDefaultEnv, getDefaultEnvStages, getDefaultEnvUiStages } from "./modules/env/envUtils";
import { envCtrls } from "./modules/env/envControllers";
import { getDefaultLfo, getDefaultLfoStages, getDefaultUiLfoStages } from "./modules/lfo/lfoUtils";
import { getDefaultOscState } from "./modules/osc/oscUtils";
import { getDefaultSrcMixState, getDefaultSrcMixUiState } from "./modules/srcMix/srcMixUtils";
import { getDefaultFiltersState } from "./modules/filters/filtersUtils";
import { getDefaultPreFxState } from "./modules/fx/fxUtils";

let storeDispatch: Dispatch | undefined

export const dispatch = (action: AnyAction) => {
    if (!storeDispatch) {
        storeDispatch = store.dispatch
    }
    storeDispatch(action)
}

export const getBounded = (value: number, from: number = 0, to: number = 1) => {
    if (value > to) {
        return to
    }
    if (value < from) {
        return from
    }
    return value
}

// Quantize to 16 bit to store same number as we send over midi
export const getQuantized = (value: number, factor: number = 65535) => Math.round(value * factor) / factor

export const step = (increment: number) => increment > 0 ? 1 : -1