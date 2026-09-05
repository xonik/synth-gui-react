// GENERATED FILE, DO NOT EDIT
// js-to-midi RPC wrapper
import { jsToMidiEncoder, splitTo7 } from './serializer'
import { FunctionNames } from './functionNames'
import { sendSysex, sysexCommands, type Route } from '../midibus'
import { call, callWithReturn } from './functionCaller'
import { sharedConfig } from '@/sharedConfig'

export const VOICE_ALL = -1

const resolveRoutingTarget = (voice: number): Route => {
  const route: Route =
    voice === VOICE_ALL
      ? { type: 'all' }
      : voice >= 0 && voice < sharedConfig.VOICE_COUNT.value
        ? { type: 'voice', index: voice }
        : { type: 'all' }
  return route
}

export function setCvStart(cv: number, start: number, voice: number = VOICE_ALL) {
  call('setCvStart', () => {
    const paramBytes: number[] = [
      ...jsToMidiEncoder['uint8_t'](cv),
      ...jsToMidiEncoder['uint16_t'](start)
    ]
    const data = [
      ...splitTo7(FunctionNames.setCvStart, 14),
      ...paramBytes,
    ]
        sendSysex(resolveRoutingTarget(voice), sysexCommands.RPC, data)
  })
}

export function setCvEnd(cv: number, end: number, voice: number = VOICE_ALL) {
  call('setCvEnd', () => {
    const paramBytes: number[] = [
      ...jsToMidiEncoder['uint8_t'](cv),
      ...jsToMidiEncoder['uint16_t'](end)
    ]
    const data = [
      ...splitTo7(FunctionNames.setCvEnd, 14),
      ...paramBytes,
    ]
        sendSysex(resolveRoutingTarget(voice), sysexCommands.RPC, data)
  })
}

export function setCvCurve(cv: number, curve: number, voice: number = VOICE_ALL) {
  call('setCvCurve', () => {
    const paramBytes: number[] = [
      ...jsToMidiEncoder['uint8_t'](cv),
      ...jsToMidiEncoder['uint8_t'](curve)
    ]
    const data = [
      ...splitTo7(FunctionNames.setCvCurve, 14),
      ...paramBytes,
    ]
        sendSysex(resolveRoutingTarget(voice), sysexCommands.RPC, data)
  })
}

export function setCvParams(cv: number, start: number, end: number, curve: number, reverse: boolean, voice: number = VOICE_ALL) {
  call('setCvParams', () => {
    const paramBytes: number[] = [
      ...jsToMidiEncoder['uint8_t'](cv),
      ...jsToMidiEncoder['uint16_t'](start),
      ...jsToMidiEncoder['uint16_t'](end),
      ...jsToMidiEncoder['uint8_t'](curve),
      ...jsToMidiEncoder['bool'](reverse)
    ]
    const data = [
      ...splitTo7(FunctionNames.setCvParams, 14),
      ...paramBytes,
    ]
        sendSysex(resolveRoutingTarget(voice), sysexCommands.RPC, data)
  })
}

export function saveCvMapping(cv: number, voice: number = VOICE_ALL) {
  call('saveCvMapping', () => {
    const paramBytes: number[] = [
      ...jsToMidiEncoder['uint8_t'](cv)
    ]
    const data = [
      ...splitTo7(FunctionNames.saveCvMapping, 14),
      ...paramBytes,
    ]
        sendSysex(resolveRoutingTarget(voice), sysexCommands.RPC, data)
  })
}

export function saveCvMappings(voice: number = VOICE_ALL) {
  call('saveCvMappings', () => {
    const paramBytes: number[] = [
      
    ]
    const data = [
      ...splitTo7(FunctionNames.saveCvMappings, 14),
      ...paramBytes,
    ]
        sendSysex(resolveRoutingTarget(voice), sysexCommands.RPC, data)
  })
}

export function loadCvMapping(cv: number, voice: number = VOICE_ALL) {
  call('loadCvMapping', () => {
    const paramBytes: number[] = [
      ...jsToMidiEncoder['uint8_t'](cv)
    ]
    const data = [
      ...splitTo7(FunctionNames.loadCvMapping, 14),
      ...paramBytes,
    ]
        sendSysex(resolveRoutingTarget(voice), sysexCommands.RPC, data)
  })
}

