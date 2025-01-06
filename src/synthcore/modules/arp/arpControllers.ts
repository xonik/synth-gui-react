import CC from '../../../midi/mapCC'
import { ControllerConfig, ControllerConfigCC, ControllerConfigButton, FuncProps } from '../../../midi/types'
import { ControllerIdDst, ControllerIdNonMod, ControllerIdSrc } from '../controllers/controllerIds'
import {buttonMidiValues} from "../../../midi/buttonMidiValues";

interface ArpControllers {
    props: FuncProps
    TEMPO: ControllerConfigCC
    ON_OFF: ControllerConfigButton
    TRIGGER: ControllerConfigButton
    SYNC: ControllerConfigButton
    RANGE: ControllerConfigButton
    MODE: ControllerConfigButton
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
        values: [
            buttonMidiValues.ARP_OFF,
            buttonMidiValues.ARP_ON,
        ],
    },
    TRIGGER: {
        id: ControllerIdNonMod.ARP_TRIGGER,
        label: 'Trigger',
        type: 'button',
        values: [
            buttonMidiValues.ARP_TRIGGER_OFF,
            buttonMidiValues.ARP_TRIGGER_ON,
        ],
    },
    SYNC: {
        id: ControllerIdNonMod.ARP_SYNC,
        label: 'Sync',
        type: 'button',
        values: [
            buttonMidiValues.ARP_SYNC_OFF,
            buttonMidiValues.ARP_SYNC_MASTER,
            buttonMidiValues.ARP_SYNC_LFO1,
            buttonMidiValues.ARP_SYNC_EXT,
        ],
    },
    RANGE: {
        id: ControllerIdNonMod.ARP_RANGE,
        label: 'Range',
        type: 'button',
        values: [
            buttonMidiValues.ARP_RANGE_1,
            buttonMidiValues.ARP_RANGE_2,
            buttonMidiValues.ARP_RANGE_3,
        ],
    },
    MODE: {
        id: ControllerIdNonMod.ARP_MODE,
        label: 'Mode',
        type: 'button',
        values: [
            buttonMidiValues.ARP_MODE_UP,
            buttonMidiValues.ARP_MODE_DOWN,
            buttonMidiValues.ARP_MODE_UP_DOWN,
            buttonMidiValues.ARP_MODE_RANDOM,
            buttonMidiValues.ARP_MODE_OTHER,
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