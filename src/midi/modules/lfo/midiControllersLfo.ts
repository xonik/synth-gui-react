import CC from '../../mapCC'
import { BUTTONS } from '../../buttons'
import { MidiConfigCC, MidiConfigCCWithValue } from '../../types'

interface MidiControllersLfo {
    RATE: MidiConfigCC,
    DEPTH: MidiConfigCC,
    DELAY: MidiConfigCC,
    LFO: MidiConfigCCWithValue
    SHAPE: MidiConfigCCWithValue
    SYNC: MidiConfigCCWithValue
    RESET: MidiConfigCCWithValue
    ONCE: MidiConfigCCWithValue
}

const midiControllersLfo: MidiControllersLfo = {
    // Pots
    RATE: { type: 'pot', cc: CC.LFO_RATE },
    DEPTH: { type: 'pot', cc: CC.LFO_DEPTH },
    DELAY: { type: 'pot', cc: CC.LFO_DELAY },
    // Buttons
    LFO: {
        type: 'button',
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.LFO1,
            BUTTONS.BUTTONS_LEFT.values.LFO2,
            BUTTONS.BUTTONS_LEFT.values.LFO3,
            BUTTONS.BUTTONS_LEFT.values.LFO4,
        ],
    },
    SHAPE: {
        type: 'button',
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.LFO_SHAPE_SAW,
            BUTTONS.BUTTONS_LEFT.values.LFO_SHAPE_TRI,
            BUTTONS.BUTTONS_LEFT.values.LFO_SHAPE_SQR,
            BUTTONS.BUTTONS_LEFT.values.LFO_SHAPE_SIN,
            BUTTONS.BUTTONS_LEFT.values.LFO_SHAPE_SH,
        ],
    },
    SYNC: {
        type: 'button',
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.LFO_SYNC_OFF,
            BUTTONS.BUTTONS_LEFT.values.LFO_SYNC_ON,
        ],
    },
    RESET: {
        type: 'button',
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.LFO_RESET_OFF,
            BUTTONS.BUTTONS_LEFT.values.LFO_RESET_ON,
        ],
    },
    ONCE: {
        type: 'button',
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.LFO_ONCE_OFF,
            BUTTONS.BUTTONS_LEFT.values.LFO_ONCE_ON,
        ],
    },
}

export default midiControllersLfo