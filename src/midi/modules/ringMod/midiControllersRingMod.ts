import { BUTTONS } from '../../buttons'
import { MidiConfigCCWithValue } from '../../types'


interface MidiControllersRingMod {
    SOURCE: MidiConfigCCWithValue
}

const midiControllersRingMod: MidiControllersRingMod = {
    SOURCE: {
        type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
            BUTTONS.BUTTONS_LEFT.values.RING_MOD_SOURCE_1_2,
            BUTTONS.BUTTONS_LEFT.values.RING_MOD_SOURCE_EXT_2,
        ],
    }
}

export default midiControllersRingMod