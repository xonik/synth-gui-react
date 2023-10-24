// GENERATED FILE, DO NOT EDIT
// js-to-midi RPC wrapper
import logger from '../../utils/logger'
import { jsToMidiEncoder, splitTo7 } from './serializer'
import { FunctionNames } from './functionNames'
import { sendSysex, sysexCommands } from '../midibus'

export function setCvStart(cv: number, start: number) {
  const paramBytes: number[] = [
    ...jsToMidiEncoder['uint8_t'](cv),
    ...jsToMidiEncoder['uint16_t'](start)
  ]
  const data = [
    ...splitTo7(FunctionNames.setCvStart, 14),
    ...paramBytes,
  ]
  logger.midi('RPC call to setCvStart')
  sendSysex(sysexCommands.RPC, data)  
}

export function setCvEnd(cv: number, end: number) {
  const paramBytes: number[] = [
    ...jsToMidiEncoder['uint8_t'](cv),
    ...jsToMidiEncoder['uint16_t'](end)
  ]
  const data = [
    ...splitTo7(FunctionNames.setCvEnd, 14),
    ...paramBytes,
  ]
  logger.midi('RPC call to setCvEnd')
  sendSysex(sysexCommands.RPC, data)  
}

export function setCvCurve(cv: number, curve: number) {
  const paramBytes: number[] = [
    ...jsToMidiEncoder['uint8_t'](cv),
    ...jsToMidiEncoder['uint8_t'](curve)
  ]
  const data = [
    ...splitTo7(FunctionNames.setCvCurve, 14),
    ...paramBytes,
  ]
  logger.midi('RPC call to setCvCurve')
  sendSysex(sysexCommands.RPC, data)  
}

export function setCvParams(cv: number, start: number, end: number, curve: number) {
  const paramBytes: number[] = [
    ...jsToMidiEncoder['uint8_t'](cv),
    ...jsToMidiEncoder['uint16_t'](start),
    ...jsToMidiEncoder['uint16_t'](end),
    ...jsToMidiEncoder['uint8_t'](curve)
  ]
  const data = [
    ...splitTo7(FunctionNames.setCvParams, 14),
    ...paramBytes,
  ]
  logger.midi('RPC call to setCvParams')
  sendSysex(sysexCommands.RPC, data)  
}

export function saveCvMapping(cv: number) {
  const paramBytes: number[] = [
    ...jsToMidiEncoder['uint8_t'](cv)
  ]
  const data = [
    ...splitTo7(FunctionNames.saveCvMapping, 14),
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
    ...splitTo7(FunctionNames.loadCvMapping, 14),
    ...paramBytes,
  ]
  logger.midi('RPC call to loadCvMapping')
  sendSysex(sysexCommands.RPC, data)  
}
