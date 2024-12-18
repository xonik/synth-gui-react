const mapCC = {
    MIDI_BANK_SELECT: 0, // N/I
    MIDI_MOD_WHEEL: 1, // N/I
    MIDI_BREATH_CTRL: 2, // N/I
    BUTTONS_1: 3,
    MIDI_FOOT_CTRL: 4, // N/I
    KBD_PORTAMENTO: 5,
    DATA_ENTRY_MSB:6,
    BUTTONS_2: 7,
    BUTTONS_3: 8,
    DCO1_NOTE: 9,
    DCO1_SUPER_SAW: 10,
    DCO1_WAVEFORM: 11,
    DCO1_SUB1: 12,
    DCO1_SUB2: 13,
    DCO1_PW: 14,
    DCO2_NOTE: 15,
    DCO2_DETUNE: 16,
    DCO2_SUPER_SAW: 17,
    DCO2_WAVEFORM: 18,
    DCO2_SUB1: 19,
    DCO2_SUB2: 20,
    DCO2_PW: 21,
    VCO_NOTE: 22,
    VCO_DETUNE: 23,
    VCO_WAVEFORM: 24,
    VCO_FM_AMT: 25,
    VCO_PW: 26,
    DISTORTION_DRIVE: 27,
    DISTORTION_LEVEL: 28,
    BIT_CRUSHER_BITS: 29,
    BIT_CRUSHER_RATE: 30,
    BIT_CRUSHER_LEVEL: 31,

    MIDI_BANK_SELECT_LSB: 32,
    MIDI_MOD_WHEEL_LSB: 33,
    MIDI_BREATH_CTRL_LSB: 34,
    DATA_ENTRY_HSB: 35, // Not a standard controller, I use this to send 16 bit controllers.
    MIDI_FOOT_CTRL_LSB: 36,
    KBD_PORTAMENTO_LSB: 37,
    DATA_ENTRY_LSB: 38,

    LFO_SELECT_LFO: 39,
    LFO_MAX_LOOPS: 40,
    LFO_TOGGLE_STAGE: 41,

    LEVEL_OSC1: 42,
    LEVEL_OSC2: 43,
    LEVEL_OSC3: 44,
    LEVEL_NOISE: 45,
    LEVEL_RING_MOD: 46,
    LEVEL_EXT_AUDIO: 47,
    //ROUTE_AMOUNT: 48,
    MASTER_CLOCK_RATE: 49,
    ARP_TEMPO: 50,
    MAIN_POT1: 51,
    MAIN_POT2: 52,
    MAIN_POT3: 53,
    MAIN_POT4: 54,
    MAIN_POT5: 55,
    MAIN_POT6: 56,
    KBD_UNISON_DETUNE: 57,
    LPF_INPUT: 58,
    LPF_RESONANCE: 60,
    LPF_CUTOFF: 61,
    LPF_FM_AMT: 62,
    LPF_ENV_AMT: 63,
    MIDI_SUSTAIN: 64, // N/I
    // 65 - 69 -- reserved for pedals

    LPF_LFO_AMT: 70,
    LPF_KBD_AMT: 71,
    SVF_INPUT: 72,
    SVF_RESONANCE: 74,
    SVF_CUTOFF: 75,
    SVF_FM_AMT: 76,
    SVF_ENV_AMT: 77,
    SVF_LFO_AMT: 78,
    SVF_KBD_AMT: 79,
    POST_MIX_LPF: 80,
    POST_MIX_SVF: 81,
    POST_MIX_SINE1: 82,
    POST_MIX_SINE2: 83,
    POST_MIX_PAN: 84,
    POST_MIX_AMOUNT: 85,
    POST_MIX_FX1_SEND: 86,
    POST_MIX_FX2_SEND: 87,
    ENV_LOOP_MODE: 88,
    ENV_MAX_LOOPS: 89,
    ENV_TOGGLE_STAGE: 90,
    ENV_SELECT_ENV: 91,
    ENV_SELECT_ENV3_ID: 92,
    DSP1_PARAM1: 93,
    DSP1_PARAM2: 94,
    DSP1_PARAM3: 95,
    DSP1_EFFECT: 96,
    DSP2_PARAM1: 97,

    NRPN_LSB: 98,
    NRPN_MSB: 99,
    RPN_LSB: 100, // N/I, possibly available
    RPN_MSB: 101, // N/I, possibly available

    DSP2_PARAM2: 102,
    DSP2_PARAM3: 103,
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
    MOD_SRC_ID: 116,
    MOD_DST_ID: 117,
    MOD_DST_INDEX: 118, // Used when there are multiple modules using same dst, such as LFOs and envs
    MAIN_POT7: 119,
    // 120 - 127 reserved for channel mode messages
}

export const buttonCCs = [mapCC.BUTTONS_1, mapCC.BUTTONS_2, mapCC.BUTTONS_3]

export default mapCC