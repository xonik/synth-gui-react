import { FuncProps, ControllerConfigButton } from '../../../midi/types'
import { ControllerIdNonMod } from '../controllers/controllerIds'
import {buttonMidiValues} from "../../../midi/buttonMidiValues";


interface RingModControllers {
    props: FuncProps
    SOURCE: ControllerConfigButton
}

const ringModControllers: RingModControllers = {
    props: { label: 'Ring modulator' },
    SOURCE: {
        id: ControllerIdNonMod.RING_MOD_SOURCE,
        label: 'Sources',
        type: 'button',
        values: [
            buttonMidiValues.RING_MOD_SOURCE_1_2,
            buttonMidiValues.RING_MOD_SOURCE_EXT_2,
            buttonMidiValues.RING_MOD_SOURCE_VCO_2,
        ],
    }
}

export default ringModControllers