import { configureStore } from '@reduxjs/toolkit'
import envReducer from './modules/env/envReducer'
import { synthcoreMiddleware } from './synthcoreMiddleware'
import uiReducer from './modules/ui/uiReducer'
import settingsReducer from './modules/settings/settingsReducer'
import mainDisplayReducer from './modules/mainDisplay/mainDisplayReducer'
import modsReducer from './modules/mods/modsReducer'
import filtersReducer from './modules/filters/filtersReducer'
import lfoReducer from './modules/lfo/lfoReducer'
import voicesReducer from './modules/voices/voicesReducer'
import controllersReducer from './modules/controllers/controllersReducer'

export const store = configureStore({
    reducer: {
        controllers: controllersReducer,
        envelopes: envReducer,
        lfos: lfoReducer,
        filters: filtersReducer,
        mods: modsReducer,
        settings: settingsReducer,
        ui: uiReducer,
        mainDisplay: mainDisplayReducer,
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