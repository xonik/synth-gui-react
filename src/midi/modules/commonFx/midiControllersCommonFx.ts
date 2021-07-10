import CC from '../../ccMap'
import { BUTTONS } from '../../buttons'
import { MidiConfig, MidiConfigWithValue } from '../../types'

interface MidiControllersCommonFx {
    DSP1: {
        POT1: MidiConfig,
        POT2: MidiConfig,
        POT3: MidiConfig,
        EFFECT: MidiConfig,
        SOURCE: MidiConfigWithValue,
    },
    DSP2: {
        POT1: MidiConfig,
        POT2: MidiConfig,
        POT3: MidiConfig,
        EFFECT: MidiConfig,
        SOURCE: MidiConfigWithValue,
        CHAIN: MidiConfigWithValue,
    },
    CHORUS: {
        RATE: MidiConfig,
        DEPTH: MidiConfig,
        SOURCE: MidiConfigWithValue,
        MODE: MidiConfigWithValue,
    },
    FX_BIT_CRUSHER: {
        BITS: MidiConfig,
        RATE: MidiConfig,
        SOURCE: MidiConfigWithValue,
    },
    FX_MIX: {
        LEVEL_DSP1: MidiConfig,
        LEVEL_DSP2: MidiConfig,
        LEVEL_CHORUS: MidiConfig,
        LEVEL_BIT_CRUSHER: MidiConfig,
    }
}

const midiControllersCommonFx: MidiControllersCommonFx = {
    DSP1: {
        POT1: { type: 'pot', cc: CC.DSP1_POT1 },
        POT2: { type: 'pot', cc: CC.DSP1_POT2 },
        POT3: { type: 'pot', cc: CC.DSP1_POT3 },
        EFFECT: { type: 'pot', cc: CC.DSP1_EFFECT },

        SOURCE: {
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.DSP1_SRC1,
                BUTTONS.BUTTONS_RIGHT.values.DSP1_SRC2,
            ],
        },
    },
    DSP2: {
        POT1: { type: 'pot', cc: CC.DSP2_POT1 },
        POT2: { type: 'pot', cc: CC.DSP2_POT2 },
        POT3: { type: 'pot', cc: CC.DSP2_POT3 },
        EFFECT: { type: 'pot', cc: CC.DSP2_EFFECT },

        SOURCE: {
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.DSP2_SRC1,
                BUTTONS.BUTTONS_RIGHT.values.DSP2_SRC2,
            ],
        },

        CHAIN: {
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.DSP_CHAIN_OFF,
                BUTTONS.BUTTONS_RIGHT.values.DSP_CHAIN_ON,
            ],
        },
    },
    CHORUS: {
        RATE: { type: 'pot', cc: CC.CHORUS_RATE },
        DEPTH: { type: 'pot', cc: CC.CHORUS_DEPTH },

        SOURCE: {
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.CHORUS_SRC1,
                BUTTONS.BUTTONS_RIGHT.values.CHORUS_SRC2,
            ],
        },
        MODE: {
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.CHORUS_MODE_CHORUS,
                BUTTONS.BUTTONS_RIGHT.values.CHORUS_MODE_VIBRATO,
            ],
        },
    },
    FX_BIT_CRUSHER: {
        BITS: { type: 'pot', cc: CC.FX_BIT_CRUSHER_BITS },
        RATE: { type: 'pot', cc: CC.FX_BIT_CRUSHER_RATE },
        SOURCE: {
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.FX_BIT_CRUSHER_SRC1,
                BUTTONS.BUTTONS_RIGHT.values.FX_BIT_CRUSHER_SRC2,
            ],
        },
    },
    FX_MIX: {
        LEVEL_DSP1: { type: 'pot', cc: CC.FX_MIX_LEVEL_DSP1 },
        LEVEL_DSP2: { type: 'pot', cc: CC.FX_MIX_LEVEL_DSP2 },
        LEVEL_CHORUS: { type: 'pot', cc: CC.FX_MIX_LEVEL_CHORUS },
        LEVEL_BIT_CRUSHER: { type: 'pot', cc: CC.FX_MIX_LEVEL_BIT_CRUSHER },
    }
}

export default midiControllersCommonFx