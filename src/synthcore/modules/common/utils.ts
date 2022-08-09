import { ControllerConfig } from '../../../midi/types'
import { paramReceive, ParamReceiveFunc, paramSend, ParamSendFunc } from './commonMidiApi'
import { dispatch, getBounded, getQuantized } from '../../utils'
import { store } from '../../store'
import { ButtonInputProperty, NumericInputProperty } from './types'
import { selectController, selectUiController, setController } from '../controllers/controllersReducer'

// TODO: Not in use and I can't remember why
/*
export type ApiIncrementMapperType = {
    [key: number]: (value: number) => void
}

export type ApiClickMapperType = {
    [key: number]: () => void
}
 */

// TODO: Not in use and I can't remember why
/*

type IndexIncMapperEntry = [ControllerConfig, (input: NumericInputProperty) => void]
export const createIndexIncrementMapper = (map: IndexIncMapperEntry[]) => (input: NumericInputProperty) => {
    // search for a ctrl and call the corresponding function
    map.find(([key]) => {
        return key.id === input.ctrl.id
    })?.[1](input)
}
*/

// TODO: Not in use and I can't remember why
/*
type IndexClickMapperEntry = [ControllerConfig, (input: ButtonInputProperty) => void]
export const createIndexClickMapper = (map: IndexClickMapperEntry[]) => (input: ButtonInputProperty) => {
    // search for a ctrl and call the corresponding function
    map.find(([key]) => {
        return key.id === input.ctrl.id
    })?.[1](input)
}
 */

// Create a mapper that receives a controller and selects the correct set function.
// Also sends midi. Midi functions may be overridden, useful for for example envs and lfos where
// we send the env id separately
// TODO: Not in use and I can't remember why
type MapperEntry = [ControllerConfig, (input: NumericInputProperty) => void]
/*
export const createSetMapper = (map: MapperEntry[], midiFuncs?: {send?: ParamSendFunc, receive?: ParamReceiveFunc}) => {

    const set =  (input: NumericInputProperty) => {
        // search for a ctrl and call the corresponding function
        map.find(([key]) => {
            return key.id === input.ctrl.id
        })?.[1](input)

        // send over midi
        if(midiFuncs && midiFuncs.send) {
            midiFuncs.send(input)
        } else {
            paramSend(input)
        }
    }

    // receive midi
    map.forEach(([input]) => {
        if(midiFuncs && midiFuncs.receive){
            midiFuncs.receive(input, set)
        } else {
            paramReceive(input, set)
        }
    })

    return set
}
 */

const getBoundedController = (ctrl: ControllerConfig, value: number) => {
    const lowerBound = ctrl.bipolar === true ? -1 : 0
    const upperBound = ctrl.values? ctrl.values.length : 1
    return getQuantized(getBounded(value, lowerBound, upperBound))
}

export const createSetterFuncs = (
    controllers: ControllerConfig[],
    midiFuncs?: {send?: ParamSendFunc, receive?: ParamReceiveFunc}
) => {
    const set = (input: NumericInputProperty, forceSet = false, uiValue?: number) => {
        const { ctrl, ctrlIndex, valueIndex, value } = input

        // Not for this reducer!
        if(!controllers.find((cont) => cont.id === ctrl.id)){
            return
        }

        const boundedValue = getBoundedController(ctrl, value)
        const currentValue = selectController(ctrl, ctrlIndex || 0)(store.getState())

        if (boundedValue === currentValue && !forceSet) {
            return
        }

        // Not always present, and may only be sent for nrpn messages. Represents stage etc, the top
        // 5 bits left over when 16 bits have been used for value.
        const boundedValueIndex = valueIndex !== undefined ? getBounded(valueIndex, 0, 31) : undefined
        const boundedInput = {...input, value: boundedValue, valueIndex: boundedValueIndex, uiValue}

        dispatch(setController(boundedInput))

        // send over midi
        if(midiFuncs && midiFuncs.send) {
            midiFuncs.send(boundedInput)
        } else {
            paramSend(boundedInput)
        }
    }
    const toggle = (input: ButtonInputProperty) => {
        // Not for this reducer!
        if(!controllers.find((cont) => cont.id === input.ctrl.id)){
            return
        }

        const currentValue = selectController(input.ctrl, input.ctrlIndex || 0)(store.getState())
        const values = input.ctrl.values?.length || 1;

        // Single value buttons, click only, no toggle
        if(values === 1) {
            set({...input, value: 0}, true)
            return;
        }

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

    const release = (input: ButtonInputProperty) => {
        if(input.momentary && input.ctrl.values && input.ctrl.values.length > 1){
            set({...input, value: 1}, true)
        }
    }

    const increment = (input: NumericInputProperty) => {
        // Not for this reducer!
        if(!controllers.find((cont) => cont.id === input.ctrl.id)){
            return
        }

        const { value: inc, ctrl } = input
        if(ctrl.uiResponse && selectUiController){
            let currentValue = selectUiController(input.ctrl, input.ctrlIndex || 0)(store.getState())
            let uiValue = getBoundedController(ctrl,currentValue + inc)
            const updatedValue = ctrl.uiResponse.output(uiValue)
            set({...input, value: updatedValue}, false, uiValue)
        } else {
            let currentValue = selectController(input.ctrl, input.ctrlIndex || 0)(store.getState())
            set({...input, value: currentValue + inc})
        }
    }

    const setWithUiUpdate = (input: NumericInputProperty) => {
        const updatedValue = input.ctrl.uiResponse?.input(input.value) || 0
        const uiValue = getBoundedController(input.ctrl, updatedValue)
        set(input, false, uiValue)
    }

    // receive midi
    controllers.forEach((ctrl) => {
        if(midiFuncs && midiFuncs.receive){
            midiFuncs.receive(ctrl, setWithUiUpdate)
        } else {
            paramReceive(ctrl, setWithUiUpdate)
        }

    })

    return {
        set,
        toggle,
        release,
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
