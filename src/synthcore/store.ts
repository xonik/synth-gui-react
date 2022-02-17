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

export const store = configureStore({
    reducer: {
        envelopes: envReducer,
        osc: oscReducer,
        filters: filtersReducer,
        mods: modsReducer,
        settings: settingsReducer,
        ui: uiReducer,
        mainDisplay: mainDisplayReducer,
        srcMix: srcMixReducer,
        fx: fxReducer,
        ringMod: ringModReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(
                synthcoreMiddleware,
            )
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch