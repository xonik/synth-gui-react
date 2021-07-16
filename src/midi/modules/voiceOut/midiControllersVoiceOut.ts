import CC from '../../mapCC'
import { MidiConfigCC } from '../../types'


interface MidiControllersVoiceOut {
    PAN: MidiConfigCC
    AMOUNT: MidiConfigCC
    FX1_SEND: MidiConfigCC
    FX2_SEND: MidiConfigCC
}

const midiControllersVoiceOut: MidiControllersVoiceOut = {
    PAN: { type: 'pot', cc: CC.VOICE_OUT_PAN },
    AMOUNT: { type: 'pot', cc: CC.VOICE_OUT_AMOUNT },
    FX1_SEND: { type: 'pot', cc: CC.VOICE_OUT_FX1_SEND },
    FX2_SEND: { type: 'pot', cc: CC.VOICE_OUT_FX2_SEND },
}

export default midiControllersVoiceOut