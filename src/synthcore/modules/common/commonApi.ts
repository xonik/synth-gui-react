import { AnyAction } from '@reduxjs/toolkit'
import { ApiSource, ControllerGroupIds } from '../../types'
import { ControllerConfig, ControllerConfigCCWithValue } from '../../../midi/types'
import { dispatch, getBounded, getQuantized } from '../../utils'
import { NumericPayload } from './CommonReducer'


export type NumericInputProperty = {
    ctrlGroup?: ControllerGroupIds;
    ctrl: ControllerConfig;
    ctrlIndex?: number;
    value: number;
    source: ApiSource
}

export type ButtonInputProperty = {
    ctrlGroup?: ControllerGroupIds;
    ctrl: ControllerConfig;
    ctrlIndex?: number;
    radioButtonIndex?: number;
    reverse?: boolean;
    loop?: boolean;
    source: ApiSource
}
type NumericProperty = {
    selector: () => number
    action: (payload: NumericPayload) => AnyAction
}

type TogglableProperty = {
    config: ControllerConfigCCWithValue,
    selector: () => number
    action: (payload: NumericPayload) => AnyAction
}

export const numericPropFuncs = (property: NumericProperty) => {
    const set = (value: number, source: ApiSource) => {
        const boundedValue = getQuantized(getBounded(value))
        const currentValue = property.selector()

        if (boundedValue === currentValue) {
            return
        }

        dispatch(property.action({ value: boundedValue }))
    }

    const increment = (inc: number, source: ApiSource) => {
        const currentValue = property.selector()
        set(currentValue + inc, source)
    }

    return {
        set,
        increment
    }
}

export const togglePropFuncs = (property: TogglableProperty) => {
    const set = (value: number, source: ApiSource) => {
        const currentValue = property.selector()
        const boundedValue = getBounded(value, 0, property.config.values.length - 1)

        if (value === currentValue) {
            return
        }

        dispatch(property.action({ value: boundedValue }))
    }

    const toggle = (source: ApiSource) => {
        const currentValue = property.selector()
        set((currentValue + 1) % property.config.values.length, source)
    }

    return {
        set,
        toggle
    }
}