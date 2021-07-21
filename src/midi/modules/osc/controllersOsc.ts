import CC from '../../mapCC'
import { BUTTONS } from '../../buttons'
import { FuncProps, MidiConfigCC, MidiConfigCCWithValue, MidiConfigNRPN } from '../../types'
import NRPN from '../../mapNRPN'

interface ControllersOsc {
    DCO1: {
        props: FuncProps
        PITCH: MidiConfigNRPN
        NOTE: MidiConfigCC
        SUPER_SAW: MidiConfigCC
        WAVEFORM: MidiConfigCC
        SUB1: MidiConfigCC
        SUB2: MidiConfigCC
        PW: MidiConfigCC
        SYNC: MidiConfigCCWithValue
        MODE: MidiConfigCCWithValue
        SUB_WAVE: MidiConfigCCWithValue
        WHEEL: MidiConfigCCWithValue
        LFO: MidiConfigCCWithValue
        KBD: MidiConfigCCWithValue
    },
    DCO2: {
        props: FuncProps
        PITCH: MidiConfigNRPN
        NOTE: MidiConfigCC
        DETUNE: MidiConfigCC
        SUPER_SAW: MidiConfigCC
        WAVEFORM: MidiConfigCC
        SUB1: MidiConfigCC
        SUB2: MidiConfigCC
        PW: MidiConfigCC
        MODE: MidiConfigCCWithValue
        SUB_WAVE: MidiConfigCCWithValue
        WHEEL: MidiConfigCCWithValue
        LFO: MidiConfigCCWithValue
        KBD: MidiConfigCCWithValue
    },
    VCO: {
        props: FuncProps
        PITCH: MidiConfigNRPN
        NOTE: MidiConfigCC
        DETUNE: MidiConfigCC
        WAVEFORM: MidiConfigCC
        CROSS_MOD: MidiConfigCC
        PW: MidiConfigCC
        SYNC: MidiConfigCCWithValue
        CROSS_MOD_SRC: MidiConfigCCWithValue
        EXT_CV: MidiConfigCCWithValue
        WHEEL: MidiConfigCCWithValue
        LFO: MidiConfigCCWithValue
        KBD: MidiConfigCCWithValue
    }
}

