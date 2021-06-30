import { configureStore } from '@reduxjs/toolkit'
import envelopesReducer from './envelope/envelopesReducer'
import { synthcoreMiddleware } from './synthcore/synthcoreMiddleware'
import controllerReducer from './controller/controllerReducer'

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