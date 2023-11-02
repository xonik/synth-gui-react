import { findEnums } from './enumParser'
import { EnumDef, EnumDefWithTargets } from './dataTypes'
const parseComment = (comment: string | undefined) => {
    if(!comment) {
        return {
            targets: [],
            description: ''
        }
    }

    const matches = comment.trim().match(/(\[(.*)\])?(.*)/)
    if(!matches) {
        return {
            targets: [],
            description: ''
        }
    }

    const targets = matches[2]?.split(',').map((entry) => entry.trim())
    const description = matches[3]?.trim()
    return {
        targets: targets || [],
        description
    }
}

const appendData = (enumDef: EnumDef): EnumDefWithTargets => {
    const newValues = enumDef.values.map((entry) => {
        return {
            ...entry,
            ...parseComment(entry.comment)
        }
    })
    return {
        ...enumDef,
        values: newValues
    }
}

const getFilteredValues = (enumDef: EnumDefWithTargets, key: string) => {
    console.log('entry', enumDef.values)
    return enumDef.values
        .filter((entry) => entry.targets.indexOf(key) > -1)
}


export const parseCurves = (file: string) => {
    const lines = file.split('\n')

    const enums = findEnums(lines)
    const curvesEnum = enums.find(({ name }) => name === 'Curve')
    if(!curvesEnum) throw Error('Cannot find curve enum in h file')

    const enumWithTargets = appendData(curvesEnum)
    return {
        enum: curvesEnum,
        lfo: getFilteredValues(enumWithTargets, 'LFO'),
        env: getFilteredValues(enumWithTargets, 'ENV'),
        cvmaps: getFilteredValues(enumWithTargets, 'CVMAPS'),
    }
}