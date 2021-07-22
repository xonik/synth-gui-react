import CC from '../../mapCC'
import { BUTTONS } from '../../buttons'
import { FuncProps, ControllerConfigCC, ControllerConfigCCWithValue } from '../../types'

interface ControllersMasterClock {
    props: FuncProps
    RATE: ControllerConfigCC,
    SOURCE: ControllerConfigCCWithValue
}

const controllersMasterClock: ControllersMasterClock = {
    props: { label: 'Master clock' },
    RATE: {
        label: 'Rate',
        isTargetDigi: true,
        type: 'pot',
        cc: CC.MASTER_CLOCK_RATE
    },
    SOURCE: {
        label: 'Source',
        type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
            BUTTONS.BUTTONS_LEFT.values.MASTER_CLOCK_SRC_MASTER,
            BUTTONS.BUTTONS_LEFT.values.MASTER_CLOCK_SRC_MIDI,
            BUTTONS.BUTTONS_LEFT.values.MASTER_CLOCK_SRC_EXT,
        ],
    },
}

export default controllersMasterClock