/**
 * Core types for the new Zustand-based state management.
 *
 * Key design decisions:
 * - Named keys instead of numeric indices for human-readable patch serialization
 * - Separate patch state (serialized) from UI state (transient)
 * - Per-voice-group stores instead of one giant nested Redux store
 * - Response mappers applied at read time via hooks, not stored as dual state
 */

export type { Curve } from '../synthcore/generatedTypes'
// Re-export existing enums that are still valid
export { StageId } from '../synthcore/modules/env/types'

/**
 * Source of a state change — used to prevent MIDI feedback loops
 * and to distinguish load vs live edits.
 */
export enum ChangeSource {
    UI = 'ui',
    MIDI = 'midi',
    LOAD = 'load',
    INTERNAL = 'internal',
}

/**
 * A response mapper transforms between the raw stored value and the
 * display/UI value. For example, exponential time curves or dB level curves.
 *
 * - output: raw store value → display value (what the knob position shows)
 * - input: display value → raw store value (inverse)
 */
export interface ResponseMapper {
    output: (value: number, bipolar?: boolean) => number
    input: (value: number, bipolar?: boolean) => number
}

/**
 * Metadata for a controller parameter. This replaces the old ControllerConfig
 * for purposes of the new store, while the old ControllerConfig remains in use
 * for the MIDI layer.
 */
export interface ParamConfig {
    /** Human-readable key used in the store and in patch files */
    key: string
    /** Display label */
    label: string
    /** Whether the value range is -1 to 1 (true) or 0 to 1 (false) */
    bipolar?: boolean
    /** Optional response mapper for non-linear UI display */
    responseMapper?: ResponseMapper
    /** Number of discrete values for button-type params (undefined = continuous) */
    values?: number
}
