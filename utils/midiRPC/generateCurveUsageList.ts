import { EnumDef, EnumDefWithTargets, EnumValue, EnumValueWithTargets } from './dataTypes'

export function generateCurveUsageList(enumDef: EnumDefWithTargets | EnumDef, values: (EnumValue | EnumValueWithTargets)[], curveFilePath: string) {

    return `// GENERATED FILE, DO NOT EDIT
import { Curve } from '${curveFilePath}/generatedTypes'    
    
export const curveValuesUsed = [ 
${values.map((val) => `  ${enumDef.name}.${val.name},`).join('\n')}
]
`
}
