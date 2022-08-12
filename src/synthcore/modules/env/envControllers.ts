import CC from '../../../midi/mapCC'
import NRPN from '../../../midi/mapNRPN'
import { BUTTONS } from '../../../midi/buttons'
import {
    FuncProps,
    ControllerConfig,
    ControllerConfigCC,
    ControllerConfigCCWithValue,
    ControllerConfigNRPN, MidiGroup
} from '../../../midi/types'
import {
    ControllerIdEnvDst,
    ControllerIdEnvNonMod,
    ControllerIdEnvStageNonMod,
    ControllerIdNonMod,
    ControllerIdSrc
} from '../../../midi/controllerIds'
import { timeResponseMapper } from './envResponseMappers'
import { levelResponseMapper } from '../common/responseMappers'

interface EnvControllers {
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
    ENV_GATE: ControllerConfigCCWithValue
    LOOP: ControllerConfigCCWithValue
    INVERT: ControllerConfigCCWithValue
    RESET_ON_TRIGGER: ControllerConfigCCWithValue
    RELEASE_MODE: ControllerConfigCCWithValue
    LOOP_MODE: ControllerConfigCCWithValue
    BIPOLAR: ControllerConfigCCWithValue
    OUTPUT: ControllerConfig
}

const envControllers = (ctrlIndex: number): EnvControllers => {
    const controllers: EnvControllers = {
        props: { label: `Env ${1 + ctrlIndex}`, ctrlIndex },
        // TODO: What do these do??? Looks like its modulation targets.
        DELAY_TIME: {
            id: ControllerIdEnvDst.DELAY_TIME,
            label: 'Delay time',
            shortLabel: 'Delay',
            isDstDigi: true,
            type: 'pot'
        },
        ATTACK_TIME: {
            id: ControllerIdEnvDst.ATTACK_TIME,
            label: 'Attack time',
            shortLabel: 'Attack',
            isDstDigi: true,
            type: 'pot'
        },
        DECAY1_TIME: {
            id: ControllerIdEnvDst.DECAY1_TIME,
            label: 'Decay 1 time',
            shortLabel: 'Decay 1',
            isDstDigi: true,
            type: 'pot'
        },
        DECAY2_TIME: {
            id: ControllerIdEnvDst.DECAY2_TIME,
            label: 'Decay 2 time',
            shortLabel: 'Decay 2',
            isDstDigi: true,
            type: 'pot'
        },
        SUSTAIN_LEVEL: {
            id: ControllerIdEnvDst.SUSTAIN_LEVEL,
            label: 'Sustain level',
            shortLabel: 'Sustain',
            isDstDigi: true,
            type: 'pot'
        },
        RELEASE1_TIME: {
            id: ControllerIdEnvDst.RELEASE1_TIME,
            label: 'Release 1 time',
            shortLabel: 'Release 1',
            isDstDigi: true,
            type: 'pot'
        },
        RELEASE2_TIME: {
            id: ControllerIdEnvDst.RELEASE2_TIME,
            label: 'Release 2 time',
            shortLabel: 'Release 2',
            isDstDigi: true,
            type: 'pot'
        },
        DECAY2_LEVEL: {
            id: ControllerIdEnvDst.DECAY2_LEVEL,
            label: 'Decay 2 level',
            shortLabel: 'D2 level',
            isDstDigi: true,
            type: 'pot'
        },
        RELEASE2_LEVEL: {
            id: ControllerIdEnvDst.RELEASE2_LEVEL,
            label: 'Release 2 level',
            shortLabel: 'R2 level',
            isDstDigi: true,
            type: 'pot'
        },
        CURVE: { id: ControllerIdEnvStageNonMod.ENV_CURVE, label: 'Curve', type: 'pot', addr: NRPN.ENV_CURVE },
        LEVEL: {
            id: ControllerIdNonMod.ENV_LEVEL,
            label: 'Level',
            type: 'pot',
            addr: NRPN.ENV_LEVEL,
            bipolar: true,
            uiResponse: levelResponseMapper,
        },
        TIME: {
            id: ControllerIdNonMod.ENV_TIME,
            label: 'Time',
            type: 'pot',
            addr: NRPN.ENV_TIME,
            uiResponse: timeResponseMapper,
        },
        MAX_LOOPS: { id: ControllerIdEnvNonMod.ENV_MAX_LOOPS, label: 'Max loops', type: 'pot', cc: CC.ENV_MAX_LOOPS },
        TOGGLE_STAGE: {
            id: ControllerIdEnvStageNonMod.ENV_TOGGLE_STAGE,
            label: 'Stage on/off',
            type: 'pot',
            cc: CC.ENV_TOGGLE_STAGE
        }, // 4 bit stage, 7 bit on/off
        SELECT: { id: ControllerIdNonMod.ENV_SELECT, label: 'Select env', type: 'pot', cc: CC.ENV_SELECT_ENV },
        SELECT_ENV3_ID: {
            id: ControllerIdNonMod.ENV_SELECT_ENV3_ID,
            label: 'Select env 3',
            type: 'pot',
            cc: CC.ENV_SELECT_ENV3_ID
        },
        ENV_GATE: {
            id: ControllerIdNonMod.ENV_GATE,
            label: 'Env gate',
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.ENV_TRIGGER,
                BUTTONS.BUTTONS_RIGHT.values.ENV_RELEASE,
            ],
        },
        INVERT: {
            id: ControllerIdEnvNonMod.ENV_INVERT,
            label: 'Invert',
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.ENV_INVERT_OFF,
                BUTTONS.BUTTONS_RIGHT.values.ENV_INVERT_ON,
            ],
        },
        RESET_ON_TRIGGER: {
            id: ControllerIdEnvNonMod.ENV_RESET_ON_TRIGGER,
            label: 'Reset on trigger',
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.ENV_RESET_ON_TRIGGER_OFF,
                BUTTONS.BUTTONS_RIGHT.values.ENV_RESET_ON_TRIGGER_ON,
            ],
        },
        RELEASE_MODE: {
            id: ControllerIdEnvNonMod.ENV_RELEASE_MODE,
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
            id: ControllerIdEnvNonMod.ENV_LOOP,
            label: 'Loop on/off',
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.ENV_LOOP_OFF,
                BUTTONS.BUTTONS_RIGHT.values.ENV_LOOP_ON,
            ],
        },
        LOOP_MODE: {
            id: ControllerIdEnvNonMod.ENV_LOOP_MODE,
            label: 'Loop mode',
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.ENV_LOOP_MODE_GATED,
                BUTTONS.BUTTONS_RIGHT.values.ENV_LOOP_MODE_COUNTED,
                BUTTONS.BUTTONS_RIGHT.values.ENV_LOOP_MODE_INFINITE,
            ],
        },
        BIPOLAR: {
            id: ControllerIdEnvNonMod.ENV_BIPOLAR,
            label: 'Bipolar',
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.ENV_BIPOLAR_OFF,
                BUTTONS.BUTTONS_RIGHT.values.ENV_BIPOLAR_ON,
            ],
        },
        OUTPUT: {
            // does not have a midi mapping as it is only used as a modulation source
            id: ControllerIdSrc.ENVELOPE1 + ctrlIndex,
            label: `Env ${1 + ctrlIndex}`,
            type: 'output',
            isSourceDigi: true
        },
    }

    // add midi group (indicator that we need to select env before sending a value) to every controller, this way
    // we don't forget to add it if a new controller is added
    Object.keys(controllers).forEach((key) => {
        controllers['OUTPUT'] = {
            ...controllers['OUTPUT'],
            midiGroup: MidiGroup.ENV,
        }
    })

    return controllers
}

// TODO: Make this select from controllers.ts
export const envCtrls = envControllers(0)

export default envControllers