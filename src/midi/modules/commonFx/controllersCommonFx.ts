import CC from '../../mapCC'
import { BUTTONS } from '../../buttons'
import { FuncProps, ControllerConfigCC, ControllerConfigCCWithValue } from '../../types'
import { ControllerIdDst, ControllerIdNonMod } from '../../controllerIds'

interface ControllersCommonFx {
    DSP1: {
        props: FuncProps
        PARAM1: ControllerConfigCC,
        PARAM2: ControllerConfigCC,
        PARAM3: ControllerConfigCC,
        EFFECT: ControllerConfigCC,
        SOURCE: ControllerConfigCCWithValue,
    },
    DSP2: {
        props: FuncProps
        PARAM1: ControllerConfigCC,
        PARAM2: ControllerConfigCC,
        PARAM3: ControllerConfigCC,
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
        PARAM1: {
            id: ControllerIdDst.DSP1_PARAM1,
            label: 'Param 1',
            isTargetDigi: true,
            type: 'pot',
            cc: CC.DSP1_PARAM1
        },
        PARAM2: {
            id: ControllerIdDst.DSP1_PARAM2,
            label: 'Param 2',
            isTargetDigi: true,
            type: 'pot',
            cc: CC.DSP1_PARAM2
        },
        PARAM3: {
            id: ControllerIdDst.DSP1_PARAM3,
            label: 'Param 3',
            isTargetDigi: true,
            type: 'pot',
            cc: CC.DSP1_PARAM3
        },
        EFFECT: { id: ControllerIdNonMod.DSP1_EFFECT, label: 'Effect', type: 'pot', cc: CC.DSP1_EFFECT },

        SOURCE: {
            id: ControllerIdNonMod.DSP1_SOURCE,
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
        PARAM1: {
            id: ControllerIdDst.DSP2_PARAM1,
            label: 'Param 1',
            isTargetDigi: true,
            type: 'pot',
            cc: CC.DSP2_PARAM1
        },
        PARAM2: {
            id: ControllerIdDst.DSP2_PARAM2,
            label: 'Param 2',
            isTargetDigi: true,
            type: 'pot',
            cc: CC.DSP2_PARAM2
        },
        PARAM3: {
            id: ControllerIdDst.DSP2_PARAM3,
            label: 'Param 3',
            isTargetDigi: true,
            type: 'pot',
            cc: CC.DSP2_PARAM3
        },
        EFFECT: { id: ControllerIdNonMod.DSP2_EFFECT, label: 'Effect', type: 'pot', cc: CC.DSP2_EFFECT },

        SOURCE: {
            id: ControllerIdNonMod.DSP2_SOURCE,
            label: 'Source bus',
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.DSP2_SRC1,
                BUTTONS.BUTTONS_RIGHT.values.DSP2_SRC2,
            ],
        },

        CHAIN: {
            id: ControllerIdNonMod.DSP2_CHAIN,
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
            id: ControllerIdDst.CHORUS_RATE,
            label: 'Rate',
            isTargetDigi: true,
            type: 'pot',
            cc: CC.CHORUS_RATE
        },
        DEPTH: {
            id: ControllerIdDst.CHORUS_DEPTH,
            label: 'Depth',
            isTargetDigi: true,
            type: 'pot',
            cc: CC.CHORUS_DEPTH
        },
        SOURCE: {
            id: ControllerIdNonMod.CHORUS_SOURCE,
            label: 'Source bus',
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.CHORUS_SRC1,
                BUTTONS.BUTTONS_RIGHT.values.CHORUS_SRC2,
            ],
        },
        MODE: {
            id: ControllerIdNonMod.CHORUS_MODE,
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
            id: ControllerIdDst.FX_BIT_CRUSHER_BITS,
            label: 'Bits',
            isTargetDigi: true,
            type: 'pot',
            cc: CC.FX_BIT_CRUSHER_BITS
        },
        RATE: {
            id: ControllerIdDst.FX_BIT_CRUSHER_RATE,
            label: 'Rate',
            isTargetDigi: true,
            type: 'pot',
            cc: CC.FX_BIT_CRUSHER_RATE
        },
        SOURCE: {
            id: ControllerIdNonMod.FX_BIT_CRUSHER_SOURCE,
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
            id: ControllerIdDst.FX_MIX_LEVEL_DSP1,
            label: 'DSP 1 level',
            shortLabel: 'DSP 1',
            isTargetDigi: true,
            type: 'pot',
            cc: CC.FX_MIX_LEVEL_DSP1
        },
        LEVEL_DSP2: {
            id: ControllerIdDst.FX_MIX_LEVEL_DSP2,
            label: 'DSP 2 level',
            shortLabel: 'DSP 2',
            isTargetDigi: true,
            type: 'pot',
            cc: CC.FX_MIX_LEVEL_DSP2
        },
        LEVEL_CHORUS: {
            id: ControllerIdDst.FX_MIX_LEVEL_CHORUS,
            label: 'Chorus level',
            shortLabel: 'Chorus',
            isTargetDigi: true,
            type: 'pot',
            cc: CC.FX_MIX_LEVEL_CHORUS
        },
        LEVEL_BIT_CRUSHER: {
            id: ControllerIdDst.FX_MIX_LEVEL_BIT_CRUSHER,
            label: 'Bit crusher level',
            shortLabel: 'Bit crush',
            isTargetDigi: true,
            type: 'pot',
            cc: CC.FX_MIX_LEVEL_BIT_CRUSHER
        },
    }
}

export default controllersCommonFx