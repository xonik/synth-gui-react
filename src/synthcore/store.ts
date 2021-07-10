import { configureStore } from '@reduxjs/toolkit'
import envelopesReducer from './modules/env/envelopesReducer'
import { synthcoreMiddleware } from './synthcoreMiddleware'
import controllerReducer from './modules/controller/controllerReducer'

export const store = configureStore({
    reducer: {
        envelopes: envelopesReducer,
        controller: controllerReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(
                synthcoreMiddleware,
            )
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch