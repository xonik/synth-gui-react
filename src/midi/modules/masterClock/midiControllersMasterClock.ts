import CC from '../../mapCC'
import { BUTTONS } from '../../buttons'
import { MidiConfigCC, MidiConfigCCWithValue } from '../../types'

interface MidiControllersMasterClock {
    RATE: MidiConfigCC,
    SOURCE: MidiConfigCCWithValue
}

const midiControllersMasterClock: MidiControllersMasterClock = {
    RATE: { type: 'pot', cc: CC.MASTER_CLOCK_RATE },
    SOURCE: {
        type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
            BUTTONS.BUTTONS_LEFT.values.MASTER_CLOCK_SRC_MASTER,
            BUTTONS.BUTTONS_LEFT.values.MASTER_CLOCK_SRC_MIDI,
            BUTTONS.BUTTONS_LEFT.values.MASTER_CLOCK_SRC_EXT,
        ],
    },
}

export default midiControllersMasterClock