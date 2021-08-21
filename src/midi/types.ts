import { ControllerId } from './controllerIds'

export interface ControllerConfig {
    // ID is uniquely identifying a controller TYPE, but some controllers may be repeated
    // as params on multiple functions LFOs and Envs - params on these have the same
    // controllerId and ctrlIndex on the function is used to tell them apart.
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
    // this is only set if there are more than one instance of a controller, such as
    // LFOs and Envs - params on these have the same controllerId and ctrlIndex is
    // used to tell them apart. This makes it possible to fit the controllerIds of
    // modulatable controllers within 127 entries which is needed for controllerId
    // to be sent as a single CC value.
    ctrlIndex?: number
}

export type ControllerType = 'pot' | 'button' | 'output'