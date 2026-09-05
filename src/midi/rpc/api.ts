// GENERATED FILE, DO NOT EDIT
// js-to-midi RPC wrapper
import { jsToMidiEncoder, splitTo7 } from './serializer'
import { FunctionNames } from './functionNames'
import { sendSysex, sysexCommands, type Route } from '../midibus'
import { call, callWithReturn } from './functionCaller'

export function setCvStart(cv: number, start: number, route: Route = { type: 'all' }) {
  call('setCvStart', () => {
    const paramBytes: number[] = [
      ...jsToMidiEncoder['uint8_t'](cv),
      ...jsToMidiEncoder['uint16_t'](start)
    ]
    const data = [
      ...splitTo7(FunctionNames.setCvStart, 14),
      ...paramBytes,
    ]
        sendSysex(route, sysexCommands.RPC, data)
  })
}

export function setCvEnd(cv: number, end: number, route: Route = { type: 'all' }) {
  call('setCvEnd', () => {
    const paramBytes: number[] = [
      ...jsToMidiEncoder['uint8_t'](cv),
      ...jsToMidiEncoder['uint16_t'](end)
    ]
    const data = [
      ...splitTo7(FunctionNames.setCvEnd, 14),
      ...paramBytes,
    ]
        sendSysex(route, sysexCommands.RPC, data)
  })
}

export function setCvCurve(cv: number, curve: number, route: Route = { type: 'all' }) {
  call('setCvCurve', () => {
    const paramBytes: number[] = [
      ...jsToMidiEncoder['uint8_t'](cv),
      ...jsToMidiEncoder['uint8_t'](curve)
    ]
    const data = [
      ...splitTo7(FunctionNames.setCvCurve, 14),
      ...paramBytes,
    ]
        sendSysex(route, sysexCommands.RPC, data)
  })
}

export function setCvParams(cv: number, start: number, end: number, curve: number, reverse: boolean, route: Route = { type: 'all' }) {
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
        sendSysex(route, sysexCommands.RPC, data)
  })
}

export function saveCvMapping(cv: number, route: Route = { type: 'all' }) {
  call('saveCvMapping', () => {
    const paramBytes: number[] = [
      ...jsToMidiEncoder['uint8_t'](cv)
    ]
    const data = [
      ...splitTo7(FunctionNames.saveCvMapping, 14),
      ...paramBytes,
    ]
        sendSysex(route, sysexCommands.RPC, data)
  })
}

export function saveCvMappings(route: Route = { type: 'all' }) {
  call('saveCvMappings', () => {
    const paramBytes: number[] = [
      
    ]
    const data = [
      ...splitTo7(FunctionNames.saveCvMappings, 14),
      ...paramBytes,
    ]
        sendSysex(route, sysexCommands.RPC, data)
  })
}

export function loadCvMapping(cv: number, route: Route = { type: 'all' }) {
  call('loadCvMapping', () => {
    const paramBytes: number[] = [
      ...jsToMidiEncoder['uint8_t'](cv)
    ]
    const data = [
      ...splitTo7(FunctionNames.loadCvMapping, 14),
      ...paramBytes,
    ]
        sendSysex(route, sysexCommands.RPC, data)
  })
}

export function loadCvMappings(route: Route = { type: 'all' }) {
  call('loadCvMappings', () => {
    const paramBytes: number[] = [
      
    ]
    const data = [
      ...splitTo7(FunctionNames.loadCvMappings, 14),
      ...paramBytes,
    ]
        sendSysex(route, sysexCommands.RPC, data)
  })
}

export function clearCvMapping(cv: number, route: Route = { type: 'all' }) {
  call('clearCvMapping', () => {
    const paramBytes: number[] = [
      ...jsToMidiEncoder['uint8_t'](cv)
    ]
    const data = [
      ...splitTo7(FunctionNames.clearCvMapping, 14),
      ...paramBytes,
    ]
        sendSysex(route, sysexCommands.RPC, data)
  })
}

