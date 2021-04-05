// TODO: Combine buttons

const BUTTONS = {
    BUTTONS_LEFT: {
        cc: 0,
        values: {
            OSC1_SYNC_OFF: 0,
            OSC1_SYNC_1_2: 1,
            OSC1_SYNC_2_1: 2,
            OSC1_MODE_DCO: 3,
            OSC1_MODE_WT: 4,
            OSC1_MODE_PCM: 5,
            OSC1_SUB_WAVE_SQR: 6,
            OSC1_SUB_WAVE_SAW: 7,
            OSC1_WHEEL_OFF: 8,
            OSC1_WHEEL_ON: 9,
            OSC1_LFO_OFF: 10,
            OSC1_LFO_ON: 11,
            OSC1_KBD_OFF: 12,
            OSC1_KBD_ON: 13,
            OSC2_SYNC_OFF: 14,
            OSC2_SYNC_1_2: 15,
            OSC2_SYNC_2_1: 16,
            OSC2_MODE_DCO: 17,
            OSC2_MODE_WT: 18,
            OSC2_MODE_PCM: 19,
            OSC2_SUB_WAVE_SQR: 20,
            OSC2_SUB_WAVE_SAW: 21,
            OSC2_WHEEL_OFF: 22,
            OSC2_WHEEL_ON: 23,
            OSC2_LFO_OFF: 24,
            OSC2_LFO_ON: 25,
            OSC2_KBD_OFF: 26,
            OSC2_KBD_ON: 27,
            OSC3_SYNC_OFF: 28,
            OSC3_SYNC_HARD: 29,
            OSC3_SYNC_CEM_HARD: 30,
            OSC3_SYNC_CEM_SOFT: 31,
            OSC3_CROSS_MOD_SRC_OSC1: 32,
            OSC3_CROSS_MOD_SRC_EXT: 33,
            OSC3_EXT_CV_OFF: 34,
            OSC3_EXT_CV_ON: 35,
            OSC3_WHEEL_OFF: 36,
            OSC3_WHEEL_ON: 37,
            OSC3_LFO_OFF: 38,
            OSC3_LFO_ON: 39,
            OSC3_KBD_OFF: 40,
            OSC3_KBD_ON: 41,
            NOISE_COLOUR_WHITE: 42,
            NOISE_COLOUR_PINK: 43,
            NOISE_COLOUR_RED: 44,
            RING_MOD_SOURCE_1_2: 45,
            RING_MOD_SOURCE_EXT_2: 46,
            // room for two more
            DISTORTION_IN_A: 49,
            DISTORTION_IN_B: 50,
            DISTORTION_SOFT: 51,
            DISTORTION_HARD: 52,
            DISTORTION_OUT_A: 53,
            DISTORTION_OUT_B: 54,
            BIT_CRUSHER_IN_A: 55,
            BIT_CRUSHER_IN_B: 56,
            BIT_CRUSHER_OUT_A: 57,
            BIT_CRUSHER_OUT_B: 58,
            LFO1: 59,
            LFO2: 60,
            LFO3: 61,
            LFO4: 62,
            LFO_SHAPE_SAW: 63,
            LFO_SHAPE_TRI: 64,
            LFO_SHAPE_SQR: 65,
            LFO_SHAPE_SIN: 66,
            LFO_SHAPE_SH: 67,
            LFO_SYNC_OFF: 68,
            LFO_SYNC_ON: 69,
            LFO_RESET_OFF: 70,
            LFO_RESET_ON: 71,
            LFO_ONCE_OFF: 72,
            LFO_ONCE_ON: 73,
            OSC1_OUT_A: 74,
            OSC1_OUT_B: 75,
            OSC2_OUT_A: 76,
            OSC2_OUT_B: 77,
            OSC3_OUT_A: 78,
            OSC3_OUT_B: 79,
            NOISE_OUT_A: 80,
            NOISE_OUT_B: 81,
            RING_MOD_OUT_A: 82,
            RING_MOD_OUT_B: 83,
            EXT_AUDIO_OUT_A: 84,
            EXT_AUDIO_OUT_B: 85,
            ROUTE_FROM_ON: 86,
            ROUTE_FROM_OFF: 87,
            ROUTE_TO_ON: 88, //NB!
            ROUTE_TO_OFF: 89,
            MASTER_CLOCK_SRC_MASTER: 90,
            MASTER_CLOCK_SRC_MIDI: 91,
            MASTER_CLOCK_SRC_EXT: 92,
            ARP_OFF: 93,
            ARP_ON: 94,
            ARP_TRIGGER_OFF: 95,
            ARP_TRIGGER_ON: 96,
            ARP_SYNC_OFF: 97,
            ARP_SYNC_MASTER: 98,
            ARP_SYNC_LFO1: 99,
            ARP_SYNC_EXT: 100,
            ARP_RANGE_1: 101,
            ARP_RANGE_2: 102,
            ARP_RANGE_3: 103,
            ARP_MODE_UP: 104,
            ARP_MODE_DOWN: 105,
            ARP_MODE_UP_DOWN: 106,
            ARP_MODE_RANDOM: 107,
            ARP_MODE_OTHER: 108,
        },
    },
    BUTTONS_CENTER: {
        cc: 0,
        values: {
            VOICE1_ON: 0,
            VOICE1_OFF: 1,
            VOICE2_ON: 2,
            VOICE2_OFF: 3,
            VOICE3_ON: 4,
            VOICE3_OFF: 5,
            VOICE4_ON: 6,
            VOICE4_OFF: 7,
            VOICE5_ON: 8,
            VOICE5_OFF: 9,
            VOICE6_ON: 10,
            VOICE6_OFF: 11,
            VOICE7_ON: 12,
            VOICE7_OFF: 13,
            VOICE8_ON: 14,
            VOICE8_OFF: 15,
            MENU_LFO: 16,
            MENU_OSC: 17,
            MENU_FILTER: 18,
            MENU_ENV: 19,
            MENU_MOD: 20,
            MENU_FX: 21,
            FUNC_HOME: 22,
            FUNC_SETTINGS: 23,
            FUNC_SHIFT_ON: 24,
            FUNC_SHIFT_OFF: 25,
            FUNC_PERFORM: 26,
            FUNC_LOAD: 27,
            FUNC_SAVE: 28,
            FUNC_COMPARE: 29,
            FUNC_ROUTE: 30,
            TRANSPOSE_NEG_2: 31,
            TRANSPOSE_NEG_1: 32,
            TRANSPOSE_0: 33,
            TRANSPOSE_POS_1: 34,
            TRANSPOSE_POS_2: 35,
            KEYBOARD_HOLD_ON: 36,
            KEYBOARD_HOLD_OFF: 37,
            KEYBOARD_CHORD_ON: 38,
            KEYBOARD_CHORD_OFF: 39,
            KEYBOARD_MODE_SOLO: 40,
            KEYBOARD_MODE_UNISON: 41,
            KEYBOARD_MODE_POLY: 42,
        }
    },
    BUTTONS_RIGHT: {
        cc: 0,
        values: {
            LPF_EXT_CV_ON: 0,
            LPF_EXT_CV_OFF: 1,
            LPF_WHEEL_ON: 2,
            LPF_WHEEL_OFF: 3,
            LPF_SLOPE_12DB: 4,
            LPF_SLOPE_24DB: 5,
            FILTER_LINK_CUTOFF_ON: 6,
            FILTER_LINK_CUTOFF_OFF: 7,
            FILTER_ROUTING_SERIES: 8,
            FILTER_ROUTING_PARALLEL: 9,
            SVF_EXT_CV_ON: 10,
            SVF_EXT_CV_OFF: 11,
            SVF_WHEEL_ON: 12,
            SVF_WHEEL_OFF: 13,
            SVF_SLOPE_12DB_LP: 14,
            SVF_SLOPE_24DB_LP: 15,
            SVF_SLOPE_12DB_BP: 16,
            SVF_SLOPE_24DB_BP: 17,
            SVF_SLOPE_LP_BP: 18,
            SVF_SLOPE_12DB_HP: 19,
            SVF_SLOPE_24DB_HP: 20,
            SVF_SLOPE_HP_BP: 21,
            SVF_SLOPE_NOTCH: 22,
            SVF_SLOPE_NOTCH_LP: 23,
            ENV1_TRIGGER: 24,
            ENV1_LOOP_OFF: 25,
            ENV1_LOOP_ON: 26,
            ENV1_INVERT_OFF: 27,
            ENV1_INVERT_ON: 28,
            ENV2_TRIGGER: 29,
            ENV2_LOOP_OFF: 30,
            ENV2_LOOP_ON: 31,
            ENV2_INVERT_OFF: 32,
            ENV2_INVERT_ON: 33,
            ENV3_SELECT: 34,
            ENV3_TRIGGER: 35,
            ENV3_LOOP_OFF: 36,
            ENV3_LOOP_ON: 37,
            ENV3_INVERT_OFF: 38,
            ENV3_INVERT_ON: 39,
            DSP1_SRC1: 40,
            DSP1_SRC2: 41,
            DSP_CHAIN_ON: 42,
            DSP_CHAIN_OFF: 43,
            DSP2_SRC1: 44,
            DSP2_SRC2: 45,
            CHORUS_SRC1: 46,
            CHORUS_SRC2: 47,
            CHORUS_MODE_CHORUS: 48,
            CHORUS_MODE_VIBRATO: 49,
            FX_BIT_CRUSHER_SRC1: 50,
            FX_BIT_CRUSHER_SRC2: 51,
        }
    }
};

