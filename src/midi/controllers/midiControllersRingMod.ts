import { BUTTONS, MidiConfigWithValue } from './utils'

interface MidiControllersRingMod {
    SOURCE: MidiConfigWithValue
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