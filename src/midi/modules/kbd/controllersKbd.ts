import CC from '../../mapCC'
import { BUTTONS } from '../../buttons'
import { FuncProps, ControllerConfigCC, ControllerConfigCCWithValue } from '../../types'
import { ControllerIdDst, ControllerIdNonMod } from '../../controllerIds'

interface ControllersKbd {
    props: FuncProps
    PORTAMENTO: ControllerConfigCC
    UNISON_DETUNE: ControllerConfigCC
    HOLD: ControllerConfigCCWithValue
    CHORD: ControllerConfigCCWithValue
    MODE: ControllerConfigCCWithValue
}

const controllersKbd: ControllersKbd = {
    props: { label: 'Keyboard' },
    PORTAMENTO: {
        id: ControllerIdDst.KBD_PORTAMENTO,
        label: 'Portamento', shortLabel: 'Portam.',
        isTargetDigi: true,
        type: 'pot',
        cc: CC.KEYBOARD_PORTAMENTO
    },
    UNISON_DETUNE: {
        id: ControllerIdDst.KBD_UNISON_DETUNE,
        label: 'Detune',
        isTargetDigi: true,
        type: 'pot',
        cc: CC.KEYBOARD_UNISON_DETUNE
    },
    HOLD: {
        id: ControllerIdNonMod.KBD_HOLD,
        label: 'Hold',
        type: 'button',
        cc: BUTTONS.BUTTONS_CENTER.cc,
        values: [
            BUTTONS.BUTTONS_CENTER.values.KEYBOARD_HOLD_OFF,
            BUTTONS.BUTTONS_CENTER.values.KEYBOARD_HOLD_ON,
        ],
    },
    CHORD: {
        id: ControllerIdNonMod.KBD_CHORD,
        label: 'Chord',
        type: 'button',
        cc: BUTTONS.BUTTONS_CENTER.cc,
        values: [
            BUTTONS.BUTTONS_CENTER.values.KEYBOARD_CHORD_OFF,
            BUTTONS.BUTTONS_CENTER.values.KEYBOARD_CHORD_ON,
        ],
    },
    MODE: {
        id: ControllerIdNonMod.KBD_MODE,
        label: 'Mode',
        type: 'button',
        cc: BUTTONS.BUTTONS_CENTER.cc,
        values: [
            BUTTONS.BUTTONS_CENTER.values.KEYBOARD_MODE_SOLO,
            BUTTONS.BUTTONS_CENTER.values.KEYBOARD_MODE_UNISON,
            BUTTONS.BUTTONS_CENTER.values.KEYBOARD_MODE_POLY,
        ],
    },
}

export default controllersKbd