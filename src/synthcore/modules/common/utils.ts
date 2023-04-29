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
// Also sends midi. Midi functions may be overridden, useful for for example envs and lfos where
// we send the env id separately
type MapperEntry = [ControllerConfig, (input: NumericInputProperty) => void]

const getBoundedController = (ctrl: ControllerConfig, value: number) => {
    const lowerBound = ctrl.bipolar === true ? -1 : 0
    const upperBound = ctrl.values ? ctrl.values.length : 1
    return getQuantized(getBounded(value, lowerBound, upperBound))
}

// TODO: Make common class without default implementations of functions (or rather, null-versions)
export class ControllerHandler {

    set: (input: NumericInputProperty, forceSet?: boolean, uiValue?: number) => void

    constructor(
        // TODO: We should really try to make ctrl private and see if we could hide it from
        // NumericInputProp.
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
        this.set({
            ctrl: this.ctrl,
            ctrlIndex,
            valueIndex,
            value,
            source: ApiSource.LOAD
        })
    }

    get(ctrlIndex = 0) {
        return selectControllerValueIndexValues(this.ctrl, ctrlIndex)(store.getState());
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

    release(input: ButtonInputProperty) {
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
        // TODO: hvorfor er det 0 her? burde det ikke vært input.vale?
        const updatedValue = input.ctrl.uiResponse?.input(input.value) || 0
        const uiValue = getBoundedController(input.ctrl, updatedValue)
        this.set(input, false, uiValue)
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
                console.log(`Loading ${ctrl.label}`)
                Object.entries(ctrl.instances).forEach(([ctrlIndex, valueIndexValues]) => {
                    Object.entries(valueIndexValues).forEach(([valueIndex, value]) => {
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
