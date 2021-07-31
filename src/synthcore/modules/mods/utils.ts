import { ControllerConfig, FuncProps } from '../../../midi/types'
import { controllerGroups } from '../../../midi/controllers'

const getTargets = () => {

    type Func = ControllerConfig[]
    type Group = Func[];

    const modTargets: Group[] = []
    const modTargetGroupLabels: string[] = []
    const modTargetFuncProps: FuncProps[][] = []

    Object.values(controllerGroups).forEach((group) => {
        const funcs: Func[] = []
        const funcProps: FuncProps[] = []
        Object.values(group).forEach((func) => {
            const params: ControllerConfig[] = []
            Object.values(func).forEach((param) => {
                const controller = param as ControllerConfig
                if (controller.isTargetDigi) {
                    params.push(controller)
                }
            })
            if (params.length > 0) {
                funcs.push(params)
                funcProps.push(func.props)
            }
        })
        if (funcs.length > 0) {
            modTargets.push(funcs)
            modTargetGroupLabels.push(group.label)
            modTargetFuncProps.push(funcProps)
        }
    })

    return {
        targets: modTargets,
        groupLabels: modTargetGroupLabels,
        funcProps: modTargetFuncProps
    }
}

const getSources = () => {
    const sources: ControllerConfig[] = []
    Object.values(controllerGroups).forEach((group) => {
        Object.values(group).forEach((func) => {
            Object.values(func).forEach((param) => {
                const controller = param as ControllerConfig
                if (controller.isSourceDigi) {
                    sources.push(controller)
                }
            })
        })
    })
    return sources
}

export const modTarget = getTargets()
export const digitalModSources = getSources()