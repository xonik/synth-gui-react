export enum buttonCenterMidiValues {
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
    VOICE1_ON,
    VOICE1_OFF,
    VOICE2_ON,
    VOICE2_OFF,
    VOICE3_ON,
    VOICE3_OFF,
    VOICE4_ON,
    VOICE4_OFF,
    VOICE5_ON,
    VOICE5_OFF,
    VOICE6_ON,
    VOICE6_OFF,
    VOICE7_ON,
    VOICE7_OFF,
    VOICE8_ON,
    VOICE8_OFF,
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
}