import CC from '../../mapCC'
import { BUTTONS } from '../../buttons'
import { ControllerConfigCC, ControllerConfigCCWithValue, FuncProps } from '../../types'

interface ControllersRoute {
    props: FuncProps
    AMOUNT: ControllerConfigCC
    FROM: ControllerConfigCCWithValue
    TO: ControllerConfigCCWithValue
}

const controllersRoute: ControllersRoute = {
    props: { label: 'Routing' },
    AMOUNT: { label: 'Amount', type: 'pot', cc: CC.ROUTE_AMOUNT },
    FROM: {
        label: 'From',
        type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
            BUTTONS.BUTTONS_LEFT.values.ROUTE_OFF,
            BUTTONS.BUTTONS_LEFT.values.ROUTE_FROM_ON,
            BUTTONS.BUTTONS_LEFT.values.ROUTE_TO_ON,
        ],
    },
    TO: {
        label: 'To',
        type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
            BUTTONS.BUTTONS_LEFT.values.ROUTE_OFF,
            BUTTONS.BUTTONS_LEFT.values.ROUTE_FROM_ON,
            BUTTONS.BUTTONS_LEFT.values.ROUTE_TO_ON,
        ],
    },
}

export default controllersRoute