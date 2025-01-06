import CC from '../../../midi/mapCC'
import { FuncProps, ControllerConfigCC, ControllerConfigButton } from '../../../midi/types'
import { ControllerIdDst, ControllerIdNonMod } from '../controllers/controllerIds'
import {buttonMidiValues} from "../../../midi/buttonMidiValues";

interface CommonFxControllers {
    DSP1: {
        props: FuncProps
        PARAM1: ControllerConfigCC,
        PARAM2: ControllerConfigCC,
        PARAM3: ControllerConfigCC,
        EFFECT: ControllerConfigCC,
        SOURCE: ControllerConfigButton,
    },
    DSP2: {
        props: FuncProps
        PARAM1: ControllerConfigCC,
        PARAM2: ControllerConfigCC,
        PARAM3: ControllerConfigCC,
        EFFECT: ControllerConfigCC,
        SOURCE: ControllerConfigButton,
        CHAIN: ControllerConfigButton,
    },
    CHORUS: {
        props: FuncProps
        RATE: ControllerConfigCC,
        DEPTH: ControllerConfigCC,
        SOURCE: ControllerConfigButton,
        MODE: ControllerConfigButton,
    },
    FX_BIT_CRUSHER: {
        props: FuncProps
        BITS: ControllerConfigCC,
        RATE: ControllerConfigCC,
        SOURCE: ControllerConfigButton,
    },
    FX_MIX: {
        props: FuncProps
        LEVEL_DSP1: ControllerConfigCC,
        LEVEL_DSP2: ControllerConfigCC,
        LEVEL_CHORUS: ControllerConfigCC,
        LEVEL_BIT_CRUSHER: ControllerConfigCC,
    }
}

