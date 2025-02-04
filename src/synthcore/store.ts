import { configureStore } from '@reduxjs/toolkit'
import envReducer from './modules/env/envReducer'
import { synthcoreMiddleware } from './synthcoreMiddleware'
import uiReducer from './modules/ui/uiReducer'
import settingsReducer from './modules/settings/settingsReducer'
import mainDisplayReducer from './modules/mainDisplay/mainDisplayReducer'
import modsReducer from './modules/mods/modsReducer'
import lfoReducer from './modules/lfo/lfoReducer'
import controllersReducer from './modules/controllers/controllersReducer'
import patchStorageReducer from './modules/patchStorage/patchStorageReducer'

export const store = configureStore({
    reducer: {
        controllers: controllersReducer,
        envelopes: envReducer,
        lfos: lfoReducer,
        mods: modsReducer,
        settings: settingsReducer,
        ui: uiReducer,
        mainDisplay: mainDisplayReducer,
        patchStorage: patchStorageReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these field paths in all actions
                ignoredActionPaths: [
                    'payload.ctrl.uiResponse',
                    'payload.0.ctrl.uiResponse',
                    'payload.1.ctrl.uiResponse',
                ],
            },
        })
            .concat(
                synthcoreMiddleware,
            )
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch