import { ControllerIdDst, ControllerIdEnvDst, ControllerIdIntermediate, ControllerIdLfoDst, ControllerIdNonMod, ControllerIdSrc } from './controllerIds'

export interface ControllerConfig {
    // ID is uniquely identifying a controller TYPE, but some controllers may be repeated
    // as params on multiple functions LFOs and Envs - params on these have the same
    // controllerId and ctrlIndex on the function is used to tell them apart.
    readonly id: ControllerIdSrc | ControllerIdIntermediate | ControllerIdDst | ControllerIdEnvDst | ControllerIdLfoDst | ControllerIdNonMod,
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

// pot: Variable value
// button: Fixed value set
// output: Output of a function such as env or LFO
// com: Communication only, not mapped to any physical controller or modulation source
export type ControllerType = 'pot' | 'button' | 'output' | 'com'