import { generateMidiRPCDeserializer } from './generateMidiRPCDeserializer'
import { generateApiTs } from './generateApiTs'
import { generateFunctionNamesTs } from './generateFunctionNames'
import { parseCppHeaderFile } from './parseCppHeader'
import { parseCvDefinitionFile } from './parseCvDefinition'
import { generateCvDefinitionsTs } from './generateCvDefinitionsTs'
import { parseCvConfigFile } from './parseCvConfig'
import { parseCurves } from './parseCurves'

const fs = require('fs')

const writeToFile = (path: string, contents: string) => {
    console.log(`writing ${contents.length} bytes to ${path}`)
    fs.writeFileSync(path, contents)
}

const gitRoot = '/Users/joakim/git/xonik'
const cppRoot = `${gitRoot}/xm8-voice-controller/xm8-voice-controller/`
const jsRoot = `${gitRoot}/synth-gui-react`
const scriptRoot = `${jsRoot}/utils/midiRPC`
const jsMidiRoot = `${jsRoot}/src/midi/rpc/`

const headerContents = fs.readFileSync(`${cppRoot}/midiRPCFunctions.h`, { encoding: 'utf8', flag: 'r' })
const funcs = parseCppHeaderFile(headerContents)

const cvPinsContents = fs.readFileSync(`${cppRoot}/cvPins.h`, { encoding: 'utf8', flag: 'r' })
const cvs = parseCvDefinitionFile(cvPinsContents)

const cvConfigContents = fs.readFileSync(`${cppRoot}/cvConfig.h`, { encoding: 'utf8', flag: 'r' })
const cvCount = parseCvConfigFile(cvConfigContents)

const curveContents = fs.readFileSync(`${cppRoot}/curves.h`, { encoding: 'utf8', flag: 'r' })
const curveEnums = parseCurves(curveContents)

writeToFile(`${cppRoot}/midiRPCDeserializer.cpp`, generateMidiRPCDeserializer(funcs))
writeToFile(`${jsMidiRoot}/api.ts`, generateApiTs(funcs))
writeToFile(`${jsMidiRoot}/functionNames.ts`, generateFunctionNamesTs(funcs))
writeToFile(`${jsRoot}/src/controller/settings/CvDefinitions.ts`, generateCvDefinitionsTs(cvs, cvCount))

fs.copyFileSync(`${scriptRoot}/serializer.ts`, `${jsMidiRoot}serializer.ts`)
fs.copyFileSync(`${scriptRoot}/dataTypes.ts`, `${jsMidiRoot}dataTypes.ts`)
// TODO: Generate/copy parse functions and datatypes to js/cpp
// TODO: Find git root automatically from where script is run
// Add validator functions to js-code to log out-of-range

/*
console.log(jsToMidiEncoder['void'](4294967295))
console.log(jsToMidiEncoder['uint7_t'](4294967295), Math.pow(2,7) -1)
console.log(jsToMidiEncoder['uint8_t'](4294967295), Math.pow(2,8) -1)
console.log(jsToMidiEncoder['uint14_t'](4294967295), Math.pow(2,14) -1)
console.log(jsToMidiEncoder['uint16_t'](4294967295), Math.pow(2,16) -1)
console.log(jsToMidiEncoder['uint21_t'](4294967295), Math.pow(2,21) -1)
console.log(jsToMidiEncoder['uint32_t'](4294967295), Math.pow(2,32) -1)
*/
