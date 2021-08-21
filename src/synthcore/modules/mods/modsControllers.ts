import CC from '../../../midi/mapCC'
import { BUTTONS } from '../../../midi/buttons'
import { ControllerConfigCC, ControllerConfigCCWithValue, ControllerConfigNRPN, FuncProps } from '../../../midi/types'
import { ControllerId } from '../../../midi/controllerIds'
import NRPN from '../../../midi/mapNRPN'

interface ModsControllers {
    props: FuncProps
    AMOUNT: ControllerConfigNRPN
    SRC: ControllerConfigCCWithValue
    SET_SRC_ID: ControllerConfigCC
    DST: ControllerConfigCCWithValue
    SET_DST_ID: ControllerConfigCC
    SET_DST_INDEX: ControllerConfigCC
}

const modsControllers: ModsControllers = {
    props: { label: 'Routing' },
    AMOUNT: { id: ControllerId.MOD_AMOUNT, label: 'Amount', type: 'pot', addr: NRPN.MOD_AMOUNT },

    // from-button
    SRC: {
        id: ControllerId.MOD_DST,
        label: 'From',
        type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
            BUTTONS.BUTTONS_LEFT.values.ROUTE_OFF,
            BUTTONS.BUTTONS_LEFT.values.ROUTE_FROM_ON,
            BUTTONS.BUTTONS_LEFT.values.ROUTE_TO_ON,
        ],
    },

    // set from controller id
    SET_SRC_ID: {
        id: ControllerId.MOD_SET_SRC_ID,
        label: 'From',
        type: 'com',
        cc: CC.MOD_SRC_ID,
    },

    // to-button
    DST: {
        id: ControllerId.MOD_DST,
        label: 'To id',
        type: 'button',
            cc: BUTTONS.BUTTONS_LEFT.cc,
            values: [
            BUTTONS.BUTTONS_LEFT.values.ROUTE_OFF,
            BUTTONS.BUTTONS_LEFT.values.ROUTE_FROM_ON,
            BUTTONS.BUTTONS_LEFT.values.ROUTE_TO_ON,
        ],
    },

    // set destination controller id
    SET_DST_ID: {
        id: ControllerId.MOD_SET_DST_ID,
        label: 'To index',
        type: 'com',
        cc: CC.MOD_DST_ID,
    },

    // set destination controller index, used for lfo and env that has the same id on all instances
    SET_DST_INDEX: {
        id: ControllerId.MOD_SET_DST_INDEX,
        label: 'To',
        type: 'com',
        cc: CC.MOD_DST_INDEX,
    },
}

export default modsControllers