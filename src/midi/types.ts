export interface ControllerConfig {
    readonly label: string,
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
    isSourceDigi?: boolean,
}

export type ControllerType = 'pot' | 'button'