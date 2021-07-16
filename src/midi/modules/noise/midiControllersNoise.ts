import { BUTTONS } from '../../buttons'
import { MidiConfigCCWithValue } from '../../types'


interface MidiControllersNoise {
    COLOUR: MidiConfigCCWithValue
}

const midiControllersNoise: MidiControllersNoise = {
    COLOUR: {
        type: 'button',
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.NOISE_COLOUR_WHITE,
            BUTTONS.BUTTONS_LEFT.values.NOISE_COLOUR_PINK,
            BUTTONS.BUTTONS_LEFT.values.NOISE_COLOUR_RED,
        ],
    }
}

export default midiControllersNoise