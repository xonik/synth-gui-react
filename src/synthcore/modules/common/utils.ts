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
        return key.id === input.ctrl.id
    })?.[1](input)
}

type IndexClickMapperEntry = [ControllerConfig, (input: ButtonInputProperty) => void]
export const createIndexClickMapper = (map: IndexClickMapperEntry[]) => (input: ButtonInputProperty) => {
    // search for a ctrl and call the corresponding function
    map.find(([key]) => {
        return key.id === input.ctrl.id
    })?.[1](input)
}

// Create a mapper that receives a controller and selects the correct set function.
// Also sends midi
type MapperEntry = [ControllerConfig, (input: NumericInputProperty) => void]
export const createSetMapper = (map: MapperEntry[]) => {

    const set =  (input: NumericInputProperty) => {
        // search for a ctrl and call the corresponding function
        map.find(([key]) => {
            return key.id === input.ctrl.id
        })?.[1](input)

        // send over midi
        paramSend(input.source, input.ctrl, input.value)
    }

    // receive midi
    map.forEach(([input]) => paramReceive(input, set))

    return set
}

export const createSetterFuncs = (
    controllers: ControllerConfig[],
    action: ActionCreatorWithPayload<NumericControllerPayload, string>,
    selector: (ctrl: ControllerConfig, ctrlIndex: number) => (state: RootState) => number) => {

    const set = (input: NumericInputProperty) => {
        // Not for this reducer!
        if(!controllers.find((cont) => cont.id === input.ctrl.id)){
            return
        }
        const lowerBound = input.ctrl.bipolar === true ? -1 : 0
        const upperBound = input.ctrl.values? input.ctrl.values.length : 1
        const boundedValue = getQuantized(getBounded(input.value, lowerBound, upperBound))
        const currentValue = selector(input.ctrl, input.ctrlIndex || 0)(store.getState())

        if (boundedValue === currentValue) {
            return
        }

        // Not always present, and may only be sent for nrpn messages. Represents stage etc, the top
        // 5 bits left over when 16 bits have been used for value.
        const boundedValueIndex = getBounded(input.valueIndex || 0, 0, 31)

        dispatch(action({ ctrlIndex: input.ctrlIndex, ctrl: input.ctrl, value: boundedValue }))

        // send over midi
        paramSend(input.source, input.ctrl, boundedValue, boundedValueIndex)
    }
    const toggle = (input: ButtonInputProperty) => {
        // Not for this reducer!
        if(!controllers.find((cont) => cont.id === input.ctrl.id)){
            return
        }

        const currentValue = selector(input.ctrl, input.ctrlIndex || 0)(store.getState())
        const values = input.ctrl.values?.length || 1;

        // Radio buttons
        if(input.radioButtonIndex !== undefined) {
            if(currentValue === input.radioButtonIndex) {
                set({...input, value: 0})
            } else {
                set({...input, value: input.radioButtonIndex})
            }
            return;
        }

        // Normal buttons
        if(input.reverse){
            if(currentValue > 0 || input.loop) {
                set({...input, value: (currentValue - 1 + values) % values})
            }
        } else {
            if(currentValue < values - 1 || input.loop) {
                set({...input, value: (currentValue + 1) % values})
            }
        }
    }

    const increment = (input: NumericInputProperty) => {
        // Not for this reducer!
        if(!controllers.find((cont) => cont.id === input.ctrl.id)){
            return
        }

        const currentValue = selector(input.ctrl, input.ctrlIndex || 0)(store.getState())
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
        return key.id === input.ctrl.id
    })?.[1](input)
}

type ClickMapperEntry = [ControllerConfig, (input: ButtonInputProperty) => void]
export const createClickMapper = (map: ClickMapperEntry[]) => (input: ButtonInputProperty) => {
    // search for a ctrl and call the corresponding function
    map.find(([key]) => {
        return key.id === input.ctrl.id
    })?.[1](input)
}