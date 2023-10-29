// TODO: Very weird having these in midi when they're used elsewhere?
export enum ControllerIdSrc {
    // Sources
    ARP,
    PERF_PITCH_BEND,
    PERF_MOD_WHEEL,
    PERF_RIBBON_POS,
    PERF_RIBBON_PRESSURE,
    PERF_KBD_PITCH,
    PERF_KBD_VELOCITY,
    PERF_KBD_AFTERTOUCH,

    ENVELOPE1,
    ENVELOPE2,
    ENVELOPE3,
    ENVELOPE4,
    ENVELOPE5,

    LFO1,
    LFO2,
    LFO3,
    LFO4,
}

export const SRC_COUNT = Object.keys(ControllerIdSrc).filter(o => isNaN(o as any)).length
export const FIRST_INTERMEDIATE = SRC_COUNT

export enum ControllerIdIntermediate {
    // Intermediate, controllers that regulate the level of another source and then acts as the
    // modulator of a dst.
    LPF_FM_AMT = 17,
    LPF_ENV_AMT,
    LPF_LFO_AMT,
    LPF_KBD_AMT,

    SVF_FM_AMT,
    SVF_ENV_AMT,
    SVF_LFO_AMT,
    SVF_KBD_AMT,

    // TODO: Note and pitch should perhaps be part of this? But
    // Note needs to be quantized
}
export const INT_COUNT = Object.keys(ControllerIdIntermediate).filter(o => isNaN(o as any)).length
export const FIRST_DST = FIRST_INTERMEDIATE + INT_COUNT

export enum ControllerIdDst {
    // Dsts
    DCO1_PITCH = 25,
    DCO1_NOTE, // TODO: Not an output destination?
    DCO1_WAVEFORM,
    DCO1_SUB1,
    DCO1_SUB2,
    DCO1_PW,
    DCO1_SUPER_SAW,
    //(Wheel amt, Lfo amt, Kbd amt?)

    DCO2_PITCH, // TODO: Not an output destination?
    DCO2_NOTE,  // TODO: Not an output destination?
    DCO2_DETUNE,
    DCO2_WAVEFORM,
    DCO2_SUB1,
    DCO2_SUB2,
    DCO2_PW,
    DCO2_SUPER_SAW,
    //(Wheel amt, Lfo amt, Kbd amt?)

    VCO_PITCH,
    VCO_NOTE,
    VCO_DETUNE,
    VCO_WAVEFORM,
    VCO_CROSS_MOD,
    VCO_PW,
    //(Ext CV, Wheel amt, Lfo amt, Kbd amt?)

    DISTORTION_DRIVE,
    DISTORTION_LEVEL,

    BIT_CRUSHER_BITS,
    BIT_CRUSHER_RATE,
    BIT_CRUSHER_LEVEL,

    SOURCE_MIX_LEVEL_OSC1,
    SOURCE_MIX_LEVEL_OSC2,
    SOURCE_MIX_LEVEL_OSC3,
    SOURCE_MIX_LEVEL_NOISE,
    SOURCE_MIX_LEVEL_RING_MOD,
    SOURCE_MIX_LEVEL_EXT_AUDIO,

    MASTER_CLOCK_RATE,
    ARP_TEMPO,

    KBD_PORTAMENTO,
    KBD_UNISON_DETUNE,

    LPF_INPUT,
    LPF_DRIVE,
    LPF_RESONANCE,
    LPF_CUTOFF,

    SVF_INPUT,
    SVF_DRIVE,
    SVF_RESONANCE,
    SVF_CUTOFF,

    POST_MIX_LPF,
    POST_MIX_SVF,
    POST_MIX_SINE1,
    POST_MIX_SINE2,

    POST_MIX_PAN,
    POST_MIX_AMOUNT,
    POST_MIX_FX1_SEND,
    POST_MIX_FX2_SEND,

    DSP1_PARAM1,
    DSP1_PARAM2,
    DSP1_PARAM3,

    DSP2_PARAM1,
    DSP2_PARAM2,
    DSP2_PARAM3,

    CHORUS_RATE,
    CHORUS_DEPTH,

    FX_BIT_CRUSHER_BITS,
    FX_BIT_CRUSHER_RATE,

    FX_MIX_LEVEL_DSP1,
    FX_MIX_LEVEL_DSP2,
    FX_MIX_LEVEL_CHORUS,
    FX_MIX_LEVEL_BIT_CRUSHER,
}
export const DST_COUNT = Object.keys(ControllerIdDst).filter(o => isNaN(o as any)).length
export const FIRST_ENV_DST = FIRST_DST + DST_COUNT

export enum ControllerIdEnvDst {
    // LFO and ENV dsts
    DELAY_TIME = 91,
    ATTACK_TIME,
    DECAY1_TIME,
    DECAY2_TIME,
    SUSTAIN_LEVEL,
    RELEASE1_TIME,
    RELEASE2_TIME,
    DECAY2_LEVEL,
    RELEASE2_LEVEL,
    OFFSET,
}
export const DST_ENV_COUNT = Object.keys(ControllerIdEnvDst).filter(o => isNaN(o as any)).length
export const FIRST_LFO_DST = FIRST_ENV_DST + DST_ENV_COUNT

export enum ControllerIdLfoDst {
    RATE = 101,
    DEPTH,
    DELAY,
    BALANCE,
    PHASE_OFFSET,
    LEVEL_OFFSET,
}
export const DST_LFO_COUNT = Object.keys(ControllerIdLfoDst).filter(o => isNaN(o as any)).length
export const FIRST_NON_MOD_POTS = FIRST_LFO_DST + DST_LFO_COUNT