const DCO1 = {
    // pots
    NOTE: {
        cc: 0,
    },
    SUPER_SAW: {cc: 0,},
    WAVEFORM: {cc: 0,},
    SUB1: {cc: 0,},
    SUB2: {cc: 0,},
    PW: {cc: 0,},

    //buttons
    SYNC: {
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.OSC1_SYNC_OFF,
            BUTTONS.BUTTONS_LEFT.values.OSC1_SYNC_1_2,
            BUTTONS.BUTTONS_LEFT.values.OSC1_SYNC_2_1,
        ],
    },
    MODE: {
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.OSC1_MODE_DCO,
            BUTTONS.BUTTONS_LEFT.values.OSC1_MODE_WT,
            BUTTONS.BUTTONS_LEFT.values.OSC1_MODE_PCM,
        ],
    },
    SUB_WAVE: {
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.OSC1_SUB_WAVE_SQR,
            BUTTONS.BUTTONS_LEFT.values.OSC1_SUB_WAVE_SAW,
        ],
    },
    WHEEL: {
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.OSC1_WHEEL_OFF,
            BUTTONS.BUTTONS_LEFT.values.OSC1_WHEEL_ON,
        ],
    },
    LFO: {
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.OSC1_LFO_OFF,
            BUTTONS.BUTTONS_LEFT.values.OSC1_LFO_ON,
        ],
    },
    KBD: {
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.OSC1_KBD_OFF,
            BUTTONS.BUTTONS_LEFT.values.OSC1_KBD_ON,
        ],
    },
}
const DCO2 = {
    // pots
    NOTE: {},
    DETUNE: {},
    SUPER_SAW: {},
    WAVEFORM: {},
    SUB1: {},
    SUB2: {},
    PW: {},

    //buttons
    SYNC: {
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.OSC2_SYNC_OFF,
            BUTTONS.BUTTONS_LEFT.values.OSC2_SYNC_1_2,
            BUTTONS.BUTTONS_LEFT.values.OSC2_SYNC_2_1,
        ],
    },
    MODE: {
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.OSC2_MODE_DCO,
            BUTTONS.BUTTONS_LEFT.values.OSC2_MODE_WT,
            BUTTONS.BUTTONS_LEFT.values.OSC2_MODE_PCM,
        ],
    },
    SUB_WAVE: {
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.OSC2_SUB_WAVE_SQR,
            BUTTONS.BUTTONS_LEFT.values.OSC2_SUB_WAVE_SAW,
        ],
    },
    WHEEL: {
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.OSC2_WHEEL_OFF,
            BUTTONS.BUTTONS_LEFT.values.OSC2_WHEEL_ON,
        ],
    },
    LFO: {
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.OSC2_LFO_OFF,
            BUTTONS.BUTTONS_LEFT.values.OSC2_LFO_ON,
        ],
    },
    KBD: {
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.OSC2_KBD_OFF,
            BUTTONS.BUTTONS_LEFT.values.OSC2_KBD_ON,
        ],
    },
}

