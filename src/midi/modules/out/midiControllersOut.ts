import CC from '../../mapCC'
import { MidiConfigCC } from '../../types'


interface MidiControllersOut {
    VOLUME: MidiConfigCC
    SPREAD: MidiConfigCC
    HEADPHONES: MidiConfigCC
}

const midiControllersOut: MidiControllersOut ={
    VOLUME: { type: 'pot', cc: CC.OUTPUT_VOLUME },
    SPREAD: { type: 'pot', cc: CC.OUTPUT_SPREAD },
    HEADPHONES: { type: 'pot', cc: CC.OUTPUT_HEADPHONES },
}

export default midiControllersOut