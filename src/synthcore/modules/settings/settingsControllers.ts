import { FuncProps, ControllerConfigButton, ControllerConfigNRPN } from '../../../midi/types'
import { ControllerIdNonMod, ControllerIdNonModPots } from '../controllers/controllerIds'
import {buttonMidiValues} from "../../../midi/buttonMidiValues";


interface SettingsControllers {
    props: FuncProps
    CALIBRATE_DCO1: ControllerConfigButton
    CALIBRATE_DCO2: ControllerConfigButton
}

const settingsControllers: SettingsControllers = {
    props: { label: 'Calibrate' },
    CALIBRATE_DCO1: {
        id: ControllerIdNonMod.CALIBRATE_DCO1,
        label: 'Calibrate DCO 1',
        type: 'button',
        values: [
            buttonMidiValues.CALIBRATE_DCO1,
        ],
    },
    CALIBRATE_DCO2: {
        id: ControllerIdNonMod.CALIBRATE_DCO2,
        label: 'Calibrate DCO 2',
        type: 'button',
        values: [
            buttonMidiValues.CALIBRATE_DCO2,
        ],
    },

    /*
    NOTE_PRIORITY: {
        id: ControllerIdNonMod.DCO_CALIBRATE,
        label: 'Note priority',
        type: 'button',
        values: [
            buttonMidiValues.NOTE_PRIORITY_LOW,
            buttonMidiValues.NOTE_PRIORITY_HIGH,
            buttonMidiValues.NOTE_PRIORITY_LAST,
        ],
    },*/
}

export default settingsControllers