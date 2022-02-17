import { NumericPayload } from '../osc/oscReducer'
import { AnyAction } from '@reduxjs/toolkit'
import { ApiSource } from '../../types'
import { ControllerConfigCCWithValue } from '../../../midi/types'
import { dispatch, getBounded, getQuantized } from '../../utils'

type NumericProperty = {
    selector: () => number
    action: (payload: NumericPayload) => AnyAction
    midi: (source: ApiSource, value: number) => void
}

type TogglableProperty = {
    config: ControllerConfigCCWithValue,
    selector: () => number
    action: (payload: NumericPayload) => AnyAction
    midi: (source: ApiSource, value: number) => void
}

export const numericPropFuncs = (property: NumericProperty) => {
    const set = (value: number, source: ApiSource) => {
        const boundedValue = getQuantized(getBounded(value))
        const currentValue = property.selector()

        if (boundedValue === currentValue) {
            return
        }

        dispatch(property.action({ value: boundedValue }))
        property.midi(source, boundedValue)
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
        if (value === currentValue) {
            return
        }
        const boundedValue = getBounded(value, 0, property.config.values.length - 1)

        dispatch(property.action({ value: boundedValue }))
        property.midi(source, boundedValue)
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