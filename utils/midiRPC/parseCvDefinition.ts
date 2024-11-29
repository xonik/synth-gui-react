import { CvDefinition, DataType, isDataType, KNOWN_DATATYPES } from './dataTypes'

export const parseCvDefinitionFile = (file: string): CvDefinition[] => {
    const lines = file.split('\n')

    const cvs: CvDefinition[] = []
    lines.forEach((line: string) => {
        const foundCv = parseLine(line)
        if(foundCv) cvs.push(foundCv)
    })

    cvs.sort((a, b) => {
        if(a.description < b.description) {
            return -1
        }
        return 1
    })

    return cvs
}

const cvRegex = new RegExp(`^#define \(CV_[A-Z_0-9]+\) \([0-9]+\) // \([0-9a-zA-Z ]+\)`)

const parseLine = (line: string): CvDefinition | undefined => {
    if (line.length > 0) {
        const trimmed = line.trim()
        console.log(trimmed)
        const match = trimmed.match(cvRegex)
        if (!match) return
        const [, name, channel, description] = match

        return {
            name, channel: Number.parseInt(channel), description
        }
    }
}