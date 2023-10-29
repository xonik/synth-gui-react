import { BUTTONS } from '../../../midi/buttons'
import { FuncProps, ControllerConfigCCWithValue, ControllerConfigNRPN } from '../../../midi/types'
import { ControllerIdNonMod, ControllerIdNonModPots } from '../controllers/controllerIds'


interface SettingsControllers {
    props: FuncProps
    CALIBRATE_DCO1: ControllerConfigCCWithValue
    CALIBRATE_DCO2: ControllerConfigCCWithValue
}

const settingsControllers: SettingsControllers = {
    props: { label: 'Calibrate' },
    CALIBRATE_DCO1: {
        id: ControllerIdNonMod.CALIBRATE_DCO1,
        label: 'Calibrate DCO 1',
        type: 'button',
        cc: BUTTONS.BUTTONS_CENTER.cc,
        values: [
            BUTTONS.BUTTONS_CENTER.values.CALIBRATE_DCO1,
        ],
    },
    CALIBRATE_DCO2: {
        id: ControllerIdNonMod.CALIBRATE_DCO2,
        label: 'Calibrate DCO 2',
        type: 'button',
        cc: BUTTONS.BUTTONS_CENTER.cc,
        values: [
            BUTTONS.BUTTONS_CENTER.values.CALIBRATE_DCO2,
        ],
    },

    /*
    NOTE_PRIORITY: {
        id: ControllerIdNonMod.DCO_CALIBRATE,
        label: 'Note priority',
        type: 'button',
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_CENTER.values.NOTE_PRIORITY_LOW,
            BUTTONS.BUTTONS_CENTER.values.NOTE_PRIORITY_HIGH,
            BUTTONS.BUTTONS_CENTER.values.NOTE_PRIORITY_LAST,
        ],
    },*/
}

export default settingsControllers