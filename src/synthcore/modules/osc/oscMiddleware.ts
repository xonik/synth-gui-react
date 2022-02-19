import { ApiSource } from '../../types'
import { PayloadAction } from '@reduxjs/toolkit'
import oscApi from './oscApi'
import { click, increment } from '../ui/uiReducer'
import { ApiClickMapperType, ApiIncrementMapperType } from '../common/types'
import oscControllers from './oscControllers'

const incrementMapper: ApiIncrementMapperType = {
    [oscControllers.DCO1.NOTE.id]: (value: number) => oscApi.incrementDco1Note(value, ApiSource.UI),
    [oscControllers.DCO1.WAVEFORM.id]: (value: number) => oscApi.incrementDco1Waveform(value, ApiSource.UI),
    [oscControllers.DCO1.SUB1.id]: (value: number) => oscApi.incrementDco1Sub1Level(value, ApiSource.UI),
    [oscControllers.DCO1.SUB2.id]: (value: number) => oscApi.incrementDco1Sub2Level(value, ApiSource.UI),
    [oscControllers.DCO1.PW.id] : (value: number) => oscApi.incrementDco1Pw(value, ApiSource.UI),
    [oscControllers.DCO2.NOTE.id]: (value: number) => oscApi.incrementDco2Note(value, ApiSource.UI),
    [oscControllers.DCO2.DETUNE.id]: (value: number) => oscApi.incrementDco2Detune(value, ApiSource.UI),
    [oscControllers.DCO2.WAVEFORM.id]: (value: number) => oscApi.incrementDco2Waveform(value, ApiSource.UI),
    [oscControllers.DCO2.SUB1.id]: (value: number) => oscApi.incrementDco2Sub1Level(value, ApiSource.UI),
    [oscControllers.DCO2.SUB2.id]: (value: number) => oscApi.incrementDco2Sub2Level(value, ApiSource.UI),
    [oscControllers.DCO2.PW.id]: (value: number) => oscApi.incrementDco2Pw(value, ApiSource.UI),
    [oscControllers.VCO.NOTE.id]: (value: number) => oscApi.incrementVcoNote(value, ApiSource.UI),
    [oscControllers.VCO.DETUNE.id]: (value: number) => oscApi.incrementVcoDetune(value, ApiSource.UI),
    [oscControllers.VCO.WAVEFORM.id]: (value: number) => oscApi.incrementVcoWaveform(value, ApiSource.UI),
    [oscControllers.VCO.CROSS_MOD.id]: (value: number) => oscApi.incrementVcoCrossMod(value, ApiSource.UI),
    [oscControllers.VCO.PW.id]: (value: number) => oscApi.incrementVcoPw(value, ApiSource.UI),
}

const clickMapper: ApiClickMapperType = {
    [oscControllers.DCO1.SYNC.id]: () => oscApi.toggleDco1Sync(ApiSource.UI),
    [oscControllers.DCO1.MODE.id]: () => oscApi.toggleDco1Mode(ApiSource.UI),
    [oscControllers.DCO1.SUB_WAVE.id]: () => oscApi.toggleDco1SubWave(ApiSource.UI),
    [oscControllers.DCO1.WHEEL.id]: () => oscApi.toggleDco1Wheel(ApiSource.UI),
    [oscControllers.DCO1.LFO.id]: () => oscApi.toggleDco1Lfo(ApiSource.UI),
    [oscControllers.DCO1.KBD.id]: () => oscApi.toggleDco1Kbd(ApiSource.UI),
    
    [oscControllers.DCO2.MODE.id]: () => oscApi.toggleDco2Mode(ApiSource.UI),
    [oscControllers.DCO2.SUB_WAVE.id]: () => oscApi.toggleDco2SubWave(ApiSource.UI),
    [oscControllers.DCO2.WHEEL.id]: () => oscApi.toggleDco2Wheel(ApiSource.UI),
    [oscControllers.DCO2.LFO.id]: () => oscApi.toggleDco2Lfo(ApiSource.UI),
    [oscControllers.DCO2.KBD.id]: () => oscApi.toggleDco2Kbd(ApiSource.UI),

    [oscControllers.VCO.SYNC.id]: () => oscApi.toggleVcoSync(ApiSource.UI),
    [oscControllers.VCO.CROSS_MOD_SRC.id]: () => oscApi.toggleVcoCrossModSrc(ApiSource.UI),
    [oscControllers.VCO.EXT_CV.id]: () => oscApi.toggleVcoExtCv(ApiSource.UI),
    [oscControllers.VCO.WHEEL.id]: () => oscApi.toggleVcoWheel(ApiSource.UI),
    [oscControllers.VCO.LFO.id]: () => oscApi.toggleVcoLfo(ApiSource.UI),
    [oscControllers.VCO.KBD.id]: () => oscApi.toggleVcoKbd(ApiSource.UI),    
}


export const oscMiddleware = (action: PayloadAction): void => {
    if (increment.match(action)) {
        incrementMapper[action.payload.ctrlId](action.payload.value)
    } else if (click.match(action)) {
        clickMapper[action.payload.ctrlId]()
    }
}
