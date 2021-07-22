import CC from '../../mapCC'
import { FuncProps, ControllerConfigCC } from '../../types'
import { ControllerId } from '../../controllerIds'


interface ControllersOut {
    props: FuncProps
    VOLUME: ControllerConfigCC
    SPREAD: ControllerConfigCC
    HEADPHONES: ControllerConfigCC
}

const controllersOut: ControllersOut = {
    props: { label: 'Out' },
    VOLUME: { id: ControllerId.OUT_VOLUME, label: 'Volume', type: 'pot', cc: CC.OUTPUT_VOLUME },
    SPREAD: { id: ControllerId.OUT_SPREAD, label: 'Spread', type: 'pot', cc: CC.OUTPUT_SPREAD },
    HEADPHONES: { id: ControllerId.OUT_HEADPHONES, label: 'Headphones', type: 'pot', cc: CC.OUTPUT_HEADPHONES },
}

export default controllersOut