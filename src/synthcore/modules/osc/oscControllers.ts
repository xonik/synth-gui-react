import CC from '../../../midi/mapCC'
import {
    FuncProps,
    ControllerConfigCC,
    ControllerConfigButton,
    ControllerConfigNRPN,
} from '../../../midi/types'
import NRPN from '../../../midi/mapNRPN'
import {ControllerIdDst, ControllerIdNonMod} from '../controllers/controllerIds'
import {buttonMidiValues} from "../../../midi/buttonMidiValues";

interface OscControllers {
    DCO1: {
        props: FuncProps
        RANGE: ControllerConfigButton
        PITCH: ControllerConfigNRPN
        NOTE: ControllerConfigCC
        SUPER_SAW: ControllerConfigCC
        WAVEFORM: ControllerConfigCC
        SUB1: ControllerConfigCC
        SUB2: ControllerConfigCC
        PW: ControllerConfigCC
        SYNC: ControllerConfigButton
        MODE: ControllerConfigButton
        SUB_WAVE: ControllerConfigButton
        WHEEL: ControllerConfigButton
        LFO: ControllerConfigButton
        KBD: ControllerConfigButton
        SAW_INV: ControllerConfigButton
        PRE_FILTER_SINE: ControllerConfigButton
    },
    DCO2: {
        props: FuncProps
        RANGE: ControllerConfigButton
        PITCH: ControllerConfigNRPN
        NOTE: ControllerConfigCC
        DETUNE: ControllerConfigCC
        SUPER_SAW: ControllerConfigCC
        WAVEFORM: ControllerConfigCC
        SUB1: ControllerConfigCC
        SUB2: ControllerConfigCC
        PW: ControllerConfigCC
        SYNC: ControllerConfigButton
        MODE: ControllerConfigButton
        SUB_WAVE: ControllerConfigButton
        WHEEL: ControllerConfigButton
        LFO: ControllerConfigButton
        KBD: ControllerConfigButton
        SAW_INV: ControllerConfigButton
        PRE_FILTER_SINE: ControllerConfigButton
    },
    VCO: {
        props: FuncProps
        PITCH: ControllerConfigNRPN
        NOTE: ControllerConfigCC
        DETUNE: ControllerConfigCC
        WAVEFORM: ControllerConfigCC
        FM_AMT: ControllerConfigCC
        PW: ControllerConfigCC
        LIN_FM: ControllerConfigCC
        SYNC: ControllerConfigButton
        SYNC_SRC: ControllerConfigButton
        FM_SRC: ControllerConfigButton
        FM_MODE: ControllerConfigButton
        EXT_CV: ControllerConfigButton
        WHEEL: ControllerConfigButton
        LFO: ControllerConfigButton
        KBD: ControllerConfigButton
    }
}

