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
 *
 * State is accessed via typed selector functions, not string paths:
 *   usePot(s => s.envelopes[0].stages.attack.time, (s, v) => { s.envelopes[0].stages.attack.time = v })
 */

import { useMemo, useCallback } from 'react'
import { useVoiceGroupStore, voiceGroupStores, VoiceGroupPatch } from './patchStore'
import { useUiStore } from './uiStore'
import type { ResponseMapper } from './types'

/**
 * Get a value from the current voice group's patch store using a typed selector.
 *
 * Example: usePatchValue(s => s.envelopes[0].stages.attack.time)
 */
export function usePatchValue(selector: (state: VoiceGroupPatch) => number): number {
    const voiceGroupIndex = useUiStore((s) => s.currentVoiceGroupIndex)
    return useVoiceGroupStore(voiceGroupIndex, selector)
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
 * Example:
 *   const { displayValue, increment } = usePot(
 *       s => s.envelopes[0].stages.attack.time,
 *       (s, v) => { s.envelopes[0].stages.attack.time = v },
 *       { responseMapper: timeResponseMapper }
 *   )
 */
export function usePot(
    selector: (state: VoiceGroupPatch) => number,
    mutator: (state: VoiceGroupPatch, value: number) => void,
    options?: {
        responseMapper?: ResponseMapper
        bipolar?: boolean
    }
) {
    const voiceGroupIndex = useUiStore((s) => s.currentVoiceGroupIndex)
    const rawValue = useVoiceGroupStore(voiceGroupIndex, selector)

    const { responseMapper, bipolar } = options ?? {}

    const displayValue = useMemo(() => {
        if (responseMapper) {
            return responseMapper.input(rawValue, bipolar)
        }
        return rawValue
    }, [rawValue, responseMapper, bipolar])

    const set = useCallback((newDisplayValue: number) => {
        const bounded = getBounded(newDisplayValue, bipolar ? -1 : 0, 1)
        const newRaw = responseMapper
            ? responseMapper.output(bounded, bipolar)
            : bounded
        voiceGroupStores[voiceGroupIndex].getState().set(state => {
            mutator(state, newRaw)
        })
    }, [voiceGroupIndex, mutator, responseMapper, bipolar])

    const increment = useCallback((delta: number) => {
        const newDisplay = getBounded(
            displayValue + delta,
            bipolar ? -1 : 0,
            1
        )
        const newRaw = responseMapper
            ? responseMapper.output(newDisplay, bipolar)
            : newDisplay
        voiceGroupStores[voiceGroupIndex].getState().set(state => {
            mutator(state, newRaw)
        })
    }, [voiceGroupIndex, mutator, displayValue, responseMapper, bipolar])

    return { displayValue, rawValue, set, increment }
}

/**
 * Hook for connecting a button to the patch store.
 *
 * Example:
 *   const { value, toggle } = useButton(
 *       s => s.envelopes[0].loop,
 *       (s, v) => { s.envelopes[0].loop = v },
 *       2
 *   )
 */
export function useButton(
    selector: (state: VoiceGroupPatch) => number,
    mutator: (state: VoiceGroupPatch, value: number) => void,
    numValues: number,
    options?: { loop?: boolean }
) {
    const voiceGroupIndex = useUiStore((s) => s.currentVoiceGroupIndex)
    const value = useVoiceGroupStore(voiceGroupIndex, selector)

    const loop = options?.loop ?? true

    const toggle = useCallback(() => {
        const store = voiceGroupStores[voiceGroupIndex].getState()
        const current = selector(store)
        if (numValues === 1) {
            store.set(state => { mutator(state, 0) })
        } else if (loop) {
            store.set(state => { mutator(state, (current + 1) % numValues) })
        } else {
            const next = current + 1
            if (next < numValues) {
                store.set(state => { mutator(state, next) })
            }
        }
    }, [voiceGroupIndex, selector, mutator, numValues, loop])

    const set = useCallback((newValue: number) => {
        voiceGroupStores[voiceGroupIndex].getState().set(state => {
            mutator(state, newValue)
        })
    }, [voiceGroupIndex, mutator])

    return { value, toggle, set }
}

function getBounded(value: number, min: number, max: number): number {
    if (value > max) return max
    if (value < min) return min
    return value
}
