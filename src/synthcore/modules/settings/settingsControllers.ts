import { BUTTONS } from '../../../midi/buttons'
import { FuncProps, ControllerConfigCCWithValue, ControllerConfigNRPN } from '../../../midi/types'
import { ControllerIdNonMod, ControllerIdNonModPots } from '../controllers/controllerIds'
import NRPN from '../../../midi/mapNRPN'


interface SettingsControllers {
    props: FuncProps
    CALIBRATE_DCO1: ControllerConfigCCWithValue
    CALIBRATE_DCO2: ControllerConfigCCWithValue
    CV_RANGE_MIN: ControllerConfigNRPN
    CV_RANGE_MAX: ControllerConfigNRPN
    CV_RANGE_SAVE:ControllerConfigNRPN
    CV_RANGE_LOAD:ControllerConfigNRPN
    CV_RANGE_CURVE: ControllerConfigNRPN

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
    CV_RANGE_MIN: {
        id: ControllerIdNonModPots.CV_RANGE_MIN,
        label: 'CV range min',
        shortLabel: 'CV min',
        type: 'pot',
        addr: NRPN.CV_RANGE_MIN,
        isDstDigi: true, // TODO: What is this
    },
    CV_RANGE_MAX: {
        id: ControllerIdNonModPots.CV_RANGE_MAX,
        label: 'CV range max',
        shortLabel: 'CV max',
        type: 'pot',
        addr: NRPN.CV_RANGE_MAX,
        isDstDigi: true, // TODO: What is this
    },
    CV_RANGE_SAVE: {
        id: ControllerIdNonModPots.CV_RANGE_SAVE,
        label: 'Save CV range',
        type: 'pot',
        addr: NRPN.CV_RANGE_SAVE,
        isDstDigi: true, // TODO: What is this
    },
    CV_RANGE_LOAD: {
        id: ControllerIdNonModPots.CV_RANGE_LOAD,
        label: 'Load CV range',
        type: 'pot',
        addr: NRPN.CV_RANGE_LOAD,
        isDstDigi: true, // TODO: What is this
    },
    CV_RANGE_CURVE: {
        id: ControllerIdNonModPots.CV_RANGE_CURVE, //Mod, or pots?
        label: 'CV curve',
        type: 'pot',
        addr: NRPN.CV_RANGE_CURVE,
        isDstDigi: true, // TODO: What is this
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