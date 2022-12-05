import CC from '../../../midi/mapCC'
import { BUTTONS } from '../../../midi/buttons'
import { FuncProps, ControllerConfigCC, ControllerConfigCCWithValue, ControllerConfigNRPN } from '../../../midi/types'
import NRPN from '../../../midi/mapNRPN'
import { ControllerIdDst, ControllerIdNonMod } from '../../../midi/controllerIds'

interface OscControllers {
    DCO1: {
        props: FuncProps
        PITCH: ControllerConfigNRPN
        NOTE: ControllerConfigCC
        SUPER_SAW: ControllerConfigCC
        WAVEFORM: ControllerConfigCC
        SUB1: ControllerConfigCC
        SUB2: ControllerConfigCC
        PW: ControllerConfigCC
        SYNC: ControllerConfigCCWithValue
        MODE: ControllerConfigCCWithValue
        SUB_WAVE: ControllerConfigCCWithValue
        WHEEL: ControllerConfigCCWithValue
        LFO: ControllerConfigCCWithValue
        KBD: ControllerConfigCCWithValue
        SAW_INV: ControllerConfigCCWithValue
        PRE_FILTER_SINE: ControllerConfigCCWithValue
    },
    DCO2: {
        props: FuncProps
        PITCH: ControllerConfigNRPN
        NOTE: ControllerConfigCC
        DETUNE: ControllerConfigCC
        SUPER_SAW: ControllerConfigCC
        WAVEFORM: ControllerConfigCC
        SUB1: ControllerConfigCC
        SUB2: ControllerConfigCC
        PW: ControllerConfigCC
        SYNC: ControllerConfigCCWithValue
        MODE: ControllerConfigCCWithValue
        SUB_WAVE: ControllerConfigCCWithValue
        WHEEL: ControllerConfigCCWithValue
        LFO: ControllerConfigCCWithValue
        KBD: ControllerConfigCCWithValue
        SAW_INV: ControllerConfigCCWithValue
        PRE_FILTER_SINE: ControllerConfigCCWithValue
    },
    VCO: {
        props: FuncProps
        PITCH: ControllerConfigNRPN
        NOTE: ControllerConfigCC
        DETUNE: ControllerConfigCC
        WAVEFORM: ControllerConfigCC
        CROSS_MOD: ControllerConfigCC
        PW: ControllerConfigCC
        SYNC: ControllerConfigCCWithValue
        CROSS_MOD_SRC: ControllerConfigCCWithValue
        EXT_CV: ControllerConfigCCWithValue
        WHEEL: ControllerConfigCCWithValue
        LFO: ControllerConfigCCWithValue
        KBD: ControllerConfigCCWithValue
    }
}

