import CC from '../../mapCC'
import { FuncProps, MidiConfigCC } from '../../types'


interface ControllersOut {
    props: FuncProps
    VOLUME: MidiConfigCC
    SPREAD: MidiConfigCC
    HEADPHONES: MidiConfigCC
}

const controllersOut: ControllersOut = {
    props: { label: 'Out' },
    VOLUME: { label: 'Volume', type: 'pot', cc: CC.OUTPUT_VOLUME },
    SPREAD: { label: 'Spread', type: 'pot', cc: CC.OUTPUT_SPREAD },
    HEADPHONES: { label: 'Headphones', type: 'pot', cc: CC.OUTPUT_HEADPHONES },
}

export default controllersOut