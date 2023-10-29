import { findEnums } from './enumParser'
import { EnumDef, EnumDefWithTargets } from './dataTypes'
import { values } from 'lodash'

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

const getFilteredEnum = (enumDef: EnumDefWithTargets, key: string) => {
    console.log('entry', enumDef.values)
    let val = 0;
    const newVals = enumDef.values
        .filter((entry) => entry.targets.indexOf(key) > -1)
        .map((entry) => {

            // Removes value where we don't need to explicitly print it in code
            let newValue = undefined
            if(entry.value !== undefined && entry.value != val) {
                newValue = entry.value
                val = entry.value
            }
            val++
            return {
                ...entry,
                value: newValue
            }
        })

    return {
        ...enumDef,
        values: newVals
    }
}


export const parseCurves = (file: string) => {
    const lines = file.split('\n')

    const enums = findEnums(lines)
    const curvesEnum = enums.find(({ name }) => name === 'Curve')
    if(!curvesEnum) throw Error('Cannot find curve enum in h file')

    const enumWithTargets = appendData(curvesEnum)
    return {
        lfoEnum: getFilteredEnum(enumWithTargets, 'LFO'),
        envEnum: getFilteredEnum(enumWithTargets, 'ENV'),
        cvEnum: getFilteredEnum(enumWithTargets, 'CVMAPS')
    }
}