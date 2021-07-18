import { configureStore } from '@reduxjs/toolkit'
import envelopesReducer from './modules/env/envelopesReducer'
import { synthcoreMiddleware } from './synthcoreMiddleware'
import uiReducer from './modules/ui/uiReducer'
import settingsReducer from './modules/settings/settingsReducer'
import mainDisplayReducer from './modules/mainDisplay/mainDisplayReducer'

export const store = configureStore({
    reducer: {
        envelopes: envelopesReducer,
        settings: settingsReducer,
        ui: uiReducer,
        mainDisplay: mainDisplayReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(
                synthcoreMiddleware,
            )
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch