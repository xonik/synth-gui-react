import { FuncProps, ControllerConfigButton } from '../../../midi/types'
import { ControllerIdNonMod } from '../controllers/controllerIds'
import {buttonMidiValues} from "../../../midi/buttonMidiValues";

interface NoiseControllers {
    props: FuncProps
    COLOUR: ControllerConfigButton
}

const noiseControllers: NoiseControllers = {
    props: { label: 'Noise' },
    COLOUR: {
        id: ControllerIdNonMod.NOISE_COLOUR,
        label: 'Colour',
        type: 'button',
        values: [
            buttonMidiValues.NOISE_COLOUR_WHITE,
            buttonMidiValues.NOISE_COLOUR_PINK,
            buttonMidiValues.NOISE_COLOUR_RED,
        ],
    }
}

export default noiseControllers