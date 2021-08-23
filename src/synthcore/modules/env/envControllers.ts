import CC from '../../../midi/mapCC'
import NRPN from '../../../midi/mapNRPN'
import { BUTTONS } from '../../../midi/buttons'
import { FuncProps, ControllerConfig, ControllerConfigCC, ControllerConfigCCWithValue, ControllerConfigNRPN } from '../../../midi/types'
import { ControllerIdEnvDst, ControllerIdNonMod, ControllerIdSrc } from '../../../midi/controllerIds'

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

const envControllers = (ctrlIndex: number): MidiCtrlEnv => ({
    props: { label: `Env ${1 + ctrlIndex}`, ctrlIndex },
    DELAY_TIME: { id: ControllerIdEnvDst.DELAY_TIME, label: 'Delay time', shortLabel: 'Delay', isTargetDigi: true, type: 'pot' },
    ATTACK_TIME: { id: ControllerIdEnvDst.ATTACK_TIME, label: 'Attack time', shortLabel: 'Attack', isTargetDigi: true, type: 'pot' },
    DECAY1_TIME: { id: ControllerIdEnvDst.DECAY1_TIME, label: 'Decay 1 time', shortLabel: 'Decay 1', isTargetDigi: true, type: 'pot' },
    DECAY2_TIME: { id: ControllerIdEnvDst.DECAY2_TIME, label: 'Decay 2 time', shortLabel: 'Decay 2', isTargetDigi: true, type: 'pot' },
    SUSTAIN_LEVEL: { id: ControllerIdEnvDst.SUSTAIN_LEVEL, label: 'Sustain level', shortLabel: 'Sustain', isTargetDigi: true, type: 'pot' },
    RELEASE1_TIME: { id: ControllerIdEnvDst.RELEASE1_TIME, label: 'Release 1 time', shortLabel: 'Release 1', isTargetDigi: true, type: 'pot' },
    RELEASE2_TIME: { id: ControllerIdEnvDst.RELEASE2_TIME, label: 'Release 2 time', shortLabel: 'Release 2', isTargetDigi: true, type: 'pot' },
    DECAY2_LEVEL: { id: ControllerIdEnvDst.DECAY2_LEVEL, label: 'Decay 2 level', shortLabel: 'D2 level', isTargetDigi: true, type: 'pot' },
    RELEASE2_LEVEL: { id: ControllerIdEnvDst.RELEASE2_LEVEL, label: 'Release 2 level', shortLabel: 'R2 level', isTargetDigi: true, type: 'pot' },
    CURVE: { id: ControllerIdNonMod.ENV_CURVE, label: 'Curve', type: 'pot', addr: NRPN.ENV_CURVE },
    LEVEL: { id: ControllerIdNonMod.ENV_LEVEL, label: 'Level', type: 'pot', addr: NRPN.ENV_LEVEL },
    TIME: { id: ControllerIdNonMod.ENV_TIME, label: 'Time', type: 'pot', addr: NRPN.ENV_TIME },
    MAX_LOOPS: { id: ControllerIdNonMod.ENV_MAX_LOOPS, label: 'Max loops', type: 'pot', cc: CC.ENV_MAX_LOOPS },
    TOGGLE_STAGE: { id: ControllerIdNonMod.ENV_TOGGLE_STAGE, label: 'Stage on/off', type: 'pot', cc: CC.ENV_TOGGLE_STAGE }, // 4 bit stage, 7 bit on/off
    SELECT: { id: ControllerIdNonMod.ENV_SELECT, label: 'Select env', type: 'pot', cc: CC.ENV_SELECT_ENV },
    SELECT_ENV3_ID: { id: ControllerIdNonMod.ENV_SELECT_ENV3_ID, label: 'Select env 3', type: 'pot', cc: CC.ENV_SELECT_ENV3_ID },
    TRIGGER: {
        id: ControllerIdNonMod.ENV_TRIGGER,
        label: 'Trigger',
        type: 'button',
        cc: BUTTONS.BUTTONS_RIGHT.cc,
        values: [
            BUTTONS.BUTTONS_RIGHT.values.ENV_TRIGGER,
        ],
    },
    RELEASE: {
        id: ControllerIdNonMod.ENV_RELEASE,
        label: 'Release',
        type: 'button',
        cc: BUTTONS.BUTTONS_RIGHT.cc,
        values: [
            BUTTONS.BUTTONS_RIGHT.values.ENV_RELEASE,
        ],
    },
    INVERT: {
        id: ControllerIdNonMod.ENV_INVERT,
        label: 'Invert',
        type: 'button',
        cc: BUTTONS.BUTTONS_RIGHT.cc,
        values: [
            BUTTONS.BUTTONS_RIGHT.values.ENV_INVERT_OFF,
            BUTTONS.BUTTONS_RIGHT.values.ENV_INVERT_ON,
        ],
    },
    RESET_ON_TRIGGER: {
        id: ControllerIdNonMod.ENV_RESET_ON_TRIGGER,
        label: 'Reset on trigger',
        type: 'button',
        cc: BUTTONS.BUTTONS_RIGHT.cc,
        values: [
            BUTTONS.BUTTONS_RIGHT.values.ENV_RESET_ON_TRIGGER_OFF,
            BUTTONS.BUTTONS_RIGHT.values.ENV_RESET_ON_TRIGGER_ON,
        ],
    },
    RELEASE_MODE: {
        id: ControllerIdNonMod.ENV_RELEASE_MODE,
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
        id: ControllerIdNonMod.ENV_LOOP,
        label: 'Loop on/off',
        type: 'button',
        cc: BUTTONS.BUTTONS_RIGHT.cc,
        values: [
            BUTTONS.BUTTONS_RIGHT.values.ENV_LOOP_OFF,
            BUTTONS.BUTTONS_RIGHT.values.ENV_LOOP_ON,
        ],
    },
    LOOP_MODE: {
        id: ControllerIdNonMod.ENV_LOOP_MODE,
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
        // does not have a midi mapping as it is only used as a modulation source
        id: ControllerIdSrc.ENVELOPE1 + ctrlIndex,
        label: `Env ${1 + ctrlIndex}`,
        type: 'output',
        isSourceDigi: true
    },
})

export default envControllers