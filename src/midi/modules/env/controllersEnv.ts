import CC from '../../mapCC'
import NRPN from '../../mapNRPN'
import { BUTTONS } from '../../buttons'
import { FuncProps, ControllerConfig, ControllerConfigCC, ControllerConfigCCWithValue, ControllerConfigNRPN } from '../../types'
import { ControllerId } from '../../controllerIds'

interface MidiCtrlEnv {
    props: FuncProps
    DELAY_TIME: ControllerConfig,
    ATTACK_TIME: ControllerConfig,
    DECAY1_TIME: ControllerConfig,
    DECAY2_TIME: ControllerConfig,
    RELEASE1_TIME: ControllerConfig,
    RELEASE2_TIME: ControllerConfig,
    DECAY2_LEVEL: ControllerConfig,
    SUSTAIN_LEVEL: ControllerConfig,
    RELEASE2_LEVEL: ControllerConfig,
    CURVE: ControllerConfigNRPN
    LEVEL: ControllerConfigNRPN
    TIME: ControllerConfigNRPN
    MAX_LOOPS: ControllerConfigCC
    TOGGLE_STAGE: ControllerConfigCC
    SELECT: ControllerConfigCC
    SELECT_ENV3_ID: ControllerConfigCC
    TRIGGER: ControllerConfigCCWithValue
    RELEASE: ControllerConfigCCWithValue
    LOOP: ControllerConfigCCWithValue
    INVERT: ControllerConfigCCWithValue
    RESET_ON_TRIGGER: ControllerConfigCCWithValue
    RELEASE_MODE: ControllerConfigCCWithValue
    LOOP_MODE: ControllerConfigCCWithValue
    OUTPUT: ControllerConfig
}

