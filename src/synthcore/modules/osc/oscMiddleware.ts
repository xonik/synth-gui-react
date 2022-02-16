import { OscControllerIds } from './types'
import { ApiSource } from '../../types'
import { PayloadAction } from '@reduxjs/toolkit'
import oscApi from './oscApi'
import { increment } from '../ui/uiReducer'

type OscApiMapperType = {
    [key: number]: (value: number) => void
}

const oscApiMapper: OscApiMapperType = {
    [OscControllerIds.DCO1_NOTE]: (value: number) => oscApi.incrementDco1Note(value, ApiSource.UI),
    [OscControllerIds.DCO1_WAVEFORM]: (value: number) => oscApi.incrementDco1Waveform(value, ApiSource.UI),
    [OscControllerIds.DCO1_SUB1]: (value: number) => oscApi.incrementDco1Sub1Level(value, ApiSource.UI),
    [OscControllerIds.DCO1_SUB2]: (value: number) => oscApi.incrementDco1Sub2Level(value, ApiSource.UI),
    [OscControllerIds.DCO1_PW]: (value: number) => oscApi.incrementDco1Pw(value, ApiSource.UI),
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

export const oscMiddleware = (action: PayloadAction): void => {
    if (increment.match(action)) {
        oscApiMapper[action.payload.ctrlId](action.payload.value)
    }
}
