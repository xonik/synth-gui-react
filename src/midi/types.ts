export interface MidiConfig {
    readonly type: ControllerType
    readonly cc: number
    readonly values?: number[]
}

export interface MidiConfigWithValue extends MidiConfig {
    readonly type: ControllerType
    readonly cc: number
    readonly values: number[]
}

export type ControllerType = 'pot' | 'button'