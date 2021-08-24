import CC from '../../mapCC'
import { BUTTONS } from '../../buttons'
import { FuncProps, ControllerConfigCC, ControllerConfigCCWithValue } from '../../types'
import { ControllerIdDst, ControllerIdNonMod } from '../../controllerIds'

interface ControllersMasterClock {
    props: FuncProps
    RATE: ControllerConfigCC,
    SOURCE: ControllerConfigCCWithValue
}

const controllersMasterClock: ControllersMasterClock = {
    props: { label: 'Master clock', shortLabel: 'Master clk' },
    RATE: {
        id: ControllerIdDst.MASTER_CLOCK_RATE,
        label: 'Rate',
        isDstDigi: true,
        type: 'pot',
        cc: CC.MASTER_CLOCK_RATE
    },
    SOURCE: {
        id: ControllerIdNonMod.MASTER_CLOCK_SOURCE,
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