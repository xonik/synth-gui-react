import CC from '../../mapCC'
import { BUTTONS } from '../../buttons'
import { FuncProps, ControllerConfigCC, ControllerConfigCCWithValue } from '../../types'
import { ControllerIdDst, ControllerIdNonMod } from '../../controllerIds'

interface ControllersFx {
    DISTORTION: {
        props: FuncProps
        DRIVE: ControllerConfigCC
        LEVEL: ControllerConfigCC
        IN: ControllerConfigCCWithValue
        CLIP: ControllerConfigCCWithValue
        OUT: ControllerConfigCCWithValue
    },
    BIT_CRUSHER: {
        props: FuncProps
        BITS: ControllerConfigCC
        RATE: ControllerConfigCC
        LEVEL: ControllerConfigCC
        IN: ControllerConfigCCWithValue
        OUT: ControllerConfigCCWithValue
    }
}

const controllersFx: ControllersFx = {
    DISTORTION: {
        props: { label: 'Distortion' },
        // Pots
        DRIVE: {
            id: ControllerIdDst.DISTORTION_DRIVE,
            label: 'Drive',
            isDstDigi: true,
            type: 'pot',
            cc: CC.DISTORTION_DRIVE
        },
        LEVEL: {
            id: ControllerIdDst.DISTORTION_LEVEL,
            label: 'Level',
            isDstDigi: true,
            type: 'pot',
            cc: CC.DISTORTION_LEVEL
        },
        // Buttons
        IN: {
            id: ControllerIdNonMod.DISTORTION_IN,
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
            id: ControllerIdNonMod.DISTORTION_CLIP,
            label: 'Clip',
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.DISTORTION_SOFT,
                BUTTONS.BUTTONS_LEFT.values.DISTORTION_HARD,
            ],
        },
        OUT: {
            id: ControllerIdNonMod.DISTORTION_OUT,
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
        props: { label: 'Bit crusher' },
        BITS: {
            id: ControllerIdDst.BIT_CRUSHER_BITS,
            label: 'Bits',
            isDstDigi: true,
            type: 'pot',
            cc: CC.BIT_CRUSHER_BITS
        },
        RATE: {
            id: ControllerIdDst.BIT_CRUSHER_RATE,
            label: 'Rate',
            isDstDigi: true,
            type: 'pot',
            cc: CC.BIT_CRUSHER_RATE
        },
        LEVEL: {
            id: ControllerIdDst.BIT_CRUSHER_LEVEL,
            label: 'Level',
            isDstDigi: true,
            type: 'pot',
            cc: CC.BIT_CRUSHER_LEVEL
        },
        // Buttons
        IN: {
            id: ControllerIdNonMod.BIT_CRUSHER_IN,
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
            id: ControllerIdNonMod.BIT_CRUSHER_OUT,
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