export function setTrimmerSetting(trimmer: number, value: number, route: Route = { type: 'all' }) {
  call('setTrimmerSetting', () => {
    const paramBytes: number[] = [
      ...jsToMidiEncoder['uint8_t'](trimmer),
      ...jsToMidiEncoder['uint16_t'](value)
    ]
    const data = [
      ...splitTo7(FunctionNames.setTrimmerSetting, 14),
      ...paramBytes,
    ]
        sendSysex(route, sysexCommands.RPC, data)
  })
}

export function saveTrimmerSettings(route: Route = { type: 'all' }) {
  call('saveTrimmerSettings', () => {
    const paramBytes: number[] = [
      
    ]
    const data = [
      ...splitTo7(FunctionNames.saveTrimmerSettings, 14),
      ...paramBytes,
    ]
        sendSysex(route, sysexCommands.RPC, data)
  })
}

export function setCVOverride(cv: number, value: number, route: Route = { type: 'all' }) {
  call('setCVOverride', () => {
    const paramBytes: number[] = [
      ...jsToMidiEncoder['uint8_t'](cv),
      ...jsToMidiEncoder['uint16_t'](value)
    ]
    const data = [
      ...splitTo7(FunctionNames.setCVOverride, 14),
      ...paramBytes,
    ]
        sendSysex(route, sysexCommands.RPC, data)
  })
}

export function releaseCVOverride(cv: number, route: Route = { type: 'all' }) {
  call('releaseCVOverride', () => {
    const paramBytes: number[] = [
      ...jsToMidiEncoder['uint8_t'](cv)
    ]
    const data = [
      ...splitTo7(FunctionNames.releaseCVOverride, 14),
      ...paramBytes,
    ]
        sendSysex(route, sysexCommands.RPC, data)
  })
}

export function releaseCVOverrides(route: Route = { type: 'all' }) {
  call('releaseCVOverrides', () => {
    const paramBytes: number[] = [
      
    ]
    const data = [
      ...splitTo7(FunctionNames.releaseCVOverrides, 14),
      ...paramBytes,
    ]
        sendSysex(route, sysexCommands.RPC, data)
  })
}

export function toggleSvfInSummedToCalibrateMix(on: boolean, route: Route = { type: 'all' }) {
  call('toggleSvfInSummedToCalibrateMix', () => {
    const paramBytes: number[] = [
      ...jsToMidiEncoder['bool'](on)
    ]
    const data = [
      ...splitTo7(FunctionNames.toggleSvfInSummedToCalibrateMix, 14),
      ...paramBytes,
    ]
        sendSysex(route, sysexCommands.RPC, data)
  })
}

export function tuneVco(route: Route = { type: 'all' }) {
  call('tuneVco', () => {
    const paramBytes: number[] = [
      
    ]
    const data = [
      ...splitTo7(FunctionNames.tuneVco, 14),
      ...paramBytes,
    ]
        sendSysex(route, sysexCommands.RPC, data)
  })
}

export function calibrateDCO1(route: Route = { type: 'all' }) {
  call('calibrateDCO1', () => {
    const paramBytes: number[] = [
      
    ]
    const data = [
      ...splitTo7(FunctionNames.calibrateDCO1, 14),
      ...paramBytes,
    ]
        sendSysex(route, sysexCommands.RPC, data)
  })
}

export function calibrateDCO2(route: Route = { type: 'all' }) {
  call('calibrateDCO2', () => {
    const paramBytes: number[] = [
      
    ]
    const data = [
      ...splitTo7(FunctionNames.calibrateDCO2, 14),
      ...paramBytes,
    ]
        sendSysex(route, sysexCommands.RPC, data)
  })
}

export function measureVcoOctaves(route: Route = { type: 'all' }) {
  call('measureVcoOctaves', () => {
    const paramBytes: number[] = [
      
    ]
    const data = [
      ...splitTo7(FunctionNames.measureVcoOctaves, 14),
      ...paramBytes,
    ]
        sendSysex(route, sysexCommands.RPC, data)
  })
}