const VCO = {
    // pots
    NOTE: {},
    DETUNE: {},
    WAVEFORM: {},
    CROSS_MOD: {},
    PW: {},

    //buttons
    SYNC: {
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.OSC3_SYNC_OFF,
            BUTTONS.BUTTONS_LEFT.values.OSC3_SYNC_HARD,
            BUTTONS.BUTTONS_LEFT.values.OSC3_SYNC_CEM_HARD,
            BUTTONS.BUTTONS_LEFT.values.OSC3_SYNC_CEM_SOFT,
        ],
    },
    CROSS_MOD_SRC: {},
    EXT_CV: {
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.OSC3_EXT_CV_OFF,
            BUTTONS.BUTTONS_LEFT.values.OSC3_EXT_CV_ON,
        ],
    },
    WHEEL: {
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.OSC3_WHEEL_OFF,
            BUTTONS.BUTTONS_LEFT.values.OSC3_WHEEL_ON,
        ],
    },
    LFO: {
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.OSC3_LFO_OFF,
            BUTTONS.BUTTONS_LEFT.values.OSC3_LFO_ON,
        ],
    },
    KBD: {
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.OSC3_KBD_OFF,
            BUTTONS.BUTTONS_LEFT.values.OSC3_KBD_ON,
        ],
    },
}

