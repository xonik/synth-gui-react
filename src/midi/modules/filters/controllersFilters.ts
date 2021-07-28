import CC from '../../mapCC'
import { BUTTONS } from '../../buttons'
import { FuncProps, ControllerConfigCC, ControllerConfigCCWithValue } from '../../types'
import { ControllerId } from '../../controllerIds'



interface ControllersFilters {
    LPF: {
        props: FuncProps
        INPUT: ControllerConfigCC
        DRIVE: ControllerConfigCC
        RESONANCE: ControllerConfigCC
        CUTOFF: ControllerConfigCC
        FM_AMT: ControllerConfigCC
        ENV_AMT: ControllerConfigCC
        LFO_AMT: ControllerConfigCC
        KBD_AMT: ControllerConfigCC
        EXT_CV: ControllerConfigCCWithValue
        WHEEL: ControllerConfigCCWithValue
        SLOPE: ControllerConfigCCWithValue
    },
    FILTERS: {
        props: FuncProps
        LINK_CUTOFF: ControllerConfigCCWithValue
        ROUTING: ControllerConfigCCWithValue
    },
    SVF: {
        props: FuncProps
        INPUT: ControllerConfigCC
        DRIVE: ControllerConfigCC
        RESONANCE: ControllerConfigCC
        CUTOFF: ControllerConfigCC
        FM_AMT: ControllerConfigCC
        ENV_AMT: ControllerConfigCC
        LFO_AMT: ControllerConfigCC
        KBD_AMT: ControllerConfigCC
        EXT_CV: ControllerConfigCCWithValue
        WHEEL: ControllerConfigCCWithValue
        SLOPE: ControllerConfigCCWithValue
    }
}

