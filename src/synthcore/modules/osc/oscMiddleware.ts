import { OscControllerIds } from './types'
import { ApiSource } from '../../types'
import { PayloadAction } from '@reduxjs/toolkit'
import oscApi from './oscApi'
import { click, increment } from '../ui/uiReducer'
import { ApiClickMapperType, ApiMapperType } from '../common/types'

const oscApiMapper: ApiMapperType = {
    [OscControllerIds.DCO1_NOTE]: (value: number) => oscApi.incrementDco1Note(value, ApiSource.UI),
    [OscControllerIds.DCO1_WAVEFORM]: (value: number) => oscApi.incrementDco1Waveform(value, ApiSource.UI),
    [OscControllerIds.DCO1_SUB1]: (value: number) => oscApi.incrementDco1Sub1Level(value, ApiSource.UI),
    [OscControllerIds.DCO1_SUB2]: (value: number) => oscApi.incrementDco1Sub2Level(value, ApiSource.UI),
    [OscControllerIds.DCO1_PW] : (value: number) => oscApi.incrementDco1Pw(value, ApiSource.UI),
    [OscControllerIds.DCO2_NOTE]: (value: number) => oscApi.incrementDco2Note(value, ApiSource.UI),
    [OscControllerIds.DCO2_DETUNE]: (value: number) => oscApi.incrementDco2Detune(value, ApiSource.UI),
    [OscControllerIds.DCO2_WAVEFORM]: (value: number) => oscApi.incrementDco2Waveform(value, ApiSource.UI),
    [OscControllerIds.DCO2_SUB1]: (value: number) => oscApi.incrementDco2Sub1Level(value, ApiSource.UI),
    [OscControllerIds.DCO2_SUB2]: (value: number) => oscApi.incrementDco2Sub2Level(value, ApiSource.UI),
    [OscControllerIds.DCO2_PW]: (value: number) => oscApi.incrementDco2Pw(value, ApiSource.UI),
    [OscControllerIds.VCO_NOTE]: (value: number) => oscApi.incrementVcoNote(value, ApiSource.UI),
    [OscControllerIds.VCO_DETUNE]: (value: number) => oscApi.incrementVcoDetune(value, ApiSource.UI),
    [OscControllerIds.VCO_WAVEFORM]: (value: number) => oscApi.incrementVcoWaveform(value, ApiSource.UI),
    [OscControllerIds.VCO_CROSSMOD]: (value: number) => oscApi.incrementVcoCrossMod(value, ApiSource.UI),
    [OscControllerIds.VCO_PW]: (value: number) => oscApi.incrementVcoPw(value, ApiSource.UI),
}

const oscApiClickMapper: ApiClickMapperType = {
    [OscControllerIds.DCO1_SYNC]: () => oscApi.toggleDco1Sync(ApiSource.UI),
    [OscControllerIds.DCO1_MODE]: () => oscApi.toggleDco1Mode(ApiSource.UI),
    [OscControllerIds.DCO1_SUB_WAVE]: () => oscApi.toggleDco1SubWave(ApiSource.UI),
    [OscControllerIds.DCO1_WHEEL]: () => oscApi.toggleDco1Wheel(ApiSource.UI),
    [OscControllerIds.DCO1_LFO]: () => oscApi.toggleDco1Lfo(ApiSource.UI),
    [OscControllerIds.DCO1_KBD]: () => oscApi.toggleDco1Kbd(ApiSource.UI),
    
    [OscControllerIds.DCO2_MODE]: () => oscApi.toggleDco2Mode(ApiSource.UI),
    [OscControllerIds.DCO2_SUB_WAVE]: () => oscApi.toggleDco2SubWave(ApiSource.UI),
    [OscControllerIds.DCO2_WHEEL]: () => oscApi.toggleDco2Wheel(ApiSource.UI),
    [OscControllerIds.DCO2_LFO]: () => oscApi.toggleDco2Lfo(ApiSource.UI),
    [OscControllerIds.DCO2_KBD]: () => oscApi.toggleDco2Kbd(ApiSource.UI),

    [OscControllerIds.VCO_SYNC]: () => oscApi.toggleVcoSync(ApiSource.UI),
    [OscControllerIds.VCO_CROSSMOD_SRC]: () => oscApi.toggleVcoCrossModSrc(ApiSource.UI),
    [OscControllerIds.VCO_EXT_CV]: () => oscApi.toggleVcoExtCv(ApiSource.UI),
    [OscControllerIds.VCO_WHEEL]: () => oscApi.toggleVcoWheel(ApiSource.UI),
    [OscControllerIds.VCO_LFO]: () => oscApi.toggleVcoLfo(ApiSource.UI),
    [OscControllerIds.VCO_KBD]: () => oscApi.toggleVcoKbd(ApiSource.UI),    
}


export const oscMiddleware = (action: PayloadAction): void => {
    if (increment.match(action)) {
        oscApiMapper[action.payload.ctrlId](action.payload.value)
    } else if (click.match(action)) {
        oscApiClickMapper[action.payload.ctrlId]()
    }
}
