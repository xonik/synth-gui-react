import { BUTTONS, MidiConfigWithValue } from './utils'

interface MidiControllersVoices {
    VOICE1: MidiConfigWithValue
    VOICE2: MidiConfigWithValue
    VOICE3: MidiConfigWithValue
    VOICE4: MidiConfigWithValue
    VOICE5: MidiConfigWithValue
    VOICE6: MidiConfigWithValue
    VOICE7: MidiConfigWithValue
    VOICE8: MidiConfigWithValue
}

const midiControllersVoices: MidiControllersVoices = {
    VOICE1: {
        type: 'button',
            cc: BUTTONS.BUTTONS_CENTER.cc,
            values: [
            BUTTONS.BUTTONS_CENTER.values.VOICE1_OFF,
            BUTTONS.BUTTONS_CENTER.values.VOICE1_ON,
        ],
    },
    VOICE2: {
        type: 'button',
            cc: BUTTONS.BUTTONS_CENTER.cc,
            values: [
            BUTTONS.BUTTONS_CENTER.values.VOICE2_OFF,
            BUTTONS.BUTTONS_CENTER.values.VOICE2_ON,
        ],
    },
    VOICE3: {
        type: 'button',
            cc: BUTTONS.BUTTONS_CENTER.cc,
            values: [
            BUTTONS.BUTTONS_CENTER.values.VOICE3_OFF,
            BUTTONS.BUTTONS_CENTER.values.VOICE3_ON,
        ],
    },
    VOICE4: {
        type: 'button',
            cc: BUTTONS.BUTTONS_CENTER.cc,
            values: [
            BUTTONS.BUTTONS_CENTER.values.VOICE4_OFF,
            BUTTONS.BUTTONS_CENTER.values.VOICE4_ON,
        ],
    },
    VOICE5: {
        type: 'button',
            cc: BUTTONS.BUTTONS_CENTER.cc,
            values: [
            BUTTONS.BUTTONS_CENTER.values.VOICE5_OFF,
            BUTTONS.BUTTONS_CENTER.values.VOICE5_ON,
        ],
    },
    VOICE6: {
        type: 'button',
            cc: BUTTONS.BUTTONS_CENTER.cc,
            values: [
            BUTTONS.BUTTONS_CENTER.values.VOICE6_OFF,
            BUTTONS.BUTTONS_CENTER.values.VOICE6_ON,
        ],
    },
    VOICE7: {
        type: 'button',
            cc: BUTTONS.BUTTONS_CENTER.cc,
            values: [
            BUTTONS.BUTTONS_CENTER.values.VOICE7_OFF,
            BUTTONS.BUTTONS_CENTER.values.VOICE7_ON,
        ],
    },
    VOICE8: {
        type: 'button',
            cc: BUTTONS.BUTTONS_CENTER.cc,
            values: [
            BUTTONS.BUTTONS_CENTER.values.VOICE8_OFF,
            BUTTONS.BUTTONS_CENTER.values.VOICE8_ON,
        ],
    },
}

export default midiControllersVoices