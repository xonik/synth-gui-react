import CC from '../../../midi/mapCC'
import { BUTTONS } from '../../../midi/buttons'
import { ControllerConfigCCWithValue, ControllerConfigNRPN, FuncProps } from '../../../midi/types'
import { ControllerId } from '../../../midi/controllerIds'

interface ModsControllers {
    props: FuncProps
    AMOUNT: ControllerConfigNRPN
    FROM: ControllerConfigCCWithValue
    TO: ControllerConfigCCWithValue
}

const modsControllers: ModsControllers = {
    props: { label: 'Routing' },
    AMOUNT: { id: ControllerId.ROUTE_AMOUNT, label: 'Amount', type: 'pot', addr: CC.ROUTE_AMOUNT },
    FROM: {
        id: ControllerId.ROUTE_FROM,
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
        id: ControllerId.ROUTE_TO,
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

export default modsControllers