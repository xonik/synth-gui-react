import CC from '../../../midi/mapCC'
import { BUTTONS } from '../../../midi/buttons'
import { FuncProps, ControllerConfig, ControllerConfigCC, ControllerConfigCCWithValue } from '../../../midi/types'
import {
    ControllerIdLfoDst,
    ControllerIdNonMod,
    ControllerIdSrc
} from '../../../midi/controllerIds'

interface ControllersLfo {
    props: FuncProps
    RATE: ControllerConfigCC
    DEPTH: ControllerConfigCC
    DELAY: ControllerConfigCC
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
        cc: CC.LFO_RATE
    },
    DEPTH: {
        id: ControllerIdLfoDst.DEPTH,
        label: 'Depth',
        isDstDigi: true,
        type: 'pot',
        cc: CC.LFO_DEPTH
    },
    DELAY: {
        id: ControllerIdLfoDst.DELAY,
        label: 'Delay',
        isDstDigi: true,
        type: 'pot',
        cc: CC.LFO_DELAY
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
        id: ControllerIdNonMod.LFO_SHAPE,
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
        id: ControllerIdNonMod.LFO_SYNC,
        label: 'Sync',
        type: 'button',
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.LFO_SYNC_OFF,
            BUTTONS.BUTTONS_LEFT.values.LFO_SYNC_ON,
        ],
    },
    RESET: {
        id: ControllerIdNonMod.LFO_RESET,
        label: 'Reset',
        type: 'button',
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.LFO_RESET_OFF,
            BUTTONS.BUTTONS_LEFT.values.LFO_RESET_ON,
        ],
    },
    ONCE: {
        id: ControllerIdNonMod.LFO_ONCE,
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

export default lfoControllers