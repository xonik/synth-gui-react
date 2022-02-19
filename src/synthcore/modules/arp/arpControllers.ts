import CC from '../../../midi/mapCC'
import { BUTTONS } from '../../../midi/buttons'
import { ControllerConfig, ControllerConfigCC, ControllerConfigCCWithValue, FuncProps } from '../../../midi/types'
import { ControllerIdDst, ControllerIdNonMod, ControllerIdSrc } from '../../../midi/controllerIds'

interface ArpControllers {
    props: FuncProps
    TEMPO: ControllerConfigCC
    ON_OFF: ControllerConfigCCWithValue
    TRIGGER: ControllerConfigCCWithValue
    SYNC: ControllerConfigCCWithValue
    RANGE: ControllerConfigCCWithValue
    MODE: ControllerConfigCCWithValue
    OUTPUT: ControllerConfig
}

const arpControllers: ArpControllers = {
    props: { label: 'Arpeggiator', shortLabel: 'Arp' },
    TEMPO: {
        id: ControllerIdDst.ARP_TEMPO,
        label: 'Tempo',
        isDstDigi: true,
        type: 'pot',
        cc: CC.ARP_TEMPO
    },
    ON_OFF: {
        id: ControllerIdNonMod.ARP_ON_OFF,
        label: 'On/off',
        type: 'button',
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.ARP_OFF,
            BUTTONS.BUTTONS_LEFT.values.ARP_ON,
        ],
    },
    TRIGGER: {
        id: ControllerIdNonMod.ARP_TRIGGER,
        label: 'Trigger',
        type: 'button',
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.ARP_TRIGGER_OFF,
            BUTTONS.BUTTONS_LEFT.values.ARP_TRIGGER_ON,
        ],
    },
    SYNC: {
        id: ControllerIdNonMod.ARP_SYNC,
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
        id: ControllerIdNonMod.ARP_RANGE,
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
        id: ControllerIdNonMod.ARP_MODE,
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

    // Not a real controller, only used in modulation mappings when arp is a source
    OUTPUT: {
        id: ControllerIdSrc.ARP,
        label: 'Arp',
        type: 'output',
        isSourceDigi: true
    }
}

export default arpControllers