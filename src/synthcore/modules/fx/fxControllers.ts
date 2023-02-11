import CC from '../../../midi/mapCC'
import { BUTTONS } from '../../../midi/buttons'
import { FuncProps, ControllerConfigCC, ControllerConfigCCWithValue } from '../../../midi/types'
import { ControllerIdDst, ControllerIdNonMod } from '../../../midi/controllerIds'

interface FxControllers {
    DISTORTION: {
        props: FuncProps
        DRIVE: ControllerConfigCC
        LEVEL: ControllerConfigCC
        IN: ControllerConfigCCWithValue
        OUT: ControllerConfigCCWithValue
    },
    BIT_CRUSHER: {
        props: FuncProps
        BITS: ControllerConfigCC
        RATE: ControllerConfigCC
        RECON: ControllerConfigCCWithValue
        LEVEL: ControllerConfigCC
        IN: ControllerConfigCCWithValue
        OUT: ControllerConfigCCWithValue
    }
}

const fxControllers: FxControllers = {
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
                //BUTTONS.BUTTONS_LEFT.values.DISTORTION_IN_OFF,
                BUTTONS.BUTTONS_LEFT.values.DISTORTION_IN_A,
                BUTTONS.BUTTONS_LEFT.values.DISTORTION_IN_B,
                //BUTTONS.BUTTONS_LEFT.values.DISTORTION_IN_BOTH,
            ],
        },
        OUT: {
            id: ControllerIdNonMod.DISTORTION_OUT,
            label: 'Out',
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.DISTORTION_OUT_OFF,
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
        RECON: {
            id: ControllerIdNonMod.BIT_CRUSHER_RECON,
            label: 'Clip',
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.BIT_CRUSHER_RECON_OFF,
                BUTTONS.BUTTONS_LEFT.values.BIT_CRUSHER_RECON_ON,
            ],
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
                //BUTTONS.BUTTONS_LEFT.values.BIT_CRUSHER_IN_OFF,
                BUTTONS.BUTTONS_LEFT.values.BIT_CRUSHER_IN_A,
                BUTTONS.BUTTONS_LEFT.values.BIT_CRUSHER_IN_B,
                //BUTTONS.BUTTONS_LEFT.values.BIT_CRUSHER_IN_BOTH,
            ],
        },
        OUT: {
            id: ControllerIdNonMod.BIT_CRUSHER_OUT,
            label: 'Out',
            type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
                BUTTONS.BUTTONS_LEFT.values.BIT_CRUSHER_OUT_OFF,
                BUTTONS.BUTTONS_LEFT.values.BIT_CRUSHER_OUT_A,
                BUTTONS.BUTTONS_LEFT.values.BIT_CRUSHER_OUT_B,
                BUTTONS.BUTTONS_LEFT.values.BIT_CRUSHER_OUT_BOTH,
            ],
        },
    }
}

export default fxControllers