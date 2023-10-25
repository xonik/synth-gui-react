import { CvDefinition } from './dataTypes'

export function generateCvDefinitionsTs(cvs: CvDefinition[], cvCount: number){
    return `// GENERATED FILE, DO NOT EDIT
// Cv definitions
export type CvDefinition = {
  name: string,
  channel: number,
  description: string,
}
export const CV_CHANNELS = ${cvCount} // get from c++

export const CVs: CvDefinition[] = ${JSON.stringify(cvs, undefined, 2)}
`
}