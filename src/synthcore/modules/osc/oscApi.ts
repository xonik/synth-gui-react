import { createSetterFuncs } from '../common/utils'
import oscControllers from './oscControllers'

const setterFuncs = createSetterFuncs(
    [
        oscControllers.DCO1.NOTE,
        oscControllers.DCO1.WAVEFORM,
        oscControllers.DCO1.SUB1,
        oscControllers.DCO1.SUB2,
        oscControllers.DCO1.PW,
        oscControllers.DCO1.SYNC,
        oscControllers.DCO1.MODE,
        oscControllers.DCO1.SUB_WAVE,
        oscControllers.DCO1.WHEEL,
        oscControllers.DCO1.LFO,
        oscControllers.DCO1.KBD,
        oscControllers.DCO1.SAW_INV,

        oscControllers.DCO2.NOTE,
        oscControllers.DCO2.DETUNE,
        oscControllers.DCO2.WAVEFORM,
        oscControllers.DCO2.SUB1,
        oscControllers.DCO2.SUB2,
        oscControllers.DCO2.PW,
        oscControllers.DCO2.MODE,
        oscControllers.DCO2.SUB_WAVE,
        oscControllers.DCO2.WHEEL,
        oscControllers.DCO2.LFO,
        oscControllers.DCO2.KBD,
        oscControllers.DCO2.SAW_INV,

        oscControllers.VCO.NOTE,
        oscControllers.VCO.DETUNE,
        oscControllers.VCO.WAVEFORM,
        oscControllers.VCO.CROSS_MOD,
        oscControllers.VCO.PW,
        oscControllers.VCO.SYNC,
        oscControllers.VCO.CROSS_MOD_SRC,
        oscControllers.VCO.EXT_CV,
        oscControllers.VCO.WHEEL,
        oscControllers.VCO.LFO,
        oscControllers.VCO.KBD,
    ])

const api = {
    ...setterFuncs,
}

export default api