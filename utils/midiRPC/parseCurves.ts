import { findEnums } from './enumParser'

const parseComment = (comment: string) => {
    const matches = comment.trim().match(/(\[(.*)\])?(.*)/)
    if(!matches) return

    const targets = matches[1]?.split(',').map((entry) => entry.trim())
    const description = matches[3]?.trim()
    return {
        targets,
        description
    }
}

export const parseCurves = (file: string) => {
    const lines = file.split('\n')

    const enums = findEnums(lines)
    const curvesEnum = enums.find(({ name }) => name === 'Curves')
    if(!curvesEnum) return

    const lfoEnums = curvesEnum.values.forEach((value) => {
        if(value.comment){
            console.log(parseComment(value.comment))
        }
    })


}