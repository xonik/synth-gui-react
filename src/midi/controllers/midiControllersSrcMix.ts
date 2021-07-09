import CC from '../ccMap'
import { BUTTONS, MidiConfig, MidiConfigWithValue } from './utils'

interface MidiControllersSrcMix {
    LEVEL_OSC1: MidiConfig
    LEVEL_OSC2: MidiConfig
    LEVEL_OSC3: MidiConfig
    LEVEL_NOISE: MidiConfig
    LEVEL_RING_MOD: MidiConfig
    LEVEL_EXT_AUDIO: MidiConfig
    OUT_OSC1: MidiConfigWithValue
    OUT_OSC2: MidiConfigWithValue
    OUT_OSC3: MidiConfigWithValue
    OUT_NOISE: MidiConfigWithValue
    OUT_RING_MOD: MidiConfigWithValue
    OUT_EXT_AUDIO: MidiConfigWithValue
}

const midiControllersSrcMix: MidiControllersSrcMix = {
    LEVEL_OSC1: { type: 'pot', cc: CC.LEVEL_OSC1 },
    LEVEL_OSC2: { type: 'pot', cc: CC.LEVEL_OSC2 },
    LEVEL_OSC3: { type: 'pot', cc: CC.LEVEL_OSC3 },
    LEVEL_NOISE: { type: 'pot', cc: CC.LEVEL_NOISE },
    LEVEL_RING_MOD: { type: 'pot', cc: CC.LEVEL_RING_MOD },
    LEVEL_EXT_AUDIO: { type: 'pot', cc: CC.LEVEL_EXT_AUDIO },
    OUT_OSC1: {
        type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
            BUTTONS.BUTTONS_LEFT.values.OSC1_OUT_A,
            BUTTONS.BUTTONS_LEFT.values.OSC1_OUT_B,
            BUTTONS.BUTTONS_LEFT.values.OSC1_OUT_BOTH,
        ],
    },
    OUT_OSC2: {
        type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
            BUTTONS.BUTTONS_LEFT.values.OSC2_OUT_A,
            BUTTONS.BUTTONS_LEFT.values.OSC2_OUT_B,
            BUTTONS.BUTTONS_LEFT.values.OSC2_OUT_BOTH,
        ],
    },
    OUT_OSC3: {
        type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
            BUTTONS.BUTTONS_LEFT.values.OSC3_OUT_A,
            BUTTONS.BUTTONS_LEFT.values.OSC3_OUT_B,
            BUTTONS.BUTTONS_LEFT.values.OSC3_OUT_BOTH,
        ],
    },
    OUT_NOISE: {
        type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
            BUTTONS.BUTTONS_LEFT.values.NOISE_OUT_A,
            BUTTONS.BUTTONS_LEFT.values.NOISE_OUT_B,
            BUTTONS.BUTTONS_LEFT.values.NOISE_OUT_BOTH,
        ],
    },
    OUT_RING_MOD: {
        type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
            BUTTONS.BUTTONS_LEFT.values.RING_MOD_OUT_A,
            BUTTONS.BUTTONS_LEFT.values.RING_MOD_OUT_B,
            BUTTONS.BUTTONS_LEFT.values.RING_MOD_OUT_BOTH,
        ],
    },
    OUT_EXT_AUDIO: {
        type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
            BUTTONS.BUTTONS_LEFT.values.EXT_AUDIO_OUT_A,
            BUTTONS.BUTTONS_LEFT.values.EXT_AUDIO_OUT_B,
            BUTTONS.BUTTONS_LEFT.values.EXT_AUDIO_OUT_BOTH,
        ],
    },
}

export default midiControllersSrcMix