export function loadCvMappings(voice: number = VOICE_ALL) {
  call('loadCvMappings', () => {
    const paramBytes: number[] = [
      
    ]
    const data = [
      ...splitTo7(FunctionNames.loadCvMappings, 14),
      ...paramBytes,
    ]
        sendSysex(resolveRoutingTarget(voice), sysexCommands.RPC, data)
  })
}

export function clearCvMapping(cv: number, voice: number = VOICE_ALL) {
  call('clearCvMapping', () => {
    const paramBytes: number[] = [
      ...jsToMidiEncoder['uint8_t'](cv)
    ]
    const data = [
      ...splitTo7(FunctionNames.clearCvMapping, 14),
      ...paramBytes,
    ]
        sendSysex(resolveRoutingTarget(voice), sysexCommands.RPC, data)
  })
}

export function setTrimmerSetting(trimmer: number, value: number, voice: number = VOICE_ALL) {
  call('setTrimmerSetting', () => {
    const paramBytes: number[] = [
      ...jsToMidiEncoder['uint8_t'](trimmer),
      ...jsToMidiEncoder['uint16_t'](value)
    ]
    const data = [
      ...splitTo7(FunctionNames.setTrimmerSetting, 14),
      ...paramBytes,
    ]
        sendSysex(resolveRoutingTarget(voice), sysexCommands.RPC, data)
  })
}

export function saveTrimmerSettings(voice: number = VOICE_ALL) {
  call('saveTrimmerSettings', () => {
    const paramBytes: number[] = [
      
    ]
    const data = [
      ...splitTo7(FunctionNames.saveTrimmerSettings, 14),
      ...paramBytes,
    ]
        sendSysex(resolveRoutingTarget(voice), sysexCommands.RPC, data)
  })
}

export function setCVOverride(cv: number, value: number, voice: number = VOICE_ALL) {
  call('setCVOverride', () => {
    const paramBytes: number[] = [
      ...jsToMidiEncoder['uint8_t'](cv),
      ...jsToMidiEncoder['uint16_t'](value)
    ]
    const data = [
      ...splitTo7(FunctionNames.setCVOverride, 14),
      ...paramBytes,
    ]
        sendSysex(resolveRoutingTarget(voice), sysexCommands.RPC, data)
  })
}

export function releaseCVOverride(cv: number, voice: number = VOICE_ALL) {
  call('releaseCVOverride', () => {
    const paramBytes: number[] = [
      ...jsToMidiEncoder['uint8_t'](cv)
    ]
    const data = [
      ...splitTo7(FunctionNames.releaseCVOverride, 14),
      ...paramBytes,
    ]
        sendSysex(resolveRoutingTarget(voice), sysexCommands.RPC, data)
  })
}

export function releaseCVOverrides(voice: number = VOICE_ALL) {
  call('releaseCVOverrides', () => {
    const paramBytes: number[] = [
      
    ]
    const data = [
      ...splitTo7(FunctionNames.releaseCVOverrides, 14),
      ...paramBytes,
    ]
        sendSysex(resolveRoutingTarget(voice), sysexCommands.RPC, data)
  })
}

export function toggleSvfInSummedToCalibrateMix(on: boolean, voice: number = VOICE_ALL) {
  call('toggleSvfInSummedToCalibrateMix', () => {
    const paramBytes: number[] = [
      ...jsToMidiEncoder['bool'](on)
    ]
    const data = [
      ...splitTo7(FunctionNames.toggleSvfInSummedToCalibrateMix, 14),
      ...paramBytes,
    ]
        sendSysex(resolveRoutingTarget(voice), sysexCommands.RPC, data)
  })
}

export function tuneVco(voice: number = VOICE_ALL) {
  call('tuneVco', () => {
    const paramBytes: number[] = [
      
    ]
    const data = [
      ...splitTo7(FunctionNames.tuneVco, 14),
      ...paramBytes,
    ]
        sendSysex(resolveRoutingTarget(voice), sysexCommands.RPC, data)
  })
}

