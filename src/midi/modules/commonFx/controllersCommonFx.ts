import CC from '../../mapCC'
import { BUTTONS } from '../../buttons'
import { FuncProps, ControllerConfigCC, ControllerConfigCCWithValue } from '../../types'

interface ControllersCommonFx {
    DSP1: {
        props: FuncProps
        POT1: ControllerConfigCC,
        POT2: ControllerConfigCC,
        POT3: ControllerConfigCC,
        EFFECT: ControllerConfigCC,
        SOURCE: ControllerConfigCCWithValue,
    },
    DSP2: {
        props: FuncProps
        POT1: ControllerConfigCC,
        POT2: ControllerConfigCC,
        POT3: ControllerConfigCC,
        EFFECT: ControllerConfigCC,
        SOURCE: ControllerConfigCCWithValue,
        CHAIN: ControllerConfigCCWithValue,
    },
    CHORUS: {
        props: FuncProps
        RATE: ControllerConfigCC,
        DEPTH: ControllerConfigCC,
        SOURCE: ControllerConfigCCWithValue,
        MODE: ControllerConfigCCWithValue,
    },
    FX_BIT_CRUSHER: {
        props: FuncProps
        BITS: ControllerConfigCC,
        RATE: ControllerConfigCC,
        SOURCE: ControllerConfigCCWithValue,
    },
    FX_MIX: {
        props: FuncProps
        LEVEL_DSP1: ControllerConfigCC,
        LEVEL_DSP2: ControllerConfigCC,
        LEVEL_CHORUS: ControllerConfigCC,
        LEVEL_BIT_CRUSHER: ControllerConfigCC,
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
            label: 'Chain effects',
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