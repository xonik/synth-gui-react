import type { Func } from './types'

type FuncWithIndex = Func & { index: number }

export function generateFunctionNamesEnumTs(funcs: FuncWithIndex[]) {
    return `// GENERATED FILE, DO NOT EDIT
// shared ids for RPC commands
export enum FunctionNames {
  ${funcs.map((func) => `${func.name} = ${func.index}`).join(',\n  ')}
}
`
}

export function generateFunctionNamesEnumCpp(funcs: FuncWithIndex[]) {
    return `    // shared ids for RPC commands
    enum FunctionNames {
        ${funcs.map((func) => `${func.name}Id = ${func.index}`).join(',\n        ')}
    };
`
}
