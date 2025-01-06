import CC from '../../../midi/mapCC'
import { FuncProps, ControllerConfigCC, ControllerConfigButton } from '../../../midi/types'
import { ControllerIdDst, ControllerIdNonMod } from '../controllers/controllerIds'
import {buttonMidiValues} from "../../../midi/buttonMidiValues";

interface KbdControllers {
    props: FuncProps
    PORTAMENTO: ControllerConfigCC
    UNISON_DETUNE: ControllerConfigCC
    HOLD: ControllerConfigButton
    CHORD: ControllerConfigButton
    MODE: ControllerConfigButton
    TRANSPOSE: ControllerConfigButton
}

const kbdControllers: KbdControllers = {
    props: { label: 'Keyboard' },
    PORTAMENTO: {
        id: ControllerIdDst.KBD_PORTAMENTO,
        label: 'Portamento', shortLabel: 'Portam.',
        isDstDigi: true,
        type: 'pot',
        cc: CC.KBD_PORTAMENTO
    },
    UNISON_DETUNE: {
        id: ControllerIdDst.KBD_UNISON_DETUNE,
        label: 'Detune',
        isDstDigi: true,
        type: 'pot',
        cc: CC.KBD_UNISON_DETUNE
    },
    HOLD: {
        id: ControllerIdNonMod.KBD_HOLD,
        label: 'Hold',
        type: 'button',
        values: [
            buttonMidiValues.KBD_HOLD_OFF,
            buttonMidiValues.KBD_HOLD_ON,
        ],
    },
    CHORD: {
        id: ControllerIdNonMod.KBD_CHORD,
        label: 'Chord',
        type: 'button',
        values: [
            buttonMidiValues.KBD_CHORD_OFF,
            buttonMidiValues.KBD_CHORD_ON,
        ],
    },
    MODE: {
        id: ControllerIdNonMod.KBD_MODE,
        label: 'Mode',
        type: 'button',
        values: [
            buttonMidiValues.KBD_MODE_SOLO,
            buttonMidiValues.KBD_MODE_UNISON,
            buttonMidiValues.KBD_MODE_POLY,
        ],
    },
    TRANSPOSE: {
        id: ControllerIdNonMod.KBD_TRANSPOSE,
        label: 'Up/down',
        type: 'button',
        values: [
            buttonMidiValues.TRANSPOSE_NEG_2,
            buttonMidiValues.TRANSPOSE_NEG_1,
            buttonMidiValues.TRANSPOSE_0,
            buttonMidiValues.TRANSPOSE_POS_1,
            buttonMidiValues.TRANSPOSE_POS_2,
        ],
    },
}

export default kbdControllers