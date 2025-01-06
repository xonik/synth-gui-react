import NRPN from '../../../midi/mapNRPN'
import {
    FuncProps,
    ControllerConfig,
    ControllerConfigButton,
    ControllerConfigNRPN,
    ControllerConfigNRPNWithValue,
    ControllerConfigCC
} from '../../../midi/types'
import {
    ControllerIdLfoDst,
    ControllerIdLfoNonMod, ControllerIdLfoStageNonMod,
    ControllerIdNonMod,
    ControllerIdSrc
} from '../controllers/controllerIds'
import { timeResponseMapper } from '../common/responseMappers'
import CC from '../../../midi/mapCC'
import { StageId } from './types'
import { curveValuesUsed } from './generatedTypes'
import {buttonMidiValues} from "../../../midi/buttonMidiValues";


interface ControllersLfo {
    props: FuncProps
    RATE: ControllerConfigNRPN
    DEPTH: ControllerConfigNRPN
    DELAY: ControllerConfigNRPN
    LFO: ControllerConfigButton
    SHAPE: ControllerConfigButton
    SYNC: ControllerConfigButton
    RESET: ControllerConfigButton
    OUTPUT: ControllerConfig
    SELECT: ControllerConfigCC
    BIPOLAR: ControllerConfigButton
    INVERT: ControllerConfigButton
    GATE: ControllerConfigButton
    LOOP: ControllerConfigButton
    LOOP_MODE: ControllerConfigButton
    MAX_LOOPS: ControllerConfigCC
    RESET_ON_TRIGGER: ControllerConfigButton
    RESET_ON_STOP: ControllerConfigButton
    RESET_LEVEL_ON_CLOCK: ControllerConfigButton
    SYNC_TO_CLOCK: ControllerConfigButton
    GATED: ControllerConfigButton
    CURVE: ControllerConfigNRPNWithValue
    TOGGLE_STAGE: ControllerConfigCC
    BALANCE: ControllerConfigNRPN
    PHASE_OFFSET: ControllerConfigNRPN
    LEVEL_OFFSET: ControllerConfigNRPN
    RANDOM_PHASE: ControllerConfigButton
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
        values: [
            // TODO!
        ]
    },
    SHAPE: {
        id: ControllerIdLfoNonMod.LFO_SHAPE,
        label: 'Shape',
        type: 'button',
        values: [
            buttonMidiValues.LFO_SHAPE_SAW,
            buttonMidiValues.LFO_SHAPE_TRI,
            buttonMidiValues.LFO_SHAPE_SQR,
            buttonMidiValues.LFO_SHAPE_SIN,
            buttonMidiValues.LFO_SHAPE_RANDOM,
            buttonMidiValues.LFO_SHAPE_CUSTOM,
        ],
    },
    SYNC: {
        id: ControllerIdLfoNonMod.LFO_SYNC,
        label: 'Sync',
        type: 'button',
        values: [
            buttonMidiValues.LFO_SYNC_OFF,
            buttonMidiValues.LFO_SYNC_ON,
        ],
    },
    RESET: {
        id: ControllerIdLfoNonMod.LFO_RESET,
        label: 'Reset',
        type: 'button',
        values: [
            buttonMidiValues.LFO_RESET_OFF,
            buttonMidiValues.LFO_RESET_ON,
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
        values: [
            buttonMidiValues.LFO_BIPOLAR_OFF,
            buttonMidiValues.LFO_BIPOLAR_ON,
        ],
    },
    INVERT: {
        id: ControllerIdLfoNonMod.LFO_INVERT,
        label: 'Invert',
        type: 'button',
        values: [
            buttonMidiValues.LFO_INVERT_OFF,
            buttonMidiValues.LFO_INVERT_ON,
        ],
    },
    GATE: {
        id: ControllerIdLfoNonMod.LFO_GATE,
        label: 'Trigger',
        type: 'button',
        values: [
            buttonMidiValues.LFO_TRIGGER,
            buttonMidiValues.LFO_RELEASE,
        ],
    },
    LOOP: {
        id: ControllerIdLfoNonMod.LFO_LOOP,
        label: 'Loop on/off',
        type: 'button',
        values: [
            buttonMidiValues.LFO_LOOP_OFF,
            buttonMidiValues.LFO_LOOP_ON,
        ],
    },
    LOOP_MODE: {
        id: ControllerIdLfoNonMod.LFO_LOOP_MODE,
        label: 'Loop mode',
        type: 'button',
        values: [
            //buttonMidiValues.LFO_LOOP_MODE_GATED,
            buttonMidiValues.LFO_LOOP_MODE_COUNTED,
            buttonMidiValues.LFO_LOOP_MODE_INFINITE,
        ],
    },
    MAX_LOOPS: { id: ControllerIdLfoNonMod.LFO_MAX_LOOPS, label: 'Max loops', type: 'pot', cc: CC.LFO_MAX_LOOPS },
    RESET_ON_TRIGGER: {
        id: ControllerIdLfoNonMod.LFO_RESET_ON_TRIGGER,
        label: 'Reset on trigger',
        type: 'button',
        values: [
            buttonMidiValues.LFO_RESET_ON_TRIGGER_OFF,
            buttonMidiValues.LFO_RESET_ON_TRIGGER_ON,
        ],
    },
    RESET_ON_STOP: {
        id: ControllerIdLfoNonMod.LFO_RESET_ON_STOP,
        label: 'Reset on stop',
        type: 'button',
        values: [
            buttonMidiValues.LFO_RESET_ON_STOP_OFF,
            buttonMidiValues.LFO_RESET_ON_STOP_ON,
        ],
    },
    RESET_LEVEL_ON_CLOCK: {
        id: ControllerIdLfoNonMod.LFO_RESET_LEVEL_ON_CLOCK,
        label: 'Reset level on clock',
        type: 'button',
        values: [
            buttonMidiValues.LFO_RESET_LEVEL_ON_CLOCK_OFF,
            buttonMidiValues.LFO_RESET_LEVEL_ON_CLOCK_ON,
        ],
    },
    SYNC_TO_CLOCK: {
        id: ControllerIdLfoNonMod.LFO_SYNC_TO_CLOCK,
        label: 'Sync to clock',
        type: 'button',
        values: [
            buttonMidiValues.LFO_SYNC_TO_CLOCK_OFF,
            buttonMidiValues.LFO_SYNC_TO_CLOCK_ON,
        ],
    },
    GATED: {
        id: ControllerIdLfoNonMod.LFO_GATED,
        label: 'Gated',
        type: 'button',
        values: [
            buttonMidiValues.LFO_GATED_OFF,
            buttonMidiValues.LFO_GATED_ON,
        ],
    },
    CURVE: {
        id: ControllerIdLfoStageNonMod.LFO_CURVE,
        label: 'Curve',
        type: 'pot',
        addr: NRPN.LFO_CURVE,
        values: curveValuesUsed,
        legalValueIndexes: [
            StageId.ATTACK,
            StageId.DECAY,
        ]
    },
    TOGGLE_STAGE: {
        id: ControllerIdLfoStageNonMod.LFO_TOGGLE_STAGE,
        label: 'Stage on/off',
        type: 'pot',
        cc: CC.LFO_TOGGLE_STAGE,
        legalValueIndexes: [
            StageId.DELAY,
            StageId.DECAY,
        ]
    }, // 4 bit stage, 7 bit on/off
    BALANCE: {
        id: ControllerIdLfoDst.BALANCE,
        label: 'Balance',
        type: 'pot',
        isDstDigi: true,
        addr: NRPN.LFO_BALANCE
    },
    PHASE_OFFSET: {
        id: ControllerIdLfoDst.PHASE_OFFSET,
        label: 'Phase offset',
        shortLabel: 'Offset Ph',
        type: 'pot',
        isDstDigi: true,
        addr: NRPN.LFO_PHASE_OFFSET,
    },
    LEVEL_OFFSET: {
        id: ControllerIdLfoDst.LEVEL_OFFSET,
        label: 'Level offset',
        shortLabel: 'Offset L',
        type: 'pot',
        isDstDigi: true,
        addr: NRPN.LFO_LEVEL_OFFSET,
        bipolar: true,
    },
    RANDOM_PHASE: {
        id: ControllerIdLfoNonMod.LFO_RANDOM_PHASE,
        label: 'Random phase on trigger',
        type: 'pot',
        values: [
            buttonMidiValues.LFO_RANDOM_PHASE_OFF,
            buttonMidiValues.LFO_RANDOM_PHASE_ON,
        ],

    }, // 4 bit stage, 7 bit on/off
})

// TODO: Make this select from controllers.ts
export const lfoCtrls = lfoControllers(0)

export default lfoControllers