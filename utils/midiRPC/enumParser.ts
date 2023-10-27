import { KNOWN_DATATYPES } from './dataTypes'

const splitCodeAndComment = (line: string) => {
    const split = line.split('//')
    if(split.length == 1) {
        return {
            code: line.trim()
        }
    } else if(split.length == 2) {
        return {
            code: split[0].trim(),
            comment: split[1].trim(),
        }
    } else {
        return {
            code: split[0].trim(),
            comment: split.slice(1).join('//').trim(),
        }
    }
}

const parseEnumStart = (line: string): EnumStart | undefined => {
    const { code, comment } = splitCodeAndComment(line)
    const match = code.match(/^\s*enum\s+([a-zA-Z0-9_]+).*/)
    if(match) {
        return {
            name: match[1],
            comment,
        }
    }

    return undefined
}

const parseEnumValue = (line: string): EnumValue | undefined => {
    const { code, comment } = splitCodeAndComment(line)

    const match = code.match(/([a-zA-Z0-9_]+)(\s*=\s*([0-9]+))?/)
    console.log(line, comment,match)
    if(match) {
        return {
            name: match[1],
            value: match[3] ? Number.parseInt(match[3]) : undefined,
            comment,
        }
    }

    return undefined
}

const isEnumEnd = (line: string): boolean => {
    const { code, comment } = splitCodeAndComment(line)

    const match = code.match(/^\s*};.*/)
    return Boolean(match)
}


type EnumStart = {
    name: string,
    comment: string | undefined,
}

type EnumValue = {
    name: string,
    value: number | undefined,
    comment: string | undefined,
}

type EnumDef = {
    name: string,
    comment: string| undefined
    values: EnumValue[]
}

export const findEnums = (lines: string[]) => {
    let insideEnum = false;
    let enumStart;
    let enumValues: EnumValue[] = []
    let enums: EnumDef[] = []
    for(let i = 0; i<lines.length; i++){
        const line = lines[i];
        if(!insideEnum){
            enumStart = parseEnumStart(line)
            if(enumStart){
                insideEnum = true;
            }
        } else {
            if(isEnumEnd(line)){
                enums = [
                    ...enums,
                    {
                        name: enumStart?.name || '',
                        comment: enumStart?.comment,
                        values: enumValues
                    }
                ]

                insideEnum = false;
                enumValues = [];
                console.log(enums)
            } else {
                const enumValue = parseEnumValue(line)
                console.log(enumValue)
                if(enumValue) enumValues.push(enumValue)
            }
        }
    }
    return enums;
}