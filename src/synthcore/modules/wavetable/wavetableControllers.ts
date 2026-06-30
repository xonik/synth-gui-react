import { sysexCommands } from '@/midi/midibus'
import type { ControllerConfigSysex, FuncProps } from '@/midi/types'
import { ControllerIdNonMod } from '../controllers/controllerIds'

interface WavetableControllers {
    props: FuncProps
    ADD_WAVE: ControllerConfigSysex
    REMOVE_WAVE: ControllerConfigSysex
    MOVE_WAVE: ControllerConfigSysex
    LOAD: ControllerConfigSysex
}

const wavetableControllers: WavetableControllers = {
    props: { label: 'Wavetable' },
    ADD_WAVE: {
        id: ControllerIdNonMod.WAVETABLE_ADD_WAVE,
        label: 'Add wave',
        type: 'com',
        command: sysexCommands.WAVETABLE_ADD_WAVE,
        values: [],
    },
    REMOVE_WAVE: {
        id: ControllerIdNonMod.WAVETABLE_REMOVE_WAVE,
        label: 'Remove wave',
        type: 'com',
        command: sysexCommands.WAVETABLE_REMOVE_WAVE,
        values: [],
    },
    MOVE_WAVE: {
        id: ControllerIdNonMod.WAVETABLE_MOVE_WAVE,
        label: 'Move wave',
        type: 'com',
        command: sysexCommands.WAVETABLE_MOVE_WAVE,
        values: [],
    },
    LOAD: {
        id: ControllerIdNonMod.WAVETABLE_LOAD,
        label: 'Load wavetable',
        type: 'com',
        command: sysexCommands.WAVETABLE_LOAD,
        values: [],
    },
}

export default wavetableControllers
