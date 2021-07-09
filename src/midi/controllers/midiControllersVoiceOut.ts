import CC from '../ccMap'
import { MidiConfig } from './utils'

interface MidiControllersVoiceOut {
    PAN: MidiConfig
    AMOUNT: MidiConfig
    FX1_SEND: MidiConfig
    FX2_SEND: MidiConfig
}

const midiControllersVoiceOut: MidiControllersVoiceOut = {
    PAN: { type: 'pot', cc: CC.VOICE_OUT_PAN },
    AMOUNT: { type: 'pot', cc: CC.VOICE_OUT_AMOUNT },
    FX1_SEND: { type: 'pot', cc: CC.VOICE_OUT_FX1_SEND },
    FX2_SEND: { type: 'pot', cc: CC.VOICE_OUT_FX2_SEND },
}

export default midiControllersVoiceOut