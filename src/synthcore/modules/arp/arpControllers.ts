import { buttonMidiValues } from '@/midi/buttonMidiValues'
import NRPN from '@/midi/mapNRPN'
import type { ControllerConfig, ControllerConfigButton, ControllerConfigNRPN, FuncProps } from '@/midi/types'
import { sharedConfig } from '@/sharedConfig'
import { ControllerIdNonMod, ControllerIdNonModPots, ControllerIdSrc } from '../controllers/controllerIds'

interface ArpControllers {
    props: FuncProps
    BPM: ControllerConfigNRPN
    ON_OFF: ControllerConfigButton
    TRIGGER: ControllerConfigButton
    SYNC: ControllerConfigButton
    RANGE: ControllerConfigButton
    MODE: ControllerConfigButton
    EXTENDED_MODE: ControllerConfigButton
    SEQUENCE: ControllerConfigButton
    NOTE_ORDERING: ControllerConfigButton
    START_SYNC: ControllerConfigButton
    FUZZY_START: ControllerConfigButton
    STOP_ON_RELEASE: ControllerConfigButton
    RESOLUTION: ControllerConfigButton
    OUTPUT: ControllerConfig
}

const arpControllers: ArpControllers = {
    props: { label: 'Arpeggiator', shortLabel: 'Arp' },
    BPM: {
        id: ControllerIdNonModPots.ARP_BPM,
        label: 'Tempo',
        isDstDigi: true,
        type: 'pot',
        addr: NRPN.ARP_BPM,
        range: {
            from: sharedConfig.ARP_MIN_BPM.value,
            to: sharedConfig.ARP_MAX_BPM.value,
        },
    },
    ON_OFF: {
        id: ControllerIdNonMod.ARP_ON_OFF,
        label: 'On/off',
        type: 'button',
        values: [buttonMidiValues.ARP_OFF, buttonMidiValues.ARP_ON],
    },
    TRIGGER: {
        id: ControllerIdNonMod.ARP_TRIGGER,
        label: 'Trigger',
        type: 'button',
        values: [buttonMidiValues.ARP_TRIGGER_OFF, buttonMidiValues.ARP_TRIGGER_ON],
    },
    SYNC: {
        id: ControllerIdNonMod.ARP_SYNC,
        label: 'Sync',
        type: 'button',
        values: [buttonMidiValues.ARP_SYNC_OFF, buttonMidiValues.ARP_SYNC_MASTER, buttonMidiValues.ARP_SYNC_EXT],
    },
    RANGE: {
        id: ControllerIdNonMod.ARP_RANGE,
        label: 'Range',
        type: 'button',
        values: [buttonMidiValues.ARP_RANGE_1, buttonMidiValues.ARP_RANGE_2, buttonMidiValues.ARP_RANGE_3],
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
        ],
    },
    // Modes not selectable from the front panel
    EXTENDED_MODE: {
        id: ControllerIdNonMod.ARP_EXTENDED_MODE,
        label: 'Mode',
        type: 'button',
        values: [buttonMidiValues.ARP_MODE_UP_DOWN_REPEAT],
    },
    SEQUENCE: {
        id: ControllerIdNonMod.ARP_SEQUENCE,
        label: 'Sequence',
        type: 'button',
        values: [buttonMidiValues.ARP_SEQ_OFF, buttonMidiValues.ARP_SEQ_ENTER, buttonMidiValues.ARP_SEQ_ON],
    },
    NOTE_ORDERING: {
        id: ControllerIdNonMod.ARP_NOTE_ORDERING,
        label: 'Note ordering',
        type: 'button',
        values: [buttonMidiValues.ARP_NOTE_ORDERING_PRESSED, buttonMidiValues.ARP_NOTE_ORDERING_KEYBOARD],
    },
    FUZZY_START: {
        id: ControllerIdNonMod.ARP_FUZZY_START,
        label: 'Fuzzy start',
        type: 'button',
        values: [buttonMidiValues.ARP_FUZZY_START_OFF, buttonMidiValues.ARP_FUZZY_START_ON],
    },
    STOP_ON_RELEASE: {
        id: ControllerIdNonMod.ARP_STOP_ON_RELEASE,
        label: 'Fuzzy start',
        type: 'button',
        values: [buttonMidiValues.ARP_STOP_ON_RELEASE_OFF, buttonMidiValues.ARP_STOP_ON_RELEASE_ON],
    },
    START_SYNC: {
        id: ControllerIdNonMod.ARP_START_SYNC,
        label: 'Sync start to clock',
        type: 'button',
        values: [
            buttonMidiValues.ARP_START_RES_QUARTER,
            buttonMidiValues.ARP_START_RES_QUARTER_TRIPLET,
            buttonMidiValues.ARP_START_RES_8TH,
            buttonMidiValues.ARP_START_RES_8TH_TRIPLET,
            buttonMidiValues.ARP_START_RES_16TH,
            buttonMidiValues.ARP_START_RES_16TH_TRIPLET,
            buttonMidiValues.ARP_START_RES_32ND,
            buttonMidiValues.ARP_START_RES_32ND_TRIPLET,
            buttonMidiValues.ARP_START_RES_MAX,
        ],
    },
    RESOLUTION: {
        id: ControllerIdNonMod.ARP_RESOLUTION,
        label: 'Clock subdivision',
        type: 'button',
        values: [
            buttonMidiValues.ARP_RES_QUARTER,
            buttonMidiValues.ARP_RES_QUARTER_TRIPLET,
            buttonMidiValues.ARP_RES_8TH,
            buttonMidiValues.ARP_RES_8TH_TRIPLET,
            buttonMidiValues.ARP_RES_16TH,
            buttonMidiValues.ARP_RES_16TH_TRIPLET,
            buttonMidiValues.ARP_RES_32ND,
            buttonMidiValues.ARP_RES_32ND_TRIPLET,
            buttonMidiValues.ARP_RES_MAX,
        ],
    },
    // Not a real controller, only used in modulation mappings when arp is a source
    OUTPUT: {
        id: ControllerIdSrc.ARP,
        label: 'Arp',
        type: 'output',
        isSourceDigi: true,
    },
}

export default arpControllers
