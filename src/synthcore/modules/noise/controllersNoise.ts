import { BUTTONS } from '../../../midi/buttons'
import { FuncProps, ControllerConfigCCWithValue } from '../../../midi/types'
import { ControllerIdNonMod } from '../../../midi/controllerIds'

interface ControllersNoise {
    props: FuncProps
    COLOUR: ControllerConfigCCWithValue
}

const controllersNoise: ControllersNoise = {
    props: { label: 'Noise' },
    COLOUR: {
        id: ControllerIdNonMod.NOISE_COLOUR,
        label: 'Colour',
        type: 'button',
        cc: BUTTONS.BUTTONS_LEFT.cc,
        values: [
            BUTTONS.BUTTONS_LEFT.values.NOISE_COLOUR_WHITE,
            BUTTONS.BUTTONS_LEFT.values.NOISE_COLOUR_PINK,
            BUTTONS.BUTTONS_LEFT.values.NOISE_COLOUR_RED,
        ],
    }
}

export default controllersNoise