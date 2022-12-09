import { createHandlers } from '../common/utils'
import settingsControllers from './settingsControllers'
import { ButtonInputProperty, NumericInputProperty } from '../common/types'

const { increment: commonInc, toggle: commonToggle, set: commonSet } = createHandlers([
    settingsControllers.CALIBRATE_DCO1,
    settingsControllers.CALIBRATE_DCO2,
])

const increment = (input: NumericInputProperty) => {
    //Re-add this if any non-common update methods are needed
    //customhandlers[input.ctrl.id]?.increment(input)
    commonInc(input)
}

const toggle = (input: ButtonInputProperty) => {
    //Re-add this if any non-common update methods are needed
    //customhandlers[input.ctrl.id]?.toggle(input)
    commonToggle(input)
}

const set = (input: NumericInputProperty) => {
    //Re-add this if any non-common update methods are needed
    //customhandlers[input.ctrl.id]?.set(input)
    commonSet(input)
}

const settingsApi = {
    increment,
    toggle,
    set,
}

export default settingsApi;