export function measureVcoAll(route: Route = { type: 'all' }) {
  call('measureVcoAll', () => {
    const paramBytes: number[] = [
      
    ]
    const data = [
      ...splitTo7(FunctionNames.measureVcoAll, 14),
      ...paramBytes,
    ]
        sendSysex(route, sysexCommands.RPC, data)
  })
}

export function manualTuneVcoStart(route: Route = { type: 'all' }) {
  call('manualTuneVcoStart', () => {
    const paramBytes: number[] = [
      
    ]
    const data = [
      ...splitTo7(FunctionNames.manualTuneVcoStart, 14),
      ...paramBytes,
    ]
        sendSysex(route, sysexCommands.RPC, data)
  })
}

export function manualTuneVcoStop(route: Route = { type: 'all' }) {
  call('manualTuneVcoStop', () => {
    const paramBytes: number[] = [
      
    ]
    const data = [
      ...splitTo7(FunctionNames.manualTuneVcoStop, 14),
      ...paramBytes,
    ]
        sendSysex(route, sysexCommands.RPC, data)
  })
}

export function tuneSvf(target: number, precisionBits: number, route: Route = { type: 'all' }) {
  call('tuneSvf', () => {
    const paramBytes: number[] = [
      ...jsToMidiEncoder['uint8_t'](target),
      ...jsToMidiEncoder['uint8_t'](precisionBits)
    ]
    const data = [
      ...splitTo7(FunctionNames.tuneSvf, 14),
      ...paramBytes,
    ]
        sendSysex(route, sysexCommands.RPC, data)
  })
}

export function svfMeasureAmplitudeOnce(trimmerSettingRaw: number, windowUs: number, route: Route = { type: 'all' }) {
  call('svfMeasureAmplitudeOnce', () => {
    const paramBytes: number[] = [
      ...jsToMidiEncoder['uint16_t'](trimmerSettingRaw),
      ...jsToMidiEncoder['uint32_t'](windowUs)
    ]
    const data = [
      ...splitTo7(FunctionNames.svfMeasureAmplitudeOnce, 14),
      ...paramBytes,
    ]
        sendSysex(route, sysexCommands.RPC, data)
  })
}

export function svfFindPeak(target: number, precisionBits: number, route: Route = { type: 'all' }) {
  call('svfFindPeak', () => {
    const paramBytes: number[] = [
      ...jsToMidiEncoder['uint8_t'](target),
      ...jsToMidiEncoder['uint8_t'](precisionBits)
    ]
    const data = [
      ...splitTo7(FunctionNames.svfFindPeak, 14),
      ...paramBytes,
    ]
        sendSysex(route, sysexCommands.RPC, data)
  })
}

export function svfMeasureVRefAt(target: number, midiNote: number, precisionBits: number, route: Route = { type: 'all' }) {
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
        sendSysex(route, sysexCommands.RPC, data)
  })
}

export function svfMeasureVRefAll(target: number, precisionBits: number, route: Route = { type: 'all' }) {
  call('svfMeasureVRefAll', () => {
    const paramBytes: number[] = [
      ...jsToMidiEncoder['uint8_t'](target),
      ...jsToMidiEncoder['uint8_t'](precisionBits)
    ]
    const data = [
      ...splitTo7(FunctionNames.svfMeasureVRefAll, 14),
      ...paramBytes,
    ]
        sendSysex(route, sysexCommands.RPC, data)
  })
}

export function svfSearchCutoffOne(target: number, midiNote: number, vRefMilliVolts: number, precisionBits: number, route: Route = { type: 'all' }) {
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
        sendSysex(route, sysexCommands.RPC, data)
  })
}

export function powerDown(route: Route = { type: 'all' }) {
  call('powerDown', () => {
    const paramBytes: number[] = [
      
    ]
    const data = [
      ...splitTo7(FunctionNames.powerDown, 14),
      ...paramBytes,
    ]
        sendSysex(route, sysexCommands.RPC, data)
  })
}

