import CC from '../../ccMap'
import { BUTTONS } from '../../buttons'
import { MidiConfig, MidiConfigWithValue } from '../../types'

interface MidiControllersFilters {
    LPF: {
        INPUT: MidiConfig
        DRIVE: MidiConfig
        RESONANCE: MidiConfig
        CUTOFF: MidiConfig
        FM_AMT: MidiConfig
        ENV_AMT: MidiConfig
        LFO_AMT: MidiConfig
        KBD_AMT: MidiConfig
        EXT_CV: MidiConfigWithValue
        WHEEL: MidiConfigWithValue
        SLOPE: MidiConfigWithValue
    },
    FILTERS: {
        LINK_CUTOFF: MidiConfigWithValue
        ROUTING: MidiConfigWithValue
    },
    SVF: {
        INPUT: MidiConfig
        DRIVE: MidiConfig
        RESONANCE: MidiConfig
        CUTOFF: MidiConfig
        FM_AMT: MidiConfig
        ENV_AMT: MidiConfig
        LFO_AMT: MidiConfig
        KBD_AMT: MidiConfig
        EXT_CV: MidiConfigWithValue
        WHEEL: MidiConfigWithValue
        SLOPE: MidiConfigWithValue
    }
}

const midiControllersFilters: MidiControllersFilters = {
    LPF: {
        INPUT: { type: 'pot', cc: CC.LPF_INPUT },
        DRIVE: { type: 'pot', cc: CC.LPF_DRIVE },
        RESONANCE: { type: 'pot', cc: CC.LPF_RESONANCE },
        CUTOFF: { type: 'pot', cc: CC.LPF_CUTOFF },
        FM_AMT: { type: 'pot', cc: CC.LPF_FM_AMT },
        ENV_AMT: { type: 'pot', cc: CC.LPF_ENV_AMT },
        LFO_AMT: { type: 'pot', cc: CC.LPF_LFO_AMT },
        KBD_AMT: { type: 'pot', cc: CC.LPF_KBD_AMT },

        EXT_CV: {
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.LPF_EXT_CV_OFF,
                BUTTONS.BUTTONS_RIGHT.values.LPF_EXT_CV_ON,
            ],
        },
        WHEEL: {
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.LPF_WHEEL_OFF,
                BUTTONS.BUTTONS_RIGHT.values.LPF_WHEEL_ON,
            ],
        },
        SLOPE: {
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.LPF_SLOPE_12DB,
                BUTTONS.BUTTONS_RIGHT.values.LPF_SLOPE_24DB,
            ],
        },
    },
    FILTERS: {
        LINK_CUTOFF: {
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.FILTER_LINK_CUTOFF_OFF,
                BUTTONS.BUTTONS_RIGHT.values.FILTER_LINK_CUTOFF_ON,
            ],
        },
        ROUTING: {
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.FILTER_ROUTING_SERIES,
                BUTTONS.BUTTONS_RIGHT.values.FILTER_ROUTING_PARALLEL,
            ],
        },
    },
    SVF: {
        INPUT: { type: 'pot', cc: CC.SVF_INPUT },
        DRIVE: { type: 'pot', cc: CC.SVF_DRIVE },
        RESONANCE: { type: 'pot', cc: CC.SVF_RESONANCE },
        CUTOFF: { type: 'pot', cc: CC.SVF_CUTOFF },
        FM_AMT: { type: 'pot', cc: CC.SVF_FM_AMT },
        ENV_AMT: { type: 'pot', cc: CC.SVF_ENV_AMT },
        LFO_AMT: { type: 'pot', cc: CC.SVF_LFO_AMT },
        KBD_AMT: { type: 'pot', cc: CC.SVF_KBD_AMT },

        EXT_CV: {
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.SVF_EXT_CV_OFF,
                BUTTONS.BUTTONS_RIGHT.values.SVF_EXT_CV_ON,
            ],
        },
        WHEEL: {
            type: 'button',
            cc: BUTTONS.BUTTONS_RIGHT.cc,
            values: [
                BUTTONS.BUTTONS_RIGHT.values.SVF_WHEEL_OFF,
                BUTTONS.BUTTONS_RIGHT.values.SVF_WHEEL_ON,
            ],
        },
        SLOPE: {
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

export default midiControllersFilters