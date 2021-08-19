import { AnyAction, Dispatch } from '@reduxjs/toolkit'
import { store } from './store'

let storeDispatch: Dispatch | undefined

export const dispatch = (action: AnyAction) => {
    if (!storeDispatch) {
        storeDispatch = store.dispatch
    }
    storeDispatch(action)
}

export const getBounded = (value: number, from: number = 0, to: number = 1) => {
    if (value > to) {
        return to
    }
    if (value < from) {
        return from
    }
    return value
}

// Quantize to 16 bit to store same number as we send over midi
export const getQuantized = (value: number, factor: number = 65535) => Math.round(value * factor) / factor

export const step = (increment: number) => increment > 0 ? 1 : -1