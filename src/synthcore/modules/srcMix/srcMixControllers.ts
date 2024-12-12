import CC from '../../../midi/mapCC'
import { FuncProps, ControllerConfigCC, ControllerConfigButton } from '../../../midi/types'
import { ControllerIdDst, ControllerIdNonMod } from '../controllers/controllerIds'
import { dbLevelResponseMapper } from '../common/responseMappers'
import {buttonMidiValues} from "../../../midi/buttonMidiValues";

interface SrcMixControllers {
    props: FuncProps
    LEVEL_OSC1: ControllerConfigCC
    LEVEL_OSC2: ControllerConfigCC
    LEVEL_OSC3: ControllerConfigCC
    LEVEL_NOISE: ControllerConfigCC
    LEVEL_RING_MOD: ControllerConfigCC
    LEVEL_EXT_AUDIO: ControllerConfigCC
    OUT_OSC1: ControllerConfigButton
    OUT_OSC2: ControllerConfigButton
    OUT_OSC3: ControllerConfigButton
    OUT_NOISE: ControllerConfigButton
    OUT_RING_MOD: ControllerConfigButton
    OUT_EXT_AUDIO: ControllerConfigButton
}

const srcMixControllers: SrcMixControllers = {
    props: {
        label: 'Source mix'
    },
    LEVEL_OSC1: {
        id: ControllerIdDst.SOURCE_MIX_LEVEL_OSC1,
        label: 'Osc 1',
        isDstDigi: true,
        type: 'pot',
        cc: CC.LEVEL_OSC1,
        uiResponse: dbLevelResponseMapper,
    },
    LEVEL_OSC2: {
        id: ControllerIdDst.SOURCE_MIX_LEVEL_OSC2,
        label: 'Osc 2',
        isDstDigi: true,
        type: 'pot',
        cc: CC.LEVEL_OSC2,
        uiResponse: dbLevelResponseMapper,
    },
    LEVEL_OSC3: {
        id: ControllerIdDst.SOURCE_MIX_LEVEL_OSC3,
        label: 'Osc 3',
        isDstDigi: true,
        type: 'pot',
        cc: CC.LEVEL_OSC3,
        uiResponse: dbLevelResponseMapper,
    },
    LEVEL_NOISE: {
        id: ControllerIdDst.SOURCE_MIX_LEVEL_NOISE,
        label: 'Noise',
        isDstDigi: true,
        type: 'pot',
        cc: CC.LEVEL_NOISE,
        uiResponse: dbLevelResponseMapper,
    },
    LEVEL_RING_MOD: {
        id: ControllerIdDst.SOURCE_MIX_LEVEL_RING_MOD,
        label: 'Ring mod',
        isDstDigi: true,
        type: 'pot',
        cc: CC.LEVEL_RING_MOD,
        uiResponse: dbLevelResponseMapper,
    },
    LEVEL_EXT_AUDIO: {
        id: ControllerIdDst.SOURCE_MIX_LEVEL_EXT_AUDIO,
        label: 'Ext. audio',
        isDstDigi: true,
        type: 'pot',
        cc: CC.LEVEL_EXT_AUDIO,
        uiResponse: dbLevelResponseMapper,
    },
    OUT_OSC1: {
        id: ControllerIdNonMod.SRC_MIX_OUT_OSC1,
        label: 'Osc 1 dst',
        type: 'button',
        values: [
            buttonMidiValues.OSC1_OUT_OFF,
            buttonMidiValues.OSC1_OUT_A,
            buttonMidiValues.OSC1_OUT_B,
            buttonMidiValues.OSC1_OUT_BOTH,
        ],
    },
    OUT_OSC2: {
        id: ControllerIdNonMod.SRC_MIX_OUT_OSC2,
        label: 'Osc 2 dst',
        type: 'button',
        values: [
            buttonMidiValues.OSC2_OUT_OFF,
            buttonMidiValues.OSC2_OUT_A,
            buttonMidiValues.OSC2_OUT_B,
            buttonMidiValues.OSC2_OUT_BOTH,
        ],
    },
    OUT_OSC3: {
        id: ControllerIdNonMod.SRC_MIX_OUT_OSC3,
        label: 'Osc 3 dst',
        type: 'button',
        values: [
            buttonMidiValues.OSC3_OUT_OFF,
            buttonMidiValues.OSC3_OUT_A,
            buttonMidiValues.OSC3_OUT_B,
            buttonMidiValues.OSC3_OUT_BOTH,
        ],
    },
    OUT_NOISE: {
        id: ControllerIdNonMod.SRC_MIX_OUT_NOISE,
        label: 'Noise dst',
        type: 'button',
        values: [
            buttonMidiValues.NOISE_OUT_OFF,
            buttonMidiValues.NOISE_OUT_A,
            buttonMidiValues.NOISE_OUT_B,
            buttonMidiValues.NOISE_OUT_BOTH,
        ],
    },
    OUT_RING_MOD: {
        id: ControllerIdNonMod.SRC_MIX_OUT_RING_MOD,
        label: 'Ring mod dst',
        type: 'button',
        values: [
            buttonMidiValues.RING_MOD_OUT_OFF,
            buttonMidiValues.RING_MOD_OUT_A,
            buttonMidiValues.RING_MOD_OUT_B,
            buttonMidiValues.RING_MOD_OUT_BOTH,
        ],
    },
    OUT_EXT_AUDIO: {
        id: ControllerIdNonMod.SRC_MIX_OUT_EXT_AUDIO,
        label: 'Ext. audio dst',
        type: 'button',
        values: [
            buttonMidiValues.EXT_AUDIO_OUT_OFF,
            buttonMidiValues.EXT_AUDIO_OUT_A,
            buttonMidiValues.EXT_AUDIO_OUT_B,
            buttonMidiValues.EXT_AUDIO_OUT_BOTH,
        ],
    },
}

export default srcMixControllers