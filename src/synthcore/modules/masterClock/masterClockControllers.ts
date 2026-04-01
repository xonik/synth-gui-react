import { buttonMidiValues } from '@/midi/buttonMidiValues'
import NRPN from '@/midi/mapNRPN'
import type { ControllerConfigButton, ControllerConfigNRPN, FuncProps } from '@/midi/types'
import { sharedConfig } from '@/sharedConfig'
import { ControllerIdNonMod, ControllerIdNonModPots } from '../controllers/controllerIds'

interface MasterClockControllers {
    props: FuncProps
    RATE: ControllerConfigNRPN
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
        global: true,
        range: {
            from: sharedConfig.MASTER_CLOCK_MIN_BPM.value,
            to: sharedConfig.MASTER_CLOCK_MAX_BPM.value,
        },
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
        global: true,
    },
}

export default masterClockControllers
