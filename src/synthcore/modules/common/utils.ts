import { ControllerConfig } from '../../../midi/types'
import { paramReceive, ParamReceiveFunc, paramSend, ParamSendFunc } from './commonMidiApi'
import { dispatch, getBounded, getQuantized } from '../../utils'
import { store } from '../../store'
import { ButtonInputProperty, NumericControllerPayload, NumericInputProperty } from './types'
import { selectController, selectUiController, setController } from '../controllers/controllersReducer'


// Create a mapper that receives a controller and selects the correct set function.
// Also sends midi. Midi functions may be overridden, useful for for example envs and lfos where
// we send the env id separately
type MapperEntry = [ControllerConfig, (input: NumericInputProperty) => void]

const getBoundedController = (ctrl: ControllerConfig, value: number) => {
    const lowerBound = ctrl.bipolar === true ? -1 : 0
    const upperBound = ctrl.values ? ctrl.values.length : 1
    return getQuantized(getBounded(value, lowerBound, upperBound))
}

export class ControllerHandler {

    set: (input: NumericInputProperty, forceSet?: boolean, uiValue?: number) => void

    constructor(
        private ctrl: ControllerConfig,
        private midiFuncs?: { send?: ParamSendFunc, receive?: ParamReceiveFunc },
        setOverride?: (input: NumericInputProperty, forceSet?: boolean, uiValue?: number) => void,
        private onSetCompleted?: (boundedInput: NumericControllerPayload) => void,
    ) {
        if(setOverride){
            this.set = setOverride
        } else {
            this.set = this.internalSet
        }

        // setup receive midi
        if (midiFuncs && midiFuncs.receive) {
            midiFuncs.receive(ctrl, this.setWithUiUpdate)
        } else {
            paramReceive(ctrl, this.setWithUiUpdate)
        }
    }

    internalSet(input: NumericInputProperty, forceSet = false, uiValue?: number) {
        const { ctrl, ctrlIndex, valueIndex, value } = input

        const boundedValue = getBoundedController(ctrl, value)
        const currentValue = selectController(ctrl, ctrlIndex || 0)(store.getState())

        if (boundedValue === currentValue && !forceSet) {
            return
        }

        // Not always present, and may only be sent for nrpn messages. Represents stage etc, the top
        // 5 bits left over when 16 bits have been used for value.
        const boundedValueIndex = valueIndex !== undefined ? getBounded(valueIndex, 0, 31) : undefined
        const boundedInput = { ...input, value: boundedValue, valueIndex: boundedValueIndex, uiValue }

        dispatch(setController(boundedInput))
        if(this.onSetCompleted) this.onSetCompleted(boundedInput)

        // send over midi
        if (this.midiFuncs && this.midiFuncs.send) {
            this.midiFuncs.send(boundedInput)
        } else {
            paramSend(boundedInput)
        }
    }

    toggle(input: ButtonInputProperty) {
        const currentValue = selectController(input.ctrl, input.ctrlIndex || 0)(store.getState())
        const values = input.ctrl.values?.length || 1;

        // Single value buttons, click only, no toggle
        if (values === 1) {
            this.set({ ...input, value: 0 }, true)
            return;
        }

        // Radio buttons
        if (input.radioButtonIndex !== undefined) {
            if (currentValue === input.radioButtonIndex) {
                this.set({ ...input, value: 0 })
            } else {
                this.set({ ...input, value: input.radioButtonIndex })
            }
            return;
        }

        // Normal buttons
        if (input.reverse) {
            if (currentValue > 0 || input.loop) {
                this.set({ ...input, value: (currentValue - 1 + values) % values })
            }
        } else {
            if (currentValue < values - 1 || input.loop) {
                this.set({ ...input, value: (currentValue + 1) % values })
            }
        }
    }

    release(input: ButtonInputProperty){
        if (input.momentary && input.ctrl.values && input.ctrl.values.length > 1) {
            this.set({ ...input, value: 1 }, true)
        }
    }

    increment(input: NumericInputProperty) {
        const { value: inc, ctrl } = input
        if (ctrl.uiResponse && selectUiController) {
            let currentValue = selectUiController(input.ctrl, input.ctrlIndex || 0)(store.getState())
            let uiValue = getBoundedController(ctrl, currentValue + inc)
            const updatedValue = ctrl.uiResponse.output(uiValue)
            this.set({ ...input, value: updatedValue }, false, uiValue)
        } else {
            let currentValue = selectController(input.ctrl, input.ctrlIndex || 0)(store.getState())
            this.set({ ...input, value: currentValue + inc })
        }
    }

    setWithUiUpdate(input: NumericInputProperty) {
        const updatedValue = input.ctrl.uiResponse?.input(input.value) || 0
        const uiValue = getBoundedController(input.ctrl, updatedValue)
        this.set(input, false, uiValue)
    }
}

export const createHandlers = (
    controllers: ControllerConfig[],
    midiFuncs?: { send?: ParamSendFunc, receive?: ParamReceiveFunc }
) => {
    const handlers: { [id: string]: ControllerHandler } = {}
    controllers.forEach((controller) => {
        handlers[controller.id] = new ControllerHandler(controller, midiFuncs)
    })

    const set = (input: NumericInputProperty, forceSet= false, uiValue?: number) => {
        if (handlers[input.ctrl.id]) {
            handlers[input.ctrl.id].set(input, forceSet, uiValue)
        }
    }
    const toggle = (input: ButtonInputProperty) => {
        if (handlers[input.ctrl.id]) {
            handlers[input.ctrl.id].toggle(input)
        }
    }
    const release = (input: ButtonInputProperty) => {
        if (handlers[input.ctrl.id]) {
            handlers[input.ctrl.id].release(input)
        }
    }
    const increment = (input: NumericInputProperty) => {
        if (handlers[input.ctrl.id]) {
            handlers[input.ctrl.id].increment(input)
        }
    }

    return {
        set,
        toggle,
        release,
        increment
    }
}

export const createIncrementMapper = (map: MapperEntry[]) => (input: NumericInputProperty) => {
    // search for a ctrl and call the corresponding function
    map.find((entry) => {
        return entry[0].id === input.ctrl.id
    })?.[1](input)
}

type ClickMapperEntry = [ControllerConfig, (input: ButtonInputProperty) => void]
export const createClickMapper = (map: ClickMapperEntry[]) => (input: ButtonInputProperty) => {
    // search for a ctrl and call the corresponding function
    map.find((entry) => {
        return entry[0].id === input.ctrl.id
    })?.[1](input)
}
