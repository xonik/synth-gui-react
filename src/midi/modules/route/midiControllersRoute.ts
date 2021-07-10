import CC from '../../ccMap'
import { BUTTONS } from '../../buttons'
import { MidiConfig, MidiConfigWithValue } from '../../types'

interface MidiControllersRoute {
    AMOUNT: MidiConfig,
    FROM: MidiConfigWithValue
    TO: MidiConfigWithValue
}

const midiControllersRoute: MidiControllersRoute = {
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

export default midiControllersRoute