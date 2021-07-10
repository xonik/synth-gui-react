import CC from '../../ccMap'
import { BUTTONS } from '../../buttons'
import { MidiConfig, MidiConfigWithValue } from '../../types'

interface MidiControllersMainPanel {
    POT1: MidiConfig,
    POT2: MidiConfig,
    POT3: MidiConfig,
    POT4: MidiConfig,
    POT5: MidiConfig,
    POT6: MidiConfig,

    MENU_LFO: MidiConfigWithValue
    MENU_OSC: MidiConfigWithValue
    MENU_FILTER: MidiConfigWithValue
    MENU_ENVELOPE: MidiConfigWithValue
    MENU_MOD: MidiConfigWithValue
    MENU_FX: MidiConfigWithValue
    FUNC_HOME: MidiConfigWithValue
    FUNC_SETTINGS: MidiConfigWithValue
    FUNC_SHIFT: MidiConfigWithValue
    FUNC_PERFORM: MidiConfigWithValue
    FUNC_LOAD: MidiConfigWithValue
    FUNC_SAVE: MidiConfigWithValue
    FUNC_COMPARE: MidiConfigWithValue
    FUNC_ROUTE: MidiConfigWithValue
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