const controllersFilters: ControllersFilters = {
    LPF: {
        props: { label: 'Low pass filter' },
        INPUT: {
            id: ControllerId.LPF_INPUT,
            label: 'Input',
            isTargetDigi: true,
            type: 'pot',
            cc: CC.LPF_INPUT
        },
        DRIVE: {
            id: ControllerId.LPF_DRIVE,
            label: 'Drive',
            isTargetDigi: true,
            type: 'pot',
            cc: CC.LPF_DRIVE
        },
        RESONANCE: {
            id: ControllerId.LPF_RESONANCE,
            label: 'Resonance',
            isTargetDigi: true,
            type: 'pot',
            cc: CC.LPF_RESONANCE
        },
        CUTOFF: {
            id: ControllerId.LPF_CUTOFF,
            label: 'Cutoff',
            isTargetDigi: true,
            type: 'pot',
            cc: CC.LPF_CUTOFF
        },
        FM_AMT: { id: ControllerId.LPF_FM_AMT, isTargetDigi: true, label: 'FM amount', type: 'pot', cc: CC.LPF_FM_AMT },
        ENV_AMT: { id: ControllerId.LPF_ENV_AMT, isTargetDigi: true, label: 'Env amount', type: 'pot', cc: CC.LPF_ENV_AMT },
        LFO_AMT: { id: ControllerId.LPF_LFO_AMT, isTargetDigi: true, label: 'LFO amount', type: 'pot', cc: CC.LPF_LFO_AMT },
        KBD_AMT: { id: ControllerId.LPF_KBD_AMT, isTargetDigi: true, label: 'Keyboard track', type: 'pot', cc: CC.LPF_KBD_AMT },

        EXT_CV: {
            id: ControllerId.LPF_EXT_CV,
            label: 'Ext. CV',
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.LPF_EXT_CV_OFF,
                BUTTONS.BUTTONS_RIGHT.values.LPF_EXT_CV_ON,
            ],
        },
        WHEEL: {
            id: ControllerId.LPF_WHEEL,
            label: 'Mod wheel',
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.LPF_WHEEL_OFF,
                BUTTONS.BUTTONS_RIGHT.values.LPF_WHEEL_ON,
            ],
        },
        SLOPE: {
            id: ControllerId.LPF_SLOPE,
            label: 'Slope',
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.LPF_SLOPE_12DB,
                BUTTONS.BUTTONS_RIGHT.values.LPF_SLOPE_24DB,
            ],
        },
    },
    FILTERS: {
        props: { label: 'Link/route' },
        LINK_CUTOFF: {
            id: ControllerId.FILTERS_LINK_CUTOFF,
            label: 'Link cutoff',
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.FILTER_LINK_CUTOFF_OFF,
                BUTTONS.BUTTONS_RIGHT.values.FILTER_LINK_CUTOFF_ON,
            ],
        },
        ROUTING: {
            id: ControllerId.FILTERS_ROUTING,
            label: 'Routing',
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.FILTER_ROUTING_SERIES,
                BUTTONS.BUTTONS_RIGHT.values.FILTER_ROUTING_PARALLEL,
            ],
        },
    },
    SVF: {
        props: { label: 'State variable filter' },
        INPUT: {
            id: ControllerId.SVF_INPUT,
            label: 'Input',
            isTargetDigi: true,
            type: 'pot',
            cc: CC.SVF_INPUT
        },
        DRIVE: {
            id: ControllerId.SVF_DRIVE,
            label: 'Drive',
            isTargetDigi: true,
            type: 'pot',
            cc: CC.SVF_DRIVE
        },
        RESONANCE: {
            id: ControllerId.SVF_RESONANCE,
            label: 'Resonance',
            isTargetDigi: true,
            type: 'pot',
            cc: CC.SVF_RESONANCE
        },
        CUTOFF: {
            id: ControllerId.SVF_CUTOFF,
            label: 'Cutoff',
            isTargetDigi: true,
            type: 'pot',
            cc: CC.SVF_CUTOFF
        },
        FM_AMT: { id: ControllerId.SVF_FM_AMT, label: 'FM amount', isTargetDigi: true, type: 'pot', cc: CC.SVF_FM_AMT },
        ENV_AMT: { id: ControllerId.SVF_ENV_AMT, label: 'Env amount', isTargetDigi: true, type: 'pot', cc: CC.SVF_ENV_AMT },
        LFO_AMT: { id: ControllerId.SVF_LFO_AMT, label: 'LFO amount', isTargetDigi: true, type: 'pot', cc: CC.SVF_LFO_AMT },
        KBD_AMT: { id: ControllerId.SVF_KBD_AMT, label: 'Keyboard track, isTargetDigi: true', type: 'pot', cc: CC.SVF_KBD_AMT },

        EXT_CV: {
            id: ControllerId.SVF_EXT_CV,
            label: 'Ext. CV',
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.SVF_EXT_CV_OFF,
                BUTTONS.BUTTONS_RIGHT.values.SVF_EXT_CV_ON,
            ],
        },
        WHEEL: {
            id: ControllerId.SVF_WHEEL,
            label: 'Wheel',
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.SVF_WHEEL_OFF,
                BUTTONS.BUTTONS_RIGHT.values.SVF_WHEEL_ON,
            ],
        },
        SLOPE: {
            id: ControllerId.SVF_SLOPE,
            label: 'Slope',
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.SVF_SLOPE_12DB_LP,
                BUTTONS.BUTTONS_RIGHT.values.SVF_SLOPE_24DB_LP,
                BUTTONS.BUTTONS_RIGHT.values.SVF_SLOPE_12DB_BP,
                BUTTONS.BUTTONS_RIGHT.values.SVF_SLOPE_24DB_BP,
                BUTTONS.BUTTONS_RIGHT.values.SVF_SLOPE_LP_BP,
                BUTTONS.BUTTONS_RIGHT.values.SVF_SLOPE_12DB_HP,
                BUTTONS.BUTTONS_RIGHT.values.SVF_SLOPE_24DB_HP,
                BUTTONS.BUTTONS_RIGHT.values.SVF_SLOPE_HP_BP,
                BUTTONS.BUTTONS_RIGHT.values.SVF_SLOPE_NOTCH,
                BUTTONS.BUTTONS_RIGHT.values.SVF_SLOPE_NOTCH_LP,
            ],
        },
    }
}

export default controllersFilters