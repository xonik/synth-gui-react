import CC from '../../mapCC'
import { BUTTONS } from '../../buttons'
import { FuncProps, MidiConfigCC, MidiConfigCCWithValue } from '../../types'

interface ControllersFx {
    DISTORTION: {
        props: FuncProps
        DRIVE: MidiConfigCC
        LEVEL: MidiConfigCC
        IN: MidiConfigCCWithValue
        CLIP: MidiConfigCCWithValue
        OUT: MidiConfigCCWithValue
    },
    BIT_CRUSHER: {
        props: FuncProps
        BITS: MidiConfigCC
        RATE: MidiConfigCC
        LEVEL: MidiConfigCC
        IN: MidiConfigCCWithValue
        OUT: MidiConfigCCWithValue
    }
}

const controllersFx: ControllersFx = {
    DISTORTION: {
        label: 'Distortion',
        // Pots
        DRIVE: {
            label: 'Drive',
            isTargetDigi: true,
            type: 'pot',
            cc: CC.DISTORTION_DRIVE
        },
        LEVEL: {
            label: 'Level',
            isTargetDigi: true,
            type: 'pot',
            cc: CC.DISTORTION_LEVEL
        },
        // Buttons
        IN: {
            label: 'In',
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.DISTORTION_IN_A,
                BUTTONS.BUTTONS_LEFT.values.DISTORTION_IN_B,
                BUTTONS.BUTTONS_LEFT.values.DISTORTION_IN_BOTH,
            ],
        },
        CLIP: {
            label: 'Clip',
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.DISTORTION_SOFT,
                BUTTONS.BUTTONS_LEFT.values.DISTORTION_HARD,
            ],
        },
        OUT: {
            label: 'Out',
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
        BITS: {
            label: 'Bits',
            isTargetDigi: true,
            type: 'pot',
            cc: CC.BIT_CRUSHER_BITS
        },
        RATE: {
            label: 'Rate',
            isTargetDigi: true,
            type: 'pot',
            cc: CC.BIT_CRUSHER_RATE
        },
        LEVEL: {
            label: 'Level',
            isTargetDigi: true,
            type: 'pot',
            cc: CC.BIT_CRUSHER_LEVEL
        },
        // Buttons
        IN: {
            label: 'In',
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.BIT_CRUSHER_IN_A,
                BUTTONS.BUTTONS_LEFT.values.BIT_CRUSHER_IN_B,
                BUTTONS.BUTTONS_LEFT.values.BIT_CRUSHER_IN_BOTH,
            ],
        },
        OUT: {
            label: 'Out',
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

export default controllersFx