export function calibrateDCO1(voice: number = VOICE_ALL) {
  call('calibrateDCO1', () => {
    const paramBytes: number[] = [
      
    ]
    const data = [
      ...splitTo7(FunctionNames.calibrateDCO1, 14),
      ...paramBytes,
    ]
        sendSysex(resolveRoutingTarget(voice), sysexCommands.RPC, data)
  })
}

export function calibrateDCO2(voice: number = VOICE_ALL) {
  call('calibrateDCO2', () => {
    const paramBytes: number[] = [
      
    ]
    const data = [
      ...splitTo7(FunctionNames.calibrateDCO2, 14),
      ...paramBytes,
    ]
        sendSysex(resolveRoutingTarget(voice), sysexCommands.RPC, data)
  })
}

export function measureVcoOctaves(voice: number = VOICE_ALL) {
  call('measureVcoOctaves', () => {
    const paramBytes: number[] = [
      
    ]
    const data = [
      ...splitTo7(FunctionNames.measureVcoOctaves, 14),
      ...paramBytes,
    ]
        sendSysex(resolveRoutingTarget(voice), sysexCommands.RPC, data)
  })
}

export function measureVcoAll(voice: number = VOICE_ALL) {
  call('measureVcoAll', () => {
    const paramBytes: number[] = [
      
    ]
    const data = [
      ...splitTo7(FunctionNames.measureVcoAll, 14),
      ...paramBytes,
    ]
        sendSysex(resolveRoutingTarget(voice), sysexCommands.RPC, data)
  })
}

export function manualTuneVcoStart(voice: number = VOICE_ALL) {
  call('manualTuneVcoStart', () => {
    const paramBytes: number[] = [
      
    ]
    const data = [
      ...splitTo7(FunctionNames.manualTuneVcoStart, 14),
      ...paramBytes,
    ]
        sendSysex(resolveRoutingTarget(voice), sysexCommands.RPC, data)
  })
}

export function manualTuneVcoStop(voice: number = VOICE_ALL) {
  call('manualTuneVcoStop', () => {
    const paramBytes: number[] = [
      
    ]
    const data = [
      ...splitTo7(FunctionNames.manualTuneVcoStop, 14),
      ...paramBytes,
    ]
        sendSysex(resolveRoutingTarget(voice), sysexCommands.RPC, data)
  })
}

export function tuneSvf(target: number, precisionBits: number, voice: number = VOICE_ALL) {
  call('tuneSvf', () => {
    const paramBytes: number[] = [
      ...jsToMidiEncoder['uint8_t'](target),
      ...jsToMidiEncoder['uint8_t'](precisionBits)
    ]
    const data = [
      ...splitTo7(FunctionNames.tuneSvf, 14),
      ...paramBytes,
    ]
        sendSysex(resolveRoutingTarget(voice), sysexCommands.RPC, data)
  })
}

export function svfMeasureAmplitudeOnce(trimmerSettingRaw: number, windowUs: number, voice: number = VOICE_ALL) {
  call('svfMeasureAmplitudeOnce', () => {
    const paramBytes: number[] = [
      ...jsToMidiEncoder['uint16_t'](trimmerSettingRaw),
      ...jsToMidiEncoder['uint32_t'](windowUs)
    ]
    const data = [
      ...splitTo7(FunctionNames.svfMeasureAmplitudeOnce, 14),
      ...paramBytes,
    ]
        sendSysex(resolveRoutingTarget(voice), sysexCommands.RPC, data)
  })
}

export function svfFindPeak(target: number, precisionBits: number, voice: number = VOICE_ALL) {
  call('svfFindPeak', () => {
    const paramBytes: number[] = [
      ...jsToMidiEncoder['uint8_t'](target),
      ...jsToMidiEncoder['uint8_t'](precisionBits)
    ]
    const data = [
      ...splitTo7(FunctionNames.svfFindPeak, 14),
      ...paramBytes,
    ]
        sendSysex(resolveRoutingTarget(voice), sysexCommands.RPC, data)
  })
}

