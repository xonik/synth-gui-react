import CC from '../../mapCC'
import { BUTTONS } from '../../buttons'
import { FuncProps, MidiConfigCC, MidiConfigCCWithValue } from '../../types'

interface ControllersFilters {
    LPF: {
        props: FuncProps
        INPUT: MidiConfigCC
        DRIVE: MidiConfigCC
        RESONANCE: MidiConfigCC
        CUTOFF: MidiConfigCC
        FM_AMT: MidiConfigCC
        ENV_AMT: MidiConfigCC
        LFO_AMT: MidiConfigCC
        KBD_AMT: MidiConfigCC
        EXT_CV: MidiConfigCCWithValue
        WHEEL: MidiConfigCCWithValue
        SLOPE: MidiConfigCCWithValue
    },
    FILTERS: {
        props: FuncProps
        LINK_CUTOFF: MidiConfigCCWithValue
        ROUTING: MidiConfigCCWithValue
    },
    SVF: {
        props: FuncProps
        INPUT: MidiConfigCC
        DRIVE: MidiConfigCC
        RESONANCE: MidiConfigCC
        CUTOFF: MidiConfigCC
        FM_AMT: MidiConfigCC
        ENV_AMT: MidiConfigCC
        LFO_AMT: MidiConfigCC
        KBD_AMT: MidiConfigCC
        EXT_CV: MidiConfigCCWithValue
        WHEEL: MidiConfigCCWithValue
        SLOPE: MidiConfigCCWithValue
    }
}

const controllersFilters: ControllersFilters = {
    LPF: {
        props: { label: 'Low pass filter' },
        INPUT: {
            label: 'Input',
            isTargetDigi: true,
            type: 'pot',
            cc: CC.LPF_INPUT
        },
        DRIVE: {
            label: 'Drive',
            isTargetDigi: true,
            type: 'pot',
            cc: CC.LPF_DRIVE
        },
        RESONANCE: {
            label: 'Resonance',
            isTargetDigi: true,
            type: 'pot',
            cc: CC.LPF_RESONANCE
        },
        CUTOFF: {
            label: 'Cutoff',
            isTargetDigi: true,
            type: 'pot',
            cc: CC.LPF_CUTOFF
        },
        FM_AMT: { label: 'FM amount', type: 'pot', cc: CC.LPF_FM_AMT },
        ENV_AMT: { label: 'Env amount', type: 'pot', cc: CC.LPF_ENV_AMT },
        LFO_AMT: { label: 'LFO amount', type: 'pot', cc: CC.LPF_LFO_AMT },
        KBD_AMT: { label: 'Keyboard track', type: 'pot', cc: CC.LPF_KBD_AMT },

        EXT_CV: {
            label: 'Ext. CV',
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.LPF_EXT_CV_OFF,
                BUTTONS.BUTTONS_RIGHT.values.LPF_EXT_CV_ON,
            ],
        },
        WHEEL: {
            label: 'Mod wheel',
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.LPF_WHEEL_OFF,
                BUTTONS.BUTTONS_RIGHT.values.LPF_WHEEL_ON,
            ],
        },
        SLOPE: {
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
            label: 'Link cutoff',
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.FILTER_LINK_CUTOFF_OFF,
                BUTTONS.BUTTONS_RIGHT.values.FILTER_LINK_CUTOFF_ON,
            ],
        },
        ROUTING: {
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
            label: 'Input',
            isTargetDigi: true,
            type: 'pot',
            cc: CC.SVF_INPUT
        },
        DRIVE: {
            label: 'Drive',
            isTargetDigi: true,
            type: 'pot',
            cc: CC.SVF_DRIVE
        },
        RESONANCE: {
            label: 'Resonance',
            isTargetDigi: true,
            type: 'pot',
            cc: CC.SVF_RESONANCE
        },
        CUTOFF: {
            label: 'Cutoff',
            isTargetDigi: true,
            type: 'pot',
            cc: CC.SVF_CUTOFF
        },
        FM_AMT: { label: 'FM amount', type: 'pot', cc: CC.SVF_FM_AMT },
        ENV_AMT: { label: 'Env amount', type: 'pot', cc: CC.SVF_ENV_AMT },
        LFO_AMT: { label: 'LFO amount', type: 'pot', cc: CC.SVF_LFO_AMT },
        KBD_AMT: { label: 'Keyboard track', type: 'pot', cc: CC.SVF_KBD_AMT },

        EXT_CV: {
            label: 'Ext. CV',
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.SVF_EXT_CV_OFF,
                BUTTONS.BUTTONS_RIGHT.values.SVF_EXT_CV_ON,
            ],
        },
        WHEEL: {
            label: 'Wheel',
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.SVF_WHEEL_OFF,
                BUTTONS.BUTTONS_RIGHT.values.SVF_WHEEL_ON,
            ],
        },
        SLOPE: {
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