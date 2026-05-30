// GENERATED FILE, DO NOT EDIT
// js-to-midi RPC wrapper
import logger from '../../utils/logger'
import { jsToMidiEncoder, splitTo7, splitInt8To7 } from './serializer'
import { FunctionNames } from './functionNames'
import { sendSysex, sysexCommands } from '../midibus'

export const VOICE_ALL = -1

export function setCvStart(cv: number, start: number, voice: number = VOICE_ALL) {
  const paramBytes: number[] = [
    ...jsToMidiEncoder['uint8_t'](cv),
    ...jsToMidiEncoder['uint16_t'](start)
  ]
  const data = [
    ...splitInt8To7(voice),
    ...splitTo7(FunctionNames.setCvStart, 14),
    ...paramBytes,
  ]
  logger.midi('RPC call to setCvStart')
  sendSysex(sysexCommands.RPC, data)  
}

export function setCvEnd(cv: number, end: number, voice: number = VOICE_ALL) {
  const paramBytes: number[] = [
    ...jsToMidiEncoder['uint8_t'](cv),
    ...jsToMidiEncoder['uint16_t'](end)
  ]
  const data = [
    ...splitInt8To7(voice),
    ...splitTo7(FunctionNames.setCvEnd, 14),
    ...paramBytes,
  ]
  logger.midi('RPC call to setCvEnd')
  sendSysex(sysexCommands.RPC, data)  
}

export function setCvCurve(cv: number, curve: number, voice: number = VOICE_ALL) {
  const paramBytes: number[] = [
    ...jsToMidiEncoder['uint8_t'](cv),
    ...jsToMidiEncoder['uint8_t'](curve)
  ]
  const data = [
    ...splitInt8To7(voice),
    ...splitTo7(FunctionNames.setCvCurve, 14),
    ...paramBytes,
  ]
  logger.midi('RPC call to setCvCurve')
  sendSysex(sysexCommands.RPC, data)  
}

export function setCvParams(cv: number, start: number, end: number, curve: number, reverse: boolean, voice: number = VOICE_ALL) {
  const paramBytes: number[] = [
    ...jsToMidiEncoder['uint8_t'](cv),
    ...jsToMidiEncoder['uint16_t'](start),
    ...jsToMidiEncoder['uint16_t'](end),
    ...jsToMidiEncoder['uint8_t'](curve),
    ...jsToMidiEncoder['bool'](reverse)
  ]
  const data = [
    ...splitInt8To7(voice),
    ...splitTo7(FunctionNames.setCvParams, 14),
    ...paramBytes,
  ]
  logger.midi('RPC call to setCvParams')
  sendSysex(sysexCommands.RPC, data)  
}

export function saveCvMapping(cv: number, voice: number = VOICE_ALL) {
  const paramBytes: number[] = [
    ...jsToMidiEncoder['uint8_t'](cv)
  ]
  const data = [
    ...splitInt8To7(voice),
    ...splitTo7(FunctionNames.saveCvMapping, 14),
    ...paramBytes,
  ]
  logger.midi('RPC call to saveCvMapping')
  sendSysex(sysexCommands.RPC, data)  
}

export function saveCvMappings(voice: number = VOICE_ALL) {
  const paramBytes: number[] = [
    
  ]
  const data = [
    ...splitInt8To7(voice),
    ...splitTo7(FunctionNames.saveCvMappings, 14),
    ...paramBytes,
  ]
  logger.midi('RPC call to saveCvMappings')
  sendSysex(sysexCommands.RPC, data)  
}

export function loadCvMapping(cv: number, voice: number = VOICE_ALL) {
  const paramBytes: number[] = [
    ...jsToMidiEncoder['uint8_t'](cv)
  ]
  const data = [
    ...splitInt8To7(voice),
    ...splitTo7(FunctionNames.loadCvMapping, 14),
    ...paramBytes,
  ]
  logger.midi('RPC call to loadCvMapping')
  sendSysex(sysexCommands.RPC, data)  
}

