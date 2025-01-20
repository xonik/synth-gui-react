import CC from '../../../midi/mapCC'
import {FuncProps, ControllerConfigCC, ControllerConfigButton, ControllerConfigNRPN} from '../../../midi/types'
import { ControllerIdDst, ControllerIdIntermediate, ControllerIdNonMod } from '../controllers/controllerIds'
import NRPN from "../../../midi/mapNRPN";
import {buttonMidiValues} from "../../../midi/buttonMidiValues";



interface FiltersControllers {
    LPF: {
        props: FuncProps
        INPUT: ControllerConfigCC
        RESONANCE: ControllerConfigCC
        CUTOFF: ControllerConfigCC
        FM_AMT: ControllerConfigCC
        WHEEL_AMT: ControllerConfigNRPN
        ENV_AMT: ControllerConfigCC
        LFO_AMT: ControllerConfigCC
        KBD_AMT: ControllerConfigCC
        EXT_CV: ControllerConfigButton
        SLOPE: ControllerConfigButton
        FM_MODE: ControllerConfigButton
        FILTER_TYPE: ControllerConfigButton
        FM_SRC: ControllerConfigButton
    },
    FILTERS: {
        props: FuncProps
        LINK_CUTOFF: ControllerConfigButton
        ROUTING: ControllerConfigButton
    },
    SVF: {
        props: FuncProps
        INPUT: ControllerConfigCC
        RESONANCE: ControllerConfigCC
        CUTOFF: ControllerConfigCC
        FM_AMT: ControllerConfigCC
        WHEEL_AMT: ControllerConfigNRPN
        ENV_AMT: ControllerConfigCC
        LFO_AMT: ControllerConfigCC
        KBD_AMT: ControllerConfigCC
        EXT_CV: ControllerConfigButton
        SLOPE: ControllerConfigButton
        FM_MODE: ControllerConfigButton
        FM_SRC: ControllerConfigButton
        INVERT: ControllerConfigButton
    }
}

