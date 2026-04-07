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

import { useCallback, useMemo } from 'react'
import { type GlobalPatchState, globalStore, useGlobalStore } from './globalStore'
import { notifyParamChange } from './paramPopupStore'
import { useVoiceGroupStore, type VoiceGroupPatch, voiceGroupStores } from './patchStore'
import type { ResponseMapper } from './types'
import type { ScreenId } from './uiStore'
import { useUiStore } from './uiStore'
import { getBounded } from './utils'

/**
 * Popup metadata for panel controls. When provided, changing the parameter
 * will show a temporary popup in the display with the parameter info.
 */
export interface PopupConfig {
    /** Human-readable module name (e.g. "Osc 1", "LPF") */
    moduleName: string
    /** Human-readable parameter label (e.g. "Cutoff", "Rate") */
    paramLabel: string
    /** The ScreenId this module maps to — popup is suppressed on this screen */
    screen?: ScreenId
    /** Optional formatter for the display value. Defaults to 2-decimal fixed. */
    formatValue?: (value: number) => string
}

function defaultFormatValue(value: number): string {
    return value.toFixed(2)
}

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
        popup?: PopupConfig
    }
) {
    const voiceGroupIndex = useUiStore((s) => s.currentVoiceGroupIndex)
    const rawValue = useVoiceGroupStore(voiceGroupIndex, selector)

    const { responseMapper, bipolar, popup } = options ?? {}

    const displayValue = useMemo(() => {
        if (responseMapper) {
            return responseMapper.input(rawValue, bipolar)
        }
        return rawValue
    }, [rawValue, responseMapper, bipolar])

    const set = useCallback(
        (newDisplayValue: number) => {
            const bounded = getBounded(newDisplayValue, bipolar ? -1 : 0, 1)
            const newRaw = responseMapper ? responseMapper.output(bounded, bipolar) : bounded
            voiceGroupStores[voiceGroupIndex].getState().set((state) => {
                mutator(state, newRaw)
            })
            if (popup) {
                const fmt = popup.formatValue ?? defaultFormatValue
                notifyParamChange(popup.moduleName, popup.paramLabel, fmt(bounded), popup.screen)
            }
        },
        [voiceGroupIndex, mutator, responseMapper, bipolar, popup]
    )

    const increment = useCallback(
        (delta: number) => {
            const newDisplay = getBounded(displayValue + delta, bipolar ? -1 : 0, 1)
            const newRaw = responseMapper ? responseMapper.output(newDisplay, bipolar) : newDisplay
            voiceGroupStores[voiceGroupIndex].getState().set((state) => {
                mutator(state, newRaw)
            })
            if (popup) {
                const fmt = popup.formatValue ?? defaultFormatValue
                notifyParamChange(popup.moduleName, popup.paramLabel, fmt(newDisplay), popup.screen)
            }
        },
        [voiceGroupIndex, mutator, displayValue, responseMapper, bipolar, popup]
    )

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
    options?: { loop?: boolean; popup?: PopupConfig }
) {
    const voiceGroupIndex = useUiStore((s) => s.currentVoiceGroupIndex)
    const value = useVoiceGroupStore(voiceGroupIndex, selector)

    const loop = options?.loop ?? true
    const popup = options?.popup

    const toggle = useCallback(() => {
        const store = voiceGroupStores[voiceGroupIndex].getState()
        const current = selector(store)
        let next: number
        if (numValues === 1) {
            next = 0
        } else if (loop) {
            next = (current + 1) % numValues
        } else {
            next = current + 1
            if (next >= numValues) return
        }
        store.set((state) => {
            mutator(state, next)
        })
        if (popup) {
            const fmt = popup.formatValue ?? defaultFormatValue
            notifyParamChange(popup.moduleName, popup.paramLabel, fmt(next), popup.screen)
        }
    }, [voiceGroupIndex, selector, mutator, numValues, loop, popup])

    const set = useCallback(
        (newValue: number) => {
            voiceGroupStores[voiceGroupIndex].getState().set((state) => {
                mutator(state, newValue)
            })
            if (popup) {
                const fmt = popup.formatValue ?? defaultFormatValue
                notifyParamChange(popup.moduleName, popup.paramLabel, fmt(newValue), popup.screen)
            }
        },
        [voiceGroupIndex, mutator, popup]
    )

    return { value, toggle, set }
}

/**
 * Hook for connecting a potentiometer to the global store.
 */
export function useGlobalPot(
    selector: (state: GlobalPatchState) => number,
    mutator: (state: GlobalPatchState, value: number) => void,
    options?: {
        responseMapper?: ResponseMapper
        bipolar?: boolean
        popup?: PopupConfig
    }
) {
    const rawValue = useGlobalStore(selector)
    const { responseMapper, bipolar, popup } = options ?? {}

    const displayValue = useMemo(() => {
        if (responseMapper) {
            return responseMapper.input(rawValue, bipolar)
        }
        return rawValue
    }, [rawValue, responseMapper, bipolar])

    const increment = useCallback(
        (delta: number) => {
            const newDisplay = getBounded(displayValue + delta, bipolar ? -1 : 0, 1)
            const newRaw = responseMapper ? responseMapper.output(newDisplay, bipolar) : newDisplay
            globalStore.getState().set((state) => {
                mutator(state, newRaw)
            })
            if (popup) {
                const fmt = popup.formatValue ?? defaultFormatValue
                notifyParamChange(popup.moduleName, popup.paramLabel, fmt(newDisplay), popup.screen)
            }
        },
        [mutator, displayValue, responseMapper, bipolar, popup]
    )

    return { displayValue, rawValue, increment }
}

/**
 * Hook for connecting a button to the global store.
 */
export function useGlobalButton(
    selector: (state: GlobalPatchState) => number,
    mutator: (state: GlobalPatchState, value: number) => void,
    numValues: number,
    options?: { popup?: PopupConfig }
) {
    const value = useGlobalStore(selector)
    const popup = options?.popup

    const toggle = useCallback(() => {
        const current = selector(globalStore.getState())
        const next = (current + 1) % numValues
        globalStore.getState().set((state) => {
            mutator(state, next)
        })
        if (popup) {
            const fmt = popup.formatValue ?? defaultFormatValue
            notifyParamChange(popup.moduleName, popup.paramLabel, fmt(next), popup.screen)
        }
    }, [selector, mutator, numValues, popup])

    return { value, toggle }
}
