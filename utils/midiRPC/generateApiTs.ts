import { dataTypeMap, Func } from './types'

export function generateApiTs(funcs: Func[]) {
    return `// GENERATED FILE, DO NOT EDIT
// js-to-midi RPC wrapper
import logger from '../../utils/logger'
import { jsToMidiEncoder } from './serializer'
import { FunctionNames } from './functionNames'
import { sendSysex, sysexCommands } from '../midibus'

${funcs.map(functionMapper).join('\n\n')}
`
}

const functionMapper = (func: Func) => {
    const params = func.params.map(({ name, type }) => `${name}: ${dataTypeMap[type].jsType}`)
    const paramBytes = func.params.map(({ name, type }) => `...jsToMidiEncoder['${type}'](${name})`)
    const functionHeader = `export function ${func.name}(${params.join(', ')}) {`

    return `${functionHeader}
  const paramBytes: number[] = [
    ${paramBytes.join(',\n    ')}
  ]
  const data = [
    FunctionNames.${func.name},
    ...paramBytes,
  ]
  logger.midi('RPC call to ${func.name}')
  sendSysex(sysexCommands.RPC, data)  
}`
}