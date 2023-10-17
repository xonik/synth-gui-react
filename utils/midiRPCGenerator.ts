import controllers from '../src/synthcore/modules/controllers/controllers'
import { buttonLeftMidiValues } from '../src/midi/buttonLeftMidiValues'
import { buttonCenterMidiValues } from '../src/midi/buttonCenterMidiValues'
import { buttonRightMidiValues } from '../src/midi/buttonRightMidiValues'
import {
    ControllerIdDst,
    ControllerIdEnvDst,
    ControllerIdEnvNonMod,
    ControllerIdEnvStageNonMod,
    ControllerIdIntermediate,
    ControllerIdLfoDst,
    ControllerIdLfoNonMod,
    ControllerIdLfoStageNonMod,
    ControllerIdNonMod,
    ControllerIdNonModPots,
    ControllerIdSrc, DST_COUNT, DST_ENV_COUNT,
    DST_LFO_COUNT,
    ENV_NON_MOD_COUNT,
    ENV_STAGE_NON_MOD_COUNT,
    FIRST_DST,
    FIRST_ENV_DST,
    FIRST_INTERMEDIATE,
    FIRST_LFO_DST,
    FIRST_NON_MOD,
    FIRST_NON_MOD_POTS,
    INT_COUNT,
    LFO_NON_MOD_COUNT,
    LFO_STAGE_NON_MOD_COUNT,
    NON_MOD_COUNT,
    NON_MOD_POTS_COUNT,
    SRC_COUNT
} from '../src/synthcore/modules/controllers/controllerIds'
import { cToJsDataTypeMap, DataType, isDataType, jsToMidiEncoder, KNOWN_DATATYPES } from '../src/midi/rpc/dataTypes'

const fs = require('fs')

const cppRoot = '/Users/joakim/git/xonik/xm8-voice-controller/xm8-voice-controller/'
const jsRoot = '/Users/joakim/git/xonik/synth-gui-react/src/midi/rpc/'

const readMidiRPCHeaderFile = () => {
    const path = `${cppRoot}/midiRPC.h`
    const file = fs.readFileSync(path, { encoding: 'utf8', flag: 'r' })
    const lines = file.split('\n')

    lines.forEach((line: string) => {
        parseLine(line)
    })
    console.log(lines)
}

type Function = {
    name: string,
    returnType: DataType,
    params: {
        name: string,
        type: DataType,
    }[]
}

const funcRegex = new RegExp(`^\\s*(${KNOWN_DATATYPES.join('|')})\\s([a-zA-Z0-9]+)\\((.*)\\)`)

let functions: Function[] = []

const parseLine = (line: string) => {
    if (line.length > 0) {
        const trimmed = line.trim()
        const match = trimmed.match(funcRegex)
        if (match) {
            const [, returnType, name, paramList] = match

            if(!isDataType(returnType)){
                throw new Error(`${name}: ${returnType} is an unknown datatype`)
            }

            let params: { type: DataType, name: string }[] = []
            if (paramList.length > 0) {
                params = paramList
                    .split(',')
                    .map((param) => {
                        const [paramType, paramName] = param.trim().split(' ')
                        if(!isDataType(paramType.trim())){
                            throw new Error(`${name}: ${paramType.trim()} is an unknown datatype`)
                        }
                        return {
                            type: paramType.trim() as DataType,
                            name: paramName.trim()
                        }
                    })
            }
            functions.push({
                name, returnType, params
            })
        }
    }
}

const getAsJsFunction = (func: Function) => {
    const params = func.params.map(({ name, type }) => `${name}: ${cToJsDataTypeMap[type]}`)

    const paramBytes = func.params.map(({ name, type }) => `...jsToMidiEncoder['${type}'](${name})`)

    const functionHeader = `function ${func.name}(${params.join(', ')}) {`

    return `${functionHeader}
  const paramBytes: number[] = [
    ${paramBytes.join(',\n    ')}
  ]
  const data = [
    CommandNames.${func.name},
    ...paramBytes,
  ]
  logger.midi('RPC call to ${func.name}')
  sendSysex(sysexCommands.RPC, data)  
}`
}

readMidiRPCHeaderFile()


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
console.log(functions.map(getAsJsFunction).join('\n\n'))

const funcsTs = `// js-to-midi RPC wrapper
import logger from '../../utils/logger'
import { jsToMidiEncoder } from './dataTypes'
import { CommandNames } from './commandNames'
import { sendSysex, sysexCommands } from '../midibus'

${functions.map(getAsJsFunction).join('\n\n')}
`
const commandNamesTs = `// shared ids for RPC commands
export enum CommandNames {
  ${functions.map((func) => func.name).join(',\n  ')}
}
`


writeToFile(`${jsRoot}/api.ts`, funcsTs)
writeToFile(`${jsRoot}/commandNames.ts`, commandNamesTs)