const NOISE = {
    COLOUR:{
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.NOISE_COLOUR_WHITE,
            BUTTONS.BUTTONS_LEFT.values.NOISE_COLOUR_PINK,
            BUTTONS.BUTTONS_LEFT.values.NOISE_COLOUR_RED,
        ],
    }
}

const RING_MOD = {
    SOURCE: {
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.RING_MOD_SOURCE_1_2,
            BUTTONS.BUTTONS_LEFT.values.RING_MOD_SOURCE_EXT_2,
            BUTTONS.BUTTONS_LEFT.values.NOISE_COLOUR_RED,
        ],
    }
}

const DISTORTION = {
    // Pots
    DRIVE: {},
    LEVEL: {},
    // Buttons
    IN: {
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.DISTORTION_IN_A,
            BUTTONS.BUTTONS_LEFT.values.DISTORTION_IN_B,
        ],
    },
    CLIP: {
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.DISTORTION_SOFT,
            BUTTONS.BUTTONS_LEFT.values.DISTORTION_HARD,
        ],
    },
    OUT: {
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.DISTORTION_OUT_A,
            BUTTONS.BUTTONS_LEFT.values.DISTORTION_OUT_B,
        ],
    },
}
const BIT_CRUSHER = {
    // Pots
    BITS: {},
    RATE: {},
    LEVEL: {},
    // Buttons
    IN: {
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.BIT_CRUSHER_IN_A,
            BUTTONS.BUTTONS_LEFT.values.BIT_CRUSHER_IN_B,
        ],
    },
    OUT: {
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.BIT_CRUSHER_OUT_A,
            BUTTONS.BUTTONS_LEFT.values.BIT_CRUSHER_OUT_B,
        ],
    },
}
const LFOS = {
    // Pots
    RATE: {},
    DEPTH: {},
    DELAY: {},
    // Buttons
    LFO1: {
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.LFO1,
        ],
    },
    LFO2: {
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.LFO2,
        ],
    },
    LFO3: {
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.LFO3,
        ],
    },
    LFO4: {
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.LFO4,
        ],
    },
    SHAPE: {
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
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.LFO_SYNC_OFF,
            BUTTONS.BUTTONS_LEFT.values.LFO_SYNC_ON,
        ],
    },
    RESET: {
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.LFO_RESET_OFF,
            BUTTONS.BUTTONS_LEFT.values.LFO_RESET_ON,
        ],
    },
    ONCE: {
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.LFO_ONCE_OFF,
            BUTTONS.BUTTONS_LEFT.values.LFO_ONCE_ON,
        ],
    },
}
const SOURCE_MIX = {
    LEVEL_OSC1: {},
    LEVEL_OSC2: {},
    LEVEL_OSC3: {},
    LEVEL_NOISE: {},
    LEVEL_RING_MOD: {},
    LEVEL_EXT_AUDIO: {},
    OUT_OSC1: {
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.OSC1_OUT_A,
            BUTTONS.BUTTONS_LEFT.values.OSC1_OUT_B,
        ],
    },
    OUT_OSC2: {
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.OSC2_OUT_A,
            BUTTONS.BUTTONS_LEFT.values.OSC2_OUT_B,
        ],
    },
    OUT_OSC3: {
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.OSC3_OUT_A,
            BUTTONS.BUTTONS_LEFT.values.OSC3_OUT_B,
        ],
    },
    OUT_NOISE: {
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.NOISE_OUT_A,
            BUTTONS.BUTTONS_LEFT.values.NOISE_OUT_B,
        ],
    },
    OUT_RING_MOD: {
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.RING_MOD_OUT_A,
            BUTTONS.BUTTONS_LEFT.values.RING_MOD_OUT_B,
        ],
    },
    OUT_EXT_AUDIO: {
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.EXT_AUDIO_OUT_A,
            BUTTONS.BUTTONS_LEFT.values.EXT_AUDIO_OUT_B,
        ],
    },
}
const ROUTE = {
    AMOUNT: {},
    FROM: {
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.ROUTE_FROM_OFF,
            BUTTONS.BUTTONS_LEFT.values.ROUTE_FROM_ON,
        ],
    },
    TO: {
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.ROUTE_TO_OFF,
            BUTTONS.BUTTONS_LEFT.values.ROUTE_TO_ON,
        ],
    },
}
const MASTER_CLOCK = {
    RATE: {},
    SOURCE: {
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.MASTER_CLOCK_SRC_MASTER,
            BUTTONS.BUTTONS_LEFT.values.MASTER_CLOCK_SRC_MIDI,
            BUTTONS.BUTTONS_LEFT.values.MASTER_CLOCK_SRC_EXT,
        ],
    },
}
const ARPEGGIATOR = {
    TEMPO: {},
    ON_OFF: {
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.ARP_OFF,
            BUTTONS.BUTTONS_LEFT.values.ARP_ON,
        ],
    },
    TRIGGER: {
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.ARP_TRIGGER_OFF,
            BUTTONS.BUTTONS_LEFT.values.ARP_TRIGGER_ON,
        ],
    },
    SYNC: {
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.ARP_SYNC_OFF,
            BUTTONS.BUTTONS_LEFT.values.ARP_SYNC_MASTER,
            BUTTONS.BUTTONS_LEFT.values.ARP_SYNC_LFO1,
            BUTTONS.BUTTONS_LEFT.values.ARP_SYNC_EXT,
        ],
    },
    RANGE: {
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.ARP_RANGE_1,
            BUTTONS.BUTTONS_LEFT.values.ARP_RANGE_2,
            BUTTONS.BUTTONS_LEFT.values.ARP_RANGE_3,
        ],
    },
    MODE: {
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.ARP_MODE_UP,
            BUTTONS.BUTTONS_LEFT.values.ARP_MODE_DOWN,
            BUTTONS.BUTTONS_LEFT.values.ARP_MODE_UP_DOWN,
            BUTTONS.BUTTONS_LEFT.values.ARP_MODE_RANDOM,
            BUTTONS.BUTTONS_LEFT.values.ARP_MODE_OTHER,
        ],
    },
}
const VOICES = {
    VOICE1: {
        cc: BUTTONS.BUTTONS_CENTER.cc,
        values: [
            BUTTONS.BUTTONS_CENTER.values.VOICE1_OFF,
            BUTTONS.BUTTONS_CENTER.values.VOICE1_ON,
        ],
    },
    VOICE2: {
        cc: BUTTONS.BUTTONS_CENTER.cc,
        values: [
            BUTTONS.BUTTONS_CENTER.values.VOICE2_OFF,
            BUTTONS.BUTTONS_CENTER.values.VOICE2_ON,
        ],
    },
    VOICE3: {
        cc: BUTTONS.BUTTONS_CENTER.cc,
        values: [
            BUTTONS.BUTTONS_CENTER.values.VOICE3_OFF,
            BUTTONS.BUTTONS_CENTER.values.VOICE3_ON,
        ],
    },
    VOICE4: {
        cc: BUTTONS.BUTTONS_CENTER.cc,
        values: [
            BUTTONS.BUTTONS_CENTER.values.VOICE4_OFF,
            BUTTONS.BUTTONS_CENTER.values.VOICE4_ON,
        ],
    },
    VOICE5: {
        cc: BUTTONS.BUTTONS_CENTER.cc,
        values: [
            BUTTONS.BUTTONS_CENTER.values.VOICE5_OFF,
            BUTTONS.BUTTONS_CENTER.values.VOICE5_ON,
        ],
    },
    VOICE6: {
        cc: BUTTONS.BUTTONS_CENTER.cc,
        values: [
            BUTTONS.BUTTONS_CENTER.values.VOICE6_OFF,
            BUTTONS.BUTTONS_CENTER.values.VOICE6_ON,
        ],
    },
    VOICE7: {
        cc: BUTTONS.BUTTONS_CENTER.cc,
        values: [
            BUTTONS.BUTTONS_CENTER.values.VOICE7_OFF,
            BUTTONS.BUTTONS_CENTER.values.VOICE7_ON,
        ],
    },
    VOICE8: {
        cc: BUTTONS.BUTTONS_CENTER.cc,
        values: [
            BUTTONS.BUTTONS_CENTER.values.VOICE8_OFF,
            BUTTONS.BUTTONS_CENTER.values.VOICE8_ON,
        ],
    },
}
const MAIN_PANEL = {
    MENU_LFO: {
        cc: BUTTONS.BUTTONS_CENTER.cc,
        values: [
            BUTTONS.BUTTONS_CENTER.values.MENU_LFO,
        ],
    },
    MENU_OSC: {
        cc: BUTTONS.BUTTONS_CENTER.cc,
        values: [
            BUTTONS.BUTTONS_CENTER.values.MENU_OSC,
        ],
    },
    MENU_FILTER: {
        cc: BUTTONS.BUTTONS_CENTER.cc,
        values: [
            BUTTONS.BUTTONS_CENTER.values.MENU_FILTER,
        ],
    },
    MENU_ENVELOPE: {
        cc: BUTTONS.BUTTONS_CENTER.cc,
        values: [
            BUTTONS.BUTTONS_CENTER.values.MENU_ENV,
        ],
    },
    MENU_MOD: {
        cc: BUTTONS.BUTTONS_CENTER.cc,
        values: [
            BUTTONS.BUTTONS_CENTER.values.MENU_MOD,
        ],
    },
    MENU_FX: {
        cc: BUTTONS.BUTTONS_CENTER.cc,
        values: [
            BUTTONS.BUTTONS_CENTER.values.MENU_LFO,
        ],
    },
    //TODO: ARP-meny?

    HOME: {
        cc: BUTTONS.BUTTONS_CENTER.cc,
        values: [
            BUTTONS.BUTTONS_CENTER.values.FUNC_HOME,
        ],
    },
    SETTINGS: {
        cc: BUTTONS.BUTTONS_CENTER.cc,
        values: [
            BUTTONS.BUTTONS_CENTER.values.FUNC_SETTINGS,
        ],
    },
    SHIFT: {
        cc: BUTTONS.BUTTONS_CENTER.cc,
        values: [
            BUTTONS.BUTTONS_CENTER.values.FUNC_SHIFT_OFF,
            BUTTONS.BUTTONS_CENTER.values.FUNC_SHIFT_ON,
        ],
    },
    PERFORM: {
        cc: BUTTONS.BUTTONS_CENTER.cc,
        values: [
            BUTTONS.BUTTONS_CENTER.values.FUNC_PERFORM,
        ],
    },
    LOAD: {
        cc: BUTTONS.BUTTONS_CENTER.cc,
        values: [
            BUTTONS.BUTTONS_CENTER.values.FUNC_LOAD,
        ],
    },
    SAVE: {
        cc: BUTTONS.BUTTONS_CENTER.cc,
        values: [
            BUTTONS.BUTTONS_CENTER.values.FUNC_SAVE,
        ],
    },
    COMPARE: {
        cc: BUTTONS.BUTTONS_CENTER.cc,
        values: [
            BUTTONS.BUTTONS_CENTER.values.FUNC_COMPARE,
        ],
    },
    ROUTE: {
        cc: BUTTONS.BUTTONS_CENTER.cc,
        values: [
            BUTTONS.BUTTONS_CENTER.values.FUNC_ROUTE,
        ],
    },

    POT1: {},
    POT2: {},
    POT3: {},
    POT4: {},
    POT5: {},
    POT6: {},
}
const TRANSPOSE = {
    TRANSPOSE: {
        cc: BUTTONS.BUTTONS_CENTER.cc,
        values: [
            BUTTONS.BUTTONS_CENTER.values.TRANSPOSE_NEG_2,
            BUTTONS.BUTTONS_CENTER.values.TRANSPOSE_NEG_1,
            BUTTONS.BUTTONS_CENTER.values.TRANSPOSE_0,
            BUTTONS.BUTTONS_CENTER.values.TRANSPOSE_POS_1,
            BUTTONS.BUTTONS_CENTER.values.TRANSPOSE_POS_2,
        ],
    },
}
const KEYBOARD = {
    PORTAMENTO: {},
    UNISON_DETUNE: {},
    HOLD: {
        cc: BUTTONS.BUTTONS_CENTER.cc,
        values: [
            BUTTONS.BUTTONS_CENTER.values.KEYBOARD_HOLD_OFF,
            BUTTONS.BUTTONS_CENTER.values.KEYBOARD_HOLD_ON,
        ],
    },
    CHORD: {
        cc: BUTTONS.BUTTONS_CENTER.cc,
        values: [
            BUTTONS.BUTTONS_CENTER.values.KEYBOARD_CHORD_OFF,
            BUTTONS.BUTTONS_CENTER.values.KEYBOARD_CHORD_ON,
        ],
    },
    MODE: {
        cc: BUTTONS.BUTTONS_CENTER.cc,
        values: [
            BUTTONS.BUTTONS_CENTER.values.KEYBOARD_MODE_SOLO,
            BUTTONS.BUTTONS_CENTER.values.KEYBOARD_MODE_UNISON,
            BUTTONS.BUTTONS_CENTER.values.KEYBOARD_MODE_POLY,
        ],
    },
}

