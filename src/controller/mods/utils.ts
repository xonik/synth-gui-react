import { controllerDefs } from '../../synthcore/controllers'

export const getModTargets = () => {
    const targets = Object.entries(controllerDefs).filter((group) => {
        Object.entries(group.funcs).find((func))
    })
}