export function svfMeasureVRefAt(target: number, midiNote: number, precisionBits: number, voice: number = VOICE_ALL) {
  call('svfMeasureVRefAt', () => {
    const paramBytes: number[] = [
      ...jsToMidiEncoder['uint8_t'](target),
      ...jsToMidiEncoder['uint8_t'](midiNote),
      ...jsToMidiEncoder['uint8_t'](precisionBits)
    ]
    const data = [
      ...splitTo7(FunctionNames.svfMeasureVRefAt, 14),
      ...paramBytes,
    ]
        sendSysex(resolveRoutingTarget(voice), sysexCommands.RPC, data)
  })
}

export function svfMeasureVRefAll(target: number, precisionBits: number, voice: number = VOICE_ALL) {
  call('svfMeasureVRefAll', () => {
    const paramBytes: number[] = [
      ...jsToMidiEncoder['uint8_t'](target),
      ...jsToMidiEncoder['uint8_t'](precisionBits)
    ]
    const data = [
      ...splitTo7(FunctionNames.svfMeasureVRefAll, 14),
      ...paramBytes,
    ]
        sendSysex(resolveRoutingTarget(voice), sysexCommands.RPC, data)
  })
}

export function svfSearchCutoffOne(target: number, midiNote: number, vRefMilliVolts: number, precisionBits: number, voice: number = VOICE_ALL) {
  call('svfSearchCutoffOne', () => {
    const paramBytes: number[] = [
      ...jsToMidiEncoder['uint8_t'](target),
      ...jsToMidiEncoder['uint8_t'](midiNote),
      ...jsToMidiEncoder['uint16_t'](vRefMilliVolts),
      ...jsToMidiEncoder['uint8_t'](precisionBits)
    ]
    const data = [
      ...splitTo7(FunctionNames.svfSearchCutoffOne, 14),
      ...paramBytes,
    ]
        sendSysex(resolveRoutingTarget(voice), sysexCommands.RPC, data)
  })
}

export function powerDown(voice: number = VOICE_ALL) {
  call('powerDown', () => {
    const paramBytes: number[] = [
      
    ]
    const data = [
      ...splitTo7(FunctionNames.powerDown, 14),
      ...paramBytes,
    ]
        sendSysex(resolveRoutingTarget(voice), sysexCommands.RPC, data)
  })
}

export function powerUp(voice: number = VOICE_ALL) {
  call('powerUp', () => {
    const paramBytes: number[] = [
      
    ]
    const data = [
      ...splitTo7(FunctionNames.powerUp, 14),
      ...paramBytes,
    ]
        sendSysex(resolveRoutingTarget(voice), sysexCommands.RPC, data)
  })
}

export function dacStopUpdates(voice: number = VOICE_ALL) {
  call('dacStopUpdates', () => {
    const paramBytes: number[] = [
      
    ]
    const data = [
      ...splitTo7(FunctionNames.dacStopUpdates, 14),
      ...paramBytes,
    ]
        sendSysex(resolveRoutingTarget(voice), sysexCommands.RPC, data)
  })
}

export function dacStartUpdates(voice: number = VOICE_ALL) {
  call('dacStartUpdates', () => {
    const paramBytes: number[] = [
      
    ]
    const data = [
      ...splitTo7(FunctionNames.dacStartUpdates, 14),
      ...paramBytes,
    ]
        sendSysex(resolveRoutingTarget(voice), sysexCommands.RPC, data)
  })
}

export function unisonDetuneFactor(factor: number, voice: number = VOICE_ALL) {
  call('unisonDetuneFactor', () => {
    const paramBytes: number[] = [
      ...jsToMidiEncoder['uint16_t'](factor)
    ]
    const data = [
      ...splitTo7(FunctionNames.unisonDetuneFactor, 14),
      ...paramBytes,
    ]
        sendSysex(resolveRoutingTarget(voice), sysexCommands.RPC, data)
  })
}

export function setCtrlAllParams(settings: number[], voice: number = VOICE_ALL) {
  call('setCtrlAllParams', () => {
    const paramBytes: number[] = [
      ...jsToMidiEncoder['std::vector<int16_t>'](settings)
    ]
    const data = [
      ...splitTo7(FunctionNames.setCtrlAllParams, 14),
      ...paramBytes,
    ]
        sendSysex(resolveRoutingTarget(voice), sysexCommands.RPC, data)
  })
}

