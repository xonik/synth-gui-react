import CC from '../../mapCC'
import { BUTTONS } from '../../buttons'
import { MidiConfigCC, MidiConfigCCWithValue } from '../../types'

interface MidiControllersMainPanel {
    POT1: MidiConfigCC,
    POT2: MidiConfigCC,
    POT3: MidiConfigCC,
    POT4: MidiConfigCC,
    POT5: MidiConfigCC,
    POT6: MidiConfigCC,

    MENU_LFO: MidiConfigCCWithValue
    MENU_OSC: MidiConfigCCWithValue
    MENU_FILTER: MidiConfigCCWithValue
    MENU_ENVELOPE: MidiConfigCCWithValue
    MENU_MOD: MidiConfigCCWithValue
    MENU_FX: MidiConfigCCWithValue
    FUNC_HOME: MidiConfigCCWithValue
    FUNC_SETTINGS: MidiConfigCCWithValue
    FUNC_SHIFT: MidiConfigCCWithValue
    FUNC_PERFORM: MidiConfigCCWithValue
    FUNC_LOAD: MidiConfigCCWithValue
    FUNC_SAVE: MidiConfigCCWithValue
    FUNC_COMPARE: MidiConfigCCWithValue
    FUNC_ROUTE: MidiConfigCCWithValue
}
const midiControllersMainPanel: MidiControllersMainPanel = {
    POT1: { type: 'pot', cc: CC.MAIN_POT1 },
    POT2: { type: 'pot', cc: CC.MAIN_POT2 },
    POT3: { type: 'pot', cc: CC.MAIN_POT3 },
    POT4: { type: 'pot', cc: CC.MAIN_POT4 },
    POT5: { type: 'pot', cc: CC.MAIN_POT5 },
    POT6: { type: 'pot', cc: CC.MAIN_POT6 },

    MENU_LFO: {
        type: 'button',
            cc: BUTTONS.BUTTONS_CENTER.cc,
            values: [
            BUTTONS.BUTTONS_CENTER.values.MENU_LFO,
        ],
    },
    MENU_OSC: {
        type: 'button',
            cc: BUTTONS.BUTTONS_CENTER.cc,
            values: [
            BUTTONS.BUTTONS_CENTER.values.MENU_OSC,
        ],
    },
    MENU_FILTER: {
        type: 'button',
            cc: BUTTONS.BUTTONS_CENTER.cc,
            values: [
            BUTTONS.BUTTONS_CENTER.values.MENU_FILTER,
        ],
    },
    MENU_ENVELOPE: {
        type: 'button',
            cc: BUTTONS.BUTTONS_CENTER.cc,
            values: [
            BUTTONS.BUTTONS_CENTER.values.MENU_ENV,
        ],
    },
    MENU_MOD: {
        type: 'button',
            cc: BUTTONS.BUTTONS_CENTER.cc,
            values: [
            BUTTONS.BUTTONS_CENTER.values.MENU_MOD,
        ],
    },
    MENU_FX: {
        type: 'button',
            cc: BUTTONS.BUTTONS_CENTER.cc,
            values: [
            BUTTONS.BUTTONS_CENTER.values.MENU_LFO,
        ],
    },
    //TODO: ARP-meny?

    FUNC_HOME: {
        type: 'button',
            cc: BUTTONS.BUTTONS_CENTER.cc,
            values: [
            BUTTONS.BUTTONS_CENTER.values.FUNC_HOME,
        ],
    },
    FUNC_SETTINGS: {
        type: 'button',
            cc: BUTTONS.BUTTONS_CENTER.cc,
            values: [
            BUTTONS.BUTTONS_CENTER.values.FUNC_SETTINGS,
        ],
    },
    FUNC_SHIFT: {
        type: 'button',
            cc: BUTTONS.BUTTONS_CENTER.cc,
            values: [
            BUTTONS.BUTTONS_CENTER.values.FUNC_SHIFT_OFF,
            BUTTONS.BUTTONS_CENTER.values.FUNC_SHIFT_ON,
        ],
    },
    FUNC_PERFORM: {
        type: 'button',
            cc: BUTTONS.BUTTONS_CENTER.cc,
            values: [
            BUTTONS.BUTTONS_CENTER.values.FUNC_PERFORM,
        ],
    },
    FUNC_LOAD: {
        type: 'button',
            cc: BUTTONS.BUTTONS_CENTER.cc,
            values: [
            BUTTONS.BUTTONS_CENTER.values.FUNC_LOAD,
        ],
    },
    FUNC_SAVE: {
        type: 'button',
            cc: BUTTONS.BUTTONS_CENTER.cc,
            values: [
            BUTTONS.BUTTONS_CENTER.values.FUNC_SAVE,
        ],
    },
    FUNC_COMPARE: {
        type: 'button',
            cc: BUTTONS.BUTTONS_CENTER.cc,
            values: [
            BUTTONS.BUTTONS_CENTER.values.FUNC_COMPARE,
        ],
    },
    FUNC_ROUTE: {
        type: 'button',
            cc: BUTTONS.BUTTONS_CENTER.cc,
            values: [
            BUTTONS.BUTTONS_CENTER.values.FUNC_ROUTE,
        ],
    },
}

export default midiControllersMainPanel