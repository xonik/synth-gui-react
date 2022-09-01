import NRPN from '../../../midi/mapNRPN'
import { BUTTONS } from '../../../midi/buttons'
import {
    FuncProps,
    ControllerConfig,
    ControllerConfigCCWithValue,
    ControllerConfigNRPN,
    ControllerConfigCC
} from '../../../midi/types'
import {
    ControllerIdLfoDst,
    ControllerIdLfoNonMod,
    ControllerIdNonMod,
    ControllerIdSrc
} from '../../../midi/controllerIds'
import { timeResponseMapper, uniBipolarLevelResponseMapper } from '../common/responseMappers'
import CC from '../../../midi/mapCC'


interface ControllersLfo {
    props: FuncProps
    RATE: ControllerConfigNRPN
    DEPTH: ControllerConfigNRPN
    DELAY: ControllerConfigNRPN
    LFO: ControllerConfigCCWithValue
    SHAPE: ControllerConfigCCWithValue
    SYNC: ControllerConfigCCWithValue
    RESET: ControllerConfigCCWithValue
    ONCE: ControllerConfigCCWithValue
    OUTPUT: ControllerConfig
    SELECT: ControllerConfigCC
    BIPOLAR: ControllerConfigCCWithValue
    INVERT: ControllerConfigCC
    LOOP: ControllerConfigCC
    LOOP_MODE: ControllerConfigCC
    MAX_LOOPS: ControllerConfigCC
    RESET_ON_TRIGGER: ControllerConfigCC
    RESET_ON_STOP: ControllerConfigCC
    RESET_LEVEL_ON_CLOCK: ControllerConfigCC
    SYNC_TO_CLOCK: ControllerConfigCC
    GATED: ControllerConfigCC
}

const lfoControllers = (ctrlIndex: number): ControllersLfo => ({
    props: {
        label: `LFO ${1 + ctrlIndex}`,
        ctrlIndex
    },
    // Pots
    RATE: {
        id: ControllerIdLfoDst.RATE,
        label: 'Rate',
        isDstDigi: true,
        type: 'pot',
        addr: NRPN.LFO_RATE,
        uiResponse: timeResponseMapper,
    },
    DEPTH: {
        id: ControllerIdLfoDst.DEPTH,
        label: 'Depth',
        isDstDigi: true,
        type: 'pot',
        addr: NRPN.LFO_DEPTH,
        uiResponse: uniBipolarLevelResponseMapper,
    },
    DELAY: {
        id: ControllerIdLfoDst.DELAY,
        label: 'Delay',
        isDstDigi: true,
        type: 'pot',
        addr: NRPN.LFO_DELAY,
        uiResponse: timeResponseMapper,
    },
    // Buttons
    LFO: {
        id: ControllerIdNonMod.LFO_LFO,
        label: 'Select',
        type: 'button',
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.LFO1,
            BUTTONS.BUTTONS_LEFT.values.LFO2,
            BUTTONS.BUTTONS_LEFT.values.LFO3,
            BUTTONS.BUTTONS_LEFT.values.LFO4,
        ],
    },
    SHAPE: {
        id: ControllerIdLfoNonMod.LFO_SHAPE,
        label: 'Shape',
        type: 'button',
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.LFO_SHAPE_SAW,
            BUTTONS.BUTTONS_LEFT.values.LFO_SHAPE_TRI,
            BUTTONS.BUTTONS_LEFT.values.LFO_SHAPE_SQR,
            BUTTONS.BUTTONS_LEFT.values.LFO_SHAPE_SIN,
            BUTTONS.BUTTONS_LEFT.values.LFO_SHAPE_SH,
        ],
    },
    SYNC: {
        id: ControllerIdLfoNonMod.LFO_SYNC,
        label: 'Sync',
        type: 'button',
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.LFO_SYNC_OFF,
            BUTTONS.BUTTONS_LEFT.values.LFO_SYNC_ON,
        ],
    },
    RESET: {
        id: ControllerIdLfoNonMod.LFO_RESET,
        label: 'Reset',
        type: 'button',
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.LFO_RESET_OFF,
            BUTTONS.BUTTONS_LEFT.values.LFO_RESET_ON,
        ],
    },
    ONCE: {
        id: ControllerIdLfoNonMod.LFO_ONCE,
        label: 'Once',
        type: 'button',
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.LFO_ONCE_OFF,
            BUTTONS.BUTTONS_LEFT.values.LFO_ONCE_ON,
        ],
    },
    OUTPUT: {
        // does not have a midi mapping as it is only used as a modulation source
        id: ControllerIdSrc.LFO1 + ctrlIndex,
        label: `LFO ${1 + ctrlIndex}`,
        type: 'output',
        isSourceDigi: true
    },
    SELECT: { id: ControllerIdNonMod.LFO_SELECT, label: 'Select lfo', type: 'pot', cc: CC.LFO_SELECT_LFO },
    BIPOLAR: {
        id: ControllerIdLfoNonMod.LFO_BIPOLAR,
        label: 'Bipolar',
        type: 'button',
        cc: BUTTONS.BUTTONS_RIGHT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.LFO_BIPOLAR_OFF,
            BUTTONS.BUTTONS_LEFT.values.LFO_BIPOLAR_ON,
        ],
    },
    INVERT: {
        id: ControllerIdLfoNonMod.LFO_INVERT,
        label: 'Invert',
        type: 'button',
        cc: BUTTONS.BUTTONS_RIGHT.cc,
        values: [
            BUTTONS.BUTTONS_CENTER.values.LFO_INVERT_OFF,
            BUTTONS.BUTTONS_CENTER.values.LFO_INVERT_ON,
        ],
    },
    LOOP: {
        id: ControllerIdLfoNonMod.LFO_LOOP,
        label: 'Loop on/off',
        type: 'button',
        cc: BUTTONS.BUTTONS_RIGHT.cc,
        values: [
            BUTTONS.BUTTONS_CENTER.values.LFO_LOOP_OFF,
            BUTTONS.BUTTONS_CENTER.values.LFO_LOOP_ON,
        ],
    },
    LOOP_MODE: {
        id: ControllerIdLfoNonMod.LFO_LOOP_MODE,
        label: 'Loop mode',
        type: 'button',
        cc: BUTTONS.BUTTONS_RIGHT.cc,
        values: [
            //BUTTONS.BUTTONS_CENTER.values.LFO_LOOP_MODE_GATED,
            BUTTONS.BUTTONS_CENTER.values.LFO_LOOP_MODE_COUNTED,
            BUTTONS.BUTTONS_CENTER.values.LFO_LOOP_MODE_INFINITE,
        ],
    },
    MAX_LOOPS: { id: ControllerIdLfoNonMod.LFO_MAX_LOOPS, label: 'Max loops', type: 'pot', cc: CC.LFO_MAX_LOOPS },
    RESET_ON_TRIGGER: {
        id: ControllerIdLfoNonMod.LFO_RESET_ON_TRIGGER,
        label: 'Reset on trigger',
        type: 'button',
        cc: BUTTONS.BUTTONS_RIGHT.cc,
        values: [
            BUTTONS.BUTTONS_CENTER.values.LFO_RESET_ON_TRIGGER_OFF,
            BUTTONS.BUTTONS_CENTER.values.LFO_RESET_ON_TRIGGER_ON,
        ],
    },
    RESET_ON_STOP: {
        id: ControllerIdLfoNonMod.LFO_RESET_ON_STOP,
        label: 'Reset on stop',
        type: 'button',
        cc: BUTTONS.BUTTONS_RIGHT.cc,
        values: [
            BUTTONS.BUTTONS_CENTER.values.LFO_RESET_ON_STOP_OFF,
            BUTTONS.BUTTONS_CENTER.values.LFO_RESET_ON_STOP_ON,
        ],
    },
    RESET_LEVEL_ON_CLOCK: {
        id: ControllerIdLfoNonMod.LFO_RESET_LEVEL_ON_CLOCK,
        label: 'Reset level on clock',
        type: 'button',
        cc: BUTTONS.BUTTONS_RIGHT.cc,
        values: [
            BUTTONS.BUTTONS_CENTER.values.LFO_RESET_LEVEL_ON_CLOCK_OFF,
            BUTTONS.BUTTONS_CENTER.values.LFO_RESET_LEVEL_ON_CLOCK_ON,
        ],
    },
    SYNC_TO_CLOCK: {
        id: ControllerIdLfoNonMod.LFO_SYNC_TO_CLOCK,
        label: 'Sync to clock',
        type: 'button',
        cc: BUTTONS.BUTTONS_RIGHT.cc,
        values: [
            BUTTONS.BUTTONS_CENTER.values.LFO_SYNC_TO_CLOCK_OFF,
            BUTTONS.BUTTONS_CENTER.values.LFO_SYNC_TO_CLOCK_ON,
        ],
    },
    GATED: {
        id: ControllerIdLfoNonMod.LFO_GATED,
        label: 'Gated',
        type: 'button',
        cc: BUTTONS.BUTTONS_RIGHT.cc,
        values: [
            BUTTONS.BUTTONS_CENTER.values.LFO_GATED_OFF,
            BUTTONS.BUTTONS_CENTER.values.LFO_GATED_ON,
        ],
    },

})

// TODO: Make this select from controllers.ts
export const lfoCtrls = lfoControllers(0)

export default lfoControllers