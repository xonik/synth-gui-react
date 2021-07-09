import CC from '../ccMap'
import { BUTTONS, MidiConfig, MidiConfigWithValue } from './utils'

interface MidiControllersLfo {
    RATE: MidiConfig,
    DEPTH: MidiConfig,
    DELAY: MidiConfig,
    LFO: MidiConfigWithValue
    SHAPE: MidiConfigWithValue
    SYNC: MidiConfigWithValue
    RESET: MidiConfigWithValue
    ONCE: MidiConfigWithValue
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