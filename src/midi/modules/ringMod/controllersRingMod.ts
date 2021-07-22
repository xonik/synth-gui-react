import { BUTTONS } from '../../buttons'
import { FuncProps, ControllerConfigCCWithValue } from '../../types'
import { ControllerId } from '../../controllerIds'


interface ControllersRingMod {
    props: FuncProps
    SOURCE: ControllerConfigCCWithValue
}

const controllersRingMod: ControllersRingMod = {
    props: { label: 'Ring modulator' },
    SOURCE: {
        id: ControllerId.RING_MOD_SOURCE,
        label: 'Sources',
        type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
            BUTTONS.BUTTONS_LEFT.values.RING_MOD_SOURCE_1_2,
            BUTTONS.BUTTONS_LEFT.values.RING_MOD_SOURCE_EXT_2,
        ],
    }
}

export default controllersRingMod