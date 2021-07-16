import CC from '../../mapCC'
import { BUTTONS } from '../../buttons'
import { MidiConfigCC, MidiConfigCCWithValue } from '../../types'

interface MidiControllersArp {
    TEMPO: MidiConfigCC
    ON_OFF: MidiConfigCCWithValue
    TRIGGER: MidiConfigCCWithValue
    SYNC: MidiConfigCCWithValue
    RANGE: MidiConfigCCWithValue
    MODE: MidiConfigCCWithValue
}

const midiControllersArp: MidiControllersArp = {
    TEMPO: { type: 'pot', cc: CC.ARP_TEMPO },
    ON_OFF: {
        type: 'button',
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.ARP_OFF,
            BUTTONS.BUTTONS_LEFT.values.ARP_ON,
        ],
    },
    TRIGGER: {
        type: 'button',
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.ARP_TRIGGER_OFF,
            BUTTONS.BUTTONS_LEFT.values.ARP_TRIGGER_ON,
        ],
    },
    SYNC: {
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
        type: 'button',
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.ARP_RANGE_1,
            BUTTONS.BUTTONS_LEFT.values.ARP_RANGE_2,
            BUTTONS.BUTTONS_LEFT.values.ARP_RANGE_3,
        ],
    },
    MODE: {
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

export default midiControllersArp