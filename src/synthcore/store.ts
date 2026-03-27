import { configureStore } from '@reduxjs/toolkit'
import envReducer from './modules/env/envReducer'
import settingsReducer from './modules/settings/settingsReducer'
import lfoReducer from './modules/lfo/lfoReducer'
import controllersReducer from './modules/controllers/controllersReducer'
import patchStorageReducer from './modules/patchStorage/patchStorageReducer'

// Redux store is retained for the synthcore API layer (envApi, lfoApi, etc.)
// which manages controller validation, bounding, and MIDI send/receive.
// The UI components do NOT use this store — they use Zustand stores exclusively.
export const store = configureStore({
    reducer: {
        controllers: controllersReducer,
        envelopes: envReducer,
        lfos: lfoReducer,
        settings: settingsReducer,
        patchStorage: patchStorageReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActionPaths: [
                    'payload.ctrl.uiResponse',
                    'payload.0.ctrl.uiResponse',
                    'payload.1.ctrl.uiResponse',
                ],
            },
        })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
