import CC from '../../mapCC'
import { BUTTONS } from '../../buttons'
import { MidiConfigCC, MidiConfigCCWithValue } from '../../types'

interface MidiControllersMainDisplay {
    POT1: MidiConfigCC,
    POT2: MidiConfigCC,
    POT3: MidiConfigCC,
    POT4: MidiConfigCC,
    POT5: MidiConfigCC,
    POT6: MidiConfigCC,

    GROUP_MENU: MidiConfigCCWithValue
    FUNC_HOME: MidiConfigCCWithValue
    FUNC_SETTINGS: MidiConfigCCWithValue
    FUNC_SHIFT: MidiConfigCCWithValue
    FUNC_PERFORM: MidiConfigCCWithValue
    FUNC_LOAD: MidiConfigCCWithValue
    FUNC_SAVE: MidiConfigCCWithValue
    FUNC_COMPARE: MidiConfigCCWithValue
    FUNC_ROUTE: MidiConfigCCWithValue
}

const midiControllersMainDisplay: MidiControllersMainDisplay = {
    POT1: { type: 'pot', cc: CC.MAIN_POT1 },
    POT2: { type: 'pot', cc: CC.MAIN_POT2 },
    POT3: { type: 'pot', cc: CC.MAIN_POT3 },
    POT4: { type: 'pot', cc: CC.MAIN_POT4 },
    POT5: { type: 'pot', cc: CC.MAIN_POT5 },
    POT6: { type: 'pot', cc: CC.MAIN_POT6 },

    GROUP_MENU: {
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

export default midiControllersMainDisplay