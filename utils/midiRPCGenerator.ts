import { generateMidiRPCFunctionIds } from './midiRPC/generateMidiRPCFunctionIds'
import { generateApiTs } from './midiRPC/generateApiTs'
import { generateFunctionNamesTs } from './midiRPC/generateFunctionNames'
import { parseCppHeaderFile } from './midiRPC/parseCppHeader'

const fs = require('fs')

const cppRoot = '/Users/joakim/git/xonik/xm8-voice-controller/xm8-voice-controller/'
const jsRoot = '/Users/joakim/git/xonik/synth-gui-react/src/midi/rpc/'

const path = `${cppRoot}/midiRPC.h`
const headerContents = fs.readFileSync(path, { encoding: 'utf8', flag: 'r' })
const funcs = parseCppHeaderFile(headerContents)


/*
console.log(jsToMidiEncoder['void'](4294967295))
console.log(jsToMidiEncoder['uint7_t'](4294967295), Math.pow(2,7) -1)
console.log(jsToMidiEncoder['uint8_t'](4294967295), Math.pow(2,8) -1)
console.log(jsToMidiEncoder['uint14_t'](4294967295), Math.pow(2,14) -1)
console.log(jsToMidiEncoder['uint16_t'](4294967295), Math.pow(2,16) -1)
console.log(jsToMidiEncoder['uint21_t'](4294967295), Math.pow(2,21) -1)
console.log(jsToMidiEncoder['uint32_t'](4294967295), Math.pow(2,32) -1)
*/

const writeToFile = (path: string, contents: string) => {
    console.log(`writing ${contents.length} bytes to ${path}`)
    fs.writeFileSync(path, contents)
}

writeToFile(`${cppRoot}/midiRPCDataParser.cpp`, generateMidiRPCFunctionIds(funcs))
writeToFile(`${jsRoot}/api.ts`, generateApiTs(funcs))
writeToFile(`${jsRoot}/functionNames.ts`, generateFunctionNamesTs(funcs))