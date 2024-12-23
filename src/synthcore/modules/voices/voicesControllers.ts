import { ControllerConfigButton, FuncProps } from '../../../midi/types'
import { ControllerIdNonMod } from '../controllers/controllerIds'
import {buttonMidiValues} from "../../../midi/buttonMidiValues";


interface VoicesControllers {
    props: FuncProps
    VOICE: ControllerConfigButton
}

const voicesControllers: VoicesControllers = {
    props: { label: 'Voice selector' },
    VOICE: {
        id: ControllerIdNonMod.VOICE_SELECTOR,
        label: 'Voice 1',
        type: 'button',
        values: [
            buttonMidiValues.VOICE1,
            buttonMidiValues.VOICE2,
            buttonMidiValues.VOICE3,
            buttonMidiValues.VOICE4,
            buttonMidiValues.VOICE5,
            buttonMidiValues.VOICE6,
            buttonMidiValues.VOICE7,
            buttonMidiValues.VOICE8,
        ],
        global: true,
    },
}

export default voicesControllers