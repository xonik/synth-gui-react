import CC from '../../mapCC'
import { BUTTONS } from '../../buttons'
import { MidiConfigCC, MidiConfigCCWithValue } from '../../types'

interface MidiControllersCommonFx {
    DSP1: {
        POT1: MidiConfigCC,
        POT2: MidiConfigCC,
        POT3: MidiConfigCC,
        EFFECT: MidiConfigCC,
        SOURCE: MidiConfigCCWithValue,
    },
    DSP2: {
        POT1: MidiConfigCC,
        POT2: MidiConfigCC,
        POT3: MidiConfigCC,
        EFFECT: MidiConfigCC,
        SOURCE: MidiConfigCCWithValue,
        CHAIN: MidiConfigCCWithValue,
    },
    CHORUS: {
        RATE: MidiConfigCC,
        DEPTH: MidiConfigCC,
        SOURCE: MidiConfigCCWithValue,
        MODE: MidiConfigCCWithValue,
    },
    FX_BIT_CRUSHER: {
        BITS: MidiConfigCC,
        RATE: MidiConfigCC,
        SOURCE: MidiConfigCCWithValue,
    },
    FX_MIX: {
        LEVEL_DSP1: MidiConfigCC,
        LEVEL_DSP2: MidiConfigCC,
        LEVEL_CHORUS: MidiConfigCC,
        LEVEL_BIT_CRUSHER: MidiConfigCC,
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