const commonFxControllers: CommonFxControllers = {
    DSP1: {
        props: { label: 'DSP 1' },
        PARAM1: {
            id: ControllerIdDst.DSP1_PARAM1,
            label: 'Param 1',
            isDstDigi: true,
            type: 'pot',
            cc: CC.DSP1_PARAM1,
            global: true
        },
        PARAM2: {
            id: ControllerIdDst.DSP1_PARAM2,
            label: 'Param 2',
            isDstDigi: true,
            type: 'pot',
            cc: CC.DSP1_PARAM2,
            global: true
        },
        PARAM3: {
            id: ControllerIdDst.DSP1_PARAM3,
            label: 'Param 3',
            isDstDigi: true,
            type: 'pot',
            cc: CC.DSP1_PARAM3,
            global: true
        },
        EFFECT: { id: ControllerIdNonMod.DSP1_EFFECT, label: 'Effect', type: 'pot', cc: CC.DSP1_EFFECT, global: true },

        SOURCE: {
            id: ControllerIdNonMod.DSP1_SOURCE,
            label: 'Source bus',
            type: 'button',
            values: [
                buttonMidiValues.DSP1_SRC1,
                buttonMidiValues.DSP1_SRC2,
            ],
            global: true
        },
    },
    DSP2: {
        props: { label: 'DSP 2' },
        PARAM1: {
            id: ControllerIdDst.DSP2_PARAM1,
            label: 'Param 1',
            isDstDigi: true,
            type: 'pot',
            cc: CC.DSP2_PARAM1,
            global: true
        },
        PARAM2: {
            id: ControllerIdDst.DSP2_PARAM2,
            label: 'Param 2',
            isDstDigi: true,
            type: 'pot',
            cc: CC.DSP2_PARAM2,
            global: true
        },
        PARAM3: {
            id: ControllerIdDst.DSP2_PARAM3,
            label: 'Param 3',
            isDstDigi: true,
            type: 'pot',
            cc: CC.DSP2_PARAM3,
            global: true
        },
        EFFECT: { id: ControllerIdNonMod.DSP2_EFFECT, label: 'Effect', type: 'pot', cc: CC.DSP2_EFFECT },

        SOURCE: {
            id: ControllerIdNonMod.DSP2_SOURCE,
            label: 'Source bus',
            type: 'button',
            values: [
                buttonMidiValues.DSP2_SRC1,
                buttonMidiValues.DSP2_SRC2,
            ],
            global: true
        },

        CHAIN: {
            id: ControllerIdNonMod.DSP2_CHAIN,
            label: 'Chain effects',
            type: 'button',
            values: [
                buttonMidiValues.DSP_CHAIN_OFF,
                buttonMidiValues.DSP_CHAIN_ON,
            ],
            global: true
        },
    },
    CHORUS: {
        props: { label: 'Chorus' },
        RATE: {
            id: ControllerIdDst.CHORUS_RATE,
            label: 'Rate',
            isDstDigi: true,
            type: 'pot',
            cc: CC.CHORUS_RATE,
            global: true
        },
        DEPTH: {
            id: ControllerIdDst.CHORUS_DEPTH,
            label: 'Depth',
            isDstDigi: true,
            type: 'pot',
            cc: CC.CHORUS_DEPTH,
            global: true
        },
        SOURCE: {
            id: ControllerIdNonMod.CHORUS_SOURCE,
            label: 'Source bus',
            type: 'button',
            values: [
                buttonMidiValues.CHORUS_SRC1,
                buttonMidiValues.CHORUS_SRC2,
            ],
            global: true,
        },
        MODE: {
            id: ControllerIdNonMod.CHORUS_MODE,
            label: 'Mode',
            type: 'button',
            values: [
                buttonMidiValues.CHORUS_MODE_CHORUS,
                buttonMidiValues.CHORUS_MODE_VIBRATO,
            ],
            global: true,
        },
    },
    FX_BIT_CRUSHER: {
        props: { label: 'Bit crusher' },
        BITS: {
            id: ControllerIdDst.FX_BIT_CRUSHER_BITS,
            label: 'Bits',
            isDstDigi: true,
            type: 'pot',
            cc: CC.FX_BIT_CRUSHER_BITS,
            global: true
        },
        RATE: {
            id: ControllerIdDst.FX_BIT_CRUSHER_RATE,
            label: 'Rate',
            isDstDigi: true,
            type: 'pot',
            cc: CC.FX_BIT_CRUSHER_RATE,
            global: true
        },
        SOURCE: {
            id: ControllerIdNonMod.FX_BIT_CRUSHER_SOURCE,
            label: 'Source bus',
            type: 'button',
            values: [
                buttonMidiValues.FX_BIT_CRUSHER_SRC1,
                buttonMidiValues.FX_BIT_CRUSHER_SRC2,
            ],
            global: true,
        },
    },
    FX_MIX: {
        props: { label: 'FX mix' },
        LEVEL_DSP1: {
            id: ControllerIdDst.FX_MIX_LEVEL_DSP1,
            label: 'DSP 1 level',
            shortLabel: 'DSP 1',
            isDstDigi: true,
            type: 'pot',
            cc: CC.FX_MIX_LEVEL_DSP1,
            global: true
        },
        LEVEL_DSP2: {
            id: ControllerIdDst.FX_MIX_LEVEL_DSP2,
            label: 'DSP 2 level',
            shortLabel: 'DSP 2',
            isDstDigi: true,
            type: 'pot',
            cc: CC.FX_MIX_LEVEL_DSP2,
            global: true
        },
        LEVEL_CHORUS: {
            id: ControllerIdDst.FX_MIX_LEVEL_CHORUS,
            label: 'Chorus level',
            shortLabel: 'Chorus',
            isDstDigi: true,
            type: 'pot',
            cc: CC.FX_MIX_LEVEL_CHORUS,
            global: true
        },
        LEVEL_BIT_CRUSHER: {
            id: ControllerIdDst.FX_MIX_LEVEL_BIT_CRUSHER,
            label: 'Bit crusher level',
            shortLabel: 'Bit crush',
            isDstDigi: true,
            type: 'pot',
            cc: CC.FX_MIX_LEVEL_BIT_CRUSHER,
            global: true
        },
    }
}

export default commonFxControllers