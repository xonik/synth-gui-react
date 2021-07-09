import { BUTTONS, MidiConfigWithValue } from './utils'

interface MidiControllersTranspose {
    TRANSPOSE: MidiConfigWithValue
}

const midiControllersTranspose: MidiControllersTranspose = {
    TRANSPOSE: {
        type: 'button',
            cc: BUTTONS.BUTTONS_CENTER.cc,
            values: [
            BUTTONS.BUTTONS_CENTER.values.TRANSPOSE_NEG_2,
            BUTTONS.BUTTONS_CENTER.values.TRANSPOSE_NEG_1,
            BUTTONS.BUTTONS_CENTER.values.TRANSPOSE_0,
            BUTTONS.BUTTONS_CENTER.values.TRANSPOSE_POS_1,
            BUTTONS.BUTTONS_CENTER.values.TRANSPOSE_POS_2,
        ],
    },
}

export default midiControllersTranspose