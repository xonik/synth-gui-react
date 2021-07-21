import CC from '../../mapCC'
import NRPN from '../../mapNRPN'
import { BUTTONS } from '../../buttons'
import { FuncProps, MidiConfigCC, MidiConfigCCWithValue, MidiConfigNRPN } from '../../types'

interface MidiCtrlEnv {
    props: FuncProps
    CURVE: MidiConfigNRPN
    LEVEL: MidiConfigNRPN
    TIME: MidiConfigNRPN
    MAX_LOOPS: MidiConfigCC
    TOGGLE_STAGE: MidiConfigCC
    SELECT: MidiConfigCC
    SELECT_ENV3_ID: MidiConfigCC
    TRIGGER: MidiConfigCCWithValue
    RELEASE: MidiConfigCCWithValue
    LOOP: MidiConfigCCWithValue
    INVERT: MidiConfigCCWithValue
    RESET_ON_TRIGGER: MidiConfigCCWithValue
    RELEASE_MODE: MidiConfigCCWithValue
    LOOP_MODE: MidiConfigCCWithValue
}

const controllersEnv: MidiCtrlEnv = {
    /*
    TODO: individual levels / times
     */
    props: { label: 'Envelope' },
    CURVE: { type: 'pot', addr: NRPN.ENV_CURVE },
    LEVEL: { type: 'pot', addr: NRPN.ENV_LEVEL },
    TIME: { type: 'pot', addr: NRPN.ENV_TIME },
    MAX_LOOPS: { type: 'pot', cc: CC.ENV_MAX_LOOPS },
    TOGGLE_STAGE: { type: 'pot', cc: CC.ENV_TOGGLE_STAGE }, // 4 bit stage, 7 bit on/off
    SELECT: { type: 'pot', cc: CC.ENV_SELECT_ENV },
    SELECT_ENV3_ID: { type: 'pot', cc: CC.ENV_SELECT_ENV3_ID },
    TRIGGER: {
        label: 'Trigger',
        type: 'button',
        cc: BUTTONS.BUTTONS_RIGHT.cc,
        values: [
            BUTTONS.BUTTONS_RIGHT.values.ENV_TRIGGER,
        ],
    },
    RELEASE: {
        type: 'button',
        cc: BUTTONS.BUTTONS_RIGHT.cc,
        values: [
            BUTTONS.BUTTONS_RIGHT.values.ENV_RELEASE,
        ],
    },
    INVERT: {
        label: 'Invert',
        type: 'button',
        cc: BUTTONS.BUTTONS_RIGHT.cc,
        values: [
            BUTTONS.BUTTONS_RIGHT.values.ENV_INVERT_OFF,
            BUTTONS.BUTTONS_RIGHT.values.ENV_INVERT_ON,
        ],
    },
    RESET_ON_TRIGGER: {
        type: 'button',
        cc: BUTTONS.BUTTONS_RIGHT.cc,
        values: [
            BUTTONS.BUTTONS_RIGHT.values.ENV_RESET_ON_TRIGGER_OFF,
            BUTTONS.BUTTONS_RIGHT.values.ENV_RESET_ON_TRIGGER_ON,
        ],
    },
    RELEASE_MODE: {
        type: 'button',
        cc: BUTTONS.BUTTONS_RIGHT.cc,
        values: [
            BUTTONS.BUTTONS_RIGHT.values.ENV_RELEASE_MODE_NORMAL,
            BUTTONS.BUTTONS_RIGHT.values.ENV_RELEASE_MODE_SKIP_R1,
            BUTTONS.BUTTONS_RIGHT.values.ENV_RELEASE_MODE_FREE_RUN,
        ],
    },
    LOOP: {
        label: 'Loop',
        type: 'button',
        cc: BUTTONS.BUTTONS_RIGHT.cc,
        values: [
            BUTTONS.BUTTONS_RIGHT.values.ENV_LOOP_OFF,
            BUTTONS.BUTTONS_RIGHT.values.ENV_LOOP_ON,
        ],
    },
    LOOP_MODE: {
        type: 'button',
        cc: BUTTONS.BUTTONS_RIGHT.cc,
        values: [
            BUTTONS.BUTTONS_RIGHT.values.ENV_LOOP_MODE_GATED,
            BUTTONS.BUTTONS_RIGHT.values.ENV_LOOP_MODE_COUNTED,
            BUTTONS.BUTTONS_RIGHT.values.ENV_LOOP_MODE_INFINITE,
        ],
    },
}

export default controllersEnv