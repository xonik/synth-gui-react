import CC from '../../../midi/mapCC'
import { BUTTONS } from '../../../midi/buttons'
import { FuncProps, ControllerConfigCC, ControllerConfigCCWithValue } from '../../../midi/types'
import { ControllerIdDst, ControllerIdIntermediate, ControllerIdNonMod } from '../../../midi/controllerIds'



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
            id: ControllerIdDst.LPF_INPUT,
            label: 'Input',
            isDstDigi: true,
            type: 'pot',
            cc: CC.LPF_INPUT
        },
        DRIVE: {
            id: ControllerIdDst.LPF_DRIVE,
            label: 'Drive',
            isDstDigi: true,
            type: 'pot',
            cc: CC.LPF_DRIVE
        },
        RESONANCE: {
            id: ControllerIdDst.LPF_RESONANCE,
            label: 'Resonance',
            shortLabel: 'Reso',
            isDstDigi: true,
            type: 'pot',
            cc: CC.LPF_RESONANCE
        },
        CUTOFF: {
            id: ControllerIdDst.LPF_CUTOFF,
            label: 'Cutoff',
            isDstDigi: true,
            type: 'pot',
            cc: CC.LPF_CUTOFF
        },
        FM_AMT: { id: ControllerIdIntermediate.LPF_FM_AMT, isDstDigi: true, label: 'FM amount', shortLabel: 'FM amt', type: 'pot', cc: CC.LPF_FM_AMT },
        ENV_AMT: { id: ControllerIdIntermediate.LPF_ENV_AMT, isDstDigi: true, label: 'Env amount', shortLabel: 'Env amt', type: 'pot', cc: CC.LPF_ENV_AMT },
        LFO_AMT: { id: ControllerIdIntermediate.LPF_LFO_AMT, isDstDigi: true, label: 'LFO amount', shortLabel: 'LFO amt', type: 'pot', cc: CC.LPF_LFO_AMT },
        KBD_AMT: { id: ControllerIdIntermediate.LPF_KBD_AMT, isDstDigi: true, label: 'Keyboard track', shortLabel: 'Kbd trk', type: 'pot', cc: CC.LPF_KBD_AMT },

        EXT_CV: {
            id: ControllerIdNonMod.LPF_EXT_CV,
            label: 'Ext. CV',
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.LPF_EXT_CV_OFF,
                BUTTONS.BUTTONS_RIGHT.values.LPF_EXT_CV_ON,
            ],
        },
        WHEEL: {
            id: ControllerIdNonMod.LPF_WHEEL,
            label: 'Mod wheel',
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.LPF_WHEEL_OFF,
                BUTTONS.BUTTONS_RIGHT.values.LPF_WHEEL_ON,
            ],
        },
        SLOPE: {
            id: ControllerIdNonMod.LPF_SLOPE,
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
            id: ControllerIdNonMod.FILTERS_LINK_CUTOFF,
            label: 'Link cutoff',
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.FILTER_LINK_CUTOFF_OFF,
                BUTTONS.BUTTONS_RIGHT.values.FILTER_LINK_CUTOFF_ON,
            ],
        },
        ROUTING: {
            id: ControllerIdNonMod.FILTERS_ROUTING,
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
            id: ControllerIdDst.SVF_INPUT,
            label: 'Input',
            isDstDigi: true,
            type: 'pot',
            cc: CC.SVF_INPUT
        },
        DRIVE: {
            id: ControllerIdDst.SVF_DRIVE,
            label: 'Drive',
            isDstDigi: true,
            type: 'pot',
            cc: CC.SVF_DRIVE
        },
        RESONANCE: {
            id: ControllerIdDst.SVF_RESONANCE,
            label: 'Resonance',
            shortLabel: 'Reso',
            isDstDigi: true,
            type: 'pot',
            cc: CC.SVF_RESONANCE
        },
        CUTOFF: {
            id: ControllerIdDst.SVF_CUTOFF,
            label: 'Cutoff',
            isDstDigi: true,
            type: 'pot',
            cc: CC.SVF_CUTOFF
        },
        FM_AMT: { id: ControllerIdIntermediate.SVF_FM_AMT, label: 'FM amount', shortLabel: 'FM amt', isDstDigi: true, type: 'pot', cc: CC.SVF_FM_AMT },
        ENV_AMT: { id: ControllerIdIntermediate.SVF_ENV_AMT, label: 'Env amount', shortLabel: 'Env amt', isDstDigi: true, type: 'pot', cc: CC.SVF_ENV_AMT },
        LFO_AMT: { id: ControllerIdIntermediate.SVF_LFO_AMT, label: 'LFO amount', shortLabel: 'LFO amt', isDstDigi: true, type: 'pot', cc: CC.SVF_LFO_AMT },
        KBD_AMT: { id: ControllerIdIntermediate.SVF_KBD_AMT, label: 'Keyboard track', shortLabel: 'Kbd trk', isDstDigi: true, type: 'pot', cc: CC.SVF_KBD_AMT },

        EXT_CV: {
            id: ControllerIdNonMod.SVF_EXT_CV,
            label: 'Ext. CV',
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.SVF_EXT_CV_OFF,
                BUTTONS.BUTTONS_RIGHT.values.SVF_EXT_CV_ON,
            ],
        },
        WHEEL: {
            id: ControllerIdNonMod.SVF_WHEEL,
            label: 'Wheel',
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.SVF_WHEEL_OFF,
                BUTTONS.BUTTONS_RIGHT.values.SVF_WHEEL_ON,
            ],
        },
        SLOPE: {
            id: ControllerIdNonMod.SVF_SLOPE,
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