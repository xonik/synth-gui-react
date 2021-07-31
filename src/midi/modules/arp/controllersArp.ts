import CC from '../../mapCC'
import { BUTTONS } from '../../buttons'
import { ControllerConfig, ControllerConfigCC, ControllerConfigCCWithValue, FuncProps } from '../../types'
import { ControllerId } from '../../controllerIds'

interface ControllersArp {
    props: FuncProps
    TEMPO: ControllerConfigCC
    ON_OFF: ControllerConfigCCWithValue
    TRIGGER: ControllerConfigCCWithValue
    SYNC: ControllerConfigCCWithValue
    RANGE: ControllerConfigCCWithValue
    MODE: ControllerConfigCCWithValue
    OUTPUT: ControllerConfig
}

const controllersArp: ControllersArp = {
    props: { label: 'Arpeggiator' },
    TEMPO: {
        id: ControllerId.ARP_TEMPO,
        label: 'Tempo',
        isTargetDigi: true,
        type: 'pot',
        cc: CC.ARP_TEMPO
    },
    ON_OFF: {
        id: ControllerId.ARP_ON_OFF,
        label: 'On/off',
        type: 'button',
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.ARP_OFF,
            BUTTONS.BUTTONS_LEFT.values.ARP_ON,
        ],
    },
    TRIGGER: {
        id: ControllerId.ARP_TRIGGER,
        label: 'Trigger',
        type: 'button',
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.ARP_TRIGGER_OFF,
            BUTTONS.BUTTONS_LEFT.values.ARP_TRIGGER_ON,
        ],
    },
    SYNC: {
        id: ControllerId.ARP_SYNC,
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
        id: ControllerId.ARP_RANGE,
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
        id: ControllerId.ARP_MODE,
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
    OUTPUT: {
        id: ControllerId.ARPEGGIATOR,
        label: 'Arp',
        type: 'output',
        isSourceDigi: true
    }
}

export default controllersArp