import CC from './mapCC'
import { buttonLeftMidiValues } from './buttonLeftMidiValues'
import { buttonCenterMidiValues } from './buttonCenterMidiValues'
import { buttonRightMidiValues } from './buttonRightMidiValues'


export const BUTTONS = {
    BUTTONS_LEFT: {
        cc: CC.BUTTONS_LEFT,
        values: buttonLeftMidiValues,
    },
    BUTTONS_CENTER: {
        cc: CC.BUTTONS_CENTER,
        values: buttonCenterMidiValues,
    },
    BUTTONS_RIGHT: {
        cc: CC.BUTTONS_RIGHT,
        values: buttonRightMidiValues,
    }
}