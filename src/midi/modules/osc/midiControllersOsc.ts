import CC from '../../ccMap'
import { BUTTONS } from '../../buttons'
import { MidiConfig, MidiConfigWithValue } from '../../types'

interface MidiControllersOsc {
    DCO1: {
        NOTE: MidiConfig
        SUPER_SAW: MidiConfig,
        WAVEFORM: MidiConfig,
        SUB1: MidiConfig,
        SUB2: MidiConfig,
        PW: MidiConfig,
        SYNC: MidiConfigWithValue
        MODE: MidiConfigWithValue
        SUB_WAVE: MidiConfigWithValue
        WHEEL: MidiConfigWithValue
        LFO: MidiConfigWithValue
        KBD: MidiConfigWithValue
    },
    DCO2: {
        NOTE: MidiConfig
        DETUNE: MidiConfig
        SUPER_SAW: MidiConfig
        WAVEFORM: MidiConfig
        SUB1: MidiConfig
        SUB2: MidiConfig
        PW: MidiConfig
        MODE: MidiConfigWithValue
        SUB_WAVE: MidiConfigWithValue
        WHEEL: MidiConfigWithValue
        LFO: MidiConfigWithValue
        KBD: MidiConfigWithValue
    },
    VCO: {
        NOTE: MidiConfig
        DETUNE: MidiConfig
        WAVEFORM: MidiConfig
        CROSS_MOD: MidiConfig
        PW: MidiConfig
        SYNC: MidiConfigWithValue
        CROSS_MOD_SRC: MidiConfigWithValue
        EXT_CV: MidiConfigWithValue
        WHEEL: MidiConfigWithValue
        LFO: MidiConfigWithValue
        KBD: MidiConfigWithValue
    }
}

const midiControllersOsc: MidiControllersOsc = {
    DCO1: {
        // pots
        NOTE: { type: 'pot', cc: CC.DCO1_NOTE },
        SUPER_SAW: { type: 'pot', cc: CC.DCO1_SUPER_SAW },
        WAVEFORM: { type: 'pot', cc: CC.DCO1_WAVEFORM },
        SUB1: { type: 'pot', cc: CC.DCO1_SUB1 },
        SUB2: { type: 'pot', cc: CC.DCO1_SUB2 },
        PW: { type: 'pot', cc: CC.DCO1_PW },

        //buttons
        SYNC: {
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.OSC1_SYNC_OFF,
                BUTTONS.BUTTONS_LEFT.values.OSC1_SYNC_1_2,
                BUTTONS.BUTTONS_LEFT.values.OSC1_SYNC_2_1,
            ],
        },
        MODE: {
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.OSC1_MODE_DCO,
                BUTTONS.BUTTONS_LEFT.values.OSC1_MODE_WT,
                BUTTONS.BUTTONS_LEFT.values.OSC1_MODE_PCM,
            ],
        },
        SUB_WAVE: {
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.OSC1_SUB_WAVE_SQR,
                BUTTONS.BUTTONS_LEFT.values.OSC1_SUB_WAVE_SAW,
            ],
        },
        WHEEL: {
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.OSC1_WHEEL_OFF,
                BUTTONS.BUTTONS_LEFT.values.OSC1_WHEEL_ON,
            ],
        },
        LFO: {
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.OSC1_LFO_OFF,
                BUTTONS.BUTTONS_LEFT.values.OSC1_LFO_ON,
            ],
        },
        KBD: {
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.OSC1_KBD_OFF,
                BUTTONS.BUTTONS_LEFT.values.OSC1_KBD_ON,
            ],
        },
    },
    DCO2: {
        // pots
        NOTE: { type: 'pot', cc: CC.DCO2_NOTE },
        DETUNE: { type: 'pot', cc: CC.DCO2_DETUNE },
        SUPER_SAW: { type: 'pot', cc: CC.DCO2_SUPER_SAW },
        WAVEFORM: { type: 'pot', cc: CC.DCO2_WAVEFORM },
        SUB1: { type: 'pot', cc: CC.DCO2_SUB1 },
        SUB2: { type: 'pot', cc: CC.DCO2_SUB2 },
        PW: { type: 'pot', cc: CC.DCO2_PW },

        //buttons
        MODE: {
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.OSC2_MODE_DCO,
                BUTTONS.BUTTONS_LEFT.values.OSC2_MODE_WT,
                BUTTONS.BUTTONS_LEFT.values.OSC2_MODE_PCM,
            ],
        },
        SUB_WAVE: {
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.OSC2_SUB_WAVE_SQR,
                BUTTONS.BUTTONS_LEFT.values.OSC2_SUB_WAVE_SAW,
            ],
        },
        WHEEL: {
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.OSC2_WHEEL_OFF,
                BUTTONS.BUTTONS_LEFT.values.OSC2_WHEEL_ON,
            ],
        },
        LFO: {
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.OSC2_LFO_OFF,
                BUTTONS.BUTTONS_LEFT.values.OSC2_LFO_ON,
            ],
        },
        KBD: {
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.OSC2_KBD_OFF,
                BUTTONS.BUTTONS_LEFT.values.OSC2_KBD_ON,
            ],
        },
    },
    VCO: {
        // pots
        NOTE: { type: 'pot', cc: CC.VCO_NOTE },
        DETUNE: { type: 'pot', cc: CC.VCO_DETUNE },
        WAVEFORM: { type: 'pot', cc: CC.VCO_WAVEFORM },
        CROSS_MOD: { type: 'pot', cc: CC.VCO_CROSS_MOD },
        PW: { type: 'pot', cc: CC.VCO_PW },

        //buttons
        SYNC: {
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
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.OSC3_CROSS_MOD_SRC_OSC1,
                BUTTONS.BUTTONS_LEFT.values.OSC3_CROSS_MOD_SRC_EXT,
            ],
        },
        EXT_CV: {
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.OSC3_EXT_CV_OFF,
                BUTTONS.BUTTONS_LEFT.values.OSC3_EXT_CV_ON,
            ],
        },
        WHEEL: {
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.OSC3_WHEEL_OFF,
                BUTTONS.BUTTONS_LEFT.values.OSC3_WHEEL_ON,
            ],
        },
        LFO: {
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.OSC3_LFO_OFF,
                BUTTONS.BUTTONS_LEFT.values.OSC3_LFO_ON,
            ],
        },
        KBD: {
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.OSC3_KBD_OFF,
                BUTTONS.BUTTONS_LEFT.values.OSC3_KBD_ON,
            ],
        },
    }
}

export default midiControllersOsc
