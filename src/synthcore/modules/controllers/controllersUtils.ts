import deepmerge from 'deepmerge'
import { Controllers } from './types'

export const mergeControllers = (controllers: Controllers[]) => controllers.reduce((acc, controller) => {
    return deepmerge(acc, controller)
},{})