export function loadCvMappings(voice: number = VOICE_ALL) {
  const paramBytes: number[] = [
    
  ]
  const data = [
    ...splitInt8To7(voice),
    ...splitTo7(FunctionNames.loadCvMappings, 14),
    ...paramBytes,
  ]
  logger.midi('RPC call to loadCvMappings')
  sendSysex(sysexCommands.RPC, data)  
}

export function setTrimmerSetting(trimmer: number, value: number, voice: number = VOICE_ALL) {
  const paramBytes: number[] = [
    ...jsToMidiEncoder['uint8_t'](trimmer),
    ...jsToMidiEncoder['uint16_t'](value)
  ]
  const data = [
    ...splitInt8To7(voice),
    ...splitTo7(FunctionNames.setTrimmerSetting, 14),
    ...paramBytes,
  ]
  logger.midi('RPC call to setTrimmerSetting')
  sendSysex(sysexCommands.RPC, data)  
}

export function saveTrimmerSettings(voice: number = VOICE_ALL) {
  const paramBytes: number[] = [
    
  ]
  const data = [
    ...splitInt8To7(voice),
    ...splitTo7(FunctionNames.saveTrimmerSettings, 14),
    ...paramBytes,
  ]
  logger.midi('RPC call to saveTrimmerSettings')
  sendSysex(sysexCommands.RPC, data)  
}

export function setCVOverride(cv: number, value: number, voice: number = VOICE_ALL) {
  const paramBytes: number[] = [
    ...jsToMidiEncoder['uint8_t'](cv),
    ...jsToMidiEncoder['uint16_t'](value)
  ]
  const data = [
    ...splitInt8To7(voice),
    ...splitTo7(FunctionNames.setCVOverride, 14),
    ...paramBytes,
  ]
  logger.midi('RPC call to setCVOverride')
  sendSysex(sysexCommands.RPC, data)  
}

export function releaseCVOverride(cv: number, voice: number = VOICE_ALL) {
  const paramBytes: number[] = [
    ...jsToMidiEncoder['uint8_t'](cv)
  ]
  const data = [
    ...splitInt8To7(voice),
    ...splitTo7(FunctionNames.releaseCVOverride, 14),
    ...paramBytes,
  ]
  logger.midi('RPC call to releaseCVOverride')
  sendSysex(sysexCommands.RPC, data)  
}

export function releaseCVOverrides(voice: number = VOICE_ALL) {
  const paramBytes: number[] = [
    
  ]
  const data = [
    ...splitInt8To7(voice),
    ...splitTo7(FunctionNames.releaseCVOverrides, 14),
    ...paramBytes,
  ]
  logger.midi('RPC call to releaseCVOverrides')
  sendSysex(sysexCommands.RPC, data)  
}

export function toggleSvfInSummedToCalibrateMix(on: boolean, voice: number = VOICE_ALL) {
  const paramBytes: number[] = [
    ...jsToMidiEncoder['bool'](on)
  ]
  const data = [
    ...splitInt8To7(voice),
    ...splitTo7(FunctionNames.toggleSvfInSummedToCalibrateMix, 14),
    ...paramBytes,
  ]
  logger.midi('RPC call to toggleSvfInSummedToCalibrateMix')
  sendSysex(sysexCommands.RPC, data)  
}

export function tuneVco(voice: number = VOICE_ALL) {
  const paramBytes: number[] = [
    
  ]
  const data = [
    ...splitInt8To7(voice),
    ...splitTo7(FunctionNames.tuneVco, 14),
    ...paramBytes,
  ]
  logger.midi('RPC call to tuneVco')
  sendSysex(sysexCommands.RPC, data)  
}

export function calibrateDCO1(voice: number = VOICE_ALL) {
  const paramBytes: number[] = [
    
  ]
  const data = [
    ...splitInt8To7(voice),
    ...splitTo7(FunctionNames.calibrateDCO1, 14),
    ...paramBytes,
  ]
  logger.midi('RPC call to calibrateDCO1')
  sendSysex(sysexCommands.RPC, data)  
}

