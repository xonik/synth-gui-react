import CC from '../../../midi/mapCC'
import { BUTTONS } from '../../../midi/buttons'
import { FuncProps, ControllerConfigCC, ControllerConfigCCWithValue } from '../../../midi/types'
import { ControllerIdDst, ControllerIdNonMod } from '../controllers/controllerIds'

interface MasterClockControllers {
    props: FuncProps
    RATE: ControllerConfigCC,
    SOURCE: ControllerConfigCCWithValue
}

const masterClockControllers: MasterClockControllers = {
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

export default masterClockControllers