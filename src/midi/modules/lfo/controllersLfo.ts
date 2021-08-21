import CC from '../../mapCC'
import { BUTTONS } from '../../buttons'
import { FuncProps, ControllerConfigCC, ControllerConfigCCWithValue, ControllerConfig } from '../../types'
import { ControllerId } from '../../controllerIds'

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

const controllersLfo = (ctrlIndex: number): ControllersLfo => ({
    props: {
        label: `LFO ${1 + ctrlIndex}`,
        ctrlIndex
    },
    // Pots
    RATE: {
        id: ControllerId.LFO_RATE,
        label: 'Rate',
        isTargetDigi: true,
        type: 'pot',
        cc: CC.LFO_RATE
    },
    DEPTH: {
        id: ControllerId.LFO_DEPTH,
        label: 'Depth',
        isTargetDigi: true,
        type: 'pot',
        cc: CC.LFO_DEPTH
    },
    DELAY: {
        id: ControllerId.LFO_DELAY,
        label: 'Delay',
        isTargetDigi: true,
        type: 'pot',
        cc: CC.LFO_DELAY
    },
    // Buttons
    LFO: {
        id: ControllerId.LFO_LFO,
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
        id: ControllerId.LFO_SHAPE,
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
        id: ControllerId.LFO_SYNC,
        label: 'Sync',
        type: 'button',
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.LFO_SYNC_OFF,
            BUTTONS.BUTTONS_LEFT.values.LFO_SYNC_ON,
        ],
    },
    RESET: {
        id: ControllerId.LFO_RESET,
        label: 'Reset',
        type: 'button',
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.LFO_RESET_OFF,
            BUTTONS.BUTTONS_LEFT.values.LFO_RESET_ON,
        ],
    },
    ONCE: {
        id: ControllerId.LFO_ONCE,
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
        id: ControllerId.LFO1 + ctrlIndex,
        label: `LFO ${1 + ctrlIndex}`,
        type: 'output',
        isSourceDigi: true
    },
})

export default controllersLfo