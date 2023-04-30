import { ControllerConfig } from '../../../midi/types'
import { paramReceive, ParamReceiveFunc, paramSend, ParamSendFunc } from './commonMidiApi'
import { dispatch, getBounded, getQuantized } from '../../utils'
import { store } from '../../store'
import {
    ButtonInputProperty,
    NumericControllerPayload,
    NumericInputProperty,
    PatchControllers,
} from './types'
import {
    selectController, selectControllerValueIndexValues,
    selectUiController,
    setController
} from '../controllers/controllersReducer'
import { ApiSource } from '../../types'


// Create a mapper that receives a controller and selects the correct set function.
// Also sends midi. Midi functions may be overridden, useful for envs and lfos where
// we send the env id separately

const getBoundedController = (ctrl: ControllerConfig, value: number) => {
    const lowerBound = ctrl.bipolar === true ? -1 : 0
    const upperBound = ctrl.values ? ctrl.values.length : 1
    return getQuantized(getBounded(value, lowerBound, upperBound))
}

export class ControllerHandler {

    set: (input: NumericInputProperty, forceSet?: boolean, uiValue?: number) => void

    constructor(
        public ctrl: ControllerConfig,
        private midiFuncs?: { send?: ParamSendFunc, receive?: ParamReceiveFunc },
        setOverride?: (input: NumericInputProperty, forceSet?: boolean, uiValue?: number) => void,
        private onSetCompleted?: (boundedInput: NumericControllerPayload) => void,
    ) {
        if (setOverride) {
            this.set = setOverride
        } else {
            this.set = this.defaultSet
        }

        // setup receive midi
        if (midiFuncs && midiFuncs.receive) {
            midiFuncs.receive(ctrl, this.setWithUiUpdate)
        } else {
            paramReceive(ctrl, this.setWithUiUpdate)
        }
    }

    defaultSet(input: NumericInputProperty, forceSet = false, uiValue?: number) {
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
        if (this.onSetCompleted) this.onSetCompleted(boundedInput)

        // send over midi
        if (this.midiFuncs && this.midiFuncs.send) {
            this.midiFuncs.send(boundedInput)
        } else {
            paramSend(boundedInput)
        }
    }

    setFromLoad(value: number, ctrlIndex = 0, valueIndex = 0) {
        const uiValue = this.ctrl.uiResponse?.input ? this.ctrl.uiResponse?.input(value) : undefined
        this.set({
            ctrl: this.ctrl,
            ctrlIndex,
            valueIndex,
            value,
            source: ApiSource.LOAD
        }, false, uiValue)
    }

    get(ctrlIndex = 0) {
        return selectControllerValueIndexValues(this.ctrl, ctrlIndex)(store.getState());
    }

    toggle(input: ButtonInputProperty) {
        const currentValue = selectController(this.ctrl, input.ctrlIndex || 0)(store.getState())
        const values = this.ctrl.values?.length || 1;

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

    release(input: ButtonInputProperty) {
        if (input.momentary && this.ctrl.values && this.ctrl.values.length > 1) {
            this.set({ ...input, value: 1 }, true)
        }
    }

    increment(input: NumericInputProperty) {
        const { ctrlIndex, valueIndex, value: inc } = input
        if (this.ctrl.uiResponse && selectUiController) {
            let currentValue = selectUiController(this.ctrl, ctrlIndex, valueIndex)(store.getState())
            let uiValue = getBoundedController(this.ctrl, currentValue + inc)
            const updatedValue = this.ctrl.uiResponse.output(uiValue)
            this.set({ ...input, value: updatedValue }, false, uiValue)
        } else {
            let currentValue = selectController(this.ctrl, ctrlIndex, valueIndex)(store.getState())
            this.set({ ...input, value: currentValue + inc })
        }
    }

    setWithUiUpdate(input: NumericInputProperty) {
        if(this.ctrl.uiResponse){
            const updatedValue = this.ctrl.uiResponse?.input(input.value) || 0
            const uiValue = getBoundedController(this.ctrl, updatedValue)
            this.set(input, false, uiValue)

        } else {
            this.set(input, false, input.value)
        }
    }
}

export const groupHandlers = (handlers: {[id: string]: ControllerHandler}) => {
    const set = (input: NumericInputProperty, forceSet = false, uiValue?: number) => {
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

    const getForSave = (ctrlIndex = 0): PatchControllers => {
        const patchControllers: PatchControllers = {}

        Object.entries(handlers).forEach(([key, handler]) => {
            const ctrlId = Number.parseInt(key)
            if(!patchControllers[ctrlId]) patchControllers[ctrlId] = {
                label: handler.ctrl.label,
                instances: {}
            }
            patchControllers[ctrlId].instances[ctrlIndex] = handler.get(ctrlIndex)
        })

        return patchControllers
    }

    const setFromLoad = (patchControllers: PatchControllers) => {
        Object.entries(patchControllers).forEach(([ctrlId, ctrl]) => {
            const handler = handlers[ctrlId]
            if (handler) {
                //console.log(`Loading ${ctrl.label}`)
                Object.entries(ctrl.instances).forEach(([ctrlIndex, valueIndexValues]) => {
                    Object.entries(valueIndexValues).forEach(([valueIndex, value]) => {
                  //      console.log(`Setting ctrlIndex ${ctrlIndex}, valueIndex ${valueIndex} to ${value}`)
                        handler.setFromLoad(value, Number.parseInt(ctrlIndex), Number.parseInt(valueIndex))
                    })
                })
            }
        })
    }

    return {
        getForSave,
        setFromLoad,
        set,
        toggle,
        release,
        increment
    }
}

export const createDefaultHandlers = (
    controllers: ControllerConfig[],
    midiFuncs?: { send?: ParamSendFunc, receive?: ParamReceiveFunc }
) => {
    const handlers: { [id: string]: ControllerHandler } = {}
    controllers.forEach((controller) => {
        handlers[controller.id] = new ControllerHandler(controller, midiFuncs)
    })
    return handlers
}

export const createGroupedHandlers = (
    controllers: ControllerConfig[],
    midiFuncs?: { send?: ParamSendFunc, receive?: ParamReceiveFunc }
) => {
    return groupHandlers(createDefaultHandlers(controllers, midiFuncs))
}

type MapperEntry = [ControllerConfig, (input: NumericInputProperty) => void]
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
