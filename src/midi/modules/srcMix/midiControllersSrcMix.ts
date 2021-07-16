import CC from '../../mapCC'
import { BUTTONS } from '../../buttons'
import { MidiConfigCC, MidiConfigCCWithValue } from '../../types'

interface MidiControllersSrcMix {
    LEVEL_OSC1: MidiConfigCC
    LEVEL_OSC2: MidiConfigCC
    LEVEL_OSC3: MidiConfigCC
    LEVEL_NOISE: MidiConfigCC
    LEVEL_RING_MOD: MidiConfigCC
    LEVEL_EXT_AUDIO: MidiConfigCC
    OUT_OSC1: MidiConfigCCWithValue
    OUT_OSC2: MidiConfigCCWithValue
    OUT_OSC3: MidiConfigCCWithValue
    OUT_NOISE: MidiConfigCCWithValue
    OUT_RING_MOD: MidiConfigCCWithValue
    OUT_EXT_AUDIO: MidiConfigCCWithValue
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