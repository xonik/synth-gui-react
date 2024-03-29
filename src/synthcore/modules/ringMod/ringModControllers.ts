import { BUTTONS } from '../../../midi/buttons'
import { FuncProps, ControllerConfigCCWithValue } from '../../../midi/types'
import { ControllerIdNonMod } from '../controllers/controllerIds'


interface RingModControllers {
    props: FuncProps
    SOURCE: ControllerConfigCCWithValue
}

const ringModControllers: RingModControllers = {
    props: { label: 'Ring modulator' },
    SOURCE: {
        id: ControllerIdNonMod.RING_MOD_SOURCE,
        label: 'Sources',
        type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
            BUTTONS.BUTTONS_LEFT.values.RING_MOD_SOURCE_1_2,
            BUTTONS.BUTTONS_LEFT.values.RING_MOD_SOURCE_EXT_2,
        ],
    }
}

export default ringModControllers