import CC from '../../mapCC'
import { BUTTONS } from '../../buttons'
import { MidiConfigCC, MidiConfigCCWithValue } from '../../types'

interface MidiControllersKbd {
    PORTAMENTO: MidiConfigCC
    UNISON_DETUNE: MidiConfigCC
    HOLD: MidiConfigCCWithValue
    CHORD: MidiConfigCCWithValue
    MODE: MidiConfigCCWithValue
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