// controllers that affect stuff that is not part of the
// modulation matrix, such as global pots (volume etc)
export enum ControllerIdNonModPots {
    MOD_AMOUNT = 107,
    MAIN_DISP_POT1,
    MAIN_DISP_POT2,
    MAIN_DISP_POT3,
    MAIN_DISP_POT4,
    MAIN_DISP_POT5,
    MAIN_DISP_POT6,
    MAIN_DISP_POT7,
    OUT_VOLUME,
    OUT_SPREAD,
    OUT_HEADPHONES,
}

export const NON_MOD_POTS_COUNT = Object.keys(ControllerIdNonModPots).filter(o => isNaN(o as any)).length
export const FIRST_NON_MOD = FIRST_NON_MOD_POTS + NON_MOD_POTS_COUNT

export enum ControllerIdNonMod {
    // Non-modulatable controllers
    DCO1_RANGE = 118,
    DCO1_SYNC,
    DCO1_MODE,
    DCO1_SUB_WAVE,
    DCO1_WHEEL,
    DCO1_LFO,
    DCO1_KBD,
    DCO1_SAW_INV,
    DCO1_PRE_FILTER_SINE,

    DCO2_RANGE,
    DCO2_SYNC,
    DCO2_MODE,
    DCO2_SUB_WAVE,
    DCO2_WHEEL,
    DCO2_LFO,
    DCO2_KBD,
    DCO2_SAW_INV,
    DCO2_PRE_FILTER_SINE,

    VCO_SYNC,
    VCO_CROSS_MOD_SRC,
    VCO_EXT_CV,
    VCO_WHEEL,
    VCO_LFO,
    VCO_KBD,

    NOISE_COLOUR,
    RING_MOD_SOURCE,

    DISTORTION_IN,
    BIT_CRUSHER_RECON,
    DISTORTION_OUT,

    BIT_CRUSHER_IN,
    BIT_CRUSHER_OUT,

    SRC_MIX_OUT_OSC1,
    SRC_MIX_OUT_OSC2,
    SRC_MIX_OUT_OSC3,
    SRC_MIX_OUT_NOISE,
    SRC_MIX_OUT_RING_MOD,
    SRC_MIX_OUT_EXT_AUDIO,

    LFO_LFO,
    LFO_SELECT,

    MOD_DST,
    MOD_SRC,
    MOD_SET_SRC_ID,
    MOD_SET_DST_ID,
    MOD_SET_DST_INDEX,

    MASTER_CLOCK_SOURCE,
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

    KBD_HOLD,
    KBD_CHORD,
    KBD_MODE,

    LPF_EXT_CV,
    LPF_WHEEL,
    LPF_SLOPE,
    LPF_FM_MODE,

    FILTERS_LINK_CUTOFF,
    FILTERS_ROUTING,

    SVF_EXT_CV,
    SVF_WHEEL,
    SVF_INVERT,
    SVF_SLOPE,
    SVF_FM_MODE,

    // TODO: Why are these here? -- they set level and time for an arbitrary stage.
    ENV_LEVEL,
    ENV_TIME,

    ENV_SELECT,
    ENV_SELECT_ENV3_ID,
    ENV_GATE,

    DSP1_EFFECT,
    DSP1_SOURCE,
    DSP2_EFFECT,
    DSP2_SOURCE,
    DSP2_CHAIN,

    CHORUS_SOURCE,
    CHORUS_MODE,

    FX_BIT_CRUSHER_SOURCE,

    // Config/settings, should not be part of CC system.
    CALIBRATE_DCO1,
    CALIBRATE_DCO2,
}

export enum ControllerIdEnvNonMod {
  ENV_RESET_ON_TRIGGER= 215,
  ENV_RELEASE_MODE,
  ENV_LOOP_MODE,
  ENV_MAX_LOOPS,
  ENV_LOOP,
  ENV_INVERT,
  ENV_BIPOLAR,
  ENV_USE_VELOCITY
}
export const ENV_NON_MOD_COUNT = Object.keys(ControllerIdEnvNonMod).filter(o => isNaN(o as any)).length

export enum ControllerIdEnvStageNonMod {
  ENV_CURVE = 223,
  ENV_TOGGLE_STAGE,
}
export const ENV_STAGE_NON_MOD_COUNT = Object.keys(ControllerIdEnvStageNonMod).filter(o => isNaN(o as any)).length

export enum ControllerIdLfoNonMod {
  LFO_SHAPE = 225,
  LFO_SYNC,
  LFO_RESET,
  LFO_BIPOLAR,
  LFO_INVERT,
  LFO_LOOP_MODE,
  LFO_MAX_LOOPS,
  LFO_LOOP,
  LFO_RESET_ON_TRIGGER,
  LFO_RESET_ON_STOP,
  LFO_RESET_LEVEL_ON_CLOCK,
  LFO_SYNC_TO_CLOCK,
  LFO_GATED,
  LFO_RANDOM_PHASE,
}
export const LFO_NON_MOD_COUNT = Object.keys(ControllerIdLfoNonMod).filter(o => isNaN(o as any)).length

export enum ControllerIdLfoStageNonMod {
  LFO_CURVE = 239,
  LFO_TOGGLE_STAGE,
}
export const LFO_STAGE_NON_MOD_COUNT = Object.keys(ControllerIdLfoStageNonMod).filter(o => isNaN(o as any)).length

export const NON_MOD_COUNT = Object.keys(ControllerIdNonMod).filter(o => isNaN(o as any)).length

export type ControllerId = | ControllerIdSrc
    | ControllerIdIntermediate
    | ControllerIdDst
    | ControllerIdEnvDst
    | ControllerIdLfoDst
    | ControllerIdNonModPots
    | ControllerIdNonMod
    | ControllerIdEnvNonMod
    | ControllerIdEnvStageNonMod
    | ControllerIdLfoNonMod
    | ControllerIdLfoStageNonMod