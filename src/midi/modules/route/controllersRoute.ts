import CC from '../../mapCC'
import { BUTTONS } from '../../buttons'
import { MidiConfigCC, MidiConfigCCWithValue } from '../../types'

interface ControllersRoute {
    AMOUNT: MidiConfigCC,
    FROM: MidiConfigCCWithValue
    TO: MidiConfigCCWithValue
}

const controllersRoute: ControllersRoute = {
    AMOUNT: { type: 'pot', cc: CC.ROUTE_AMOUNT },
    FROM: {
        type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
            BUTTONS.BUTTONS_LEFT.values.ROUTE_OFF,
            BUTTONS.BUTTONS_LEFT.values.ROUTE_FROM_ON,
            BUTTONS.BUTTONS_LEFT.values.ROUTE_TO_ON,
        ],
    },
    TO: {
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