export function calibrateDCO2(voice: number = VOICE_ALL) {
  const paramBytes: number[] = [
    
  ]
  const data = [
    ...splitInt8To7(voice),
    ...splitTo7(FunctionNames.calibrateDCO2, 14),
    ...paramBytes,
  ]
  logger.midi('RPC call to calibrateDCO2')
  sendSysex(sysexCommands.RPC, data)  
}

export function measureVcoOctaves(voice: number = VOICE_ALL) {
  const paramBytes: number[] = [
    
  ]
  const data = [
    ...splitInt8To7(voice),
    ...splitTo7(FunctionNames.measureVcoOctaves, 14),
    ...paramBytes,
  ]
  logger.midi('RPC call to measureVcoOctaves')
  sendSysex(sysexCommands.RPC, data)  
}

export function measureVcoAll(voice: number = VOICE_ALL) {
  const paramBytes: number[] = [
    
  ]
  const data = [
    ...splitInt8To7(voice),
    ...splitTo7(FunctionNames.measureVcoAll, 14),
    ...paramBytes,
  ]
  logger.midi('RPC call to measureVcoAll')
  sendSysex(sysexCommands.RPC, data)  
}

export function manualTuneVcoStart(voice: number = VOICE_ALL) {
  const paramBytes: number[] = [
    
  ]
  const data = [
    ...splitInt8To7(voice),
    ...splitTo7(FunctionNames.manualTuneVcoStart, 14),
    ...paramBytes,
  ]
  logger.midi('RPC call to manualTuneVcoStart')
  sendSysex(sysexCommands.RPC, data)  
}

export function manualTuneVcoStop(voice: number = VOICE_ALL) {
  const paramBytes: number[] = [
    
  ]
  const data = [
    ...splitInt8To7(voice),
    ...splitTo7(FunctionNames.manualTuneVcoStop, 14),
    ...paramBytes,
  ]
  logger.midi('RPC call to manualTuneVcoStop')
  sendSysex(sysexCommands.RPC, data)  
}

export function tuneSvf(target: number, precisionBits: number, voice: number = VOICE_ALL) {
  const paramBytes: number[] = [
    ...jsToMidiEncoder['uint8_t'](target),
    ...jsToMidiEncoder['uint8_t'](precisionBits)
  ]
  const data = [
    ...splitInt8To7(voice),
    ...splitTo7(FunctionNames.tuneSvf, 14),
    ...paramBytes,
  ]
  logger.midi('RPC call to tuneSvf')
  sendSysex(sysexCommands.RPC, data)  
}

export function svfMeasureAmplitudeOnce(trimmerSettingRaw: number, windowUs: number, voice: number = VOICE_ALL) {
  const paramBytes: number[] = [
    ...jsToMidiEncoder['uint16_t'](trimmerSettingRaw),
    ...jsToMidiEncoder['uint32_t'](windowUs)
  ]
  const data = [
    ...splitInt8To7(voice),
    ...splitTo7(FunctionNames.svfMeasureAmplitudeOnce, 14),
    ...paramBytes,
  ]
  logger.midi('RPC call to svfMeasureAmplitudeOnce')
  sendSysex(sysexCommands.RPC, data)  
}

export function svfFindPeak(target: number, precisionBits: number, voice: number = VOICE_ALL) {
  const paramBytes: number[] = [
    ...jsToMidiEncoder['uint8_t'](target),
    ...jsToMidiEncoder['uint8_t'](precisionBits)
  ]
  const data = [
    ...splitInt8To7(voice),
    ...splitTo7(FunctionNames.svfFindPeak, 14),
    ...paramBytes,
  ]
  logger.midi('RPC call to svfFindPeak')
  sendSysex(sysexCommands.RPC, data)  
}

export function svfMeasureVRefAt(target: number, midiNote: number, precisionBits: number, voice: number = VOICE_ALL) {
  const paramBytes: number[] = [
    ...jsToMidiEncoder['uint8_t'](target),
    ...jsToMidiEncoder['uint8_t'](midiNote),
    ...jsToMidiEncoder['uint8_t'](precisionBits)
  ]
  const data = [
    ...splitInt8To7(voice),
    ...splitTo7(FunctionNames.svfMeasureVRefAt, 14),
    ...paramBytes,
  ]
  logger.midi('RPC call to svfMeasureVRefAt')
  sendSysex(sysexCommands.RPC, data)  
}

