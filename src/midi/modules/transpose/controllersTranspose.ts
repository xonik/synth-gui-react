import { BUTTONS } from '../../buttons'
import { FuncProps, ControllerConfigCCWithValue } from '../../types'


interface ControllersTranspose {
    props: FuncProps
    TRANSPOSE: ControllerConfigCCWithValue
}

const controllersTranspose: ControllersTranspose = {
    props: { label: 'Transpose' },
    TRANSPOSE: {
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