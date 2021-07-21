export interface MidiConfig {
    readonly label: string,
    readonly isSourceDigi?: boolean,
    readonly isTargetDigi?: boolean,
    readonly type: ControllerType
    readonly values?: number[]
}

export interface MidiConfigCC extends MidiConfig {
    readonly cc: number
}

export interface MidiConfigCCWithValue extends MidiConfigCC {
    readonly values: number[]
}

export interface MidiConfigNRPN extends MidiConfig {
    readonly addr: number
}

export interface FuncProps {
    label: string
}

export type ControllerType = 'pot' | 'button'