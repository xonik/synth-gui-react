import { sysexCommands } from '@/midi/midibus'
import type { ControllerConfigSysex, FuncProps } from '@/midi/types'
import { ControllerIdNonMod } from '../controllers/controllerIds'

interface WavetableControllers {
    props: FuncProps
    UPDATE: ControllerConfigSysex
}

// NB: Currently, wavetable is not stored on the main/voice controller. Instead, the whole
// table is sent on every change and when selected for an oscillator.
// The waveforms are stored on the voice controllers though.
const wavetableControllers: WavetableControllers = {
    props: { label: 'Wavetable' },
    UPDATE: {
        id: ControllerIdNonMod.WAVETABLE_UPDATE,
        label: 'Update wavetable',
        type: 'com',
        command: sysexCommands.WAVETABLE_UPDATE,
        values: [],
    },
}

export default wavetableControllers
