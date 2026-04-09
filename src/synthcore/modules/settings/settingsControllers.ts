import { buttonMidiValues } from '@/midi/buttonMidiValues'
import type { ControllerConfigButton, FuncProps } from '@/midi/types'
import { ControllerIdNonMod } from '../controllers/controllerIds'

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
        values: [buttonMidiValues.CALIBRATE_DCO1],
        valueLabels: ['Calibrate'],
    },
    CALIBRATE_DCO2: {
        id: ControllerIdNonMod.CALIBRATE_DCO2,
        label: 'Calibrate DCO 2',
        type: 'button',
        values: [buttonMidiValues.CALIBRATE_DCO2],
        valueLabels: ['Calibrate'],
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
