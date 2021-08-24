import CC from '../../mapCC'
import { BUTTONS } from '../../buttons'
import { FuncProps, ControllerConfigCC, ControllerConfigCCWithValue } from '../../types'
import { ControllerIdDst, ControllerIdNonMod } from '../../controllerIds'

interface ControllersSrcMix {
    props: FuncProps
    LEVEL_OSC1: ControllerConfigCC
    LEVEL_OSC2: ControllerConfigCC
    LEVEL_OSC3: ControllerConfigCC
    LEVEL_NOISE: ControllerConfigCC
    LEVEL_RING_MOD: ControllerConfigCC
    LEVEL_EXT_AUDIO: ControllerConfigCC
    OUT_OSC1: ControllerConfigCCWithValue
    OUT_OSC2: ControllerConfigCCWithValue
    OUT_OSC3: ControllerConfigCCWithValue
    OUT_NOISE: ControllerConfigCCWithValue
    OUT_RING_MOD: ControllerConfigCCWithValue
    OUT_EXT_AUDIO: ControllerConfigCCWithValue
}

const controllersSrcMix: ControllersSrcMix = {
    props: {
        label: 'Source mix'
    },
    LEVEL_OSC1: {
        id: ControllerIdDst.SOURCE_MIX_LEVEL_OSC1,
        label: 'Osc 1',
        isDstDigi: true,
        type: 'pot',
        cc: CC.LEVEL_OSC1
    },
    LEVEL_OSC2: {
        id: ControllerIdDst.SOURCE_MIX_LEVEL_OSC2,
        label: 'Osc 2',
        isDstDigi: true,
        type: 'pot',
        cc: CC.LEVEL_OSC2
    },
    LEVEL_OSC3: {
        id: ControllerIdDst.SOURCE_MIX_LEVEL_OSC3,
        label: 'Osc 3',
        isDstDigi: true,
        type: 'pot',
        cc: CC.LEVEL_OSC3
    },
    LEVEL_NOISE: {
        id: ControllerIdDst.SOURCE_MIX_LEVEL_NOISE,
        label: 'Noise',
        isDstDigi: true,
        type: 'pot',
        cc: CC.LEVEL_NOISE
    },
    LEVEL_RING_MOD: {
        id: ControllerIdDst.SOURCE_MIX_LEVEL_RING_MOD,
        label: 'Ring mod',
        isDstDigi: true,
        type: 'pot',
        cc: CC.LEVEL_RING_MOD
    },
    LEVEL_EXT_AUDIO: {
        id: ControllerIdDst.SOURCE_MIX_LEVEL_EXT_AUDIO,
        label: 'Ext. audio',
        isDstDigi: true,
        type: 'pot',
        cc: CC.LEVEL_EXT_AUDIO
    },
    OUT_OSC1: {
        id: ControllerIdNonMod.SRC_MIX_OUT_OSC1,
        label: 'Osc 1 dst',
        type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
            BUTTONS.BUTTONS_LEFT.values.OSC1_OUT_A,
            BUTTONS.BUTTONS_LEFT.values.OSC1_OUT_B,
            BUTTONS.BUTTONS_LEFT.values.OSC1_OUT_BOTH,
        ],
    },
    OUT_OSC2: {
        id: ControllerIdNonMod.SRC_MIX_OUT_OSC2,
        label: 'Osc 2 dst',
        type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
            BUTTONS.BUTTONS_LEFT.values.OSC2_OUT_A,
            BUTTONS.BUTTONS_LEFT.values.OSC2_OUT_B,
            BUTTONS.BUTTONS_LEFT.values.OSC2_OUT_BOTH,
        ],
    },
    OUT_OSC3: {
        id: ControllerIdNonMod.SRC_MIX_OUT_OSC3,
        label: 'Osc 3 dst',
        type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
            BUTTONS.BUTTONS_LEFT.values.OSC3_OUT_A,
            BUTTONS.BUTTONS_LEFT.values.OSC3_OUT_B,
            BUTTONS.BUTTONS_LEFT.values.OSC3_OUT_BOTH,
        ],
    },
    OUT_NOISE: {
        id: ControllerIdNonMod.SRC_MIX_OUT_NOISE,
        label: 'Noise dst',
        type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
            BUTTONS.BUTTONS_LEFT.values.NOISE_OUT_A,
            BUTTONS.BUTTONS_LEFT.values.NOISE_OUT_B,
            BUTTONS.BUTTONS_LEFT.values.NOISE_OUT_BOTH,
        ],
    },
    OUT_RING_MOD: {
        id: ControllerIdNonMod.SRC_MIX_OUT_RING_MOD,
        label: 'Ring mod dst',
        type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
            BUTTONS.BUTTONS_LEFT.values.RING_MOD_OUT_A,
            BUTTONS.BUTTONS_LEFT.values.RING_MOD_OUT_B,
            BUTTONS.BUTTONS_LEFT.values.RING_MOD_OUT_BOTH,
        ],
    },
    OUT_EXT_AUDIO: {
        id: ControllerIdNonMod.SRC_MIX_OUT_RING_MOD,
        label: 'Ext. audio dst',
        type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
            BUTTONS.BUTTONS_LEFT.values.EXT_AUDIO_OUT_A,
            BUTTONS.BUTTONS_LEFT.values.EXT_AUDIO_OUT_B,
            BUTTONS.BUTTONS_LEFT.values.EXT_AUDIO_OUT_BOTH,
        ],
    },
}

export default controllersSrcMix