const controllersOsc: ControllersOsc = {
    DCO1: {
        props: { label: 'Osc 1' },
        // pots
        PITCH: {
            label: 'Pitch',
            isTargetDigi: true,
            type: 'pot',
            addr: NRPN.DCO1_PITCH
        },
        NOTE: {
            label: 'Note',
            isTargetDigi: true,
            type: 'pot',
            cc: CC.DCO1_NOTE
        },
        SUPER_SAW: {
            label: 'Super saw',
            isTargetDigi: true,
            type: 'pot',
            cc: CC.DCO1_SUPER_SAW
        },
        WAVEFORM: {
            label: 'Waveform',
            isTargetDigi: true,
            type: 'pot',
            cc: CC.DCO1_WAVEFORM
        },
        SUB1: {
            label: 'Sub 1',
            isTargetDigi: true,
            type: 'pot',
            cc: CC.DCO1_SUB1
        },
        SUB2: {
            label: 'Sub 2',
            isTargetDigi: true,
            type: 'pot', cc: CC.DCO1_SUB2
        },
        PW: {
            label: 'PW',
            isTargetDigi: true,
            type: 'pot',
            cc: CC.DCO1_PW
        },

        //buttons
        SYNC: {
            label: 'Sync',
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.OSC1_SYNC_OFF,
                BUTTONS.BUTTONS_LEFT.values.OSC1_SYNC_1_2,
                BUTTONS.BUTTONS_LEFT.values.OSC1_SYNC_2_1,
            ],
        },
        MODE: {
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
            label: 'Sub wave',
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.OSC1_SUB_WAVE_SQR,
                BUTTONS.BUTTONS_LEFT.values.OSC1_SUB_WAVE_SAW,
            ],
        },
        WHEEL: {
            label: 'Mod wheel',
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.OSC1_WHEEL_OFF,
                BUTTONS.BUTTONS_LEFT.values.OSC1_WHEEL_ON,
            ],
        },
        LFO: {
            label: 'LFO mod',
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.OSC1_LFO_OFF,
                BUTTONS.BUTTONS_LEFT.values.OSC1_LFO_ON,
            ],
        },
        KBD: {
            label: 'Keyboard track',
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.OSC1_KBD_OFF,
                BUTTONS.BUTTONS_LEFT.values.OSC1_KBD_ON,
            ],
        },
    },
    DCO2: {
        props: { label: 'Osc 2' },
        // pots
        PITCH: {
            label: 'Pitch',
            isTargetDigi: true,
            type: 'pot',
            addr: NRPN.DCO2_PITCH
        },
        NOTE: {
            label: 'Note',
            isTargetDigi: true,
            type: 'pot',
            cc: CC.DCO2_NOTE
        },
        DETUNE: {
            label: 'Detune',
            isTargetDigi: true,
            type: 'pot',
            cc: CC.DCO2_DETUNE
        },
        SUPER_SAW: {
            label: 'Super saw',
            isTargetDigi: true,
            type: 'pot', cc: CC.DCO2_SUPER_SAW
        },
        WAVEFORM: {
            label: 'Waveform',
            isTargetDigi: true,
            type: 'pot',
            cc: CC.DCO2_WAVEFORM
        },
        SUB1: {
            label: 'Sub 1',
            isTargetDigi: true,
            type: 'pot',
            cc: CC.DCO2_SUB1
        },
        SUB2: {
            label: 'Sub 2',
            isTargetDigi: true,
            type: 'pot',
            cc: CC.DCO2_SUB2
        },
        PW: {
            label: 'PW',
            isTargetDigi: true,
            type: 'pot',
            cc: CC.DCO2_PW
        },

        //buttons
        MODE: {
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
            label: 'Sub wave',
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.OSC2_SUB_WAVE_SQR,
                BUTTONS.BUTTONS_LEFT.values.OSC2_SUB_WAVE_SAW,
            ],
        },
        WHEEL: {
            label: 'Mod wheel',
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.OSC2_WHEEL_OFF,
                BUTTONS.BUTTONS_LEFT.values.OSC2_WHEEL_ON,
            ],
        },
        LFO: {
            label: 'LFO mod',
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.OSC2_LFO_OFF,
                BUTTONS.BUTTONS_LEFT.values.OSC2_LFO_ON,
            ],
        },
        KBD: {
            label: 'Keyboard track',
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.OSC2_KBD_OFF,
                BUTTONS.BUTTONS_LEFT.values.OSC2_KBD_ON,
            ],
        },
    },
    VCO: {
        props: { label: 'Osc 3' },
        // pots
        PITCH: {
            label: 'Pitch',
            isTargetDigi: true,
            type: 'pot',
            addr: NRPN.VCO_PITCH
        },
        NOTE: {
            label: 'Note',
            isTargetDigi: true,
            type: 'pot',
            cc: CC.VCO_NOTE
        },
        DETUNE: {
            label: 'Detune',
            isTargetDigi: true,
            type: 'pot',
            cc: CC.VCO_DETUNE
        },
        WAVEFORM: {
            label: 'Waveform',
            isTargetDigi: true,
            type: 'pot', cc: CC.VCO_WAVEFORM
        },
        CROSS_MOD: {
            label: 'Cross mod',
            isTargetDigi: true,
            type: 'pot', cc: CC.VCO_CROSS_MOD
        },
        PW: {
            label: 'PW',
            isTargetDigi: true,
            type: 'pot',
            cc: CC.VCO_PW
        },

        //buttons
        SYNC: {
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
            label: 'Cross mod source',
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.OSC3_CROSS_MOD_SRC_OSC1,
                BUTTONS.BUTTONS_LEFT.values.OSC3_CROSS_MOD_SRC_EXT,
            ],
        },
        EXT_CV: {
            label: 'Ext. CV',
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.OSC3_EXT_CV_OFF,
                BUTTONS.BUTTONS_LEFT.values.OSC3_EXT_CV_ON,
            ],
        },
        WHEEL: {
            label: 'Mod wheel',
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.OSC3_WHEEL_OFF,
                BUTTONS.BUTTONS_LEFT.values.OSC3_WHEEL_ON,
            ],
        },
        LFO: {
            label: 'LFO mod',
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.OSC3_LFO_OFF,
                BUTTONS.BUTTONS_LEFT.values.OSC3_LFO_ON,
            ],
        },
        KBD: {
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

export default controllersOsc
