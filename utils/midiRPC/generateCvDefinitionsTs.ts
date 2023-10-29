import { CvDefinition, EnumDefWithTargets, EnumValueWithTargets } from './dataTypes'

export function generateCvDefinitionsTs(cvs: CvDefinition[], curveEnum: EnumDefWithTargets, cvCount: number){
    let curveKey = 0;
    const curveValues = curveEnum.values.map((entry) => {
        const value = entry.value !== undefined ? entry.value : curveKey
        curveKey = value + 1
        return `  {label: '${entry.description}', value: ${value}}`
    })

    return `// GENERATED FILE, DO NOT EDIT
// Cv definitions
export type CvDefinition = {
  name: string,
  channel: number,
  description: string,
}

export const CvCurves = [
${curveValues.join(', \n')}                
]

export const CV_CHANNELS = ${cvCount} // get from c++

export const CVs: CvDefinition[] = ${JSON.stringify(cvs, undefined, 2)}
`
}