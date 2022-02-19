import { ApiSource } from '../../types'
import { PayloadAction } from '@reduxjs/toolkit'
import oscApi from './oscApi'
import { click, increment } from '../ui/uiReducer'
import { createClickMapper, createIncrementMapper } from '../common/utils'
import oscControllers from './oscControllers'

const incrementMapper = createIncrementMapper([
    [oscControllers.DCO1.NOTE, (value: number) => oscApi.incrementDco1Note(value, ApiSource.UI)],
    [oscControllers.DCO1.WAVEFORM, (value: number) => oscApi.incrementDco1Waveform(value, ApiSource.UI)],
    [oscControllers.DCO1.SUB1, (value: number) => oscApi.incrementDco1Sub1Level(value, ApiSource.UI)],
    [oscControllers.DCO1.SUB2, (value: number) => oscApi.incrementDco1Sub2Level(value, ApiSource.UI)],
    [oscControllers.DCO1.PW, (value: number) => oscApi.incrementDco1Pw(value, ApiSource.UI)],
    [oscControllers.DCO2.NOTE, (value: number) => oscApi.incrementDco2Note(value, ApiSource.UI)],
    [oscControllers.DCO2.DETUNE, (value: number) => oscApi.incrementDco2Detune(value, ApiSource.UI)],
    [oscControllers.DCO2.WAVEFORM, (value: number) => oscApi.incrementDco2Waveform(value, ApiSource.UI)],
    [oscControllers.DCO2.SUB1, (value: number) => oscApi.incrementDco2Sub1Level(value, ApiSource.UI)],
    [oscControllers.DCO2.SUB2, (value: number) => oscApi.incrementDco2Sub2Level(value, ApiSource.UI)],
    [oscControllers.DCO2.PW, (value: number) => oscApi.incrementDco2Pw(value, ApiSource.UI)],
    [oscControllers.VCO.NOTE, (value: number) => oscApi.incrementVcoNote(value, ApiSource.UI)],
    [oscControllers.VCO.DETUNE, (value: number) => oscApi.incrementVcoDetune(value, ApiSource.UI)],
    [oscControllers.VCO.WAVEFORM, (value: number) => oscApi.incrementVcoWaveform(value, ApiSource.UI)],
    [oscControllers.VCO.CROSS_MOD, (value: number) => oscApi.incrementVcoCrossMod(value, ApiSource.UI)],
    [oscControllers.VCO.PW, (value: number) => oscApi.incrementVcoPw(value, ApiSource.UI)],
])

const clickMapper = createClickMapper([
    [oscControllers.DCO1.SYNC, () => oscApi.toggleDco1Sync(ApiSource.UI)],
    [oscControllers.DCO1.MODE, () => oscApi.toggleDco1Mode(ApiSource.UI)],
    [oscControllers.DCO1.SUB_WAVE, () => oscApi.toggleDco1SubWave(ApiSource.UI)],
    [oscControllers.DCO1.WHEEL, () => oscApi.toggleDco1Wheel(ApiSource.UI)],
    [oscControllers.DCO1.LFO, () => oscApi.toggleDco1Lfo(ApiSource.UI)],
    [oscControllers.DCO1.KBD, () => oscApi.toggleDco1Kbd(ApiSource.UI)],
    
    [oscControllers.DCO2.MODE, () => oscApi.toggleDco2Mode(ApiSource.UI)],
    [oscControllers.DCO2.SUB_WAVE, () => oscApi.toggleDco2SubWave(ApiSource.UI)],
    [oscControllers.DCO2.WHEEL, () => oscApi.toggleDco2Wheel(ApiSource.UI)],
    [oscControllers.DCO2.LFO, () => oscApi.toggleDco2Lfo(ApiSource.UI)],
    [oscControllers.DCO2.KBD, () => oscApi.toggleDco2Kbd(ApiSource.UI)],

    [oscControllers.VCO.SYNC, () => oscApi.toggleVcoSync(ApiSource.UI)],
    [oscControllers.VCO.CROSS_MOD_SRC, () => oscApi.toggleVcoCrossModSrc(ApiSource.UI)],
    [oscControllers.VCO.EXT_CV, () => oscApi.toggleVcoExtCv(ApiSource.UI)],
    [oscControllers.VCO.WHEEL, () => oscApi.toggleVcoWheel(ApiSource.UI)],
    [oscControllers.VCO.LFO, () => oscApi.toggleVcoLfo(ApiSource.UI)],
    [oscControllers.VCO.KBD, () => oscApi.toggleVcoKbd(ApiSource.UI)],
])


export const oscMiddleware = (action: PayloadAction): void => {
    if (increment.match(action)) {
        incrementMapper(action.payload.ctrl, action.payload.value)
    } else if (click.match(action)) {
        clickMapper(action.payload.ctrl)
    }
}
