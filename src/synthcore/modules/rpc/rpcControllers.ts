import { sysexCommands } from '@/midi/midibus'
import type { ControllerConfigSysex, FuncProps } from '@/midi/types'
import { ControllerIdNonMod } from '../controllers/controllerIds'

interface RpcControllers {
    props: FuncProps
    RPC: ControllerConfigSysex
}

// These are special, they aren't normal
// controllers but a place holder for
// the command that is used for all
// midiRPC calls - as they use the same
// sysex mechanism as other sysex controllers
const rpcControllers: RpcControllers = {
    props: { label: 'RPC' },
    RPC: {
        id: ControllerIdNonMod.RPC,
        label: 'RPC',
        type: 'com',
        command: sysexCommands.RPC,
        values: [],
    },
}

export default rpcControllers