export function svfMeasureVRefAll(target: number, precisionBits: number, voice: number = VOICE_ALL) {
  const paramBytes: number[] = [
    ...jsToMidiEncoder['uint8_t'](target),
    ...jsToMidiEncoder['uint8_t'](precisionBits)
  ]
  const data = [
    ...splitInt8To7(voice),
    ...splitTo7(FunctionNames.svfMeasureVRefAll, 14),
    ...paramBytes,
  ]
  logger.midi('RPC call to svfMeasureVRefAll')
  sendSysex(sysexCommands.RPC, data)  
}

export function svfSearchCutoffOne(target: number, midiNote: number, vRefMilliVolts: number, precisionBits: number, voice: number = VOICE_ALL) {
  const paramBytes: number[] = [
    ...jsToMidiEncoder['uint8_t'](target),
    ...jsToMidiEncoder['uint8_t'](midiNote),
    ...jsToMidiEncoder['uint16_t'](vRefMilliVolts),
    ...jsToMidiEncoder['uint8_t'](precisionBits)
  ]
  const data = [
    ...splitInt8To7(voice),
    ...splitTo7(FunctionNames.svfSearchCutoffOne, 14),
    ...paramBytes,
  ]
  logger.midi('RPC call to svfSearchCutoffOne')
  sendSysex(sysexCommands.RPC, data)  
}

export function powerDown(voice: number = VOICE_ALL) {
  const paramBytes: number[] = [
    
  ]
  const data = [
    ...splitInt8To7(voice),
    ...splitTo7(FunctionNames.powerDown, 14),
    ...paramBytes,
  ]
  logger.midi('RPC call to powerDown')
  sendSysex(sysexCommands.RPC, data)  
}

export function powerUp(voice: number = VOICE_ALL) {
  const paramBytes: number[] = [
    
  ]
  const data = [
    ...splitInt8To7(voice),
    ...splitTo7(FunctionNames.powerUp, 14),
    ...paramBytes,
  ]
  logger.midi('RPC call to powerUp')
  sendSysex(sysexCommands.RPC, data)  
}

export function dacStopUpdates(voice: number = VOICE_ALL) {
  const paramBytes: number[] = [
    
  ]
  const data = [
    ...splitInt8To7(voice),
    ...splitTo7(FunctionNames.dacStopUpdates, 14),
    ...paramBytes,
  ]
  logger.midi('RPC call to dacStopUpdates')
  sendSysex(sysexCommands.RPC, data)  
}

export function dacStartUpdates(voice: number = VOICE_ALL) {
  const paramBytes: number[] = [
    
  ]
  const data = [
    ...splitInt8To7(voice),
    ...splitTo7(FunctionNames.dacStartUpdates, 14),
    ...paramBytes,
  ]
  logger.midi('RPC call to dacStartUpdates')
  sendSysex(sysexCommands.RPC, data)  
}

export function unisonDetuneFactor(factor: number, voice: number = VOICE_ALL) {
  const paramBytes: number[] = [
    ...jsToMidiEncoder['uint16_t'](factor)
  ]
  const data = [
    ...splitInt8To7(voice),
    ...splitTo7(FunctionNames.unisonDetuneFactor, 14),
    ...paramBytes,
  ]
  logger.midi('RPC call to unisonDetuneFactor')
  sendSysex(sysexCommands.RPC, data)  
}

export function setCtrlAllParams(settings: number[], voice: number = VOICE_ALL) {
  const paramBytes: number[] = [
    ...jsToMidiEncoder['std::vector<int16_t>'](settings)
  ]
  const data = [
    ...splitInt8To7(voice),
    ...splitTo7(FunctionNames.setCtrlAllParams, 14),
    ...paramBytes,
  ]
  logger.midi('RPC call to setCtrlAllParams')
  sendSysex(sysexCommands.RPC, data)  
}

