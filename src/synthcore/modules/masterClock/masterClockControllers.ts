import CC from '../../../midi/mapCC'
import { FuncProps, ControllerConfigCC, ControllerConfigButton } from '../../../midi/types'
import { ControllerIdDst, ControllerIdNonMod } from '../controllers/controllerIds'
import {buttonMidiValues} from "../../../midi/buttonMidiValues";

interface MasterClockControllers {
    props: FuncProps
    RATE: ControllerConfigCC,
    SOURCE: ControllerConfigButton
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
        values: [
            buttonMidiValues.MASTER_CLOCK_SRC_MASTER,
            buttonMidiValues.MASTER_CLOCK_SRC_MIDI,
            buttonMidiValues.MASTER_CLOCK_SRC_EXT,
        ],
    },
}

export default masterClockControllers