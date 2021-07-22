
export enum controllerIds {
    DCO1_PITCH,
    DCO1_NOTE,
    DCO1_SUPER_SAW,
    DCO1_WAVEFORM,
    DCO1_SUB1,
    DCO1_SUB2,
    DCO1_PW,
    DCO1_SYNC,
    DCO1_MODE,
    DCO1_SUB_WAVE,
    DCO1_WHEEL,
    DCO1_LFO,
    DCO1_KBD,
    DCO2_PITCH,
    DCO2_NOTE,
    DCO2_DETUNE,
    DCO2_SUPER_SAW,
    DCO2_WAVEFORM,
    DCO2_SUB1,
    DCO2_SUB2,
    DCO2_PW,
    DCO2_MODE,
    DCO2_SUB_WAVE,
    DCO2_WHEEL,
    DCO2_LFO,
    DCO2_KBD,
    VCO_PITCH,
    VCO_NOTE,
    VCO_DETUNE,
    VCO_WAVEFORM,
    VCO_CROSS_MOD,
    VCO_PW,
    VCO_SYNC,
    VCO_CROSS_MOD_SRC,
    VCO_EXT_CV,
    VCO_WHEEL,
    VCO_LFO,
    VCO_KBD,
    NOISE_COLOUR,
    RING_MOD_SOURCE,
    DISTORTION_DRIVE,
    DISTORTION_LEVEL,
    DISTORTION_IN,
    DISTORTION_CLIP,
    DISTORTION_OUT,
    BIT_CRUSHER_BITS,
    BIT_CRUSHER_RATE,
    BIT_CRUSHER_LEVEL,
    BIT_CRUSHER_IN,
    BIT_CRUSHER_OUT,
    LFO_RATE,
    LFO_DEPTH,
    LFO_DELAY,
    LFO_LFO,
    LFO_SHAPE,
    LFO_SYNC,
    LFO_RESET,
    LFO_ONCE,
    SRC_MIX_LEVEL_OSC1,
    SRC_MIX_LEVEL_OSC2,
    SRC_MIX_LEVEL_OSC3,
    SRC_MIX_LEVEL_NOISE,
    SRC_MIX_LEVEL_RING_MOD,
    SRC_MIX_LEVEL_EXT_AUDIO,
    SRC_MIX_OUT_OSC1,
    SRC_MIX_OUT_OSC2,
    SRC_MIX_OUT_OSC3,
    SRC_MIX_OUT_NOISE,
    SRC_MIX_OUT_RING_MOD,
    SRC_MIX_OUT_EXT_AUDIO,
    ROUTE_AMOUNT,
    ROUTE_FROM,
    ROUTE_TO,
    MASTER_CLOCK_RATE,
    MASTER_CLOCK_SOURCE,
    ARP_TEMPO,
    ARP_ON_OFF,
    ARP_TRIGGER,
    ARP_SYNC,
    ARP_RANGE,
    ARP_MODE,
    VOICE_SELECTOR_1,
    VOICE_SELECTOR_2,
    VOICE_SELECTOR_3,
    VOICE_SELECTOR_4,
    VOICE_SELECTOR_5,
    VOICE_SELECTOR_6,
    VOICE_SELECTOR_7,
    VOICE_SELECTOR_8,
    MAIN_DISP_POT1,
    MAIN_DISP_POT2,
    MAIN_DISP_POT3,
    MAIN_DISP_POT4,
    MAIN_DISP_POT5,
    MAIN_DISP_POT6,
    MAIN_DISP_GROUP_MENU,
    MAIN_DISP_FUNC_HOME,
    MAIN_DISP_FUNC_SETTINGS,
    MAIN_DISP_FUNC_SHIFT,
    MAIN_DISP_FUNC_PERFORM,
    MAIN_DISP_FUNC_LOAD,
    MAIN_DISP_FUNC_SAVE,
    MAIN_DISP_FUNC_COMPARE,
    MAIN_DISP_FUNC_ROUTE,
    KBD_TRANSPOSE,
    KBD_PORTAMENTO,
    KBD_UNISON_DETUNE,
    KBD_HOLD,
    KBD_CHORD,
    KBD_MODE,
    LPF_INPUT,
    LPF_DRIVE,
    LPF_RESONANCE,
    LPF_CUTOFF,
    LPF_FM_AMT,
    LPF_ENV_AMT,
    LPF_LFO_AMT,
    LPF_KBD_AMT,
    LPF_EXT_CV,
    LPF_WHEEL,
    LPF_SLOPE,
    FILTERS_LINK_CUTOFF,
    FILTERS_ROUTING,
    SVF_INPUT,
    SVF_DRIVE,
    SVF_RESONANCE,
    SVF_CUTOFF,
    SVF_FM_AMT,
    SVF_ENV_AMT,
    SVF_LFO_AMT,
    SVF_KBD_AMT,
    SVF_EXT_CV,
    SVF_WHEEL,
    SVF_SLOPE,
    VOICE_MIX_LPF,
    VOICE_MIX_SVF,
    VOICE_MIX_SINE1,
    VOICE_MIX_SINE2,
    VOICE_OUT_PAN,
    VOICE_OUT_AMOUNT,
    VOICE_OUT_FX1_SEND,
    VOICE_OUT_FX2_SEND,
    ENV_DELAY_TIME,
    ENV_ATTACK_TIME,
    ENV_DECAY1_TIME,
    ENV_DECAY2_TIME,
    ENV_RELEASE1_TIME,
    ENV_RELEASE2_TIME,
    ENV_DECAY2_LEVEL,
    ENV_SUSTAIN_LEVEL,
    ENV_RELEASE2_LEVEL,
    ENV_CURVE,
    ENV_LEVEL,
    ENV_TIME,
    ENV_MAX_LOOPS,
    ENV_TOGGLE_STAGE,
    ENV_SELECT,
    ENV_SELECT_ENV3_ID,
    ENV_TRIGGER,
    ENV_RELEASE,
    ENV_LOOP,
    ENV_INVERT,
    ENV_RESET_ON_TRIGGER,
    ENV_RELEASE_MODE,
    ENV_LOOP_MODE,
    DSP1_POT1,
    DSP1_POT2,
    DSP1_POT3,
    DSP1_EFFECT,
    DSP1_SOURCE,
    DSP2_POT1,
    DSP2_POT2,
    DSP2_POT3,
    DSP2_EFFECT,
    DSP2_SOURCE,
    DSP2_CHAIN,
    CHORUS_RATE,
    CHORUS_DEPTH,
    CHORUS_SOURCE,
    CHORUS_MODE,
    FX_BIT_CRUSHER_BITS,
    FX_BIT_CRUSHER_RATE,
    FX_BIT_CRUSHER_SOURCE,
    FX_MIX_LEVEL_DSP1,
    FX_MIX_LEVEL_DSP2,
    FX_MIX_LEVEL_CHORUS,
    FX_MIX_LEVEL_BIT_CRUSHER,
    OUT_VOLUME,
    OUT_SPREAD,
    OUT_HEADPHONES,
    PERF_PITCH_BEND,
    PERF_MOD_WHEEL,
    PERF_RIBBON_POS,
    PERF_RIBBON_PRESSURE,
    PERF_KBD_PITCH,
    PERF_KBD_VELOCITY,
    PERF_KBD_AFTERTOUCH,
}
