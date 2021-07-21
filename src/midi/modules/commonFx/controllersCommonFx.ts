import CC from '../../mapCC'
import { BUTTONS } from '../../buttons'
import { FuncProps, MidiConfigCC, MidiConfigCCWithValue } from '../../types'

interface ControllersCommonFx {
    DSP1: {
        props: FuncProps
        POT1: MidiConfigCC,
        POT2: MidiConfigCC,
        POT3: MidiConfigCC,
        EFFECT: MidiConfigCC,
        SOURCE: MidiConfigCCWithValue,
    },
    DSP2: {
        props: FuncProps
        POT1: MidiConfigCC,
        POT2: MidiConfigCC,
        POT3: MidiConfigCC,
        EFFECT: MidiConfigCC,
        SOURCE: MidiConfigCCWithValue,
        CHAIN: MidiConfigCCWithValue,
    },
    CHORUS: {
        props: FuncProps
        RATE: MidiConfigCC,
        DEPTH: MidiConfigCC,
        SOURCE: MidiConfigCCWithValue,
        MODE: MidiConfigCCWithValue,
    },
    FX_BIT_CRUSHER: {
        props: FuncProps
        BITS: MidiConfigCC,
        RATE: MidiConfigCC,
        SOURCE: MidiConfigCCWithValue,
    },
    FX_MIX: {
        props: FuncProps
        LEVEL_DSP1: MidiConfigCC,
        LEVEL_DSP2: MidiConfigCC,
        LEVEL_CHORUS: MidiConfigCC,
        LEVEL_BIT_CRUSHER: MidiConfigCC,
    }
}

const controllersCommonFx: ControllersCommonFx = {
    DSP1: {
        props: { label: 'DSP 1' },
        POT1: {
            label: 'Param 1',
            isTargetDigi: true,
            type: 'pot',
            cc: CC.DSP1_POT1
        },
        POT2: {
            label: 'Param 2',
            isTargetDigi: true,
            type: 'pot',
            cc: CC.DSP1_POT2
        },
        POT3: {
            label: 'Param 3',
            isTargetDigi: true,
            type: 'pot',
            cc: CC.DSP1_POT3
        },
        EFFECT: { label: 'Effect', type: 'pot', cc: CC.DSP1_EFFECT },

        SOURCE: {
            label: 'Source bus',
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.DSP1_SRC1,
                BUTTONS.BUTTONS_RIGHT.values.DSP1_SRC2,
            ],
        },
    },
    DSP2: {
        props: { label: 'DSP 2' },
        POT1: {
            label: 'Param 1',
            isTargetDigi: true,
            type: 'pot',
            cc: CC.DSP2_POT1
        },
        POT2: {
            label: 'Param 2',
            isTargetDigi: true,
            type: 'pot',
            cc: CC.DSP2_POT2
        },
        POT3: {
            label: 'Param 3',
            isTargetDigi: true,
            type: 'pot',
            cc: CC.DSP2_POT3
        },
        EFFECT: { label: 'Effect', type: 'pot', cc: CC.DSP2_EFFECT },

        SOURCE: {
            label: 'Source bus',
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
        props: { label: 'Chorus' },
        RATE: {
            label: 'Rate',
            isTargetDigi: true,
            type: 'pot',
            cc: CC.CHORUS_RATE
        },
        DEPTH: {
            label: 'Depth',
            isTargetDigi: true,
            type: 'pot',
            cc: CC.CHORUS_DEPTH
        },
        SOURCE: {
            label: 'Source bus',
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.CHORUS_SRC1,
                BUTTONS.BUTTONS_RIGHT.values.CHORUS_SRC2,
            ],
        },
        MODE: {
            label: 'Mode',
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.CHORUS_MODE_CHORUS,
                BUTTONS.BUTTONS_RIGHT.values.CHORUS_MODE_VIBRATO,
            ],
        },
    },
    FX_BIT_CRUSHER: {
        props: { label: 'Bit crusher' },
        BITS: {
            label: 'Bits',
            isTargetDigi: true,
            type: 'pot',
            cc: CC.FX_BIT_CRUSHER_BITS
        },
        RATE: {
            label: 'Rate',
            isTargetDigi: true,
            type: 'pot',
            cc: CC.FX_BIT_CRUSHER_RATE
        },
        SOURCE: {
            label: 'Source bus',
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.FX_BIT_CRUSHER_SRC1,
                BUTTONS.BUTTONS_RIGHT.values.FX_BIT_CRUSHER_SRC2,
            ],
        },
    },
    FX_MIX: {
        props: { label: 'FX mix' },
        LEVEL_DSP1: {
            label: 'DSP 1 level',
            isTargetDigi: true,
            type: 'pot',
            cc: CC.FX_MIX_LEVEL_DSP1
        },
        LEVEL_DSP2: {
            label: 'DSP 2 level',
            isTargetDigi: true,
            type: 'pot',
            cc: CC.FX_MIX_LEVEL_DSP2
        },
        LEVEL_CHORUS: {
            label: 'Chorus level',
            isTargetDigi: true,
            type: 'pot',
            cc: CC.FX_MIX_LEVEL_CHORUS
        },
        LEVEL_BIT_CRUSHER: {
            label: 'Bit crusher level',
            isTargetDigi: true,
            type: 'pot',
            cc: CC.FX_MIX_LEVEL_BIT_CRUSHER
        },
    }
}

export default controllersCommonFx