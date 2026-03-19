/**
 * Hooks for connecting UI components to the Zustand stores.
 *
 * These replace the old pattern of:
 *   dispatch(increment) → middleware → ControllerHandler → dispatch(setController) + MIDI
 *
 * New pattern:
 *   usePot() returns { displayValue, set } where set() writes to store,
 *   and MIDI send happens via store subscription (set up separately).
 *   Display value is derived via useMemo, eliminating the dual uiControllers state.
 */

import { useMemo, useCallback } from 'react'
import { useVoiceGroupStore, voiceGroupStores, PatchStore } from './patchStore'
import { useUiStore } from './uiStore'
import type { ResponseMapper } from './types'

/**
 * Get a value from the current voice group's patch store by path.
 * The path is a dot-separated string matching the store shape.
 *
 * Example: usePatchValue('envelopes.0.stages.attack.time')
 */
export function usePatchValue(path: string): number {
    const voiceGroupIndex = useUiStore((s) => s.currentVoiceGroupIndex)
    return useVoiceGroupStore(voiceGroupIndex, (state) => {
        return getAtPath(state, path)
    })
}

/**
 * Hook for connecting a potentiometer to the patch store.
 *
 * Returns:
 * - displayValue: the value after applying the response mapper (for UI display)
 * - rawValue: the actual stored value
 * - set: function to write a new display value (inverse-mapped back to raw)
 * - increment: function to increment the display value by a delta
 *
 * The response mapper is applied via useMemo — no dual state needed.
 */
export function usePot(
    path: string,
    options?: {
        responseMapper?: ResponseMapper
        bipolar?: boolean
    }
) {
    const voiceGroupIndex = useUiStore((s) => s.currentVoiceGroupIndex)
    const rawValue = useVoiceGroupStore(voiceGroupIndex, (state) => {
        return getAtPath(state, path)
    })

    const { responseMapper, bipolar } = options ?? {}

    // Derive the display value from the raw value — replaces uiControllers
    const displayValue = useMemo(() => {
        if (responseMapper) {
            return responseMapper.input(rawValue, bipolar)
        }
        return rawValue
    }, [rawValue, responseMapper, bipolar])

    const set = useCallback((newDisplayValue: number) => {
        const bounded = getBounded(newDisplayValue, bipolar ? -1 : 0, 1)
        const rawValue = responseMapper
            ? responseMapper.output(bounded, bipolar)
            : bounded
        voiceGroupStores[voiceGroupIndex].getState().setParam(path, rawValue)
    }, [voiceGroupIndex, path, responseMapper, bipolar])

    const increment = useCallback((delta: number) => {
        const newDisplay = getBounded(
            displayValue + delta,
            bipolar ? -1 : 0,
            1
        )
        const rawValue = responseMapper
            ? responseMapper.output(newDisplay, bipolar)
            : newDisplay
        voiceGroupStores[voiceGroupIndex].getState().setParam(path, rawValue)
    }, [voiceGroupIndex, path, displayValue, responseMapper, bipolar])

    return { displayValue, rawValue, set, increment }
}

/**
 * Hook for connecting a button to the patch store.
 *
 * Returns:
 * - value: current button value (index into the button's value set)
 * - toggle: cycle to next value
 * - set: set to a specific value
 */
export function useButton(
    path: string,
    numValues: number,
    options?: { loop?: boolean }
) {
    const voiceGroupIndex = useUiStore((s) => s.currentVoiceGroupIndex)
    const value = useVoiceGroupStore(voiceGroupIndex, (state) => {
        return getAtPath(state, path)
    })

    const loop = options?.loop ?? true

    const toggle = useCallback(() => {
        const store = voiceGroupStores[voiceGroupIndex].getState()
        const current = getAtPath(store, path)
        if (numValues === 1) {
            // Momentary: always send 0
            store.setParam(path, 0)
        } else if (loop) {
            store.setParam(path, (current + 1) % numValues)
        } else {
            const next = current + 1
            if (next < numValues) {
                store.setParam(path, next)
            }
        }
    }, [voiceGroupIndex, path, numValues, loop])

    const set = useCallback((newValue: number) => {
        voiceGroupStores[voiceGroupIndex].getState().setParam(path, newValue)
    }, [voiceGroupIndex, path])

    return { value, toggle, set }
}

// ---- Utilities ----

function getAtPath(obj: unknown, path: string): number {
    const keys = path.split('.')
    let current: unknown = obj
    for (const key of keys) {
        if (current === null || current === undefined) return 0
        current = (current as Record<string, unknown>)[key]
    }
    return (current as number) ?? 0
}

function getBounded(value: number, min: number, max: number): number {
    if (value > max) return max
    if (value < min) return min
    return value
}
