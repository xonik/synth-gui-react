import { configureStore } from '@reduxjs/toolkit'
import envReducer from './modules/env/envReducer'
import { synthcoreMiddleware } from './synthcoreMiddleware'
import uiReducer from './modules/ui/uiReducer'
import settingsReducer from './modules/settings/settingsReducer'
import mainDisplayReducer from './modules/mainDisplay/mainDisplayReducer'
import modsReducer from './modules/mods/modsReducer'
import oscReducer from './modules/osc/oscReducer'
import filtersReducer from './modules/filters/filtersReducer'
import srcMixReducer from './modules/srcMix/srcMixReducer'
import fxReducer from './modules/fx/fxReducer'
import ringModReducer from './modules/ringMod/ringModReducer'
import noiseReducer from './modules/noise/noiseReducer'
import masterClockReducer from './modules/masterClock/masterClockReducer'
import arpReducer from './modules/arp/arpReducer'
import kbdReducer from './modules/kbd/kbdReducer'
import postMixReducer from './modules/postMix/postMixReducer'
import commonFxReducer from './modules/commonFx/commonFxReducer'
import outReducer from './modules/out/outReducer'
import lfoReducer from './modules/lfo/lfoReducer'
import voicesReducer from './modules/voices/voicesReducer'

export const store = configureStore({
    reducer: {
        envelopes: envReducer,
        lfos: lfoReducer,
        osc: oscReducer,
        filters: filtersReducer,
        mods: modsReducer,
        settings: settingsReducer,
        ui: uiReducer,
        mainDisplay: mainDisplayReducer,
        srcMix: srcMixReducer,
        fx: fxReducer,
        ringMod: ringModReducer,
        noise: noiseReducer,
        masterClock: masterClockReducer,
        arp: arpReducer,
        kbd: kbdReducer,
        postMix: postMixReducer,
        commonFx: commonFxReducer,
        out: outReducer,
        voices: voicesReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(
                synthcoreMiddleware,
            )
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch