import CC from '../../mapCC'
import { BUTTONS } from '../../buttons'
import { FuncProps, ControllerConfigCC, ControllerConfigCCWithValue } from '../../types'

interface ControllersMainDisplay {
    props: FuncProps
    POT1: ControllerConfigCC,
    POT2: ControllerConfigCC,
    POT3: ControllerConfigCC,
    POT4: ControllerConfigCC,
    POT5: ControllerConfigCC,
    POT6: ControllerConfigCC,

    GROUP_MENU: ControllerConfigCCWithValue
    FUNC_HOME: ControllerConfigCCWithValue
    FUNC_SETTINGS: ControllerConfigCCWithValue
    FUNC_SHIFT: ControllerConfigCCWithValue
    FUNC_PERFORM: ControllerConfigCCWithValue
    FUNC_LOAD: ControllerConfigCCWithValue
    FUNC_SAVE: ControllerConfigCCWithValue
    FUNC_COMPARE: ControllerConfigCCWithValue
    FUNC_ROUTE: ControllerConfigCCWithValue
}

const controllersMainDisplay: ControllersMainDisplay = {
    props: { label: 'Main controls' },
    POT1: { label: 'Pot 1', type: 'pot', cc: CC.MAIN_POT1 },
    POT2: { label: 'Pot 2', type: 'pot', cc: CC.MAIN_POT2 },
    POT3: { label: 'Pot 3', type: 'pot', cc: CC.MAIN_POT3 },
    POT4: { label: 'Pot 4', type: 'pot', cc: CC.MAIN_POT4 },
    POT5: { label: 'Pot 5', type: 'pot', cc: CC.MAIN_POT5 },
    POT6: { label: 'Main pot', type: 'pot', cc: CC.MAIN_POT6 },

    GROUP_MENU: {
        label: 'Screen select',
        type: 'button',
        cc: BUTTONS.BUTTONS_CENTER.cc,
        values: [
            BUTTONS.BUTTONS_CENTER.values.MENU_LFO,
            BUTTONS.BUTTONS_CENTER.values.MENU_OSC,
            BUTTONS.BUTTONS_CENTER.values.MENU_FILTER,
            BUTTONS.BUTTONS_CENTER.values.MENU_ENV,
            BUTTONS.BUTTONS_CENTER.values.MENU_MOD,
            BUTTONS.BUTTONS_CENTER.values.MENU_FX,
            //TODO: ARP-meny?
        ],
    },

    FUNC_HOME: {
        label: 'Home',
        type: 'button',
        cc: BUTTONS.BUTTONS_CENTER.cc,
        values: [
            BUTTONS.BUTTONS_CENTER.values.FUNC_HOME,
        ],
    },
    FUNC_SETTINGS: {
        label: 'Settings',
        type: 'button',
        cc: BUTTONS.BUTTONS_CENTER.cc,
        values: [
            BUTTONS.BUTTONS_CENTER.values.FUNC_SETTINGS,
        ],
    },
    FUNC_SHIFT: {
        label: 'Shift',
        type: 'button',
        cc: BUTTONS.BUTTONS_CENTER.cc,
        values: [
            BUTTONS.BUTTONS_CENTER.values.FUNC_SHIFT_OFF,
            BUTTONS.BUTTONS_CENTER.values.FUNC_SHIFT_ON,
        ],
    },
    FUNC_PERFORM: {
        label: 'Perform',
        type: 'button',
        cc: BUTTONS.BUTTONS_CENTER.cc,
        values: [
            BUTTONS.BUTTONS_CENTER.values.FUNC_PERFORM,
        ],
    },
    FUNC_LOAD: {
        label: 'Load',
        type: 'button',
        cc: BUTTONS.BUTTONS_CENTER.cc,
        values: [
            BUTTONS.BUTTONS_CENTER.values.FUNC_LOAD,
        ],
    },
    FUNC_SAVE: {
        label: 'Save',
        type: 'button',
        cc: BUTTONS.BUTTONS_CENTER.cc,
        values: [
            BUTTONS.BUTTONS_CENTER.values.FUNC_SAVE,
        ],
    },
    FUNC_COMPARE: {
        label: 'Compare',
        type: 'button',
        cc: BUTTONS.BUTTONS_CENTER.cc,
        values: [
            BUTTONS.BUTTONS_CENTER.values.FUNC_COMPARE,
        ],
    },
    FUNC_ROUTE: {
        label: 'Route',
        type: 'button',
        cc: BUTTONS.BUTTONS_CENTER.cc,
        values: [
            BUTTONS.BUTTONS_CENTER.values.FUNC_ROUTE,
        ],
    },
}

export default controllersMainDisplay