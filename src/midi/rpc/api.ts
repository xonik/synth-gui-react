// GENERATED FILE, DO NOT EDIT
// js-to-midi RPC wrapper
import logger from '../../utils/logger'
import { jsToMidiEncoder } from './serializer'
import { FunctionNames } from './functionNames'
import { sendSysex, sysexCommands } from '../midibus'

export function setCvMin(cv: number, min: number) {
  const paramBytes: number[] = [
    ...jsToMidiEncoder['uint8_t'](cv),
    ...jsToMidiEncoder['uint16_t'](min)
  ]
  const data = [
    FunctionNames.setCvMin,
    ...paramBytes,
  ]
  logger.midi('RPC call to setCvMin')
  sendSysex(sysexCommands.RPC, data)  
}

export function setCvMax(cv: number, max: number) {
  const paramBytes: number[] = [
    ...jsToMidiEncoder['uint8_t'](cv),
    ...jsToMidiEncoder['uint16_t'](max)
  ]
  const data = [
    FunctionNames.setCvMax,
    ...paramBytes,
  ]
  logger.midi('RPC call to setCvMax')
  sendSysex(sysexCommands.RPC, data)  
}

export function setCvCurve(cv: number, curve: number) {
  const paramBytes: number[] = [
    ...jsToMidiEncoder['uint8_t'](cv),
    ...jsToMidiEncoder['uint8_t'](curve)
  ]
  const data = [
    FunctionNames.setCvCurve,
    ...paramBytes,
  ]
  logger.midi('RPC call to setCvCurve')
  sendSysex(sysexCommands.RPC, data)  
}

export function saveCvMapping(cv: number) {
  const paramBytes: number[] = [
    ...jsToMidiEncoder['uint8_t'](cv)
  ]
  const data = [
    FunctionNames.saveCvMapping,
    ...paramBytes,
  ]
  logger.midi('RPC call to saveCvMapping')
  sendSysex(sysexCommands.RPC, data)  
}

export function loadCvMapping(cv: number) {
  const paramBytes: number[] = [
    ...jsToMidiEncoder['uint8_t'](cv)
  ]
  const data = [
    FunctionNames.loadCvMapping,
    ...paramBytes,
  ]
  logger.midi('RPC call to loadCvMapping')
  sendSysex(sysexCommands.RPC, data)  
}

export function loadCvMapping2() {
  const paramBytes: number[] = [
    
  ]
  const data = [
    FunctionNames.loadCvMapping2,
    ...paramBytes,
  ]
  logger.midi('RPC call to loadCvMapping2')
  sendSysex(sysexCommands.RPC, data)  
}
