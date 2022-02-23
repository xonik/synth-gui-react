import deepmerge from 'deepmerge'
import { Controllers, ValueIndexedControllers } from './types'

export const mergeValueIndexedControllers = (controllers: ValueIndexedControllers[]) => controllers.reduce((acc, controller) => {
    return deepmerge(acc, controller)
},{})

export const mergeControllers = (controllers: Controllers[]) => controllers.reduce((acc, controller) => {
    return deepmerge(acc, controller)
},{})