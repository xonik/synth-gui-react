import CC from '../../mapCC'
import { BUTTONS } from '../../buttons'
import { MidiConfigCC, MidiConfigCCWithValue } from '../../types'

interface MidiControllersFx {
    DISTORTION: {
        DRIVE: MidiConfigCC
        LEVEL: MidiConfigCC
        IN: MidiConfigCCWithValue
        CLIP: MidiConfigCCWithValue
        OUT: MidiConfigCCWithValue
    },
    BIT_CRUSHER: {
        BITS: MidiConfigCC
        RATE: MidiConfigCC
        LEVEL: MidiConfigCC
        IN: MidiConfigCCWithValue
        OUT: MidiConfigCCWithValue
    }
}

const midiControllersFx: MidiControllersFx = {
    DISTORTION: {
        // Pots
        DRIVE: { type: 'pot', cc: CC.DISTORTION_DRIVE },
        LEVEL: { type: 'pot', cc: CC.DISTORTION_LEVEL },
        // Buttons
        IN: {
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.DISTORTION_IN_A,
                BUTTONS.BUTTONS_LEFT.values.DISTORTION_IN_B,
                BUTTONS.BUTTONS_LEFT.values.DISTORTION_IN_BOTH,
            ],
        },
        CLIP: {
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.DISTORTION_SOFT,
                BUTTONS.BUTTONS_LEFT.values.DISTORTION_HARD,
            ],
        },
        OUT: {
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.DISTORTION_OUT_A,
                BUTTONS.BUTTONS_LEFT.values.DISTORTION_OUT_B,
                BUTTONS.BUTTONS_LEFT.values.DISTORTION_OUT_BOTH,
            ],
        },
    },
    BIT_CRUSHER: {
        // Pots
        BITS: { type: 'pot', cc: CC.BIT_CRUSHER_BITS },
        RATE: { type: 'pot', cc: CC.BIT_CRUSHER_RATE },
        LEVEL: { type: 'pot', cc: CC.BIT_CRUSHER_LEVEL },
        // Buttons
        IN: {
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.BIT_CRUSHER_IN_A,
                BUTTONS.BUTTONS_LEFT.values.BIT_CRUSHER_IN_B,
                BUTTONS.BUTTONS_LEFT.values.BIT_CRUSHER_IN_BOTH,
            ],
        },
        OUT: {
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.BIT_CRUSHER_OUT_A,
                BUTTONS.BUTTONS_LEFT.values.BIT_CRUSHER_OUT_B,
                BUTTONS.BUTTONS_LEFT.values.BIT_CRUSHER_OUT_BOTH,
            ],
        },
    }
}

export default midiControllersFx