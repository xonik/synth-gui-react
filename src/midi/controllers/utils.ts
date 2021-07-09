import CC from '../ccMap'
import { buttonLeftMidiValues } from '../buttonLeftMidiValues'
import { buttonCenterMidiValues } from '../buttonCenterMidiValues'
import { buttonRightMidiValues } from '../buttonRightMidiValues'

export interface MidiConfig {
    readonly type: ControllerType
    readonly cc: number
    //readonly values?: number[]
}

export interface MidiConfigWithValue extends MidiConfig{
    readonly type: ControllerType
    readonly cc: number
    readonly values: number[]
}

type ControllerType = 'pot' | 'button'

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