const LPF = {
    INPUT: {},
    DRIVE: {},
    RESONANCE: {},
    CUTOFF: {},
    FM_AMT: {},
    ENV_AMT: {},
    LFO_AMT: {},
    KBD_AMT: {},

    EXT_CV: {
        cc: BUTTONS.BUTTONS_RIGHT.cc,
        values: [
            BUTTONS.BUTTONS_RIGHT.values.LPF_EXT_CV_OFF,
            BUTTONS.BUTTONS_RIGHT.values.LPF_EXT_CV_ON,
        ],
    },
    WHEEL: {
        cc: BUTTONS.BUTTONS_RIGHT.cc,
        values: [
            BUTTONS.BUTTONS_RIGHT.values.LPF_WHEEL_OFF,
            BUTTONS.BUTTONS_RIGHT.values.LPF_WHEEL_ON,
        ],
    },
    SLOPE: {
        cc: BUTTONS.BUTTONS_RIGHT.cc,
        values: [
            BUTTONS.BUTTONS_RIGHT.values.LPF_SLOPE_12DB,
            BUTTONS.BUTTONS_RIGHT.values.LPF_SLOPE_24DB,
        ],
    },
}
const FILTERS = {
    LINK_CUTOFF: {
        cc: BUTTONS.BUTTONS_RIGHT.cc,
        values: [
            BUTTONS.BUTTONS_RIGHT.values.FILTER_LINK_CUTOFF_OFF,
            BUTTONS.BUTTONS_RIGHT.values.FILTER_LINK_CUTOFF_ON,
        ],
    },
    ROUTING: {
        cc: BUTTONS.BUTTONS_RIGHT.cc,
        values: [
            BUTTONS.BUTTONS_RIGHT.values.FILTER_ROUTING_SERIES,
            BUTTONS.BUTTONS_RIGHT.values.FILTER_ROUTING_PARALLEL,
        ],
    },
}
const SVF = {
    INPUT: {},
    DRIVE: {},
    RESONANCE: {},
    CUTOFF: {},

    FM_AMT: {},
    ENV_AMT: {},
    LFO_AMT: {},
    KBD_AMT: {},

    EXT_CV: {
        cc: BUTTONS.BUTTONS_RIGHT.cc,
        values: [
            BUTTONS.BUTTONS_RIGHT.values.SVF_EXT_CV_OFF,
            BUTTONS.BUTTONS_RIGHT.values.SVF_EXT_CV_ON,
        ],
    },
    WHEEL: {
        cc: BUTTONS.BUTTONS_RIGHT.cc,
        values: [
            BUTTONS.BUTTONS_RIGHT.values.SVF_WHEEL_OFF,
            BUTTONS.BUTTONS_RIGHT.values.SVF_WHEEL_ON,
        ],
    },
    SLOPE: {
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
}
const POST_MIX = {
    LPF: {},
    SVF: {},
    SINE1: {},
    SINE2: {},
}
const VOICE_OUT = {
    PAN: {},
    AMOUNT: {},
    FX1_SEND: {},
    FX2_SEND: {},
}
const ENV1 = {
    ATTACK: {},
    DECAY1: {},
    DECAY2: {},
    SUSTAIN: {},
    RELEASE1: {},
    RELEASE2: {},
    DELAY: {},
    D1_LEVEL: {},
    R1_LEVEL: {},

    TRIGGER: {
        cc: BUTTONS.BUTTONS_RIGHT.cc,
        values: [
            BUTTONS.BUTTONS_RIGHT.values.ENV1_TRIGGER,
        ],
    },
    LOOP: {
        cc: BUTTONS.BUTTONS_RIGHT.cc,
        values: [
            BUTTONS.BUTTONS_RIGHT.values.ENV1_LOOP_OFF,
            BUTTONS.BUTTONS_RIGHT.values.ENV1_LOOP_ON,
        ],
    },
    INVERT: {
        cc: BUTTONS.BUTTONS_RIGHT.cc,
        values: [
            BUTTONS.BUTTONS_RIGHT.values.ENV1_INVERT_OFF,
            BUTTONS.BUTTONS_RIGHT.values.ENV1_INVERT_ON,
        ],
    },
}
const ENV2 = {
    ATTACK: {},
    DECAY1: {},
    DECAY2: {},
    SUSTAIN: {},
    RELEASE1: {},
    RELEASE2: {},
    DELAY: {},
    D1_LEVEL: {},
    R1_LEVEL: {},

    TRIGGER: {
        cc: BUTTONS.BUTTONS_RIGHT.cc,
        values: [
            BUTTONS.BUTTONS_RIGHT.values.ENV2_TRIGGER,
        ],
    },
    LOOP: {
        cc: BUTTONS.BUTTONS_RIGHT.cc,
        values: [
            BUTTONS.BUTTONS_RIGHT.values.ENV2_LOOP_OFF,
            BUTTONS.BUTTONS_RIGHT.values.ENV2_LOOP_ON,
        ],
    },
    INVERT: {
        cc: BUTTONS.BUTTONS_RIGHT.cc,
        values: [
            BUTTONS.BUTTONS_RIGHT.values.ENV2_INVERT_OFF,
            BUTTONS.BUTTONS_RIGHT.values.ENV2_INVERT_ON,
        ],
    },
}
const ENV3 = {
    ATTACK: {},
    DECAY1: {},
    DECAY2: {},
    SUSTAIN: {},
    RELEASE1: {},
    RELEASE2: {},
    DELAY: {},
    D1_LEVEL: {},
    R1_LEVEL: {},

    ENV_SELECT: {
        cc: BUTTONS.BUTTONS_RIGHT.cc,
        values: [
            BUTTONS.BUTTONS_RIGHT.values.ENV3_SELECT,
        ],
    },
    TRIGGER: {
        cc: BUTTONS.BUTTONS_RIGHT.cc,
        values: [
            BUTTONS.BUTTONS_RIGHT.values.ENV3_TRIGGER,
        ],
    },
    LOOP: {
        cc: BUTTONS.BUTTONS_RIGHT.cc,
        values: [
            BUTTONS.BUTTONS_RIGHT.values.ENV3_LOOP_OFF,
            BUTTONS.BUTTONS_RIGHT.values.ENV3_LOOP_ON,
        ],
    },
    INVERT: {
        cc: BUTTONS.BUTTONS_RIGHT.cc,
        values: [
            BUTTONS.BUTTONS_RIGHT.values.ENV3_INVERT_OFF,
            BUTTONS.BUTTONS_RIGHT.values.ENV3_INVERT_ON,
        ],
    },
}
const DSP1 = {
    POT1: {},
    POT2: {},
    POT3: {},
    EFFECT: {},

    SOURCE: {
        cc: BUTTONS.BUTTONS_RIGHT.cc,
        values: [
            BUTTONS.BUTTONS_RIGHT.values.DSP1_SRC1,
            BUTTONS.BUTTONS_RIGHT.values.DSP1_SRC2,
        ],
    },
}
const DSP2 = {
    POT1: {},
    POT2: {},
    POT3: {},
    EFFECT: {},

    SOURCE: {
        cc: BUTTONS.BUTTONS_RIGHT.cc,
        values: [
            BUTTONS.BUTTONS_RIGHT.values.DSP2_SRC1,
            BUTTONS.BUTTONS_RIGHT.values.DSP2_SRC2,
        ],
    },

    CHAIN: {
        cc: BUTTONS.BUTTONS_RIGHT.cc,
        values: [
            BUTTONS.BUTTONS_RIGHT.values.DSP_CHAIN_OFF,
            BUTTONS.BUTTONS_RIGHT.values.DSP_CHAIN_ON,
        ],
    },
}
const CHORUS = {
    RATE: {},
    DEPTH: {},

    SOURCE: {
        cc: BUTTONS.BUTTONS_RIGHT.cc,
        values: [
            BUTTONS.BUTTONS_RIGHT.values.CHORUS_SRC1,
            BUTTONS.BUTTONS_RIGHT.values.CHORUS_SRC2,
        ],
    },
    MODE: {
        cc: BUTTONS.BUTTONS_RIGHT.cc,
        values: [
            BUTTONS.BUTTONS_RIGHT.values.CHORUS_MODE_CHORUS,
            BUTTONS.BUTTONS_RIGHT.values.CHORUS_MODE_VIBRATO,
        ],
    },
}
const FX_BIT_CRUSHER = {
    BITS: {},
    RATE: {},
    SOURCE: {
        cc: BUTTONS.BUTTONS_RIGHT.cc,
        values: [
            BUTTONS.BUTTONS_RIGHT.values.FX_BIT_CRUSHER_SRC1,
            BUTTONS.BUTTONS_RIGHT.values.FX_BIT_CRUSHER_SRC2,
        ],
    },
}
const FX_MIX = {
    LEVEL_DSP1: {},
    LEVEL_DSP2: {},
    LEVEL_CHORUS: {},
    LEVEL_BIT_CRUSHER: {},
}

const OUTPUT = {
    VOLUME: {},
    SPREAD: {},
    HEADPHONES: {},
}
