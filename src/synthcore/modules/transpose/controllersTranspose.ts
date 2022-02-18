import { BUTTONS } from '../../../midi/buttons'
import { FuncProps, ControllerConfigCCWithValue } from '../../../midi/types'
import { ControllerIdNonMod } from '../../../midi/controllerIds'


interface ControllersTranspose {
    props: FuncProps
    TRANSPOSE: ControllerConfigCCWithValue
}

const controllersTranspose: ControllersTranspose = {
    props: { label: 'Transpose' },
    TRANSPOSE: {
        id: ControllerIdNonMod.KBD_TRANSPOSE,
        label: 'Up/down',
        type: 'button',
            cc: BUTTONS.BUTTONS_CENTER.cc,
            values: [
            BUTTONS.BUTTONS_CENTER.values.TRANSPOSE_NEG_2,
            BUTTONS.BUTTONS_CENTER.values.TRANSPOSE_NEG_1,
            BUTTONS.BUTTONS_CENTER.values.TRANSPOSE_0,
            BUTTONS.BUTTONS_CENTER.values.TRANSPOSE_POS_1,
            BUTTONS.BUTTONS_CENTER.values.TRANSPOSE_POS_2,
        ],
    },
}

export default controllersTranspose