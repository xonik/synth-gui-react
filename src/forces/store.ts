import { configureStore } from '@reduxjs/toolkit'
import envelopesReducer from './envelope/envelopesReducer'

export const store = configureStore({
    reducer: {
        envelopes: envelopesReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch