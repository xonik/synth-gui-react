// TODO: High value bits. Mod wheels, ribbon controller
import { buttonLeftMidiValues } from './midi/buttonLeftMidiValues'
import { buttonCenterMidiValues } from './midi/buttonCenterMidiValues'
import { buttonRightMidiValues } from './midi/buttonRightMidiValues'

export type MidiConfig = {
    type: ControllerType,
    cc: number,
    values?: number[],
}

type ControllerType = 'pot' | 'button'

export const CC = {
    BUTTONS_LEFT: 0,
    BUTTONS_CENTER: 1,
    BUTTONS_RIGHT: 2,
    DCO1_NOTE: 3,
    DCO1_SUPER_SAW: 4,
    DCO1_WAVEFORM: 5,
    DCO1_SUB1: 6,
    DCO1_SUB2: 7,
    DCO1_PW: 8,
    DCO2_NOTE: 9,
    DCO2_DETUNE: 10,
    DCO2_SUPER_SAW: 11,
    DCO2_WAVEFORM: 12,
    DCO2_SUB1: 13,
    DCO2_SUB2: 14,
    DCO2_PW: 15,
    VCO_NOTE: 16,
    VCO_DETUNE: 17,
    VCO_WAVEFORM: 18,
    VCO_CROSS_MOD: 19,
    VCO_PW: 20,
    DISTORTION_DRIVE: 21,
    DISTORTION_LEVEL: 22,
    BIT_CRUSHER_BITS: 23,
    BIT_CRUSHER_RATE: 24,
    BIT_CRUSHER_LEVEL: 25,
    LFO_RATE: 26,
    LFO_DEPTH: 27,
    LFO_DELAY: 28,
    LEVEL_OSC1: 29,
    LEVEL_OSC2: 30,
    LEVEL_OSC3: 31,
    LEVEL_NOISE: 32,
    LEVEL_RING_MOD: 33,
    LEVEL_EXT_AUDIO: 34,
    ROUTE_AMOUNT: 35,
    MASTER_CLOCK_RATE: 36,
    ARP_TEMPO: 37,
    MAIN_POT1: 38,
    MAIN_POT2: 39,
    MAIN_POT3: 40,
    MAIN_POT4: 41,
    MAIN_POT5: 42,
    MAIN_POT6: 43,
    KEYBOARD_PORTAMENTO: 44,
    KEYBOARD_UNISON_DETUNE: 45,
    LPF_INPUT: 46,
    LPF_DRIVE: 47,
    LPF_RESONANCE: 48,
    LPF_CUTOFF: 49,
    LPF_FM_AMT: 50,
    LPF_ENV_AMT: 51,
    LPF_LFO_AMT: 52,
    LPF_KBD_AMT: 53,
    SVF_INPUT: 54,
    SVF_DRIVE: 55,
    SVF_RESONANCE: 56,
    SVF_CUTOFF: 57,
    SVF_FM_AMT: 58,
    SVF_ENV_AMT: 59,
    SVF_LFO_AMT: 60,
    SVF_KBD_AMT: 61,
    POST_MIX_LPF: 62,
    POST_MIX_SVF: 63,
    POST_MIX_SINE1: 64,
    POST_MIX_SINE2: 65,
    VOICE_OUT_PAN: 66,
    VOICE_OUT_AMOUNT: 67,
    VOICE_OUT_FX1_SEND: 68,
    VOICE_OUT_FX2_SEND: 69,
    ENV1_ATTACK: 70,
    ENV1_DECAY1: 71,
    ENV1_DECAY2: 72,
    ENV1_SUSTAIN: 73,
    ENV1_RELEASE1: 74,
    ENV1_RELEASE2: 75,
    ENV1_DELAY: 76,
    ENV1_D1_LEVEL: 77,
    ENV1_R1_LEVEL: 78,
    ENV2_ATTACK: 79,
    ENV2_DECAY1: 80,
    ENV2_DECAY2: 81,
    ENV2_SUSTAIN: 82,
    ENV2_RELEASE1: 83,
    ENV2_RELEASE2: 84,
    ENV2_DELAY: 85,
    ENV2_D1_LEVEL: 86,
    ENV2_R1_LEVEL: 87,
    ENV3_ATTACK: 88,
    ENV3_DECAY1: 89,
    ENV3_DECAY2: 90,
    ENV3_SUSTAIN: 91,
    ENV3_RELEASE1: 92,
    ENV3_RELEASE2: 93,
    ENV3_DELAY: 94,
    ENV3_D1_LEVEL: 95,
    ENV3_R1_LEVEL: 96,
    DSP1_POT1: 97,
    DSP1_POT2: 98,
    DSP1_POT3: 99,
    DSP1_EFFECT: 100,
    DSP2_POT1: 101,
    DSP2_POT2: 102,
    DSP2_POT3: 103,
    DSP2_EFFECT: 104,
    CHORUS_RATE: 105,
    CHORUS_DEPTH: 106,
    FX_BIT_CRUSHER_BITS: 107,
    FX_BIT_CRUSHER_RATE: 108,
    FX_MIX_LEVEL_DSP1: 109,
    FX_MIX_LEVEL_DSP2: 110,
    FX_MIX_LEVEL_CHORUS: 111,
    FX_MIX_LEVEL_BIT_CRUSHER: 112,
    OUTPUT_VOLUME: 113,
    OUTPUT_SPREAD: 114,
    OUTPUT_HEADPHONES: 115,
}

// TODO: Lage enums av button values
const BUTTONS = {
    BUTTONS_LEFT: {
        cc: CC.BUTTONS_LEFT,
        values: buttonLeftMidiValues,
    },
    BUTTONS_CENTER: {
        cc: CC.BUTTONS_CENTER,
        values: buttonCenterMidiValues,
    },
    BUTTONS_RIGHT: {
        cc: CC.BUTTONS_RIGHT,
        values: buttonRightMidiValues,
    }
}

const midiControllers: {[key: string]: {[key: string]: MidiConfig}} = {
    DCO1: {
        // pots
        NOTE: { type: 'pot', cc: CC.DCO1_NOTE },
        SUPER_SAW: { type: 'pot', cc: CC.DCO1_SUPER_SAW },
        WAVEFORM: { type: 'pot', cc: CC.DCO1_WAVEFORM },
        SUB1: { type: 'pot', cc: CC.DCO1_SUB1 },
        SUB2: { type: 'pot', cc: CC.DCO1_SUB1 },
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
    },
    NOISE: {
        COLOUR: {
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.NOISE_COLOUR_WHITE,
                BUTTONS.BUTTONS_LEFT.values.NOISE_COLOUR_PINK,
                BUTTONS.BUTTONS_LEFT.values.NOISE_COLOUR_RED,
            ],
        }
    },
    RING_MOD: {
        SOURCE: {
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.RING_MOD_SOURCE_1_2,
                BUTTONS.BUTTONS_LEFT.values.RING_MOD_SOURCE_EXT_2,
            ],
        }
    },
    DISTORTION: {
        // Pots
        DRIVE: { type: 'pot', cc: CC.DISTORTION_DRIVE },
        LEVEL: { type: 'pot', cc: CC.DISTORTION_LEVEL },
        // Buttons
        IN: {
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.DISTORTION_IN_A,
                BUTTONS.BUTTONS_LEFT.values.DISTORTION_IN_B,
                BUTTONS.BUTTONS_LEFT.values.DISTORTION_IN_BOTH,
            ],
        },
        CLIP: {
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.DISTORTION_SOFT,
                BUTTONS.BUTTONS_LEFT.values.DISTORTION_HARD,
            ],
        },
        OUT: {
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.DISTORTION_OUT_A,
                BUTTONS.BUTTONS_LEFT.values.DISTORTION_OUT_B,
                BUTTONS.BUTTONS_LEFT.values.DISTORTION_OUT_BOTH,
            ],
        },
    },
    BIT_CRUSHER: {
        // Pots
        BITS: { type: 'pot', cc: CC.BIT_CRUSHER_BITS },
        RATE: { type: 'pot', cc: CC.BIT_CRUSHER_RATE },
        LEVEL: { type: 'pot', cc: CC.BIT_CRUSHER_LEVEL },
        // Buttons
        IN: {
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.BIT_CRUSHER_IN_A,
                BUTTONS.BUTTONS_LEFT.values.BIT_CRUSHER_IN_B,
                BUTTONS.BUTTONS_LEFT.values.BIT_CRUSHER_IN_BOTH,
            ],
        },
        OUT: {
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.BIT_CRUSHER_OUT_A,
                BUTTONS.BUTTONS_LEFT.values.BIT_CRUSHER_OUT_B,
                BUTTONS.BUTTONS_LEFT.values.BIT_CRUSHER_OUT_BOTH,
            ],
        },
    },
    LFOS: {
        // Pots
        RATE: { type: 'pot', cc: CC.LFO_RATE },
        DEPTH: { type: 'pot', cc: CC.LFO_DEPTH },
        DELAY: { type: 'pot', cc: CC.LFO_DELAY },
        // Buttons
        LFO: {
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.LFO1,
                BUTTONS.BUTTONS_LEFT.values.LFO2,
                BUTTONS.BUTTONS_LEFT.values.LFO3,
                BUTTONS.BUTTONS_LEFT.values.LFO4,
            ],
        },
        SHAPE: {
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.LFO_SHAPE_SAW,
                BUTTONS.BUTTONS_LEFT.values.LFO_SHAPE_TRI,
                BUTTONS.BUTTONS_LEFT.values.LFO_SHAPE_SQR,
                BUTTONS.BUTTONS_LEFT.values.LFO_SHAPE_SIN,
                BUTTONS.BUTTONS_LEFT.values.LFO_SHAPE_SH,
            ],
        },
        SYNC: {
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.LFO_SYNC_OFF,
                BUTTONS.BUTTONS_LEFT.values.LFO_SYNC_ON,
            ],
        },
        RESET: {
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.LFO_RESET_OFF,
                BUTTONS.BUTTONS_LEFT.values.LFO_RESET_ON,
            ],
        },
        ONCE: {
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.LFO_ONCE_OFF,
                BUTTONS.BUTTONS_LEFT.values.LFO_ONCE_ON,
            ],
        },
    },
    SOURCE_MIX: {
        LEVEL_OSC1: { type: 'pot', cc: CC.LEVEL_OSC1 },
        LEVEL_OSC2: { type: 'pot', cc: CC.LEVEL_OSC2 },
        LEVEL_OSC3: { type: 'pot', cc: CC.LEVEL_OSC3 },
        LEVEL_NOISE: { type: 'pot', cc: CC.LEVEL_NOISE },
        LEVEL_RING_MOD: { type: 'pot', cc: CC.LEVEL_RING_MOD },
        LEVEL_EXT_AUDIO: { type: 'pot', cc: CC.LEVEL_EXT_AUDIO },
        OUT_OSC1: {
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.OSC1_OUT_A,
                BUTTONS.BUTTONS_LEFT.values.OSC1_OUT_B,
                BUTTONS.BUTTONS_LEFT.values.OSC1_OUT_BOTH,
            ],
        },
        OUT_OSC2: {
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.OSC2_OUT_A,
                BUTTONS.BUTTONS_LEFT.values.OSC2_OUT_B,
                BUTTONS.BUTTONS_LEFT.values.OSC2_OUT_BOTH,
            ],
        },
        OUT_OSC3: {
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.OSC3_OUT_A,
                BUTTONS.BUTTONS_LEFT.values.OSC3_OUT_B,
                BUTTONS.BUTTONS_LEFT.values.OSC3_OUT_BOTH,
            ],
        },
        OUT_NOISE: {
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.NOISE_OUT_A,
                BUTTONS.BUTTONS_LEFT.values.NOISE_OUT_B,
                BUTTONS.BUTTONS_LEFT.values.NOISE_OUT_BOTH,
            ],
        },
        OUT_RING_MOD: {
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.RING_MOD_OUT_A,
                BUTTONS.BUTTONS_LEFT.values.RING_MOD_OUT_B,
                BUTTONS.BUTTONS_LEFT.values.RING_MOD_OUT_BOTH,
            ],
        },
        OUT_EXT_AUDIO: {
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.EXT_AUDIO_OUT_A,
                BUTTONS.BUTTONS_LEFT.values.EXT_AUDIO_OUT_B,
                BUTTONS.BUTTONS_LEFT.values.EXT_AUDIO_OUT_BOTH,
            ],
        },
    },
    ROUTE: {
        AMOUNT: { type: 'pot', cc: CC.ROUTE_AMOUNT },
        FROM: {
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.ROUTE_OFF,
                BUTTONS.BUTTONS_LEFT.values.ROUTE_FROM_ON,
                BUTTONS.BUTTONS_LEFT.values.ROUTE_TO_ON,
            ],
        },
        TO: {
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.ROUTE_OFF,
                BUTTONS.BUTTONS_LEFT.values.ROUTE_FROM_ON,
                BUTTONS.BUTTONS_LEFT.values.ROUTE_TO_ON,
            ],
        },
    },
    MASTER_CLOCK: {
        RATE: { type: 'pot', cc: CC.MASTER_CLOCK_RATE },
        SOURCE: {
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.MASTER_CLOCK_SRC_MASTER,
                BUTTONS.BUTTONS_LEFT.values.MASTER_CLOCK_SRC_MIDI,
                BUTTONS.BUTTONS_LEFT.values.MASTER_CLOCK_SRC_EXT,
            ],
        },
    },
    ARPEGGIATOR: {
        TEMPO: { type: 'pot', cc: CC.ARP_TEMPO },
        ON_OFF: {
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.ARP_OFF,
                BUTTONS.BUTTONS_LEFT.values.ARP_ON,
            ],
        },
        TRIGGER: {
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.ARP_TRIGGER_OFF,
                BUTTONS.BUTTONS_LEFT.values.ARP_TRIGGER_ON,
            ],
        },
        SYNC: {
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.ARP_SYNC_OFF,
                BUTTONS.BUTTONS_LEFT.values.ARP_SYNC_MASTER,
                BUTTONS.BUTTONS_LEFT.values.ARP_SYNC_LFO1,
                BUTTONS.BUTTONS_LEFT.values.ARP_SYNC_EXT,
            ],
        },
        RANGE: {
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.ARP_RANGE_1,
                BUTTONS.BUTTONS_LEFT.values.ARP_RANGE_2,
                BUTTONS.BUTTONS_LEFT.values.ARP_RANGE_3,
            ],
        },
        MODE: {
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.ARP_MODE_UP,
                BUTTONS.BUTTONS_LEFT.values.ARP_MODE_DOWN,
                BUTTONS.BUTTONS_LEFT.values.ARP_MODE_UP_DOWN,
                BUTTONS.BUTTONS_LEFT.values.ARP_MODE_RANDOM,
                BUTTONS.BUTTONS_LEFT.values.ARP_MODE_OTHER,
            ],
        },
    },
    VOICES: {
        VOICE1: {
            type: 'button',
            cc: BUTTONS.BUTTONS_CENTER.cc,
            values: [
                BUTTONS.BUTTONS_CENTER.values.VOICE1_OFF,
                BUTTONS.BUTTONS_CENTER.values.VOICE1_ON,
            ],
        },
        VOICE2: {
            type: 'button',
            cc: BUTTONS.BUTTONS_CENTER.cc,
            values: [
                BUTTONS.BUTTONS_CENTER.values.VOICE2_OFF,
                BUTTONS.BUTTONS_CENTER.values.VOICE2_ON,
            ],
        },
        VOICE3: {
            type: 'button',
            cc: BUTTONS.BUTTONS_CENTER.cc,
            values: [
                BUTTONS.BUTTONS_CENTER.values.VOICE3_OFF,
                BUTTONS.BUTTONS_CENTER.values.VOICE3_ON,
            ],
        },
        VOICE4: {
            type: 'button',
            cc: BUTTONS.BUTTONS_CENTER.cc,
            values: [
                BUTTONS.BUTTONS_CENTER.values.VOICE4_OFF,
                BUTTONS.BUTTONS_CENTER.values.VOICE4_ON,
            ],
        },
        VOICE5: {
            type: 'button',
            cc: BUTTONS.BUTTONS_CENTER.cc,
            values: [
                BUTTONS.BUTTONS_CENTER.values.VOICE5_OFF,
                BUTTONS.BUTTONS_CENTER.values.VOICE5_ON,
            ],
        },
        VOICE6: {
            type: 'button',
            cc: BUTTONS.BUTTONS_CENTER.cc,
            values: [
                BUTTONS.BUTTONS_CENTER.values.VOICE6_OFF,
                BUTTONS.BUTTONS_CENTER.values.VOICE6_ON,
            ],
        },
        VOICE7: {
            type: 'button',
            cc: BUTTONS.BUTTONS_CENTER.cc,
            values: [
                BUTTONS.BUTTONS_CENTER.values.VOICE7_OFF,
                BUTTONS.BUTTONS_CENTER.values.VOICE7_ON,
            ],
        },
        VOICE8: {
            type: 'button',
            cc: BUTTONS.BUTTONS_CENTER.cc,
            values: [
                BUTTONS.BUTTONS_CENTER.values.VOICE8_OFF,
                BUTTONS.BUTTONS_CENTER.values.VOICE8_ON,
            ],
        },
    },
    MAIN_PANEL: {
        POT1: { type: 'pot', cc: CC.MAIN_POT1 },
        POT2: { type: 'pot', cc: CC.MAIN_POT2 },
        POT3: { type: 'pot', cc: CC.MAIN_POT3 },
        POT4: { type: 'pot', cc: CC.MAIN_POT4 },
        POT5: { type: 'pot', cc: CC.MAIN_POT5 },
        POT6: { type: 'pot', cc: CC.MAIN_POT6 },

        MENU_LFO: {
            type: 'button',
            cc: BUTTONS.BUTTONS_CENTER.cc,
            values: [
                BUTTONS.BUTTONS_CENTER.values.MENU_LFO,
            ],
        },
        MENU_OSC: {
            type: 'button',
            cc: BUTTONS.BUTTONS_CENTER.cc,
            values: [
                BUTTONS.BUTTONS_CENTER.values.MENU_OSC,
            ],
        },
        MENU_FILTER: {
            type: 'button',
            cc: BUTTONS.BUTTONS_CENTER.cc,
            values: [
                BUTTONS.BUTTONS_CENTER.values.MENU_FILTER,
            ],
        },
        MENU_ENVELOPE: {
            type: 'button',
            cc: BUTTONS.BUTTONS_CENTER.cc,
            values: [
                BUTTONS.BUTTONS_CENTER.values.MENU_ENV,
            ],
        },
        MENU_MOD: {
            type: 'button',
            cc: BUTTONS.BUTTONS_CENTER.cc,
            values: [
                BUTTONS.BUTTONS_CENTER.values.MENU_MOD,
            ],
        },
        MENU_FX: {
            type: 'button',
            cc: BUTTONS.BUTTONS_CENTER.cc,
            values: [
                BUTTONS.BUTTONS_CENTER.values.MENU_LFO,
            ],
        },
        //TODO: ARP-meny?

        FUNC_HOME: {
            type: 'button',
            cc: BUTTONS.BUTTONS_CENTER.cc,
            values: [
                BUTTONS.BUTTONS_CENTER.values.FUNC_HOME,
            ],
        },
        FUNC_SETTINGS: {
            type: 'button',
            cc: BUTTONS.BUTTONS_CENTER.cc,
            values: [
                BUTTONS.BUTTONS_CENTER.values.FUNC_SETTINGS,
            ],
        },
        FUNC_SHIFT: {
            type: 'button',
            cc: BUTTONS.BUTTONS_CENTER.cc,
            values: [
                BUTTONS.BUTTONS_CENTER.values.FUNC_SHIFT_OFF,
                BUTTONS.BUTTONS_CENTER.values.FUNC_SHIFT_ON,
            ],
        },
        FUNC_PERFORM: {
            type: 'button',
            cc: BUTTONS.BUTTONS_CENTER.cc,
            values: [
                BUTTONS.BUTTONS_CENTER.values.FUNC_PERFORM,
            ],
        },
        FUNC_LOAD: {
            type: 'button',
            cc: BUTTONS.BUTTONS_CENTER.cc,
            values: [
                BUTTONS.BUTTONS_CENTER.values.FUNC_LOAD,
            ],
        },
        FUNC_SAVE: {
            type: 'button',
            cc: BUTTONS.BUTTONS_CENTER.cc,
            values: [
                BUTTONS.BUTTONS_CENTER.values.FUNC_SAVE,
            ],
        },
        FUNC_COMPARE: {
            type: 'button',
            cc: BUTTONS.BUTTONS_CENTER.cc,
            values: [
                BUTTONS.BUTTONS_CENTER.values.FUNC_COMPARE,
            ],
        },
        FUNC_ROUTE: {
            type: 'button',
            cc: BUTTONS.BUTTONS_CENTER.cc,
            values: [
                BUTTONS.BUTTONS_CENTER.values.FUNC_ROUTE,
            ],
        },
    },
    TRANSPOSE: {
        TRANSPOSE: {
            type: 'button',
            cc: BUTTONS.BUTTONS_CENTER.cc,
            values: [
                BUTTONS.BUTTONS_CENTER.values.TRANSPOSE_NEG_2,
                BUTTONS.BUTTONS_CENTER.values.TRANSPOSE_NEG_1,
                BUTTONS.BUTTONS_CENTER.values.TRANSPOSE_0,
                BUTTONS.BUTTONS_CENTER.values.TRANSPOSE_POS_1,
                BUTTONS.BUTTONS_CENTER.values.TRANSPOSE_POS_2,
            ],
        },
    },
    KEYBOARD: {
        PORTAMENTO: { type: 'pot', cc: CC.KEYBOARD_PORTAMENTO },
        UNISON_DETUNE: { type: 'pot', cc: CC.KEYBOARD_UNISON_DETUNE },
        HOLD: {
            type: 'button',
            cc: BUTTONS.BUTTONS_CENTER.cc,
            values: [
                BUTTONS.BUTTONS_CENTER.values.KEYBOARD_HOLD_OFF,
                BUTTONS.BUTTONS_CENTER.values.KEYBOARD_HOLD_ON,
            ],
        },
        CHORD: {
            type: 'button',
            cc: BUTTONS.BUTTONS_CENTER.cc,
            values: [
                BUTTONS.BUTTONS_CENTER.values.KEYBOARD_CHORD_OFF,
                BUTTONS.BUTTONS_CENTER.values.KEYBOARD_CHORD_ON,
            ],
        },
        MODE: {
            type: 'button',
            cc: BUTTONS.BUTTONS_CENTER.cc,
            values: [
                BUTTONS.BUTTONS_CENTER.values.KEYBOARD_MODE_SOLO,
                BUTTONS.BUTTONS_CENTER.values.KEYBOARD_MODE_UNISON,
                BUTTONS.BUTTONS_CENTER.values.KEYBOARD_MODE_POLY,
            ],
        },
    },
    LPF: {
        INPUT: { type: 'pot', cc: CC.LPF_INPUT },
        DRIVE: { type: 'pot', cc: CC.LPF_DRIVE },
        RESONANCE: { type: 'pot', cc: CC.LPF_RESONANCE },
        CUTOFF: { type: 'pot', cc: CC.LPF_CUTOFF },
        FM_AMT: { type: 'pot', cc: CC.LPF_FM_AMT },
        ENV_AMT: { type: 'pot', cc: CC.LPF_ENV_AMT },
        LFO_AMT: { type: 'pot', cc: CC.LPF_LFO_AMT },
        KBD_AMT: { type: 'pot', cc: CC.LPF_KBD_AMT },

        EXT_CV: {
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.LPF_EXT_CV_OFF,
                BUTTONS.BUTTONS_RIGHT.values.LPF_EXT_CV_ON,
            ],
        },
        WHEEL: {
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.LPF_WHEEL_OFF,
                BUTTONS.BUTTONS_RIGHT.values.LPF_WHEEL_ON,
            ],
        },
        SLOPE: {
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.LPF_SLOPE_12DB,
                BUTTONS.BUTTONS_RIGHT.values.LPF_SLOPE_24DB,
            ],
        },
    },
    FILTERS: {
        LINK_CUTOFF: {
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.FILTER_LINK_CUTOFF_OFF,
                BUTTONS.BUTTONS_RIGHT.values.FILTER_LINK_CUTOFF_ON,
            ],
        },
        ROUTING: {
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.FILTER_ROUTING_SERIES,
                BUTTONS.BUTTONS_RIGHT.values.FILTER_ROUTING_PARALLEL,
            ],
        },
    },
    SVF: {
        INPUT: { type: 'pot', cc: CC.SVF_INPUT },
        DRIVE: { type: 'pot', cc: CC.SVF_DRIVE },
        RESONANCE: { type: 'pot', cc: CC.SVF_RESONANCE },
        CUTOFF: { type: 'pot', cc: CC.SVF_CUTOFF },
        FM_AMT: { type: 'pot', cc: CC.SVF_FM_AMT },
        ENV_AMT: { type: 'pot', cc: CC.SVF_ENV_AMT },
        LFO_AMT: { type: 'pot', cc: CC.SVF_LFO_AMT },
        KBD_AMT: { type: 'pot', cc: CC.SVF_KBD_AMT },

        EXT_CV: {
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.SVF_EXT_CV_OFF,
                BUTTONS.BUTTONS_RIGHT.values.SVF_EXT_CV_ON,
            ],
        },
        WHEEL: {
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.SVF_WHEEL_OFF,
                BUTTONS.BUTTONS_RIGHT.values.SVF_WHEEL_ON,
            ],
        },
        SLOPE: {
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.SVF_SLOPE_12DB_LP,
                BUTTONS.BUTTONS_RIGHT.values.SVF_SLOPE_24DB_LP,
                BUTTONS.BUTTONS_RIGHT.values.SVF_SLOPE_12DB_BP,
                BUTTONS.BUTTONS_RIGHT.values.SVF_SLOPE_24DB_BP,
                BUTTONS.BUTTONS_RIGHT.values.SVF_SLOPE_LP_BP,
                BUTTONS.BUTTONS_RIGHT.values.SVF_SLOPE_12DB_HP,
                BUTTONS.BUTTONS_RIGHT.values.SVF_SLOPE_24DB_HP,
                BUTTONS.BUTTONS_RIGHT.values.SVF_SLOPE_HP_BP,
                BUTTONS.BUTTONS_RIGHT.values.SVF_SLOPE_NOTCH,
                BUTTONS.BUTTONS_RIGHT.values.SVF_SLOPE_NOTCH_LP,
            ],
        },
    },
    POST_MIX: {
        LPF: { type: 'pot', cc: CC.POST_MIX_LPF },
        SVF: { type: 'pot', cc: CC.POST_MIX_SVF },
        SINE1: { type: 'pot', cc: CC.POST_MIX_SINE1 },
        SINE2: { type: 'pot', cc: CC.POST_MIX_SINE2 },
    },
    VOICE_OUT: {
        PAN: { type: 'pot', cc: CC.VOICE_OUT_PAN },
        AMOUNT: { type: 'pot', cc: CC.VOICE_OUT_AMOUNT },
        FX1_SEND: { type: 'pot', cc: CC.VOICE_OUT_FX1_SEND },
        FX2_SEND: { type: 'pot', cc: CC.VOICE_OUT_FX2_SEND },
    },
    ENV1: {
        ATTACK: { type: 'pot', cc: CC.ENV1_ATTACK },
        DECAY1: { type: 'pot', cc: CC.ENV1_DECAY1 },
        DECAY2: { type: 'pot', cc: CC.ENV1_DECAY2 },
        SUSTAIN: { type: 'pot', cc: CC.ENV1_SUSTAIN },
        RELEASE1: { type: 'pot', cc: CC.ENV1_RELEASE1 },
        RELEASE2: { type: 'pot', cc: CC.ENV1_RELEASE2 },
        DELAY: { type: 'pot', cc: CC.ENV1_DELAY },
        D1_LEVEL: { type: 'pot', cc: CC.ENV1_D1_LEVEL },
        R1_LEVEL: { type: 'pot', cc: CC.ENV1_R1_LEVEL },

        TRIGGER: {
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.ENV1_TRIGGER,
            ],
        },
        LOOP: {
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.ENV1_LOOP_OFF,
                BUTTONS.BUTTONS_RIGHT.values.ENV1_LOOP_ON,
            ],
        },
        INVERT: {
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.ENV1_INVERT_OFF,
                BUTTONS.BUTTONS_RIGHT.values.ENV1_INVERT_ON,
            ],
        },
    },
    ENV2: {
        ATTACK: { type: 'pot', cc: CC.ENV2_ATTACK },
        DECAY1: { type: 'pot', cc: CC.ENV2_DECAY1 },
        DECAY2: { type: 'pot', cc: CC.ENV2_DECAY2 },
        SUSTAIN: { type: 'pot', cc: CC.ENV2_SUSTAIN },
        RELEASE1: { type: 'pot', cc: CC.ENV2_RELEASE1 },
        RELEASE2: { type: 'pot', cc: CC.ENV2_RELEASE2 },
        DELAY: { type: 'pot', cc: CC.ENV2_DELAY },
        D1_LEVEL: { type: 'pot', cc: CC.ENV2_D1_LEVEL },
        R1_LEVEL: { type: 'pot', cc: CC.ENV2_R1_LEVEL },
        TRIGGER: {
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.ENV2_TRIGGER,
            ],
        },
        LOOP: {
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.ENV2_LOOP_OFF,
                BUTTONS.BUTTONS_RIGHT.values.ENV2_LOOP_ON,
            ],
        },
        INVERT: {
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.ENV2_INVERT_OFF,
                BUTTONS.BUTTONS_RIGHT.values.ENV2_INVERT_ON,
            ],
        },
    },
    ENV3: {
        ATTACK: { type: 'pot', cc: CC.ENV3_ATTACK },
        DECAY1: { type: 'pot', cc: CC.ENV3_DECAY1 },
        DECAY2: { type: 'pot', cc: CC.ENV3_DECAY2 },
        SUSTAIN: { type: 'pot', cc: CC.ENV3_SUSTAIN },
        RELEASE1: { type: 'pot', cc: CC.ENV3_RELEASE1 },
        RELEASE2: { type: 'pot', cc: CC.ENV3_RELEASE2 },
        DELAY: { type: 'pot', cc: CC.ENV3_DELAY },
        D1_LEVEL: { type: 'pot', cc: CC.ENV3_D1_LEVEL },
        R1_LEVEL: { type: 'pot', cc: CC.ENV3_R1_LEVEL },
        ENV_SELECT: {
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.ENV3_SELECT,
            ],
        },
        TRIGGER: {
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.ENV3_TRIGGER,
            ],
        },
        LOOP: {
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.ENV3_LOOP_OFF,
                BUTTONS.BUTTONS_RIGHT.values.ENV3_LOOP_ON,
            ],
        },
        INVERT: {
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.ENV3_INVERT_OFF,
                BUTTONS.BUTTONS_RIGHT.values.ENV3_INVERT_ON,
            ],
        },
    },
    DSP1: {
        POT1: { type: 'pot', cc: CC.DSP1_POT1 },
        POT2: { type: 'pot', cc: CC.DSP1_POT2 },
        POT3: { type: 'pot', cc: CC.DSP1_POT3 },
        EFFECT: { type: 'pot', cc: CC.DSP1_EFFECT },

        SOURCE: {
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.DSP1_SRC1,
                BUTTONS.BUTTONS_RIGHT.values.DSP1_SRC2,
            ],
        },
    },
    DSP2: {
        POT1: { type: 'pot', cc: CC.DSP2_POT1 },
        POT2: { type: 'pot', cc: CC.DSP2_POT2 },
        POT3: { type: 'pot', cc: CC.DSP2_POT3 },
        EFFECT: { type: 'pot', cc: CC.DSP2_EFFECT },

        SOURCE: {
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
        RATE: { type: 'pot', cc: CC.CHORUS_RATE },
        DEPTH: { type: 'pot', cc: CC.CHORUS_DEPTH },

        SOURCE: {
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.CHORUS_SRC1,
                BUTTONS.BUTTONS_RIGHT.values.CHORUS_SRC2,
            ],
        },
        MODE: {
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.CHORUS_MODE_CHORUS,
                BUTTONS.BUTTONS_RIGHT.values.CHORUS_MODE_VIBRATO,
            ],
        },
    },
    FX_BIT_CRUSHER: {
        BITS: { type: 'pot', cc: CC.FX_BIT_CRUSHER_BITS },
        RATE: { type: 'pot', cc: CC.FX_BIT_CRUSHER_RATE },
        SOURCE: {
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.FX_BIT_CRUSHER_SRC1,
                BUTTONS.BUTTONS_RIGHT.values.FX_BIT_CRUSHER_SRC2,
            ],
        },
    },
    FX_MIX: {
        LEVEL_DSP1: { type: 'pot', cc: CC.FX_MIX_LEVEL_DSP1 },
        LEVEL_DSP2: { type: 'pot', cc: CC.FX_MIX_LEVEL_DSP2 },
        LEVEL_CHORUS: { type: 'pot', cc: CC.FX_MIX_LEVEL_CHORUS },
        LEVEL_BIT_CRUSHER: { type: 'pot', cc: CC.FX_MIX_LEVEL_BIT_CRUSHER },
    },
    OUTPUT: {
        VOLUME: { type: 'pot', cc: CC.OUTPUT_VOLUME },
        SPREAD: { type: 'pot', cc: CC.OUTPUT_SPREAD },
        HEADPHONES: { type: 'pot', cc: CC.OUTPUT_HEADPHONES },
    }
}

const generateCppFiles = () => {
    const buttonEnum: string[] = []
    const buttonCC: number[] = []
    const buttonOffset: number[] = []
    const buttonValuesCount: number[] = []

    const potEnum: string[] = []
    const potCC: number[] = []

    Object.entries(midiControllers)
        .forEach(([controllerGroupKey, controllersList]) => {
            Object.entries(controllersList).forEach(([controllerKey, controller]) => {
                if(controller.type === 'button'){
                    buttonEnum.push(`${controllerGroupKey}_${controllerKey}`)
                    buttonCC.push(controller.cc)
                    buttonOffset.push(controller.values ? controller.values[0] : 0)
                    buttonValuesCount.push(controller.values?.length || 0)
                } else if(controller.type === 'pot'){
                    potEnum.push(`${controllerGroupKey}_${controllerKey}`)
                    potCC.push(controller.cc)
                } else {
                    console.log('missing controller type', { controllerGroupKey, controllerKey, controller })
                }
            })
        })

    console.log(buttonEnum)
    console.log(buttonCC)
    console.log(buttonOffset)
    console.log(buttonValuesCount)
    console.log(potEnum)
    console.log(potCC)
}

generateCppFiles()

export default midiControllers