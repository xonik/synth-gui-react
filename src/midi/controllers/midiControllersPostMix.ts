import CC from '../ccMap'
import { MidiConfig } from './utils'

interface MidiControllersPostMix {
    LPF: MidiConfig,
    SVF: MidiConfig,
    SINE1: MidiConfig,
    SINE2: MidiConfig,
}

const midiControllersPostMix: MidiControllersPostMix = {
    LPF: { type: 'pot', cc: CC.POST_MIX_LPF },
    SVF: { type: 'pot', cc: CC.POST_MIX_SVF },
    SINE1: { type: 'pot', cc: CC.POST_MIX_SINE1 },
    SINE2: { type: 'pot', cc: CC.POST_MIX_SINE2 },
}

export default midiControllersPostMix