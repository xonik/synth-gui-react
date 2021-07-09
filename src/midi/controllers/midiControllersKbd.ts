import CC from '../ccMap'
import { BUTTONS, MidiConfig, MidiConfigWithValue } from './utils'

interface MidiControllersKbd {
    PORTAMENTO: MidiConfig
    UNISON_DETUNE: MidiConfig
    HOLD: MidiConfigWithValue
    CHORD: MidiConfigWithValue
    MODE: MidiConfigWithValue
}

const midiControllersKbd: MidiControllersKbd = {
    PORTAMENTO: { type: 'pot', cc: CC.KEYBOARD_PORTAMENTO },
    UNISON_DETUNE: { type: 'pot', cc: CC.KEYBOARD_UNISON_DETUNE },
    HOLD: {
        type: 'button',
        cc: BUTTONS.BUTTONS_CENTER.cc,
        values: [
            BUTTONS.BUTTONS_CENTER.values.KEYBOARD_HOLD_OFF,
            BUTTONS.BUTTONS_CENTER.values.KEYBOARD_HOLD_ON,
        ],
    },
    CHORD: {
        type: 'button',
        cc: BUTTONS.BUTTONS_CENTER.cc,
        values: [
            BUTTONS.BUTTONS_CENTER.values.KEYBOARD_CHORD_OFF,
            BUTTONS.BUTTONS_CENTER.values.KEYBOARD_CHORD_ON,
        ],
    },
    MODE: {
        type: 'button',
        cc: BUTTONS.BUTTONS_CENTER.cc,
        values: [
            BUTTONS.BUTTONS_CENTER.values.KEYBOARD_MODE_SOLO,
            BUTTONS.BUTTONS_CENTER.values.KEYBOARD_MODE_UNISON,
            BUTTONS.BUTTONS_CENTER.values.KEYBOARD_MODE_POLY,
        ],
    },
}

export default midiControllersKbd