const oscControllers: OscControllers = {
    DCO1: {
        props: {label: 'Osc 1'},
        // pots
        PITCH: {
            id: ControllerIdDst.DCO1_PITCH,
            label: 'Pitch',
            isDstDigi: true,
            type: 'pot',
            addr: NRPN.DCO1_PITCH
        },
        NOTE: {
            id: ControllerIdDst.DCO1_NOTE,
            label: 'Note',
            isDstDigi: true,
            type: 'pot',
            cc: CC.DCO1_NOTE
        },
        RANGE: {
            id: ControllerIdNonMod.DCO1_RANGE,
            label: 'Range',
            type: 'button',
            values: [
                buttonMidiValues.OSC1_RANGE_LOW,
                buttonMidiValues.OSC1_RANGE_HIGH,
            ],
        },
        SUPER_SAW: {
            id: ControllerIdDst.DCO1_SUPER_SAW,
            label: 'Super saw',
            isDstDigi: true,
            type: 'pot',
            cc: CC.DCO1_SUPER_SAW
        },
        WAVEFORM: {
            id: ControllerIdDst.DCO1_WAVEFORM,
            label: 'Waveform',
            isDstDigi: true,
            type: 'pot',
            cc: CC.DCO1_WAVEFORM
        },
        SUB1: {
            id: ControllerIdDst.DCO1_SUB1,
            label: 'Sub 1',
            isDstDigi: true,
            type: 'pot',
            cc: CC.DCO1_SUB1
        },
        SUB2: {
            id: ControllerIdDst.DCO1_SUB2,
            label: 'Sub 2',
            isDstDigi: true,
            type: 'pot', cc: CC.DCO1_SUB2
        },
        PW: {
            id: ControllerIdDst.DCO1_PW,
            label: 'PW',
            isDstDigi: true,
            type: 'pot',
            cc: CC.DCO1_PW
        },

        //buttons
        SYNC: {
            id: ControllerIdNonMod.DCO1_SYNC,
            label: 'Sync DCO 1',
            type: 'button',
            values: [
                buttonMidiValues.OSC1_SYNC_OFF,
                buttonMidiValues.OSC1_SYNC_HARD,
                buttonMidiValues.OSC1_SYNC_METAL,
            ],
        },
        MODE: {
            id: ControllerIdNonMod.DCO1_MODE,
            label: 'Mode',
            type: 'button',
            values: [
                buttonMidiValues.OSC1_MODE_DCO,
                buttonMidiValues.OSC1_MODE_WT,
                buttonMidiValues.OSC1_MODE_PCM,
            ],
        },
        SUB_WAVE: {
            id: ControllerIdNonMod.DCO1_SUB_WAVE,
            label: 'Sub wave',
            type: 'button',
            values: [
                buttonMidiValues.OSC1_SUB_WAVE_SQR,
                buttonMidiValues.OSC1_SUB_WAVE_SAW,
            ],
        },
        WHEEL: {
            id: ControllerIdNonMod.DCO1_WHEEL,
            label: 'Mod wheel',
            type: 'button',
            values: [
                buttonMidiValues.OSC1_WHEEL_OFF,
                buttonMidiValues.OSC1_WHEEL_ON,
            ],
        },
        LFO: {
            id: ControllerIdNonMod.DCO1_LFO,
            label: 'LFO mod',
            type: 'button',
            values: [
                buttonMidiValues.OSC1_LFO_OFF,
                buttonMidiValues.OSC1_LFO_ON,
            ],
        },
        KBD: {
            id: ControllerIdNonMod.DCO1_KBD,
            label: 'Keyboard track',
            type: 'button',
            values: [
                buttonMidiValues.OSC1_KBD_OFF,
                buttonMidiValues.OSC1_KBD_ON,
            ],
        },
        SAW_INV: {
            id: ControllerIdNonMod.DCO1_SAW_INV,
            label: 'Saw invert',
            type: 'button',
            values: [
                buttonMidiValues.OSC1_SAW_INV_OFF,
                buttonMidiValues.OSC1_SAW_INV_ON,
            ],
        },
        PRE_FILTER_SINE: {
            id: ControllerIdNonMod.DCO1_PRE_FILTER_SINE,
            label: 'Saw invert',
            type: 'button',
            values: [
                buttonMidiValues.OSC1_PRE_FILTER_SINE_OFF,
                buttonMidiValues.OSC1_PRE_FILTER_SINE_ON,
            ],
        },
    },
    DCO2: {
        props: {label: 'Osc 2'},
        // pots
        PITCH: {
            id: ControllerIdDst.DCO2_PITCH,
            label: 'Pitch',
            isDstDigi: true,
            type: 'pot',
            addr: NRPN.DCO2_PITCH
        },
        NOTE: {
            id: ControllerIdDst.DCO2_NOTE,
            label: 'Note',
            isDstDigi: true,
            type: 'pot',
            cc: CC.DCO2_NOTE
        },
        RANGE: {
            id: ControllerIdNonMod.DCO2_RANGE,
            label: 'Range',
            type: 'button',
            values: [
                buttonMidiValues.OSC2_RANGE_LOW,
                buttonMidiValues.OSC2_RANGE_HIGH,
            ],
        },
        DETUNE: {
            id: ControllerIdDst.DCO2_DETUNE,
            label: 'Detune',
            isDstDigi: true,
            type: 'pot',
            cc: CC.DCO2_DETUNE
        },
        SUPER_SAW: {
            id: ControllerIdDst.DCO2_SUPER_SAW,
            label: 'Super saw',
            isDstDigi: true,
            type: 'pot', cc: CC.DCO2_SUPER_SAW
        },
        WAVEFORM: {
            id: ControllerIdDst.DCO2_WAVEFORM,
            label: 'Waveform',
            isDstDigi: true,
            type: 'pot',
            cc: CC.DCO2_WAVEFORM
        },
        SUB1: {
            id: ControllerIdDst.DCO2_SUB1,
            label: 'Sub 1',
            isDstDigi: true,
            type: 'pot',
            cc: CC.DCO2_SUB1
        },
        SUB2: {
            id: ControllerIdDst.DCO2_SUB2,
            label: 'Sub 2',
            isDstDigi: true,
            type: 'pot',
            cc: CC.DCO2_SUB2
        },
        PW: {
            id: ControllerIdDst.DCO2_PW,
            label: 'PW',
            isDstDigi: true,
            type: 'pot',
            cc: CC.DCO2_PW
        },

        //buttons
        SYNC: {
            id: ControllerIdNonMod.DCO2_SYNC,
            label: 'Sync DCO 2',
            type: 'button',
            values: [
                buttonMidiValues.OSC2_SYNC_OFF,
                buttonMidiValues.OSC2_SYNC_HARD,
                buttonMidiValues.OSC2_SYNC_METAL,
            ],
        },
        MODE: {
            id: ControllerIdNonMod.DCO2_MODE,
            label: 'Mode',
            type: 'button',
            values: [
                buttonMidiValues.OSC2_MODE_DCO,
                buttonMidiValues.OSC2_MODE_WT,
                buttonMidiValues.OSC2_MODE_PCM,
            ],
        },
        SUB_WAVE: {
            id: ControllerIdNonMod.DCO2_SUB_WAVE,
            label: 'Sub wave',
            type: 'button',
            values: [
                buttonMidiValues.OSC2_SUB_WAVE_SQR,
                buttonMidiValues.OSC2_SUB_WAVE_SAW,
            ],
        },
        WHEEL: {
            id: ControllerIdNonMod.DCO2_WHEEL,
            label: 'Mod wheel',
            type: 'button',
            values: [
                buttonMidiValues.OSC2_WHEEL_OFF,
                buttonMidiValues.OSC2_WHEEL_ON,
            ],
        },
        LFO: {
            id: ControllerIdNonMod.DCO2_LFO,
            label: 'LFO mod',
            type: 'button',
            values: [
                buttonMidiValues.OSC2_LFO_OFF,
                buttonMidiValues.OSC2_LFO_ON,
            ],
        },
        KBD: {
            id: ControllerIdNonMod.DCO2_KBD,
            label: 'Keyboard track',
            type: 'button',
            values: [
                buttonMidiValues.OSC2_KBD_OFF,
                buttonMidiValues.OSC2_KBD_ON,
            ],
        },
        SAW_INV: {
            id: ControllerIdNonMod.DCO2_SAW_INV,
            label: 'Saw invert',
            type: 'button',
            values: [
                buttonMidiValues.OSC2_SAW_INV_OFF,
                buttonMidiValues.OSC2_SAW_INV_ON,
            ],
        },
        PRE_FILTER_SINE: {
            id: ControllerIdNonMod.DCO2_PRE_FILTER_SINE,
            label: 'Saw invert',
            type: 'button',
            values: [
                buttonMidiValues.OSC2_PRE_FILTER_SINE_OFF,
                buttonMidiValues.OSC2_PRE_FILTER_SINE_ON,
            ],
        },
    },
    VCO: {
        props: {label: 'Osc 3'},
        // pots
        PITCH: {
            id: ControllerIdDst.VCO_PITCH,
            label: 'Pitch',
            isDstDigi: true,
            type: 'pot',
            addr: NRPN.VCO_PITCH
        },
        NOTE: {
            id: ControllerIdDst.VCO_NOTE,
            label: 'Note',
            isDstDigi: true,
            type: 'pot',
            cc: CC.VCO_NOTE
        },
        DETUNE: {
            id: ControllerIdDst.VCO_DETUNE,
            label: 'Detune',
            isDstDigi: true,
            type: 'pot',
            cc: CC.VCO_DETUNE
        },
        WAVEFORM: {
            id: ControllerIdDst.VCO_WAVEFORM,
            label: 'Waveform',
            isDstDigi: true,
            type: 'pot', cc: CC.VCO_WAVEFORM
        },
        FM_AMT: {
            id: ControllerIdDst.VCO_FM_AMT,
            label: 'FM Amt',
            shortLabel: 'FM',
            isDstDigi: true,
            type: 'pot', cc: CC.VCO_FM_AMT
        },
        PW: {
            id: ControllerIdDst.VCO_PW,
            label: 'PW',
            isDstDigi: true,
            type: 'pot',
            cc: CC.VCO_PW
        },
        LIN_FM: {
            id: ControllerIdDst.VCO_LIN_FM,
            label: 'Lin FM',
            isDstDigi: true,
            type: 'pot',
            cc: CC.VCO_LIN_FM
        },

        //buttons
        SYNC: {
            id: ControllerIdNonMod.VCO_SYNC,
            label: 'Sync',
            type: 'button',
            values: [
                buttonMidiValues.OSC3_SYNC_OFF,
                buttonMidiValues.OSC3_SYNC_HARD,
                buttonMidiValues.OSC3_SYNC_CEM_HARD,
            ],
        },
        SYNC_SRC: {
            id: ControllerIdNonMod.VCO_SYNC_SRC,
            label: 'Sync',
            type: 'button',
            values: [
                buttonMidiValues.OSC3_SYNC_SRC_OSC_1,
                buttonMidiValues.OSC3_SYNC_SRC_OSC_2,
            ],
        },
        FM_SRC: {
            id: ControllerIdNonMod.VCO_FM_SRC,
            label: 'Cross mod source',
            type: 'button',
            values: [
                buttonMidiValues.OSC3_FM_SRC_OSC2,
                buttonMidiValues.OSC3_FM_SRC_EXT,
            ],
        },
        FM_MODE: {
            id: ControllerIdNonMod.VCO_FM_MODE,
            label: 'Cross mod source',
            type: 'button',
            values: [
                buttonMidiValues.OSC3_FM_MODE_OFF,
                buttonMidiValues.OSC3_FM_MODE_LIN,
                buttonMidiValues.OSC3_FM_MODE_LOG,
            ],
        },
        EXT_CV: {
            id: ControllerIdNonMod.VCO_EXT_CV,
            label: 'Ext. CV',
            type: 'button',
            values: [
                buttonMidiValues.OSC3_EXT_CV_OFF,
                buttonMidiValues.OSC3_EXT_CV_ON,
            ],
        },
        WHEEL: {
            id: ControllerIdNonMod.VCO_WHEEL,
            label: 'Mod wheel',
            type: 'button',
            values: [
                buttonMidiValues.OSC3_WHEEL_OFF,
                buttonMidiValues.OSC3_WHEEL_ON,
            ],
        },
        LFO: {
            id: ControllerIdNonMod.VCO_LFO,
            label: 'LFO mod',
            type: 'button',
            values: [
                buttonMidiValues.OSC3_LFO_OFF,
                buttonMidiValues.OSC3_LFO_ON,
            ],
        },
        KBD: {
            id: ControllerIdNonMod.VCO_KBD,
            label: 'Keyboard track',
            type: 'button',
            values: [
                buttonMidiValues.OSC3_KBD_OFF,
                buttonMidiValues.OSC3_KBD_ON,
            ],
        },
    }
}

export default oscControllers
