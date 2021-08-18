import { ControllerId } from './controllerIds'

export interface ControllerConfig {
    readonly id: ControllerId,
    readonly label: string,
    readonly shortLabel?: string,
    readonly isSourceDigi?: boolean,
    readonly isTargetDigi?: boolean,
    readonly type: ControllerType
    readonly values?: number[]
}

export interface ControllerConfigCC extends ControllerConfig {
    readonly cc: number
}

export interface ControllerConfigCCWithValue extends ControllerConfigCC {
    readonly values: number[]
}

export interface ControllerConfigNRPN extends ControllerConfig {
    readonly addr: number
}

export interface FuncProps {
    label: string
    shortLabel?: string
    ctrlIndex?: number
}

export type ControllerType = 'pot' | 'button' | 'output'