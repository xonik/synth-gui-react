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