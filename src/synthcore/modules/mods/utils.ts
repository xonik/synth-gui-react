import { ControllerConfig, FuncProps } from '../../../midi/types'
import { controllerGroups } from '../controllers/controllers'

export const shortLabel = (element: ControllerConfig | FuncProps) => element.shortLabel || element.label

const getDsts = () => {

    type Func = ControllerConfig[]
    type Group = Func[];

    const modDsts: Group[] = []
    const modDstGroupLabels: string[] = []
    const modDstFuncProps: FuncProps[][] = []

    Object.values(controllerGroups).forEach((group) => {
        const funcs: Func[] = []
        const funcProps: FuncProps[] = []
        Object.values(group).forEach((func) => {
            const params: ControllerConfig[] = []
            Object.values(func).forEach((param) => {
                const controller = param as ControllerConfig
                if (controller.isDstDigi) {
                    params.push(controller)
                }
            })
            if (params.length > 0) {
                funcs.push(params)
                funcProps.push(func.props)
            }
        })
        if (funcs.length > 0) {
            modDsts.push(funcs)
            modDstGroupLabels.push(group.label)
            modDstFuncProps.push(funcProps)
        }
    })

    return {
        dsts: modDsts,
        groupLabels: modDstGroupLabels,
        funcProps: modDstFuncProps
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

export const modDst = getDsts()
export const digitalModSources = getSources()