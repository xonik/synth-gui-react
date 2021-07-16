import CC from '../../mapCC'
import { MidiConfigCC } from '../../types'


interface MidiControllersPostMix {
    LPF: MidiConfigCC,
    SVF: MidiConfigCC,
    SINE1: MidiConfigCC,
    SINE2: MidiConfigCC,
}

const midiControllersPostMix: MidiControllersPostMix = {
    LPF: { type: 'pot', cc: CC.POST_MIX_LPF },
    SVF: { type: 'pot', cc: CC.POST_MIX_SVF },
    SINE1: { type: 'pot', cc: CC.POST_MIX_SINE1 },
    SINE2: { type: 'pot', cc: CC.POST_MIX_SINE2 },
}

export default midiControllersPostMix