const oscControllers: OscControllers = {
    DCO1: {
        props: { label: 'Osc 1' },
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
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.OSC1_SYNC_OFF,
                BUTTONS.BUTTONS_LEFT.values.OSC1_SYNC_HARD,
                BUTTONS.BUTTONS_LEFT.values.OSC1_SYNC_METAL,
            ],
        },
        MODE: {
            id: ControllerIdNonMod.DCO1_MODE,
            label: 'Mode',
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.OSC1_MODE_DCO,
                BUTTONS.BUTTONS_LEFT.values.OSC1_MODE_WT,
                BUTTONS.BUTTONS_LEFT.values.OSC1_MODE_PCM,
            ],
        },
        SUB_WAVE: {
            id: ControllerIdNonMod.DCO1_SUB_WAVE,
            label: 'Sub wave',
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.OSC1_SUB_WAVE_SQR,
                BUTTONS.BUTTONS_LEFT.values.OSC1_SUB_WAVE_SAW,
            ],
        },
        WHEEL: {
            id: ControllerIdNonMod.DCO1_WHEEL,
            label: 'Mod wheel',
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.OSC1_WHEEL_OFF,
                BUTTONS.BUTTONS_LEFT.values.OSC1_WHEEL_ON,
            ],
        },
        LFO: {
            id: ControllerIdNonMod.DCO1_LFO,
            label: 'LFO mod',
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.OSC1_LFO_OFF,
                BUTTONS.BUTTONS_LEFT.values.OSC1_LFO_ON,
            ],
        },
        KBD: {
            id: ControllerIdNonMod.DCO1_KBD,
            label: 'Keyboard track',
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.OSC1_KBD_OFF,
                BUTTONS.BUTTONS_LEFT.values.OSC1_KBD_ON,
            ],
        },
        SAW_INV: {
            id: ControllerIdNonMod.DCO1_SAW_INV,
            label: 'Saw invert',
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.OSC1_SAW_INV_OFF,
                BUTTONS.BUTTONS_LEFT.values.OSC1_SAW_INV_ON,
            ],
        },
        PRE_FILTER_SINE: {
            id: ControllerIdNonMod.DCO1_PRE_FILTER_SINE,
            label: 'Saw invert',
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.OSC1_PRE_FILTER_SINE_OFF,
                BUTTONS.BUTTONS_LEFT.values.OSC1_PRE_FILTER_SINE_ON,
            ],
        },
    },
    DCO2: {
        props: { label: 'Osc 2' },
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
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.OSC2_SYNC_OFF,
                BUTTONS.BUTTONS_LEFT.values.OSC2_SYNC_HARD,
                BUTTONS.BUTTONS_LEFT.values.OSC2_SYNC_METAL,
            ],
        },
        MODE: {
            id: ControllerIdNonMod.DCO2_MODE,
            label: 'Mode',
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.OSC2_MODE_DCO,
                BUTTONS.BUTTONS_LEFT.values.OSC2_MODE_WT,
                BUTTONS.BUTTONS_LEFT.values.OSC2_MODE_PCM,
            ],
        },
        SUB_WAVE: {
            id: ControllerIdNonMod.DCO2_SUB_WAVE,
            label: 'Sub wave',
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.OSC2_SUB_WAVE_SQR,
                BUTTONS.BUTTONS_LEFT.values.OSC2_SUB_WAVE_SAW,
            ],
        },
        WHEEL: {
            id: ControllerIdNonMod.DCO2_WHEEL,
            label: 'Mod wheel',
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.OSC2_WHEEL_OFF,
                BUTTONS.BUTTONS_LEFT.values.OSC2_WHEEL_ON,
            ],
        },
        LFO: {
            id: ControllerIdNonMod.DCO2_LFO,
            label: 'LFO mod',
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.OSC2_LFO_OFF,
                BUTTONS.BUTTONS_LEFT.values.OSC2_LFO_ON,
            ],
        },
        KBD: {
            id: ControllerIdNonMod.DCO2_KBD,
            label: 'Keyboard track',
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.OSC2_KBD_OFF,
                BUTTONS.BUTTONS_LEFT.values.OSC2_KBD_ON,
            ],
        },
        SAW_INV: {
            id: ControllerIdNonMod.DCO2_SAW_INV,
            label: 'Saw invert',
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.OSC2_SAW_INV_OFF,
                BUTTONS.BUTTONS_LEFT.values.OSC2_SAW_INV_ON,
            ],
        },
        PRE_FILTER_SINE: {
            id: ControllerIdNonMod.DCO2_PRE_FILTER_SINE,
            label: 'Saw invert',
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.OSC2_PRE_FILTER_SINE_OFF,
                BUTTONS.BUTTONS_LEFT.values.OSC2_PRE_FILTER_SINE_ON,
            ],
        },
    },
    VCO: {
        props: { label: 'Osc 3' },
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
        CROSS_MOD: {
            id: ControllerIdDst.VCO_CROSS_MOD,
            label: 'Cross mod',
            shortLabel: 'X-mod',
            isDstDigi: true,
            type: 'pot', cc: CC.VCO_CROSS_MOD
        },
        PW: {
            id: ControllerIdDst.VCO_PW,
            label: 'PW',
            isDstDigi: true,
            type: 'pot',
            cc: CC.VCO_PW
        },

        //buttons
        SYNC: {
            id: ControllerIdNonMod.VCO_SYNC,
            label: 'Sync',
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.OSC3_SYNC_OFF,
                BUTTONS.BUTTONS_LEFT.values.OSC3_SYNC_HARD,
                BUTTONS.BUTTONS_LEFT.values.OSC3_SYNC_CEM_HARD,
                BUTTONS.BUTTONS_LEFT.values.OSC3_SYNC_CEM_SOFT,
            ],
        },
        CROSS_MOD_SRC: {
            id: ControllerIdNonMod.VCO_CROSS_MOD_SRC,
            label: 'Cross mod source',
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.OSC3_CROSS_MOD_SRC_OSC1,
                BUTTONS.BUTTONS_LEFT.values.OSC3_CROSS_MOD_SRC_EXT,
            ],
        },
        EXT_CV: {
            id: ControllerIdNonMod.VCO_EXT_CV,
            label: 'Ext. CV',
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.OSC3_EXT_CV_OFF,
                BUTTONS.BUTTONS_LEFT.values.OSC3_EXT_CV_ON,
            ],
        },
        WHEEL: {
            id: ControllerIdNonMod.VCO_WHEEL,
            label: 'Mod wheel',
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.OSC3_WHEEL_OFF,
                BUTTONS.BUTTONS_LEFT.values.OSC3_WHEEL_ON,
            ],
        },
        LFO: {
            id: ControllerIdNonMod.VCO_LFO,
            label: 'LFO mod',
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.OSC3_LFO_OFF,
                BUTTONS.BUTTONS_LEFT.values.OSC3_LFO_ON,
            ],
        },
        KBD: {
            id: ControllerIdNonMod.VCO_KBD,
            label: 'Keyboard track',
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.OSC3_KBD_OFF,
                BUTTONS.BUTTONS_LEFT.values.OSC3_KBD_ON,
            ],
        },
    }
}

export default oscControllers
