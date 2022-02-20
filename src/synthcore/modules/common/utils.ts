import { ControllerConfig } from '../../../midi/types'
import { ButtonInputProperty, NumericInputProperty } from './commonApi'
import { paramReceive, paramSend } from './commonMidiApi'
import { dispatch, getBounded, getQuantized } from '../../utils'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { NumericControllerPayload } from './CommonReducer'
import { RootState, store } from '../../store'

export type ApiIncrementMapperType = {
    [key: number]: (value: number) => void
}

export type ApiClickMapperType = {
    [key: number]: () => void
}

type IndexIncMapperEntry = [ControllerConfig, (input: NumericInputProperty) => void]
export const createIndexIncrementMapper = (map: IndexIncMapperEntry[]) => (input: NumericInputProperty) => {
    // search for a ctrl and call the corresponding function
    map.find(([key]) => {
        return key === input.ctrl
    })?.[1](input)
}

type IndexClickMapperEntry = [ControllerConfig, (input: ButtonInputProperty) => void]
export const createIndexClickMapper = (map: IndexClickMapperEntry[]) => (input: ButtonInputProperty) => {
    // search for a ctrl and call the corresponding function
    map.find(([key]) => {
        return key === input.ctrl
    })?.[1](input)
}

// Create a mapper that receives a controller and selects the correct set function.
// Also sends midi
type MapperEntry = [ControllerConfig, (input: NumericInputProperty) => void]
export const createSetMapper = (map: MapperEntry[]) => {

    const set =  (input: NumericInputProperty) => {
        // search for a ctrl and call the corresponding function
        map.find(([key]) => {
            return key === input.ctrl
        })?.[1](input)

        // send over midi
        paramSend(input.source, input.value, input.ctrl)
    }

    // receive midi
    map.forEach(([input]) => paramReceive(input, set))

    return set
}

export const createSetterFuncs = (
    controllers: ControllerConfig[],
    action: ActionCreatorWithPayload<NumericControllerPayload, string>,
    selector: (ctrlId: number) => (state: RootState) => number) => {

    const set = (input: NumericInputProperty) => {
        const upperBound = input.ctrl.values? input.ctrl.values.length : 1
        const boundedValue = getQuantized(getBounded(input.value, 0, upperBound))
        const currentValue = selector(input.ctrl.id)(store.getState())

        if (boundedValue === currentValue) {
            return
        }

        dispatch(action({ ctrlId: input.ctrl.id, value: boundedValue }))

        // send over midi
        paramSend(input.source, boundedValue, input.ctrl)
    }
    const toggle = (input: ButtonInputProperty) => {
        const currentValue = selector(input.ctrl.id)(store.getState())
        const values = input.ctrl.values?.length || 1;
        if(input.reverse){
            if(currentValue > 0 || input.loop) {
                set({...input, value: (currentValue - 1) % values})
            }
        } else {
            if(currentValue < values-1 || input.loop) {
                set({...input, value: (currentValue + 1) % values})
            }
        }
    }

    const increment = (input: NumericInputProperty) => {
        const currentValue = selector(input.ctrl.id)(store.getState())
        set({...input, value: currentValue + input.value})
    }

    // receive midi
    controllers.forEach((ctrl) => paramReceive(ctrl, set))

    return {
        set,
        toggle,
        increment,
    }
}

export const createIncrementMapper = (map: MapperEntry[]) => (input: NumericInputProperty) => {
    // search for a ctrl and call the corresponding function
    map.find(([key]) => {
        return key === input.ctrl
    })?.[1](input)
}

type ClickMapperEntry = [ControllerConfig, (input: ButtonInputProperty) => void]
export const createClickMapper = (map: ClickMapperEntry[]) => (input: ButtonInputProperty) => {
    // search for a ctrl and call the corresponding function
    map.find(([key]) => {
        return key === input.ctrl
    })?.[1](input)
}