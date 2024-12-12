import CC from '../../../midi/mapCC'
import { ControllerConfigCC, ControllerConfigButton, ControllerConfigNRPN, FuncProps } from '../../../midi/types'
import { ControllerIdNonMod, ControllerIdNonModPots } from '../controllers/controllerIds'
import NRPN from '../../../midi/mapNRPN'
import {buttonMidiValues} from "../../../midi/buttonMidiValues";

interface ModsControllers {
    props: FuncProps
    AMOUNT: ControllerConfigNRPN
    UI_AMOUNT: ControllerConfigNRPN
    ROUTE_BUTTON: ControllerConfigButton
    SET_SRC_ID: ControllerConfigCC
    SET_DST_ID: ControllerConfigCC
    SET_DST_INDEX: ControllerConfigCC
}

const modsControllers: ModsControllers = {
    props: { label: 'Routing' },
    AMOUNT: { id: ControllerIdNonModPots.MOD_AMOUNT, label: 'Amount', type: 'pot', addr: NRPN.MOD_AMOUNT, bipolar: true },
    UI_AMOUNT: { id: ControllerIdNonModPots.MOD_AMOUNT, label: 'Amount', type: 'pot', addr: NRPN.MOD_UI_AMOUNT, bipolar: true },

    // from and to-buttons
    ROUTE_BUTTON: {
        id: ControllerIdNonMod.MOD_DST,
        label: 'From-To',
        type: 'button',
        values: [
            buttonMidiValues.ROUTE_OFF,
            buttonMidiValues.ROUTE_FROM_ON,
            buttonMidiValues.ROUTE_TO_ON,
        ],
    },

    // set from controller id
    SET_SRC_ID: {
        id: ControllerIdNonMod.MOD_SET_SRC_ID,
        label: 'From',
        type: 'com',
        cc: CC.MOD_SRC_ID,
    },

    // set destination controller id
    SET_DST_ID: {
        id: ControllerIdNonMod.MOD_SET_DST_ID,
        label: 'To index',
        type: 'com',
        cc: CC.MOD_DST_ID,
    },

    // set destination controller index, used for lfo and env that has the same id on all instances
    SET_DST_INDEX: {
        id: ControllerIdNonMod.MOD_SET_DST_INDEX,
        label: 'To',
        type: 'com',
        cc: CC.MOD_DST_INDEX,
    },
}

export default modsControllers