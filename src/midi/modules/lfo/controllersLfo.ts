import CC from '../../mapCC'
import { BUTTONS } from '../../buttons'
import { FuncProps, ControllerConfigCC, ControllerConfigCCWithValue } from '../../types'

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
}

const controllersLfo: ControllersLfo = {
    props: { label: 'LFO' },
    // Pots
    RATE: {
        label: 'Rate',
        isTargetDigi: true,
        type: 'pot',
        cc: CC.LFO_RATE
    },
    DEPTH: {
        label: 'Depth',
        isTargetDigi: true,
        type: 'pot',
        cc: CC.LFO_DEPTH
    },
    DELAY: {
        label: 'Delay',
        isTargetDigi: true,
        type: 'pot',
        cc: CC.LFO_DELAY
    },
    // Buttons
    LFO: {
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
        label: 'Sync',
        type: 'button',
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.LFO_SYNC_OFF,
            BUTTONS.BUTTONS_LEFT.values.LFO_SYNC_ON,
        ],
    },
    RESET: {
        label: 'Reset',
        type: 'button',
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.LFO_RESET_OFF,
            BUTTONS.BUTTONS_LEFT.values.LFO_RESET_ON,
        ],
    },
    ONCE: {
        label: 'Once',
        type: 'button',
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.LFO_ONCE_OFF,
            BUTTONS.BUTTONS_LEFT.values.LFO_ONCE_ON,
        ],
    },
}

export default controllersLfo