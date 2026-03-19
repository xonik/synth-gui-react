/**
 * Global patch store — for parameters that are shared across all voice groups.
 *
 * Currently this includes:
 * - Master clock
 * - Arpeggiator (shared settings)
 * - Any controller marked as `global: true` in the old system
 */

import { createStore, StoreApi } from 'zustand/vanilla'
import { useStore } from 'zustand'

export interface GlobalPatchState {
    masterClock: {
        rate: number
        source: number
    }
    arp: {
        bpm: number
        onOff: number
        trigger: number
        sync: number
        range: number
        mode: number
        extendedMode: number
        sequence: number
        noteOrdering: number
        startSync: number
        fuzzyStart: number
        stopOnRelease: number
    }
}

export interface GlobalPatchActions {
    setParam: (path: string, value: number) => void
    loadPatch: (patch: GlobalPatchState) => void
    getPatch: () => GlobalPatchState
}

export type GlobalStore = GlobalPatchState & GlobalPatchActions

const defaultGlobalPatch = (): GlobalPatchState => ({
    masterClock: {
        rate: 0.5,
        source: 0,
    },
    arp: {
        bpm: 0.5,
        onOff: 0,
        trigger: 0,
        sync: 0,
        range: 0,
        mode: 0,
        extendedMode: 0,
        sequence: 0,
        noteOrdering: 0,
        startSync: 0,
        fuzzyStart: 0,
        stopOnRelease: 0,
    },
})

/**
 * Sets a value on a nested object using a dot-separated path string.
 * e.g. setAtPath(obj, 'arp.bpm', 0.7) is equivalent to obj.arp.bpm = 0.7
 *
 * This allows setParam('arp.bpm', 0.7) to work with a single generic
 * function rather than needing a separate action for every parameter.
 */
function setAtPath(obj: Record<string, unknown>, path: string, value: number): void {
    const keys = path.split('.')
    let current: Record<string, unknown> = obj
    for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i]
        if (current[key] === undefined || current[key] === null) {
            current[key] = {}
        }
        current = current[key] as Record<string, unknown>
    }
    current[keys[keys.length - 1]] = value
}

export const globalStore: StoreApi<GlobalStore> = createStore<GlobalStore>((set, get) => ({
    ...defaultGlobalPatch(),

    setParam: (path: string, value: number) => {
        set((state) => {
            const newState = { ...state }
            setAtPath(newState as unknown as Record<string, unknown>, path, value)
            return newState
        })
    },

    loadPatch: (patch: GlobalPatchState) => {
        set((state) => ({ ...state, ...patch }))
    },

    getPatch: (): GlobalPatchState => {
        const { setParam, loadPatch, getPatch, ...patch } = get()
        return patch
    },
}))

export function useGlobalStore<T>(selector: (state: GlobalStore) => T): T {
    return useStore(globalStore, selector)
}