export function powerUp(route: Route = { type: 'all' }) {
  call('powerUp', () => {
    const paramBytes: number[] = [
      
    ]
    const data = [
      ...splitTo7(FunctionNames.powerUp, 14),
      ...paramBytes,
    ]
        sendSysex(route, sysexCommands.RPC, data)
  })
}

export function dacStopUpdates(route: Route = { type: 'all' }) {
  call('dacStopUpdates', () => {
    const paramBytes: number[] = [
      
    ]
    const data = [
      ...splitTo7(FunctionNames.dacStopUpdates, 14),
      ...paramBytes,
    ]
        sendSysex(route, sysexCommands.RPC, data)
  })
}

export function dacStartUpdates(route: Route = { type: 'all' }) {
  call('dacStartUpdates', () => {
    const paramBytes: number[] = [
      
    ]
    const data = [
      ...splitTo7(FunctionNames.dacStartUpdates, 14),
      ...paramBytes,
    ]
        sendSysex(route, sysexCommands.RPC, data)
  })
}

export function unisonDetuneFactor(factor: number, route: Route = { type: 'all' }) {
  call('unisonDetuneFactor', () => {
    const paramBytes: number[] = [
      ...jsToMidiEncoder['uint16_t'](factor)
    ]
    const data = [
      ...splitTo7(FunctionNames.unisonDetuneFactor, 14),
      ...paramBytes,
    ]
        sendSysex(route, sysexCommands.RPC, data)
  })
}

export function setCtrlAllParams(settings: number[], route: Route = { type: 'all' }) {
  call('setCtrlAllParams', () => {
    const paramBytes: number[] = [
      ...jsToMidiEncoder['std::vector<int16_t>'](settings)
    ]
    const data = [
      ...splitTo7(FunctionNames.setCtrlAllParams, 14),
      ...paramBytes,
    ]
        sendSysex(route, sysexCommands.RPC, data)
  })
}

export function setCtrlAllNonModSettings(settings: number[], route: Route = { type: 'all' }) {
  call('setCtrlAllNonModSettings', () => {
    const paramBytes: number[] = [
      ...jsToMidiEncoder['std::vector<uint16_t>'](settings)
    ]
    const data = [
      ...splitTo7(FunctionNames.setCtrlAllNonModSettings, 14),
      ...paramBytes,
    ]
        sendSysex(route, sysexCommands.RPC, data)
  })
}

export function setCtrlAllEnvParams(env: number, params: number[], route: Route = { type: 'all' }) {
  call('setCtrlAllEnvParams', () => {
    const paramBytes: number[] = [
      ...jsToMidiEncoder['uint8_t'](env),
      ...jsToMidiEncoder['std::vector<int16_t>'](params)
    ]
    const data = [
      ...splitTo7(FunctionNames.setCtrlAllEnvParams, 14),
      ...paramBytes,
    ]
        sendSysex(route, sysexCommands.RPC, data)
  })
}

export function setCtrlAllEnvSettings(env: number, settings: number[], route: Route = { type: 'all' }) {
  call('setCtrlAllEnvSettings', () => {
    const paramBytes: number[] = [
      ...jsToMidiEncoder['uint8_t'](env),
      ...jsToMidiEncoder['std::vector<uint8_t>'](settings)
    ]
    const data = [
      ...splitTo7(FunctionNames.setCtrlAllEnvSettings, 14),
      ...paramBytes,
    ]
        sendSysex(route, sysexCommands.RPC, data)
  })
}

export function setCtrlAllEnvStageSettings(env: number, stage: number, settings: number[], route: Route = { type: 'all' }) {
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
        sendSysex(route, sysexCommands.RPC, data)
  })
}

