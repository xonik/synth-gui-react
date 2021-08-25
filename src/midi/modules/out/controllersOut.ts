import CC from '../../mapCC'
import { FuncProps, ControllerConfigCC } from '../../types'
import { ControllerIdNonModPots } from '../../controllerIds'


interface ControllersOut {
    props: FuncProps
    VOLUME: ControllerConfigCC
    SPREAD: ControllerConfigCC
    HEADPHONES: ControllerConfigCC
}

const controllersOut: ControllersOut = {
    props: { label: 'Out' },
    VOLUME: { id: ControllerIdNonModPots.OUT_VOLUME, label: 'Volume', type: 'pot', cc: CC.OUTPUT_VOLUME },
    SPREAD: { id: ControllerIdNonModPots.OUT_SPREAD, label: 'Spread', type: 'pot', cc: CC.OUTPUT_SPREAD },
    HEADPHONES: { id: ControllerIdNonModPots.OUT_HEADPHONES, label: 'Headphones', type: 'pot', cc: CC.OUTPUT_HEADPHONES },
}

export default controllersOut