const filtersControllers: FiltersControllers = {
    LPF: {
        props: { label: 'Low pass filter' },
        INPUT: {
            id: ControllerIdDst.LPF_INPUT,
            label: 'Input',
            isDstDigi: true,
            type: 'pot',
            cc: CC.LPF_INPUT
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
        WHEEL_AMT: { id: ControllerIdIntermediate.LPF_WHEEL_AMT, label: 'Wheel amount', shortLabel: 'Wheel amt', isDstDigi: true, type: 'pot', addr: NRPN.LPF_WHEEL_AMT },
        EXT_CV: {
            id: ControllerIdNonMod.LPF_EXT_CV,
            label: 'Ext. CV',
            type: 'button',
            values: [
                buttonMidiValues.LPF_EXT_CV_OFF,
                buttonMidiValues.LPF_EXT_CV_ON,
            ],
        },
        SLOPE: {
            id: ControllerIdNonMod.LPF_SLOPE,
            label: 'Slope',
            type: 'button',
            values: [
                buttonMidiValues.LPF_SLOPE_12DB,
                buttonMidiValues.LPF_SLOPE_24DB,
            ],
        },
        FM_MODE: {
            id: ControllerIdNonMod.LPF_FM_MODE,
            label: 'FM mode',
            type: 'button',
            values: [
                buttonMidiValues.LPF_FM_MODE_OFF,
                buttonMidiValues.LPF_FM_MODE_LIN,
                buttonMidiValues.LPF_FM_MODE_LOG,
            ],
        },
        FILTER_TYPE: {
            id: ControllerIdNonMod.LPF_FILTER_TYPE,
            label: 'Filter type',
            type: 'button',
            values: [
                buttonMidiValues.LPF_FILTER_TYPE_OTA,
                buttonMidiValues.LPF_FILTER_TYPE_LADDER,
            ],
        },
        FM_SRC: {
            id: ControllerIdNonMod.LPF_FM_SRC,
            label: 'FM src',
            type: 'button',
            values: [
                buttonMidiValues.LPF_FM_SRC_OSC_B,
                buttonMidiValues.LPF_FM_SRC_EXT_AUDIO,
            ],
        },
    },
    FILTERS: {
        props: { label: 'Link/route' },
        LINK_CUTOFF: {
            id: ControllerIdNonMod.FILTERS_LINK_CUTOFF,
            label: 'Link cutoff',
            type: 'button',
            values: [
                buttonMidiValues.FILTER_LINK_CUTOFF_OFF,
                buttonMidiValues.FILTER_LINK_CUTOFF_ON,
            ],
        },
        ROUTING: {
            id: ControllerIdNonMod.FILTERS_ROUTING,
            label: 'Routing',
            type: 'button',
            values: [
                buttonMidiValues.FILTER_ROUTING_SERIES,
                buttonMidiValues.FILTER_ROUTING_PARALLEL,
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
        WHEEL_AMT: { id: ControllerIdIntermediate.SVF_WHEEL_AMT, label: 'Wheel amount', shortLabel: 'Wheel amt', isDstDigi: true, type: 'pot', addr: NRPN.SVF_WHEEL_AMT },
        ENV_AMT: { id: ControllerIdIntermediate.SVF_ENV_AMT, label: 'Env amount', shortLabel: 'Env amt', isDstDigi: true, type: 'pot', cc: CC.SVF_ENV_AMT },
        LFO_AMT: { id: ControllerIdIntermediate.SVF_LFO_AMT, label: 'LFO amount', shortLabel: 'LFO amt', isDstDigi: true, type: 'pot', cc: CC.SVF_LFO_AMT },
        KBD_AMT: { id: ControllerIdIntermediate.SVF_KBD_AMT, label: 'Keyboard track', shortLabel: 'Kbd trk', isDstDigi: true, type: 'pot', cc: CC.SVF_KBD_AMT },

        EXT_CV: {
            id: ControllerIdNonMod.SVF_EXT_CV,
            label: 'Ext. CV',
            type: 'button',
            values: [
                buttonMidiValues.SVF_EXT_CV_OFF,
                buttonMidiValues.SVF_EXT_CV_ON,
            ],
        },
        INVERT: {
            id: ControllerIdNonMod.SVF_INVERT,
            label: 'Invert',
            type: 'button',
            values: [
                buttonMidiValues.SVF_INVERT_OFF,
                buttonMidiValues.SVF_INVERT_ON,
            ],
        },
        SLOPE: {
            id: ControllerIdNonMod.SVF_SLOPE,
            label: 'Slope',
            type: 'button',
            values: [
                buttonMidiValues.SVF_SLOPE_12DB_LP,
                buttonMidiValues.SVF_SLOPE_24DB_LP,
                buttonMidiValues.SVF_SLOPE_12DB_BP,
                buttonMidiValues.SVF_SLOPE_24DB_BP,
                buttonMidiValues.SVF_SLOPE_LP_BP,
                buttonMidiValues.SVF_SLOPE_12DB_HP,
                buttonMidiValues.SVF_SLOPE_24DB_HP,
                buttonMidiValues.SVF_SLOPE_HP_BP,
                buttonMidiValues.SVF_SLOPE_NOTCH,
                buttonMidiValues.SVF_SLOPE_AP,
            ],
        },
        FM_MODE: {
            id: ControllerIdNonMod.SVF_FM_MODE,
            label: 'FM mode',
            type: 'button',
            values: [
                buttonMidiValues.SVF_FM_MODE_OFF,
                buttonMidiValues.SVF_FM_MODE_LIN,
                buttonMidiValues.SVF_FM_MODE_LOG,
            ],
        },
        FM_SRC: {
            id: ControllerIdNonMod.SVF_FM_SRC,
            label: 'FM src',
            type: 'button',
            values: [
                buttonMidiValues.SVF_FM_SRC_OSC_B,
                buttonMidiValues.SVF_FM_SRC_EXT_AUDIO,
            ],
        },
    }
}

export default filtersControllers