const controllersEnv = (ctrlIndex: number): MidiCtrlEnv => ({
    props: { label: `Env ${1 + ctrlIndex}`, ctrlIndex },
    DELAY_TIME: { id: ControllerId.ENV_DELAY_TIME, label: 'Delay time', isTargetDigi: true, type: 'pot'},
    ATTACK_TIME: { id: ControllerId.ENV_ATTACK_TIME, label: 'Attack time', isTargetDigi: true, type: 'pot'},
    DECAY1_TIME: { id: ControllerId.ENV_DECAY1_TIME, label: 'Decay 1 time', isTargetDigi: true, type: 'pot'},
    DECAY2_TIME: { id: ControllerId.ENV_DECAY2_TIME, label: 'Decay 2 time', isTargetDigi: true, type: 'pot'},
    RELEASE1_TIME: { id: ControllerId.ENV_RELEASE1_TIME, label: 'Release 1 time', isTargetDigi: true, type: 'pot'},
    RELEASE2_TIME: { id: ControllerId.ENV_RELEASE2_TIME, label: 'Release 2 time', isTargetDigi: true, type: 'pot'},
    DECAY2_LEVEL: { id: ControllerId.ENV_DECAY2_LEVEL, label: 'Decay 2 level', isTargetDigi: true, type: 'pot'},
    SUSTAIN_LEVEL: { id: ControllerId.ENV_SUSTAIN_LEVEL, label: 'Sustain level', isTargetDigi: true, type: 'pot'},
    RELEASE2_LEVEL: { id: ControllerId.ENV_RELEASE2_LEVEL, label: 'Release 2 level', isTargetDigi: true, type: 'pot'},
    CURVE: { id: ControllerId.ENV_CURVE, label: 'Curve', type: 'pot', addr: NRPN.ENV_CURVE },
    LEVEL: { id: ControllerId.ENV_LEVEL, label: 'Level', type: 'pot', addr: NRPN.ENV_LEVEL },
    TIME: { id: ControllerId.ENV_TIME, label: 'Time', type: 'pot', addr: NRPN.ENV_TIME },
    MAX_LOOPS: { id: ControllerId.ENV_MAX_LOOPS, label: 'Max loops', type: 'pot', cc: CC.ENV_MAX_LOOPS },
    TOGGLE_STAGE: { id: ControllerId.ENV_TOGGLE_STAGE, label: 'Stage on/off', type: 'pot', cc: CC.ENV_TOGGLE_STAGE }, // 4 bit stage, 7 bit on/off
    SELECT: { id: ControllerId.ENV_SELECT, label: 'Select env', type: 'pot', cc: CC.ENV_SELECT_ENV },
    SELECT_ENV3_ID: { id: ControllerId.ENV_SELECT_ENV3_ID, label: 'Select env 3', type: 'pot', cc: CC.ENV_SELECT_ENV3_ID },
    TRIGGER: {
        id: ControllerId.ENV_TRIGGER,
        label: 'Trigger',
        type: 'button',
        cc: BUTTONS.BUTTONS_RIGHT.cc,
        values: [
            BUTTONS.BUTTONS_RIGHT.values.ENV_TRIGGER,
        ],
    },
    RELEASE: {
        id: ControllerId.ENV_RELEASE,
        label: 'Release',
        type: 'button',
        cc: BUTTONS.BUTTONS_RIGHT.cc,
        values: [
            BUTTONS.BUTTONS_RIGHT.values.ENV_RELEASE,
        ],
    },
    INVERT: {
        id: ControllerId.ENV_INVERT,
        label: 'Invert',
        type: 'button',
        cc: BUTTONS.BUTTONS_RIGHT.cc,
        values: [
            BUTTONS.BUTTONS_RIGHT.values.ENV_INVERT_OFF,
            BUTTONS.BUTTONS_RIGHT.values.ENV_INVERT_ON,
        ],
    },
    RESET_ON_TRIGGER: {
        id: ControllerId.ENV_RESET_ON_TRIGGER,
        label: 'Reset on trigger',
        type: 'button',
        cc: BUTTONS.BUTTONS_RIGHT.cc,
        values: [
            BUTTONS.BUTTONS_RIGHT.values.ENV_RESET_ON_TRIGGER_OFF,
            BUTTONS.BUTTONS_RIGHT.values.ENV_RESET_ON_TRIGGER_ON,
        ],
    },
    RELEASE_MODE: {
        id: ControllerId.ENV_RELEASE_MODE,
        label: 'Release mode',
        type: 'button',
        cc: BUTTONS.BUTTONS_RIGHT.cc,
        values: [
            BUTTONS.BUTTONS_RIGHT.values.ENV_RELEASE_MODE_NORMAL,
            BUTTONS.BUTTONS_RIGHT.values.ENV_RELEASE_MODE_SKIP_R1,
            BUTTONS.BUTTONS_RIGHT.values.ENV_RELEASE_MODE_FREE_RUN,
        ],
    },
    LOOP: {
        id: ControllerId.ENV_LOOP,
        label: 'Loop on/off',
        type: 'button',
        cc: BUTTONS.BUTTONS_RIGHT.cc,
        values: [
            BUTTONS.BUTTONS_RIGHT.values.ENV_LOOP_OFF,
            BUTTONS.BUTTONS_RIGHT.values.ENV_LOOP_ON,
        ],
    },
    LOOP_MODE: {
        id: ControllerId.ENV_LOOP_MODE,
        label: 'Loop mode',
        type: 'button',
        cc: BUTTONS.BUTTONS_RIGHT.cc,
        values: [
            BUTTONS.BUTTONS_RIGHT.values.ENV_LOOP_MODE_GATED,
            BUTTONS.BUTTONS_RIGHT.values.ENV_LOOP_MODE_COUNTED,
            BUTTONS.BUTTONS_RIGHT.values.ENV_LOOP_MODE_INFINITE,
        ],
    },
    OUTPUT: {
        id: ControllerId.ENVELOPE1 + ctrlIndex,
        label: `Env ${1 + ctrlIndex}`,
        type: 'output',
        isSourceDigi: true
    },
})

export default controllersEnv