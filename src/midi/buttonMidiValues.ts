export enum buttonMidiValues {
    OSC1_RANGE_LOW,
    OSC1_RANGE_HIGH,
    OSC1_SYNC_OFF,
    OSC1_SYNC_HARD,
    OSC1_SYNC_METAL,
    OSC1_MODE_DCO,
    OSC1_MODE_WT,
    OSC1_MODE_PCM,
    OSC1_SUB_WAVE_SQR,
    OSC1_SUB_WAVE_SAW,
    OSC1_WHEEL_OFF,
    OSC1_WHEEL_ON,
    OSC1_LFO_OFF,
    OSC1_LFO_ON,
    OSC1_KBD_OFF,
    OSC1_KBD_ON,
    OSC1_SAW_INV_OFF,
    OSC1_SAW_INV_ON,
    OSC1_PRE_FILTER_SINE_OFF,
    OSC1_PRE_FILTER_SINE_ON,

    OSC2_RANGE_LOW,
    OSC2_RANGE_HIGH,
    OSC2_SYNC_OFF,
    OSC2_SYNC_HARD,
    OSC2_SYNC_METAL,
    OSC2_MODE_DCO,
    OSC2_MODE_WT,
    OSC2_MODE_PCM,
    OSC2_SUB_WAVE_SQR,
    OSC2_SUB_WAVE_SAW,
    OSC2_WHEEL_OFF,
    OSC2_WHEEL_ON,
    OSC2_LFO_OFF,
    OSC2_LFO_ON,
    OSC2_KBD_OFF,
    OSC2_KBD_ON,
    OSC2_SAW_INV_OFF,
    OSC2_SAW_INV_ON,
    OSC2_PRE_FILTER_SINE_OFF,
    OSC2_PRE_FILTER_SINE_ON,

    OSC3_SYNC_OFF,
    OSC3_SYNC_HARD,
    OSC3_SYNC_CEM_HARD,
    OSC3_SYNC_SRC_OSC_1,
    OSC3_SYNC_SRC_OSC_2,
    OSC3_FM_SRC_OSC2,
    OSC3_FM_SRC_EXT,
    OSC3_FM_MODE_OFF,
    OSC3_FM_MODE_LIN,
    OSC3_FM_MODE_LOG,
    OSC3_EXT_CV_OFF,
    OSC3_EXT_CV_ON,
    OSC3_WHEEL_OFF,
    OSC3_WHEEL_ON,
    OSC3_LFO_OFF,
    OSC3_LFO_ON,
    OSC3_KBD_OFF,
    OSC3_KBD_ON,

    NOISE_COLOUR_WHITE,
    NOISE_COLOUR_PINK,
    NOISE_COLOUR_RED,

    RING_MOD_SOURCE_1_2,
    RING_MOD_SOURCE_EXT_2,
    RING_MOD_SOURCE_VCO_2,

    DISTORTION_IN_OFF,
    DISTORTION_IN_A,
    DISTORTION_IN_B,
    DISTORTION_IN_BOTH,
    DISTORTION_OUT_OFF,
    DISTORTION_OUT_A,
    DISTORTION_OUT_B,
    DISTORTION_OUT_BOTH,

    BIT_CRUSHER_RECON_OFF,
    BIT_CRUSHER_RECON_ON,

    BIT_CRUSHER_IN_OFF,
    BIT_CRUSHER_IN_A,
    BIT_CRUSHER_IN_B,
    BIT_CRUSHER_IN_BOTH,
    BIT_CRUSHER_OUT_OFF,
    BIT_CRUSHER_OUT_A,
    BIT_CRUSHER_OUT_B,
    BIT_CRUSHER_OUT_BOTH,

    LFO1,
    LFO2,
    LFO3,
    LFO4,

    LFO_SHAPE_SAW,
    LFO_SHAPE_TRI,
    LFO_SHAPE_SQR,
    LFO_SHAPE_SIN,
    LFO_SHAPE_RANDOM,
    LFO_SHAPE_CUSTOM,
    LFO_SYNC_OFF,
    LFO_SYNC_ON,
    LFO_RESET_OFF,
    LFO_RESET_ON,
    LFO_BIPOLAR_OFF,
    LFO_BIPOLAR_ON,

    OSC1_OUT_OFF,
    OSC1_OUT_A,
    OSC1_OUT_B,
    OSC1_OUT_BOTH,
    OSC2_OUT_OFF,
    OSC2_OUT_A,
    OSC2_OUT_B,
    OSC2_OUT_BOTH,
    OSC3_OUT_OFF,
    OSC3_OUT_A,
    OSC3_OUT_B,
    OSC3_OUT_BOTH,
    NOISE_OUT_OFF,
    NOISE_OUT_A,
    NOISE_OUT_B,
    NOISE_OUT_BOTH,
    RING_MOD_OUT_OFF,
    RING_MOD_OUT_A,
    RING_MOD_OUT_B,
    RING_MOD_OUT_BOTH,
    EXT_AUDIO_OUT_OFF,
    EXT_AUDIO_OUT_A,
    EXT_AUDIO_OUT_B,
    EXT_AUDIO_OUT_BOTH,

    ROUTE_OFF,
    ROUTE_FROM_ON,
    ROUTE_TO_ON,

    MASTER_CLOCK_SRC_MASTER,
    MASTER_CLOCK_SRC_MIDI,
    MASTER_CLOCK_SRC_EXT,

    LFO_INVERT_OFF,
    LFO_INVERT_ON,
    LFO_LOOP_OFF,
    LFO_LOOP_ON,
    //LFO_LOOP_MODE_GATED,
    LFO_LOOP_MODE_COUNTED,
    LFO_LOOP_MODE_INFINITE,
    LFO_RESET_ON_TRIGGER_OFF,
    LFO_RESET_ON_TRIGGER_ON,
    LFO_RESET_ON_STOP_OFF,
    LFO_RESET_ON_STOP_ON,
    LFO_RESET_LEVEL_ON_CLOCK_OFF,
    LFO_RESET_LEVEL_ON_CLOCK_ON,
    LFO_SYNC_TO_CLOCK_OFF,
    LFO_SYNC_TO_CLOCK_ON,
    LFO_GATED_OFF,
    LFO_GATED_ON,
    LFO_TRIGGER,
    LFO_RELEASE,
    LFO_RANDOM_PHASE_OFF,
    LFO_RANDOM_PHASE_ON,

    ARP_OFF,
    ARP_ON,
    ARP_TRIGGER_OFF,
    ARP_TRIGGER_ON,
    ARP_SYNC_OFF,
    ARP_SYNC_MASTER,
    ARP_SYNC_LFO1,
    ARP_SYNC_EXT,
    ARP_RANGE_1,
    ARP_RANGE_2,
    ARP_RANGE_3,
    ARP_MODE_UP,
    ARP_MODE_DOWN,
    ARP_MODE_UP_DOWN,
    ARP_MODE_RANDOM,
    ARP_MODE_OTHER,

    VOICE1,
    VOICE2,
    VOICE3,
    VOICE4,
    VOICE5,
    VOICE6,
    VOICE7,
    VOICE8,

    MENU_LFO,
    MENU_OSC,
    MENU_FILTER,
    MENU_ENV,
    MENU_MOD,
    MENU_FX,
    FUNC_HOME,
    FUNC_SETTINGS,
    FUNC_SHIFT_ON,
    FUNC_SHIFT_OFF,
    FUNC_PERFORM,
    FUNC_LOAD,
    FUNC_SAVE,
    FUNC_COMPARE,
    FUNC_ROUTE,

    TRANSPOSE_NEG_2,
    TRANSPOSE_NEG_1,
    TRANSPOSE_0,
    TRANSPOSE_POS_1,
    TRANSPOSE_POS_2,

    KBD_HOLD_ON,
    KBD_HOLD_OFF,
    KBD_CHORD_ON,
    KBD_CHORD_OFF,
    KBD_MODE_SOLO,
    KBD_MODE_UNISON,
    KBD_MODE_POLY,

    // config/settings stuff. Should be moved to sysex.
    CALIBRATE_DCO1,
    CALIBRATE_DCO2,

    LPF_EXT_CV_ON,
    LPF_EXT_CV_OFF,
    LPF_SLOPE_12DB,
    LPF_SLOPE_24DB,
    LPF_FILTER_TYPE_OTA,
    LPF_FILTER_TYPE_LADDER,
    LPF_FM_MODE_OFF,
    LPF_FM_MODE_LIN,
    LPF_FM_MODE_LOG,
    LPF_FM_SRC_OSC_B,
    LPF_FM_SRC_EXT_AUDIO,

    FILTER_LINK_CUTOFF_ON,
    FILTER_LINK_CUTOFF_OFF,
    FILTER_ROUTING_SERIES,
    FILTER_ROUTING_PARALLEL,

    SVF_EXT_CV_ON,
    SVF_EXT_CV_OFF,
    SVF_INVERT_OFF,
    SVF_INVERT_ON,
    SVF_SLOPE_12DB_LP,
    SVF_SLOPE_24DB_LP,
    SVF_SLOPE_12DB_BP,
    SVF_SLOPE_24DB_BP,
    SVF_SLOPE_LP_BP,
    SVF_SLOPE_12DB_HP,
    SVF_SLOPE_24DB_HP,
    SVF_SLOPE_HP_BP,
    SVF_SLOPE_NOTCH,
    SVF_SLOPE_NOTCH_LP,
    SVF_SLOPE_AP,
    SVF_FM_MODE_OFF,
    SVF_FM_MODE_LIN,
    SVF_FM_MODE_LOG,
    SVF_FM_SRC_OSC_B,
    SVF_FM_SRC_EXT_AUDIO,

    ENV_TRIGGER,
    ENV_RELEASE,
    ENV_LOOP_OFF,
    ENV_LOOP_ON,
    ENV_INVERT_OFF,
    ENV_INVERT_ON,
    ENV_RESET_ON_TRIGGER_OFF,
    ENV_RESET_ON_TRIGGER_ON,
    ENV_RELEASE_MODE_NORMAL,
    ENV_RELEASE_MODE_SKIP_R1,
    ENV_RELEASE_MODE_FREE_RUN,
    ENV_LOOP_MODE_GATED,
    ENV_LOOP_MODE_COUNTED,
    ENV_LOOP_MODE_INFINITE,
    ENV_BIPOLAR_OFF,
    ENV_BIPOLAR_ON,

    DSP1_SRC1,
    DSP1_SRC2,
    DSP_CHAIN_ON,
    DSP_CHAIN_OFF,
    DSP2_SRC1,
    DSP2_SRC2,

    CHORUS_SRC1,
    CHORUS_SRC2,
    CHORUS_MODE_CHORUS,
    CHORUS_MODE_VIBRATO,

    FX_BIT_CRUSHER_SRC1,
    FX_BIT_CRUSHER_SRC2
}
