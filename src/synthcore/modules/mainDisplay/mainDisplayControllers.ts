import CC from '../../../midi/mapCC'
import { FuncProps, ControllerConfigCC, ControllerConfigButton } from '../../../midi/types'
import { ControllerIdNonMod, ControllerIdNonModPots } from '../controllers/controllerIds'
import {buttonMidiValues} from "../../../midi/buttonMidiValues";

interface MainDisplayControllers {
    props: FuncProps
    POT1: ControllerConfigCC,
    POT2: ControllerConfigCC,
    POT3: ControllerConfigCC,
    POT4: ControllerConfigCC,
    POT5: ControllerConfigCC,
    POT6: ControllerConfigCC,
    POT7: ControllerConfigCC,

    GROUP_MENU: ControllerConfigButton
    FUNC_HOME: ControllerConfigButton
    FUNC_SETTINGS: ControllerConfigButton
    FUNC_SHIFT: ControllerConfigButton
    FUNC_PERFORM: ControllerConfigButton
    FUNC_LOAD: ControllerConfigButton
    FUNC_SAVE: ControllerConfigButton
    FUNC_COMPARE: ControllerConfigButton
    FUNC_ROUTE: ControllerConfigButton
}

const mainDisplayControllers: MainDisplayControllers = {
    props: { label: 'Main controls' },
    POT1: { id: ControllerIdNonModPots.MAIN_DISP_POT1, label: 'Pot 1', type: 'pot', cc: CC.MAIN_POT1 },
    POT2: { id: ControllerIdNonModPots.MAIN_DISP_POT2, label: 'Pot 2', type: 'pot', cc: CC.MAIN_POT2 },
    POT3: { id: ControllerIdNonModPots.MAIN_DISP_POT3, label: 'Pot 3', type: 'pot', cc: CC.MAIN_POT3 },
    POT4: { id: ControllerIdNonModPots.MAIN_DISP_POT4, label: 'Pot 4', type: 'pot', cc: CC.MAIN_POT4 },
    POT5: { id: ControllerIdNonModPots.MAIN_DISP_POT5, label: 'Pot 5', type: 'pot', cc: CC.MAIN_POT5 },
    POT6: { id: ControllerIdNonModPots.MAIN_DISP_POT6, label: 'Main pot', type: 'pot', cc: CC.MAIN_POT6 },
    POT7: { id: ControllerIdNonModPots.MAIN_DISP_POT7, label: 'Main pot', type: 'pot', cc: CC.MAIN_POT7 },

    GROUP_MENU: {
        id: ControllerIdNonMod.MAIN_DISP_GROUP_MENU,
        label: 'Screen select',
        type: 'button',
        values: [
            buttonMidiValues.MENU_LFO,
            buttonMidiValues.MENU_OSC,
            buttonMidiValues.MENU_FILTER,
            buttonMidiValues.MENU_ENV,
            buttonMidiValues.MENU_MOD,
            buttonMidiValues.MENU_FX,
            //TODO: ARP-meny?
        ],
        global: true,
    },

    FUNC_HOME: {
        id: ControllerIdNonMod.MAIN_DISP_FUNC_HOME,
        label: 'Home',
        type: 'button',
        values: [
            buttonMidiValues.FUNC_HOME,
        ],
        global: true,
    },
    FUNC_SETTINGS: {
        id: ControllerIdNonMod.MAIN_DISP_FUNC_SETTINGS,
        label: 'Setup',
        type: 'button',
        values: [
            buttonMidiValues.FUNC_SETTINGS,
        ],
        global: true,
    },
    FUNC_SHIFT: {
        id: ControllerIdNonMod.MAIN_DISP_FUNC_SHIFT,
        label: 'Shift',
        type: 'button',
        values: [
            buttonMidiValues.FUNC_SHIFT_OFF,
            buttonMidiValues.FUNC_SHIFT_ON,
        ],
        global: true,
    },
    FUNC_PERFORM: {
        id: ControllerIdNonMod.MAIN_DISP_FUNC_PERFORM,
        label: 'Perform',
        type: 'button',
        values: [
            buttonMidiValues.FUNC_PERFORM,
        ],
        global: true,
    },
    FUNC_LOAD: {
        id: ControllerIdNonMod.MAIN_DISP_FUNC_LOAD,
        label: 'Load',
        type: 'button',
        values: [
            buttonMidiValues.FUNC_LOAD,
        ],
        global: true,
    },
    FUNC_SAVE: {
        id: ControllerIdNonMod.MAIN_DISP_FUNC_SAVE,
        label: 'Save',
        type: 'button',
        values: [
            buttonMidiValues.FUNC_SAVE,
        ],
        global: true,
    },
    FUNC_COMPARE: {
        id: ControllerIdNonMod.MAIN_DISP_FUNC_COMPARE,
        label: 'Compare',
        type: 'button',
        values: [
            buttonMidiValues.FUNC_COMPARE,
        ],
        global: true,
    },
    FUNC_ROUTE: {
        id: ControllerIdNonMod.MAIN_DISP_FUNC_ROUTE,
        label: 'Route',
        type: 'button',
        values: [
            buttonMidiValues.FUNC_ROUTE,
        ],
        global: true,
    },
}

export default mainDisplayControllers