import CC from '../../ccMap'
import SYS_CMD from '../../sysexCommandMap'
import { BUTTONS } from '../../buttons'
import { MidiConfig, MidiConfigWithValue } from '../../types'

interface MidiCtrlEnv {
    CURVE: MidiConfig
    LEVEL: MidiConfig
    TIME: MidiConfig
    MAX_LOOPS: MidiConfig
    TOGGLE_STAGE: MidiConfig
    SELECT: MidiConfig
    SELECT_ENV3_ID: MidiConfig
    TRIGGER: MidiConfigWithValue
    LOOP: MidiConfigWithValue
    INVERT: MidiConfigWithValue
    RESET_ON_TRIGGER: MidiConfigWithValue
    RELEASE_MODE: MidiConfigWithValue
    LOOP_MODE: MidiConfigWithValue
}

const midiControllersEnv: MidiCtrlEnv = {
    CURVE: { type: 'pot', cc: SYS_CMD.ENV_CURVE },
    LEVEL: { type: 'pot', cc: SYS_CMD.ENV_LEVEL },
    TIME: { type: 'pot', cc: SYS_CMD.ENV_TIME },
    MAX_LOOPS: { type: 'pot', cc: CC.ENV_MAX_LOOPS },
    TOGGLE_STAGE: { type: 'pot', cc: CC.ENV_TOGGLE_STAGE }, // 4 bit stage, 7 bit on/off
    SELECT: { type: 'pot', cc: CC.ENV_SELECT_ENV },
    SELECT_ENV3_ID: { type: 'pot', cc: CC.ENV_SELECT_ENV3_ID },
    TRIGGER: {
        type: 'button',
        cc: BUTTONS.BUTTONS_RIGHT.cc,
        values: [
            BUTTONS.BUTTONS_RIGHT.values.ENV1_TRIGGER,
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
    RESET_ON_TRIGGER: {
        type: 'button',
        cc: BUTTONS.BUTTONS_RIGHT.cc,
        values: [
            BUTTONS.BUTTONS_RIGHT.values.ENV1_RESET_ON_TRIGGER_OFF,
            BUTTONS.BUTTONS_RIGHT.values.ENV1_RESET_ON_TRIGGER_ON,
        ],
    },
    RELEASE_MODE: {
        type: 'button',
        cc: BUTTONS.BUTTONS_RIGHT.cc,
        values: [
            BUTTONS.BUTTONS_RIGHT.values.ENV1_RELEASE_MODE_NORMAL,
            BUTTONS.BUTTONS_RIGHT.values.ENV1_RELEASE_MODE_SKIP_R1,
            BUTTONS.BUTTONS_RIGHT.values.ENV1_RELEASE_MODE_FREE_RUN,
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
    LOOP_MODE: {
        type: 'button',
        cc: BUTTONS.BUTTONS_RIGHT.cc,
        values: [
            BUTTONS.BUTTONS_RIGHT.values.ENV1_LOOP_MODE_OFF,
            BUTTONS.BUTTONS_RIGHT.values.ENV1_LOOP_MODE_GATED,
            BUTTONS.BUTTONS_RIGHT.values.ENV1_LOOP_MODE_COUNTED,
            BUTTONS.BUTTONS_RIGHT.values.ENV1_LOOP_MODE_INFINITE,
        ],
    },
}

export default midiControllersEnv