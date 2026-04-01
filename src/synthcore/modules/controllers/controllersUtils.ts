import deepmerge from 'deepmerge'
import type { ControllerConfig } from '@/midi/types'
import type { Controllers } from './types'

export const mergeControllers = (controllers: Controllers[]): Controllers =>
    controllers.reduce((acc, controller) => {
        return deepmerge(acc, controller)
    }, {})

export const getDefaultController = (ctrl: ControllerConfig, value: number): Controllers => {
    return {
        0: {
            [ctrl.id]: [value],
        },
    }
}
