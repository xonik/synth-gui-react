import { Func } from './types'

export function generateFunctionNamesTs(funcs: Func[]){
    return `// GENERATED FILE, DO NOT EDIT
// shared ids for RPC commands
export enum FunctionNames {
  ${funcs.map((func, index) => func.name).join(',\n  ')}
}
`
}

export function generateFunctionNamesCpp(funcs: Func[]){
    return `// shared ids for RPC commands
  enum FunctionNames {
    ${funcs.map((func) => `${func.name}Id`).join(',\n    ')}
  };
`
}
