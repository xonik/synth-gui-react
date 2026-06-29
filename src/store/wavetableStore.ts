import { create } from 'zustand'
import {
    defaultWavetableNames,
    MAX_POSITION,
    WAVES_PER_BANK,
    WAVETABLE_COUNT,
} from '@/synthcore/modules/osc/wavetableData'

export interface WaveEntry {
    bankIndex: number
    waveIndex: number
    position: number
}

interface WavetableState {
    selectedWavetable: number
    selectedBank: number
    selectedWave: number
    selectedPosition: number
    wavetableNames: string[]
    wavetables: WaveEntry[][]
}

interface WavetableActions {
    setSelectedWavetable: (index: number) => void
    setSelectedBank: (index: number) => void
    setSelectedWave: (index: number) => void
    setSelectedPosition: (pos: number) => void
    addWave: () => void
    removeWave: (entryIndex: number) => void
    moveWave: (entryIndex: number, direction: 'up' | 'down') => void
    setWavePosition: (entryIndex: number, position: number) => void
    setWavetableName: (wavetableIndex: number, name: string) => void
}

const sortEntries = (entries: WaveEntry[]): WaveEntry[] => [...entries].sort((a, b) => a.position - b.position)

/** Recursively bump any entry occupying `position` to `position + 1`, cascading as needed. */
const bumpPosition = (entries: WaveEntry[], position: number): WaveEntry[] => {
    const conflictIndex = entries.findIndex((e) => e.position === position)
    if (conflictIndex === -1) return entries
    // Cascade: resolve the next position first, then bump the conflicting entry
    const resolved = bumpPosition(entries, position + 1)
    return resolved.map((e, i) => (i === conflictIndex ? { ...e, position: position + 1 } : e))
}

export const useWavetableStore = create<WavetableState & WavetableActions>((set, get) => ({
    selectedWavetable: 0,
    selectedBank: 0,
    selectedWave: 0,
    selectedPosition: 0,
    wavetableNames: defaultWavetableNames,
    wavetables: Array.from({ length: WAVETABLE_COUNT }, () => []),

    setSelectedWavetable: (index) => set({ selectedWavetable: index }),
    setSelectedBank: (index) => set({ selectedBank: index, selectedWave: 0 }),
    setSelectedWave: (index) => set({ selectedWave: index }),
    setSelectedPosition: (pos) => set({ selectedPosition: pos }),

    addWave: () => {
        const { selectedWavetable, selectedBank, selectedWave, selectedPosition, wavetables } = get()

        const newEntry: WaveEntry = {
            bankIndex: selectedBank,
            waveIndex: selectedWave,
            position: selectedPosition,
        }

        const bumped = bumpPosition(wavetables[selectedWavetable], selectedPosition)
        const updatedTable = sortEntries([...bumped, newEntry])
        const newWavetables = [...wavetables]
        newWavetables[selectedWavetable] = updatedTable

        const nextPosition = Math.min(selectedPosition + 1, MAX_POSITION)
        const nextWave = Math.min(selectedWave + 1, WAVES_PER_BANK - 1)

        set({ wavetables: newWavetables, selectedPosition: nextPosition, selectedWave: nextWave })
    },

    removeWave: (entryIndex) => {
        const { selectedWavetable, wavetables } = get()
        const updatedTable = wavetables[selectedWavetable].filter((_, i) => i !== entryIndex)
        const newWavetables = [...wavetables]
        newWavetables[selectedWavetable] = updatedTable
        set({ wavetables: newWavetables })
    },

    moveWave: (entryIndex, direction) => {
        const { selectedWavetable, wavetables } = get()
        const table = [...wavetables[selectedWavetable]]
        const swapIndex = direction === 'up' ? entryIndex - 1 : entryIndex + 1

        if (swapIndex < 0 || swapIndex >= table.length) return

        // Swap the positions of the two adjacent entries, then re-sort
        const posA = table[entryIndex].position
        const posB = table[swapIndex].position
        table[entryIndex] = { ...table[entryIndex], position: posB }
        table[swapIndex] = { ...table[swapIndex], position: posA }

        const newWavetables = [...wavetables]
        newWavetables[selectedWavetable] = sortEntries(table)
        set({ wavetables: newWavetables })
    },

    setWavePosition: (entryIndex, position) => {
        const { selectedWavetable, wavetables } = get()
        const table = [...wavetables[selectedWavetable]]
        table[entryIndex] = { ...table[entryIndex], position }
        const newWavetables = [...wavetables]
        newWavetables[selectedWavetable] = sortEntries(table)
        set({ wavetables: newWavetables })
    },

    setWavetableName: (wavetableIndex, name) => {
        const { wavetableNames } = get()
        const nextNames = [...wavetableNames]
        nextNames[wavetableIndex] = name
        set({ wavetableNames: nextNames })
    },
}))
