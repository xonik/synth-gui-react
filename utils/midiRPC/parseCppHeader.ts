import { type DataType, isDataType, KNOWN_DATATYPES } from './dataTypes'
import type { Func } from './types'
import type { Route } from "../../src/midi/midibus";

export const parseCppHeaderFile = (file: string, defaultRoute: Route) => {
    const lines = file.split('\n')

    const funcs: Func[] = []
    lines.forEach((line: string) => {
        const foundFunc = parseLine(line)
        if (foundFunc) funcs.push({ ...foundFunc, defaultRoute })
    })
    console.log(lines)
    return funcs
}

const funcRegex = new RegExp(`^\\s*(${KNOWN_DATATYPES.join('|')})\\s([a-zA-Z0-9]+)\\((.*)\\);\\s*(//)?\\s*(.*)`)

function getTargetsFromComment(comment?: string): string[] {
    if (!comment) {
        return []
    }
    return comment.split(',').map((target) => target.trim())
}

const parseLine = (line: string) => {
    if (line.length > 0) {
        const trimmed = line.trim()
        const match = trimmed.match(funcRegex)
        if (!match) return
        const [, returnType, name, paramList, _c1, comment] = match

        if (!isDataType(returnType)) {
            throw new Error(`${name}: ${returnType} is an unknown datatype`)
        }

        let params: { type: DataType; name: string }[] = []
        if (paramList.length > 0) {
            params = paramList.split(',').map((param) => {
                const [paramType, paramName] = param.trim().split(' ')
                if (!isDataType(paramType.trim())) {
                    throw new Error(`${name}: ${paramType.trim()} is an unknown datatype`)
                }
                return {
                    type: paramType.trim() as DataType,
                    name: paramName.trim(),
                }
            })
        }

        const targets = getTargetsFromComment(comment)

        return {
            name,
            returnType,
            params,
            targets,
        }
    }
}
