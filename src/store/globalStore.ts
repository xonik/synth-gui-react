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
import { immer } from 'zustand/middleware/immer'

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
    set: (mutator: (state: GlobalPatchState) => void) => void
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

export const globalStore: StoreApi<GlobalStore> = createStore<GlobalStore>()(
    immer((set, get) => ({
        ...defaultGlobalPatch(),

        set: (mutator: (state: GlobalPatchState) => void) => {
            set(mutator)
        },

        loadPatch: (patch: GlobalPatchState) => {
            set(() => ({ ...patch }))
        },

        getPatch: (): GlobalPatchState => {
            const { set: _set, loadPatch, getPatch, ...patch } = get()
            return patch
        },
    }))
)

export function useGlobalStore<T>(selector: (state: GlobalStore) => T): T {
    return useStore(globalStore, selector)
}