export function setCtrlAllLfoParams(lfo: number, params: number[], route: Route = { type: 'all' }) {
  call('setCtrlAllLfoParams', () => {
    const paramBytes: number[] = [
      ...jsToMidiEncoder['uint8_t'](lfo),
      ...jsToMidiEncoder['std::vector<int16_t>'](params)
    ]
    const data = [
      ...splitTo7(FunctionNames.setCtrlAllLfoParams, 14),
      ...paramBytes,
    ]
        sendSysex(route, sysexCommands.RPC, data)
  })
}

export function setCtrlAllLfoSettings(lfo: number, settings: number[], route: Route = { type: 'all' }) {
  call('setCtrlAllLfoSettings', () => {
    const paramBytes: number[] = [
      ...jsToMidiEncoder['uint8_t'](lfo),
      ...jsToMidiEncoder['std::vector<uint8_t>'](settings)
    ]
    const data = [
      ...splitTo7(FunctionNames.setCtrlAllLfoSettings, 14),
      ...paramBytes,
    ]
        sendSysex(route, sysexCommands.RPC, data)
  })
}

export function setCtrlAllLfoStageSettings(lfo: number, stage: number, settings: number[], route: Route = { type: 'all' }) {
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
        sendSysex(route, sysexCommands.RPC, data)
  })
}

export function setAllModAmounts(offsetDst: number, sourceAmounts: number[], route: Route = { type: 'all' }) {
  call('setAllModAmounts', () => {
    const paramBytes: number[] = [
      ...jsToMidiEncoder['uint8_t'](offsetDst),
      ...jsToMidiEncoder['std::vector<int16_t>'](sourceAmounts)
    ]
    const data = [
      ...splitTo7(FunctionNames.setAllModAmounts, 14),
      ...paramBytes,
    ]
        sendSysex(route, sysexCommands.RPC, data)
  })
}

export function setAllEnvModAmounts(env: number, offsetDst: number, sourceAmounts: number[], route: Route = { type: 'all' }) {
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
        sendSysex(route, sysexCommands.RPC, data)
  })
}

export function setAllLfoModAmounts(lfo: number, offsetDst: number, sourceAmounts: number[], route: Route = { type: 'all' }) {
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
        sendSysex(route, sysexCommands.RPC, data)
  })
}

export function changeMidiSpeed(speed: number, route: Route = { type: 'all' }) {
  call('changeMidiSpeed', () => {
    const paramBytes: number[] = [
      ...jsToMidiEncoder['uint32_t'](speed)
    ]
    const data = [
      ...splitTo7(FunctionNames.changeMidiSpeed, 14),
      ...paramBytes,
    ]
        sendSysex(route, sysexCommands.RPC, data)
  })
}

export function toggleVoicePower(voiceCardId: number, on: boolean, route: Route = { type: 'main' }) {
  call('toggleVoicePower', () => {
    const paramBytes: number[] = [
      ...jsToMidiEncoder['uint8_t'](voiceCardId),
      ...jsToMidiEncoder['bool'](on)
    ]
    const data = [
      ...splitTo7(FunctionNames.toggleVoicePower, 14),
      ...paramBytes,
    ]
        sendSysex(route, sysexCommands.RPC, data)
  })
}

export function voiceDacStopUpdates(voiceCardId: number, route: Route = { type: 'main' }) {
  call('voiceDacStopUpdates', () => {
    const paramBytes: number[] = [
      ...jsToMidiEncoder['uint8_t'](voiceCardId)
    ]
    const data = [
      ...splitTo7(FunctionNames.voiceDacStopUpdates, 14),
      ...paramBytes,
    ]
        sendSysex(route, sysexCommands.RPC, data)
  })
}

export function voiceDacStartUpdates(voiceCardId: number, route: Route = { type: 'main' }) {
  call('voiceDacStartUpdates', () => {
    const paramBytes: number[] = [
      ...jsToMidiEncoder['uint8_t'](voiceCardId)
    ]
    const data = [
      ...splitTo7(FunctionNames.voiceDacStartUpdates, 14),
      ...paramBytes,
    ]
        sendSysex(route, sysexCommands.RPC, data)
  })
}