export function setCtrlAllNonModSettings(settings: number[], voice: number = VOICE_ALL) {
  const paramBytes: number[] = [
    ...jsToMidiEncoder['std::vector<uint16_t>'](settings)
  ]
  const data = [
    ...splitInt8To7(voice),
    ...splitTo7(FunctionNames.setCtrlAllNonModSettings, 14),
    ...paramBytes,
  ]
  logger.midi('RPC call to setCtrlAllNonModSettings')
  sendSysex(sysexCommands.RPC, data)  
}

export function setCtrlAllEnvParams(env: number, params: number[], voice: number = VOICE_ALL) {
  const paramBytes: number[] = [
    ...jsToMidiEncoder['uint8_t'](env),
    ...jsToMidiEncoder['std::vector<int16_t>'](params)
  ]
  const data = [
    ...splitInt8To7(voice),
    ...splitTo7(FunctionNames.setCtrlAllEnvParams, 14),
    ...paramBytes,
  ]
  logger.midi('RPC call to setCtrlAllEnvParams')
  sendSysex(sysexCommands.RPC, data)  
}

export function setCtrlAllEnvSettings(env: number, settings: number[], voice: number = VOICE_ALL) {
  const paramBytes: number[] = [
    ...jsToMidiEncoder['uint8_t'](env),
    ...jsToMidiEncoder['std::vector<uint8_t>'](settings)
  ]
  const data = [
    ...splitInt8To7(voice),
    ...splitTo7(FunctionNames.setCtrlAllEnvSettings, 14),
    ...paramBytes,
  ]
  logger.midi('RPC call to setCtrlAllEnvSettings')
  sendSysex(sysexCommands.RPC, data)  
}

export function setCtrlAllEnvStageSettings(env: number, stage: number, settings: number[], voice: number = VOICE_ALL) {
  const paramBytes: number[] = [
    ...jsToMidiEncoder['uint8_t'](env),
    ...jsToMidiEncoder['uint8_t'](stage),
    ...jsToMidiEncoder['std::vector<uint8_t>'](settings)
  ]
  const data = [
    ...splitInt8To7(voice),
    ...splitTo7(FunctionNames.setCtrlAllEnvStageSettings, 14),
    ...paramBytes,
  ]
  logger.midi('RPC call to setCtrlAllEnvStageSettings')
  sendSysex(sysexCommands.RPC, data)  
}

export function setCtrlAllLfoParams(lfo: number, params: number[], voice: number = VOICE_ALL) {
  const paramBytes: number[] = [
    ...jsToMidiEncoder['uint8_t'](lfo),
    ...jsToMidiEncoder['std::vector<int16_t>'](params)
  ]
  const data = [
    ...splitInt8To7(voice),
    ...splitTo7(FunctionNames.setCtrlAllLfoParams, 14),
    ...paramBytes,
  ]
  logger.midi('RPC call to setCtrlAllLfoParams')
  sendSysex(sysexCommands.RPC, data)  
}

export function setCtrlAllLfoSettings(lfo: number, settings: number[], voice: number = VOICE_ALL) {
  const paramBytes: number[] = [
    ...jsToMidiEncoder['uint8_t'](lfo),
    ...jsToMidiEncoder['std::vector<uint8_t>'](settings)
  ]
  const data = [
    ...splitInt8To7(voice),
    ...splitTo7(FunctionNames.setCtrlAllLfoSettings, 14),
    ...paramBytes,
  ]
  logger.midi('RPC call to setCtrlAllLfoSettings')
  sendSysex(sysexCommands.RPC, data)  
}

export function setCtrlAllLfoStageSettings(lfo: number, stage: number, settings: number[], voice: number = VOICE_ALL) {
  const paramBytes: number[] = [
    ...jsToMidiEncoder['uint8_t'](lfo),
    ...jsToMidiEncoder['uint8_t'](stage),
    ...jsToMidiEncoder['std::vector<uint8_t>'](settings)
  ]
  const data = [
    ...splitInt8To7(voice),
    ...splitTo7(FunctionNames.setCtrlAllLfoStageSettings, 14),
    ...paramBytes,
  ]
  logger.midi('RPC call to setCtrlAllLfoStageSettings')
  sendSysex(sysexCommands.RPC, data)  
}

