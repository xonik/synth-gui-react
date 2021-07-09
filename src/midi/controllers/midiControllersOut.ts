import CC from '../ccMap'
import { MidiConfig } from './utils'

interface MidiControllersOut {
    VOLUME: MidiConfig
    SPREAD: MidiConfig
    HEADPHONES: MidiConfig
}

const midiControllersOut: MidiControllersOut ={
    VOLUME: { type: 'pot', cc: CC.OUTPUT_VOLUME },
    SPREAD: { type: 'pot', cc: CC.OUTPUT_SPREAD },
    HEADPHONES: { type: 'pot', cc: CC.OUTPUT_HEADPHONES },
}

export default midiControllersOut