export function setCtrlAllNonModSettings(settings: number[], voice: number = VOICE_ALL) {
  call('setCtrlAllNonModSettings', () => {
    const paramBytes: number[] = [
      ...jsToMidiEncoder['std::vector<uint16_t>'](settings)
    ]
    const data = [
      ...splitTo7(FunctionNames.setCtrlAllNonModSettings, 14),
      ...paramBytes,
    ]
        sendSysex(resolveRoutingTarget(voice), sysexCommands.RPC, data)
  })
}

export function setCtrlAllEnvParams(env: number, params: number[], voice: number = VOICE_ALL) {
  call('setCtrlAllEnvParams', () => {
    const paramBytes: number[] = [
      ...jsToMidiEncoder['uint8_t'](env),
      ...jsToMidiEncoder['std::vector<int16_t>'](params)
    ]
    const data = [
      ...splitTo7(FunctionNames.setCtrlAllEnvParams, 14),
      ...paramBytes,
    ]
        sendSysex(resolveRoutingTarget(voice), sysexCommands.RPC, data)
  })
}

export function setCtrlAllEnvSettings(env: number, settings: number[], voice: number = VOICE_ALL) {
  call('setCtrlAllEnvSettings', () => {
    const paramBytes: number[] = [
      ...jsToMidiEncoder['uint8_t'](env),
      ...jsToMidiEncoder['std::vector<uint8_t>'](settings)
    ]
    const data = [
      ...splitTo7(FunctionNames.setCtrlAllEnvSettings, 14),
      ...paramBytes,
    ]
        sendSysex(resolveRoutingTarget(voice), sysexCommands.RPC, data)
  })
}

export function setCtrlAllEnvStageSettings(env: number, stage: number, settings: number[], voice: number = VOICE_ALL) {
  call('setCtrlAllEnvStageSettings', () => {
    const paramBytes: number[] = [
      ...jsToMidiEncoder['uint8_t'](env),
      ...jsToMidiEncoder['uint8_t'](stage),
      ...jsToMidiEncoder['std::vector<uint8_t>'](settings)
    ]
    const data = [
      ...splitTo7(FunctionNames.setCtrlAllEnvStageSettings, 14),
      ...paramBytes,
    ]
        sendSysex(resolveRoutingTarget(voice), sysexCommands.RPC, data)
  })
}

export function setCtrlAllLfoParams(lfo: number, params: number[], voice: number = VOICE_ALL) {
  call('setCtrlAllLfoParams', () => {
    const paramBytes: number[] = [
      ...jsToMidiEncoder['uint8_t'](lfo),
      ...jsToMidiEncoder['std::vector<int16_t>'](params)
    ]
    const data = [
      ...splitTo7(FunctionNames.setCtrlAllLfoParams, 14),
      ...paramBytes,
    ]
        sendSysex(resolveRoutingTarget(voice), sysexCommands.RPC, data)
  })
}

export function setCtrlAllLfoSettings(lfo: number, settings: number[], voice: number = VOICE_ALL) {
  call('setCtrlAllLfoSettings', () => {
    const paramBytes: number[] = [
      ...jsToMidiEncoder['uint8_t'](lfo),
      ...jsToMidiEncoder['std::vector<uint8_t>'](settings)
    ]
    const data = [
      ...splitTo7(FunctionNames.setCtrlAllLfoSettings, 14),
      ...paramBytes,
    ]
        sendSysex(resolveRoutingTarget(voice), sysexCommands.RPC, data)
  })
}

export function setCtrlAllLfoStageSettings(lfo: number, stage: number, settings: number[], voice: number = VOICE_ALL) {
  call('setCtrlAllLfoStageSettings', () => {
    const paramBytes: number[] = [
      ...jsToMidiEncoder['uint8_t'](lfo),
      ...jsToMidiEncoder['uint8_t'](stage),
      ...jsToMidiEncoder['std::vector<uint8_t>'](settings)
    ]
    const data = [
      ...splitTo7(FunctionNames.setCtrlAllLfoStageSettings, 14),
      ...paramBytes,
    ]
        sendSysex(resolveRoutingTarget(voice), sysexCommands.RPC, data)
  })
}