export function setAllModAmounts(offsetDst: number, sourceAmounts: number[], voice: number = VOICE_ALL) {
  const paramBytes: number[] = [
    ...jsToMidiEncoder['uint8_t'](offsetDst),
    ...jsToMidiEncoder['std::vector<int16_t>'](sourceAmounts)
  ]
  const data = [
    ...splitInt8To7(voice),
    ...splitTo7(FunctionNames.setAllModAmounts, 14),
    ...paramBytes,
  ]
  logger.midi('RPC call to setAllModAmounts')
  sendSysex(sysexCommands.RPC, data)  
}

export function setAllEnvModAmounts(env: number, offsetDst: number, sourceAmounts: number[], voice: number = VOICE_ALL) {
  const paramBytes: number[] = [
    ...jsToMidiEncoder['uint8_t'](env),
    ...jsToMidiEncoder['uint8_t'](offsetDst),
    ...jsToMidiEncoder['std::vector<int16_t>'](sourceAmounts)
  ]
  const data = [
    ...splitInt8To7(voice),
    ...splitTo7(FunctionNames.setAllEnvModAmounts, 14),
    ...paramBytes,
  ]
  logger.midi('RPC call to setAllEnvModAmounts')
  sendSysex(sysexCommands.RPC, data)  
}

export function setAllLfoModAmounts(lfo: number, offsetDst: number, sourceAmounts: number[], voice: number = VOICE_ALL) {
  const paramBytes: number[] = [
    ...jsToMidiEncoder['uint8_t'](lfo),
    ...jsToMidiEncoder['uint8_t'](offsetDst),
    ...jsToMidiEncoder['std::vector<int16_t>'](sourceAmounts)
  ]
  const data = [
    ...splitInt8To7(voice),
    ...splitTo7(FunctionNames.setAllLfoModAmounts, 14),
    ...paramBytes,
  ]
  logger.midi('RPC call to setAllLfoModAmounts')
  sendSysex(sysexCommands.RPC, data)  
}

export function changeMidiSpeed(speed: number, voice: number = VOICE_ALL) {
  const paramBytes: number[] = [
    ...jsToMidiEncoder['uint32_t'](speed)
  ]
  const data = [
    ...splitInt8To7(voice),
    ...splitTo7(FunctionNames.changeMidiSpeed, 14),
    ...paramBytes,
  ]
  logger.midi('RPC call to changeMidiSpeed')
  sendSysex(sysexCommands.RPC, data)  
}

export function toggleVoicePower(voiceCardId: number, on: boolean, voice: number = VOICE_ALL) {
  const paramBytes: number[] = [
    ...jsToMidiEncoder['uint8_t'](voiceCardId),
    ...jsToMidiEncoder['bool'](on)
  ]
  const data = [
    ...splitInt8To7(voice),
    ...splitTo7(FunctionNames.toggleVoicePower, 14),
    ...paramBytes,
  ]
  logger.midi('RPC call to toggleVoicePower')
  sendSysex(sysexCommands.RPC, data)  
}

export function voiceDacStopUpdates(voiceCardId: number, voice: number = VOICE_ALL) {
  const paramBytes: number[] = [
    ...jsToMidiEncoder['uint8_t'](voiceCardId)
  ]
  const data = [
    ...splitInt8To7(voice),
    ...splitTo7(FunctionNames.voiceDacStopUpdates, 14),
    ...paramBytes,
  ]
  logger.midi('RPC call to voiceDacStopUpdates')
  sendSysex(sysexCommands.RPC, data)  
}

export function voiceDacStartUpdates(voiceCardId: number, voice: number = VOICE_ALL) {
  const paramBytes: number[] = [
    ...jsToMidiEncoder['uint8_t'](voiceCardId)
  ]
  const data = [
    ...splitInt8To7(voice),
    ...splitTo7(FunctionNames.voiceDacStartUpdates, 14),
    ...paramBytes,
  ]
  logger.midi('RPC call to voiceDacStartUpdates')
  sendSysex(sysexCommands.RPC, data)  
}
