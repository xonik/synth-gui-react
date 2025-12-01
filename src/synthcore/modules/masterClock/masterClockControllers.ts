import { FuncProps, ControllerConfigButton, ControllerConfigNRPN } from '../../../midi/types'
import { ControllerIdNonMod, ControllerIdNonModPots } from '../controllers/controllerIds'
import {buttonMidiValues} from "../../../midi/buttonMidiValues";
import NRPN from "../../../midi/mapNRPN";

interface MasterClockControllers {
    props: FuncProps
    RATE: ControllerConfigNRPN,
    SOURCE: ControllerConfigButton
}

const masterClockControllers: MasterClockControllers = {
    props: { label: 'Master clock', shortLabel: 'Master clk' },
    RATE: {
        id: ControllerIdNonModPots.MASTER_CLOCK_RATE,
        label: 'Rate',
        isDstDigi: true,
        type: 'pot',
        addr: NRPN.MASTER_CLOCK_RATE,
        global: true
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
        global: true
    },
}

export default masterClockControllers