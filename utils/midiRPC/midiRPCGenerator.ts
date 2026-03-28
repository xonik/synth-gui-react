import { generateMidiRPCDeserializer } from './generateMidiRPCDeserializer'
import { generateApiTs } from './generateApiTs'
import { generateFunctionNamesEnumTs } from './generateFunctionNames'
import { parseCppHeaderFile } from './parseCppHeader'
import { parseCvDefinitionFile } from './parseCvDefinition'
import { generateCvDefinitionsTs } from './generateCvDefinitionsTs'
import { parseCvConfigFile } from './parseCvConfig'
import { parseCurves } from './parseCurves'
import { generateEnumTs } from './generateEnumTs'
import { generateCurveUsageList } from './generateCurveUsageList'
import { generateApiForCpp, generateApiHForCpp } from "./generateApiForCpp";
import fs from "fs";

const writeToFile = (path: string, contents: string) => {
    console.log(`writing ${contents.length} bytes to ${path}`)
    fs.writeFileSync(path, contents)
}

const gitRoot = '/Users/joakim/git/xonik'
const cppVoiceRoot = `${gitRoot}/xm8-voice-controller/xm8-voice-controller/`
const cppMainRoot = `${gitRoot}/xm8-main-controller/`

const jsRoot = `${gitRoot}/synth-gui-react`
const scriptRoot = `${jsRoot}/utils/midiRPC`
const jsMidiRoot = `${jsRoot}/src/midi/rpc/`

// Functions that can be called on the voice controllers
const voiceHeaderContents = fs.readFileSync(`${cppVoiceRoot}src/midiRPC/midiRPCFunctions.h`, { encoding: 'utf8', flag: 'r' })
const voiceFuncs = parseCppHeaderFile(voiceHeaderContents)

// Functions that can be called on the main controller
const mainHeaderContents = fs.readFileSync(`${cppMainRoot}src/midiRPC/midiRPCFunctions.h`, { encoding: 'utf8', flag: 'r' })
const mainFuncs = parseCppHeaderFile(mainHeaderContents)

console.log(mainFuncs)

const funcs = [...voiceFuncs, ...mainFuncs]

const cvPinsContents = fs.readFileSync(`${cppVoiceRoot}src/physical/cv/cvPins.h`, { encoding: 'utf8', flag: 'r' })
const cvs = parseCvDefinitionFile(cvPinsContents)

const cvConfigContents = fs.readFileSync(`${cppVoiceRoot}src/physical/cv/cvConfig.h`, { encoding: 'utf8', flag: 'r' })
const cvCount = parseCvConfigFile(cvConfigContents)

const curveContents = fs.readFileSync(`${cppVoiceRoot}/curves.h`, { encoding: 'utf8', flag: 'r' })
const curveEnums = parseCurves(curveContents)

// Receivers on the voice and main controllers
writeToFile(`${cppVoiceRoot}src/midiRPC/generated/midiRPCDeserializer.cpp`, generateMidiRPCDeserializer(voiceFuncs, 0))
writeToFile(`${cppMainRoot}src/midiRPC/generated/midiRPCDeserializer.cpp`, generateMidiRPCDeserializer(mainFuncs, voiceFuncs.length))

// Stubs in the TypeScript code for calling functions on the main and voice controllers
writeToFile(`${jsMidiRoot}api.ts`, generateApiTs(funcs))

// Stubs on the main controller for calling functinons on the voice controllers
writeToFile(`${cppMainRoot}src/midiRPC/generated/api.cpp`, generateApiForCpp(voiceFuncs))
writeToFile(`${cppMainRoot}src/midiRPC/generated/api.h`, generateApiHForCpp(voiceFuncs))

// An enum of all functions available, both on main and voice cards
writeToFile(`${jsMidiRoot}functionNames.ts`, generateFunctionNamesEnumTs(
    funcs.map(
        (func, index) => ({...func, index})
    )
))
writeToFile(`${jsRoot}/src/controller/settings/CvDefinitions.ts`, generateCvDefinitionsTs(cvs, cvCount))
writeToFile(`${jsRoot}/src/synthcore/modules/lfo/generatedTypes.ts`, generateCurveUsageList(curveEnums.enum, curveEnums.lfo, '../..'))
writeToFile(`${jsRoot}/src/synthcore/modules/env/generatedTypes.ts`, generateCurveUsageList(curveEnums.enum, curveEnums.env, '../..'))
writeToFile(`${jsRoot}/src/controller/settings/generatedTypes.ts`, generateCurveUsageList(curveEnums.enum, curveEnums.cvmaps, '../../synthcore'))
writeToFile(`${jsRoot}/src/synthcore/generatedTypes.ts`, generateEnumTs(curveEnums.enum))

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
