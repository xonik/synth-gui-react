import {
    ControllerId,
} from '../synthcore/modules/controllers/controllerIds'

export enum MidiGroup {
    ENV,
    LFO,
}

export interface ControllerConfig {
    // ID is uniquely identifying a controller TYPE, but some controllers may be repeated
    // as params on multiple functions LFOs and Envs - params on these have the same
    // controllerId and ctrlIndex on the function is used to tell them apart.
    readonly id: ControllerId,
    readonly label: string,
    readonly shortLabel?: string,
    readonly isSourceDigi?: boolean,
    readonly isDstDigi?: boolean,
    readonly type: ControllerType

    // Funcs to use if pots should behave differently from stored/midi value
    readonly uiResponse?: { output: (val: number, bipolar?: boolean) => number, input: (val: number, bipolar?: boolean) => number}

    // TODO: Only for ControllerConfigCC and ControllerConfigButton but here because TS complains!
    readonly values?: number[]
    readonly bipolar?: boolean

    // used for special functions that may require a ctrlIndex to be sent before the actual controller, such as
    // envelope values.
    readonly midiGroup?: MidiGroup

    readonly legalValueIndexes?: number[]

    // If global, the controller does not follow the voice group, only a single value is used across voices.
    readonly global?: boolean
}

export interface ControllerConfigButton extends ControllerConfig {
    readonly values: number[]
}


export interface ControllerConfigCC extends ControllerConfig {
    readonly cc: number
}

export interface ControllerConfigNRPN extends ControllerConfig {
    readonly addr: number
    readonly bipolar?: boolean
}

export interface ControllerConfigNRPNWithValue extends ControllerConfigNRPN {
    readonly values: number[]
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