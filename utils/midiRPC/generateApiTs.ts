import { dataTypeMap, type Func } from './types'

export function generateApiTs(funcs: Func[]) {
    return `// GENERATED FILE, DO NOT EDIT
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

${funcs.map(functionMapper).join('\n\n')}
`
}

const functionMapper = (func: Func) => {
    const params = func.params.map(({ name, type }) => `${name}: ${dataTypeMap[type].jsType}`)
    const paramBytes = func.params.map(({ name, type }) => `...jsToMidiEncoder['${type}'](${name})`)
    const paramList = `${params.join(', ')}${params.length > 0 ? ', ' : ''}voice: number = VOICE_ALL`

    const paramBytesBlock = `    const paramBytes: number[] = [
      ${paramBytes.join(',\n      ')}
    ]`

    if (func.returnType === 'void') {
        const dataItems = [
            `...splitTo7(FunctionNames.${func.name}, 14)`,
            '...paramBytes',
        ]
        return `export function ${func.name}(${paramList}) {
  call('${func.name}', () => {
${paramBytesBlock}
    const data = [
      ${dataItems.join(',\n      ')},
    ]
        sendSysex(resolveRoutingTarget(voice), sysexCommands.RPC, data)
  })
}`
    }

    const jsType = dataTypeMap[func.returnType].jsType
    const dataItems = [
        `...splitTo7(FunctionNames.${func.name}, 14)`,
        '...splitTo7(id, 14)',
        '...paramBytes',
    ]
    return `export function ${func.name}(${paramList}): Promise<${jsType}> {
  return callWithReturn<${jsType}>('${func.name}', (id) => {
${paramBytesBlock}
    const data = [
      ${dataItems.join(',\n      ')},
    ]
    sendSysex(resolveRoutingTarget(voice), sysexCommands.RPC, data)
  }, '${func.returnType}')
}`
}
