import CC from '../../../midi/mapCC'
import { BUTTONS } from '../../../midi/buttons'
import { FuncProps, ControllerConfigCC, ControllerConfigCCWithValue } from '../../../midi/types'
import { ControllerIdDst, ControllerIdNonMod } from '../../../midi/controllerIds'

interface KbdControllers {
    props: FuncProps
    PORTAMENTO: ControllerConfigCC
    UNISON_DETUNE: ControllerConfigCC
    HOLD: ControllerConfigCCWithValue
    CHORD: ControllerConfigCCWithValue
    MODE: ControllerConfigCCWithValue
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
        cc: BUTTONS.BUTTONS_CENTER.cc,
        values: [
            BUTTONS.BUTTONS_CENTER.values.KBD_HOLD_OFF,
            BUTTONS.BUTTONS_CENTER.values.KBD_HOLD_ON,
        ],
    },
    CHORD: {
        id: ControllerIdNonMod.KBD_CHORD,
        label: 'Chord',
        type: 'button',
        cc: BUTTONS.BUTTONS_CENTER.cc,
        values: [
            BUTTONS.BUTTONS_CENTER.values.KBD_CHORD_OFF,
            BUTTONS.BUTTONS_CENTER.values.KBD_CHORD_ON,
        ],
    },
    MODE: {
        id: ControllerIdNonMod.KBD_MODE,
        label: 'Mode',
        type: 'button',
        cc: BUTTONS.BUTTONS_CENTER.cc,
        values: [
            BUTTONS.BUTTONS_CENTER.values.KBD_MODE_SOLO,
            BUTTONS.BUTTONS_CENTER.values.KBD_MODE_UNISON,
            BUTTONS.BUTTONS_CENTER.values.KBD_MODE_POLY,
        ],
    },
}

export default kbdControllers