export function setAllModAmounts(offsetDst: number, sourceAmounts: number[], voice: number = VOICE_ALL) {
  call('setAllModAmounts', () => {
    const paramBytes: number[] = [
      ...jsToMidiEncoder['uint8_t'](offsetDst),
      ...jsToMidiEncoder['std::vector<int16_t>'](sourceAmounts)
    ]
    const data = [
      ...splitTo7(FunctionNames.setAllModAmounts, 14),
      ...paramBytes,
    ]
        sendSysex(resolveRoutingTarget(voice), sysexCommands.RPC, data)
  })
}

export function setAllEnvModAmounts(env: number, offsetDst: number, sourceAmounts: number[], voice: number = VOICE_ALL) {
  call('setAllEnvModAmounts', () => {
    const paramBytes: number[] = [
      ...jsToMidiEncoder['uint8_t'](env),
      ...jsToMidiEncoder['uint8_t'](offsetDst),
      ...jsToMidiEncoder['std::vector<int16_t>'](sourceAmounts)
    ]
    const data = [
      ...splitTo7(FunctionNames.setAllEnvModAmounts, 14),
      ...paramBytes,
    ]
        sendSysex(resolveRoutingTarget(voice), sysexCommands.RPC, data)
  })
}

export function setAllLfoModAmounts(lfo: number, offsetDst: number, sourceAmounts: number[], voice: number = VOICE_ALL) {
  call('setAllLfoModAmounts', () => {
    const paramBytes: number[] = [
      ...jsToMidiEncoder['uint8_t'](lfo),
      ...jsToMidiEncoder['uint8_t'](offsetDst),
      ...jsToMidiEncoder['std::vector<int16_t>'](sourceAmounts)
    ]
    const data = [
      ...splitTo7(FunctionNames.setAllLfoModAmounts, 14),
      ...paramBytes,
    ]
        sendSysex(resolveRoutingTarget(voice), sysexCommands.RPC, data)
  })
}

export function changeMidiSpeed(speed: number, voice: number = VOICE_ALL) {
  call('changeMidiSpeed', () => {
    const paramBytes: number[] = [
      ...jsToMidiEncoder['uint32_t'](speed)
    ]
    const data = [
      ...splitTo7(FunctionNames.changeMidiSpeed, 14),
      ...paramBytes,
    ]
        sendSysex(resolveRoutingTarget(voice), sysexCommands.RPC, data)
  })
}

export function toggleVoicePower(voiceCardId: number, on: boolean, voice: number = VOICE_ALL) {
  call('toggleVoicePower', () => {
    const paramBytes: number[] = [
      ...jsToMidiEncoder['uint8_t'](voiceCardId),
      ...jsToMidiEncoder['bool'](on)
    ]
    const data = [
      ...splitTo7(FunctionNames.toggleVoicePower, 14),
      ...paramBytes,
    ]
        sendSysex(resolveRoutingTarget(voice), sysexCommands.RPC, data)
  })
}

export function voiceDacStopUpdates(voiceCardId: number, voice: number = VOICE_ALL) {
  call('voiceDacStopUpdates', () => {
    const paramBytes: number[] = [
      ...jsToMidiEncoder['uint8_t'](voiceCardId)
    ]
    const data = [
      ...splitTo7(FunctionNames.voiceDacStopUpdates, 14),
      ...paramBytes,
    ]
        sendSysex(resolveRoutingTarget(voice), sysexCommands.RPC, data)
  })
}

export function voiceDacStartUpdates(voiceCardId: number, voice: number = VOICE_ALL) {
  call('voiceDacStartUpdates', () => {
    const paramBytes: number[] = [
      ...jsToMidiEncoder['uint8_t'](voiceCardId)
    ]
    const data = [
      ...splitTo7(FunctionNames.voiceDacStartUpdates, 14),
      ...paramBytes,
    ]
        sendSysex(resolveRoutingTarget(voice), sysexCommands.RPC, data)
  })
}
