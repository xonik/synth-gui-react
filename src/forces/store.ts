import { configureStore } from '@reduxjs/toolkit'
import envelopesReducer from './envelope/envelopesReducer'
import { synthcoreMiddleware } from './synthcore/synthcoreMiddleware'

export const store = configureStore({
    reducer: {
        envelopes: envelopesReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(
                synthcoreMiddleware,
            )
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch