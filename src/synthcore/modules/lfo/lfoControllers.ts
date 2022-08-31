import NRPN from '../../../midi/mapNRPN'
import { BUTTONS } from '../../../midi/buttons'
import {
    FuncProps,
    ControllerConfig,
    ControllerConfigCCWithValue,
    ControllerConfigNRPN
} from '../../../midi/types'
import {
    ControllerIdLfoDst,
    ControllerIdLfoNonMod,
    ControllerIdNonMod,
    ControllerIdSrc
} from '../../../midi/controllerIds'
import { timeResponseMapper } from '../common/responseMappers'


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
})

// TODO: Make this select from controllers.ts
export const lfoCtrls = lfoControllers(0)

export default lfoControllers