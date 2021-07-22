import CC from '../../mapCC'
import { BUTTONS } from '../../buttons'
import { FuncProps, ControllerConfigCC, ControllerConfigCCWithValue } from '../../types'

interface ControllersArp {
    props: FuncProps
    TEMPO: ControllerConfigCC
    ON_OFF: ControllerConfigCCWithValue
    TRIGGER: ControllerConfigCCWithValue
    SYNC: ControllerConfigCCWithValue
    RANGE: ControllerConfigCCWithValue
    MODE: ControllerConfigCCWithValue
}

const controllersArp: ControllersArp = {
    props: { label: 'Arpeggiator' },
    TEMPO: {
        label: 'Tempo',
        isTargetDigi: true,
        type: 'pot',
        cc: CC.ARP_TEMPO
    },
    ON_OFF: {
        label: 'On/off',
        type: 'button',
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.ARP_OFF,
            BUTTONS.BUTTONS_LEFT.values.ARP_ON,
        ],
    },
    TRIGGER: {
        label: 'Trigger',
        type: 'button',
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.ARP_TRIGGER_OFF,
            BUTTONS.BUTTONS_LEFT.values.ARP_TRIGGER_ON,
        ],
    },
    SYNC: {
        label: 'Sync',
        type: 'button',
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.ARP_SYNC_OFF,
            BUTTONS.BUTTONS_LEFT.values.ARP_SYNC_MASTER,
            BUTTONS.BUTTONS_LEFT.values.ARP_SYNC_LFO1,
            BUTTONS.BUTTONS_LEFT.values.ARP_SYNC_EXT,
        ],
    },
    RANGE: {
        label: 'Range',
        type: 'button',
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.ARP_RANGE_1,
            BUTTONS.BUTTONS_LEFT.values.ARP_RANGE_2,
            BUTTONS.BUTTONS_LEFT.values.ARP_RANGE_3,
        ],
    },
    MODE: {
        label: 'Mode',
        type: 'button',
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.ARP_MODE_UP,
            BUTTONS.BUTTONS_LEFT.values.ARP_MODE_DOWN,
            BUTTONS.BUTTONS_LEFT.values.ARP_MODE_UP_DOWN,
            BUTTONS.BUTTONS_LEFT.values.ARP_MODE_RANDOM,
            BUTTONS.BUTTONS_LEFT.values.ARP_MODE_OTHER,
        ],
    },
}

export default controllersArp