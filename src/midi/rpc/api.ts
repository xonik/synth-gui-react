// js-to-midi RPC wrapper
import logger from '../../utils/logger'
import { jsToMidiEncoder } from './dataTypes'
import { CommandNames } from './commandNames'
import { sendSysex, sysexCommands } from '../midibus'

function setCvMin(cv: number, min: number) {
  const paramBytes: number[] = [
    ...jsToMidiEncoder['uint8_t'](cv),
    ...jsToMidiEncoder['uint16_t'](min)
  ]
  const data = [
    CommandNames.setCvMin,
    ...paramBytes,
  ]
  logger.midi('RPC call to setCvMin')
  sendSysex(sysexCommands.RPC, data)  
}

function setCvMax(cv: number, max: number) {
  const paramBytes: number[] = [
    ...jsToMidiEncoder['uint8_t'](cv),
    ...jsToMidiEncoder['uint16_t'](max)
  ]
  const data = [
    CommandNames.setCvMax,
    ...paramBytes,
  ]
  logger.midi('RPC call to setCvMax')
  sendSysex(sysexCommands.RPC, data)  
}

function setCvCurve(cv: number, curve: number) {
  const paramBytes: number[] = [
    ...jsToMidiEncoder['uint8_t'](cv),
    ...jsToMidiEncoder['uint8_t'](curve)
  ]
  const data = [
    CommandNames.setCvCurve,
    ...paramBytes,
  ]
  logger.midi('RPC call to setCvCurve')
  sendSysex(sysexCommands.RPC, data)  
}

function saveCvMapping(cv: number) {
  const paramBytes: number[] = [
    ...jsToMidiEncoder['uint8_t'](cv)
  ]
  const data = [
    CommandNames.saveCvMapping,
    ...paramBytes,
  ]
  logger.midi('RPC call to saveCvMapping')
  sendSysex(sysexCommands.RPC, data)  
}

function loadCvMapping(cv: number) {
  const paramBytes: number[] = [
    ...jsToMidiEncoder['uint8_t'](cv)
  ]
  const data = [
    CommandNames.loadCvMapping,
    ...paramBytes,
  ]
  logger.midi('RPC call to loadCvMapping')
  sendSysex(sysexCommands.RPC, data)  
}

function loadCvMapping2() {
  const paramBytes: number[] = [
    
  ]
  const data = [
    CommandNames.loadCvMapping2,
    ...paramBytes,
  ]
  logger.midi('RPC call to loadCvMapping2')
  sendSysex(sysexCommands.RPC, data)  
}
