export interface MidiConfigCC {
    readonly type: ControllerType
    readonly cc: number
    readonly values?: number[]
}

export interface MidiConfigCCWithValue extends MidiConfigCC {
    readonly type: ControllerType
    readonly cc: number
    readonly values: number[]
}

export interface MidiConfigCmd {
    readonly type: ControllerType
    readonly cmd: number
    readonly values?: number[]
}

export interface MidiConfigNRPN {
    readonly type: ControllerType
    readonly addr: number
    readonly values?: number[]
}

export type ControllerType = 'pot' | 'button'