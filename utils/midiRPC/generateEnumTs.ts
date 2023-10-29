import { EnumDef, EnumDefWithTargets, EnumValue, EnumValueWithTargets } from './dataTypes'

export function generateEnumTs(enumDef: EnumDefWithTargets | EnumDef) {

    return `// GENERATED FILE, DO NOT EDIT
${enumDef.comment ? '// ' + enumDef.comment : ''}
export enum ${enumDef.name} { 
${enumDef.values.map((val) => `  ${getVal(val)}, ${getComment(val)}`).join('\n')}
}
`
}

const getVal = (value: EnumValue | EnumValueWithTargets) => {
    if(value.value !== undefined){
        return `${value.name} = ${value.value}`
    }
    return value.name
}

const getComment = (value: EnumValue | EnumValueWithTargets) => {
    if('description' in value) {
        return `// ${value.description}`
    } else if(value.comment !== undefined) {
        return `// ${value.comment}`
    } else {
        return ''
    }
}
