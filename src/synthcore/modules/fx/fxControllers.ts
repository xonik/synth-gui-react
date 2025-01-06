import CC from '../../../midi/mapCC'
import { FuncProps, ControllerConfigCC, ControllerConfigButton } from '../../../midi/types'
import { ControllerIdDst, ControllerIdNonMod } from '../controllers/controllerIds'
import {buttonMidiValues} from "../../../midi/buttonMidiValues";

interface FxControllers {
    DISTORTION: {
        props: FuncProps
        DRIVE: ControllerConfigCC
        LEVEL: ControllerConfigCC
        IN: ControllerConfigButton
        OUT: ControllerConfigButton
    },
    BIT_CRUSHER: {
        props: FuncProps
        BITS: ControllerConfigCC
        RATE: ControllerConfigCC
        RECON: ControllerConfigButton
        LEVEL: ControllerConfigCC
        IN: ControllerConfigButton
        OUT: ControllerConfigButton
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
            values: [
                //buttonMidiValues.DISTORTION_IN_OFF,
                buttonMidiValues.DISTORTION_IN_A,
                buttonMidiValues.DISTORTION_IN_B,
                //buttonMidiValues.DISTORTION_IN_BOTH,
            ],
        },
        OUT: {
            id: ControllerIdNonMod.DISTORTION_OUT,
            label: 'Out',
            type: 'button',
            values: [
                buttonMidiValues.DISTORTION_OUT_OFF,
                buttonMidiValues.DISTORTION_OUT_A,
                buttonMidiValues.DISTORTION_OUT_B,
                buttonMidiValues.DISTORTION_OUT_BOTH,
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
            values: [
                buttonMidiValues.BIT_CRUSHER_RECON_OFF,
                buttonMidiValues.BIT_CRUSHER_RECON_ON,
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
            values: [
                //buttonMidiValues.BIT_CRUSHER_IN_OFF,
                buttonMidiValues.BIT_CRUSHER_IN_A,
                buttonMidiValues.BIT_CRUSHER_IN_B,
                //buttonMidiValues.BIT_CRUSHER_IN_BOTH,
            ],
        },
        OUT: {
            id: ControllerIdNonMod.BIT_CRUSHER_OUT,
            label: 'Out',
            type: 'button',
            values: [
                buttonMidiValues.BIT_CRUSHER_OUT_OFF,
                buttonMidiValues.BIT_CRUSHER_OUT_A,
                buttonMidiValues.BIT_CRUSHER_OUT_B,
                buttonMidiValues.BIT_CRUSHER_OUT_BOTH,
            ],
        },
    }
}

export default fxControllers