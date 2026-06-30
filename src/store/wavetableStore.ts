import { create } from 'zustand'
import { isMidiReceiving } from '@/store/midi/midiGuard'
import { sendAddWave, sendLoadWavetable, sendMoveWave, sendRemoveWave } from '@/store/midi/wavetableMidi'
import {
    defaultWavetableNames,
    MAX_POSITION,
    WAVES_PER_BANK,
    WAVETABLE_COUNT,
} from '@/synthcore/modules/wavetable/wavetableData'

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
    setWavetableName: (wavetableIndex: number, name: string) => void

    // GUI actions operating on the current selection / list indices.
    addWave: () => void
    removeWave: (entryIndex: number) => void
    moveWave: (entryIndex: number, direction: 'up' | 'down') => void
    setWavePosition: (entryIndex: number, position: number) => void
    loadWavetable: (wavetableIndex: number) => void

    // Core mutators keyed by explicit wavetable/position. Shared by the GUI
    // actions and by MIDI receive; they emit MIDI unless a receive is in flight.
    addWaveAt: (wavetableIndex: number, bankIndex: number, waveIndex: number, position: number) => void
    removeWaveAt: (wavetableIndex: number, position: number) => void
    moveWaveTo: (wavetableIndex: number, fromPosition: number, toPosition: number) => void
    loadWavetableEntries: (wavetableIndex: number, entries: WaveEntry[]) => void
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

const insertWave = (entries: WaveEntry[], entry: WaveEntry): WaveEntry[] => {
    const bumped = bumpPosition(entries, entry.position)
    return sortEntries([...bumped, entry])
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

    setWavetableName: (wavetableIndex, name) => {
        const { wavetableNames } = get()
        const nextNames = [...wavetableNames]
        nextNames[wavetableIndex] = name
        set({ wavetableNames: nextNames })
    },

    addWave: () => {
        const { selectedWavetable, selectedBank, selectedWave, selectedPosition } = get()
        get().addWaveAt(selectedWavetable, selectedBank, selectedWave, selectedPosition)
        set({
            selectedPosition: Math.min(selectedPosition + 1, MAX_POSITION),
            selectedWave: Math.min(selectedWave + 1, WAVES_PER_BANK - 1),
        })
    },

    removeWave: (entryIndex) => {
        const { selectedWavetable, wavetables } = get()
        const entry = wavetables[selectedWavetable][entryIndex]
        if (!entry) return
        get().removeWaveAt(selectedWavetable, entry.position)
    },

    moveWave: (entryIndex, direction) => {
        const { selectedWavetable, wavetables } = get()
        const table = wavetables[selectedWavetable]
        const swapIndex = direction === 'up' ? entryIndex - 1 : entryIndex + 1
        if (swapIndex < 0 || swapIndex >= table.length) return
        get().moveWaveTo(selectedWavetable, table[entryIndex].position, table[swapIndex].position)
    },

    setWavePosition: (entryIndex, position) => {
        const { selectedWavetable, wavetables } = get()
        const entry = wavetables[selectedWavetable][entryIndex]
        if (!entry) return
        get().moveWaveTo(selectedWavetable, entry.position, position)
    },

    loadWavetable: (wavetableIndex) => {
        get().loadWavetableEntries(wavetableIndex, get().wavetables[wavetableIndex])
    },

    addWaveAt: (wavetableIndex, bankIndex, waveIndex, position) => {
        const { wavetables } = get()
        const newWavetables = [...wavetables]
        newWavetables[wavetableIndex] = insertWave(wavetables[wavetableIndex], { bankIndex, waveIndex, position })
        set({ wavetables: newWavetables })

        if (!isMidiReceiving()) {
            sendAddWave(wavetableIndex, bankIndex, waveIndex, position)
        }
    },

    removeWaveAt: (wavetableIndex, position) => {
        const { wavetables } = get()
        const newWavetables = [...wavetables]
        newWavetables[wavetableIndex] = wavetables[wavetableIndex].filter((e) => e.position !== position)
        set({ wavetables: newWavetables })

        if (!isMidiReceiving()) {
            sendRemoveWave(wavetableIndex, position)
        }
    },

    moveWaveTo: (wavetableIndex, fromPosition, toPosition) => {
        const { wavetables } = get()
        const table = wavetables[wavetableIndex].map((e) => ({ ...e }))
        const moved = table.find((e) => e.position === fromPosition)
        if (!moved) return

        const occupant = table.find((e) => e.position === toPosition)
        if (occupant) {
            occupant.position = fromPosition
        }
        moved.position = toPosition

        const newWavetables = [...wavetables]
        newWavetables[wavetableIndex] = sortEntries(table)
        set({ wavetables: newWavetables })

        if (!isMidiReceiving()) {
            sendMoveWave(wavetableIndex, fromPosition, toPosition)
        }
    },

    loadWavetableEntries: (wavetableIndex, entries) => {
        const { wavetables } = get()
        const sorted = sortEntries(entries)
        const newWavetables = [...wavetables]
        newWavetables[wavetableIndex] = sorted
        set({ wavetables: newWavetables })

        if (!isMidiReceiving()) {
            sendLoadWavetable(wavetableIndex, sorted)
        }
    },
}))
