import { create } from 'zustand'
import { isMidiReceiving } from '@/store/midi/midiGuard'
import { updateWavetable } from '@/store/midi/wavetableMidi'
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
    updateWavetable: (wavetableIndex: number) => void

    // Core mutators keyed by explicit wavetable/position. Shared by the GUI
    // actions and by MIDI receive; they emit MIDI unless a receive is in flight.
    addWaveAt: (wavetableIndex: number, bankIndex: number, waveIndex: number, position: number) => void
    removeWaveAt: (wavetableIndex: number, position: number) => void
    moveWaveTo: (wavetableIndex: number, fromPosition: number, toPosition: number) => void
    loadWavetableEntries: (wavetableIndex: number, entries: WaveEntry[]) => void
}

const WAVETABLE_STORAGE_KEY = 'wavetable-store-v1'

interface PersistedWavetableState {
    wavetableNames: string[]
    wavetables: WaveEntry[][]
}

const sortEntries = (entries: WaveEntry[]): WaveEntry[] => [...entries].sort((a, b) => a.position - b.position)

/** Lowest free position at or above `position`, or -1 if none exists within bounds. */
const firstFreeFrom = (entries: WaveEntry[], position: number): number => {
    const occupied = new Set(entries.map((e) => e.position))
    for (let p = position; p <= MAX_POSITION; p++) {
        if (!occupied.has(p)) return p
    }
    return -1
}

/** Whether a wave can be inserted at `position` without cascading past MAX_POSITION. */
const canInsertAt = (entries: WaveEntry[], position: number): boolean => firstFreeFrom(entries, position) !== -1

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

const persistWavetables = (state: PersistedWavetableState) => {
    localStorage.setItem(WAVETABLE_STORAGE_KEY, JSON.stringify(state))
}

const isValidWaveEntry = (entry: unknown): entry is WaveEntry => {
    if (!entry || typeof entry !== 'object') return false
    const candidate = entry as Record<string, unknown>
    return (
        Number.isInteger(candidate.bankIndex) &&
        Number.isInteger(candidate.waveIndex) &&
        Number.isInteger(candidate.position) &&
        (candidate.bankIndex as number) >= 0 &&
        (candidate.waveIndex as number) >= 0 &&
        (candidate.position as number) >= 0 &&
        (candidate.position as number) <= MAX_POSITION
    )
}

const loadPersistedWavetables = (): PersistedWavetableState | null => {
    const raw = localStorage.getItem(WAVETABLE_STORAGE_KEY)
    if (!raw) return null
    try {
        const parsed = JSON.parse(raw) as {
            wavetableNames?: unknown
            wavetables?: unknown
        }
        if (!Array.isArray(parsed.wavetableNames) || !Array.isArray(parsed.wavetables)) return null
        if (parsed.wavetableNames.length !== WAVETABLE_COUNT || parsed.wavetables.length !== WAVETABLE_COUNT) return null
        if (!parsed.wavetableNames.every((name) => typeof name === 'string')) return null

        const wavetables = parsed.wavetables.map((table) => {
            if (!Array.isArray(table)) return []
            const entries = table.filter(isValidWaveEntry)
            return sortEntries(entries)
        })

        return {
            wavetableNames: parsed.wavetableNames,
            wavetables,
        }
    } catch (error) {
        console.warn('Unable to load wavetable state from local storage', error)
        return null
    }
}

const persisted = loadPersistedWavetables()

export const useWavetableStore = create<WavetableState & WavetableActions>((set, get) => ({
    selectedWavetable: 0,
    selectedBank: 0,
    selectedWave: 0,
    selectedPosition: 0,
    wavetableNames: persisted?.wavetableNames ?? defaultWavetableNames,
    wavetables: persisted?.wavetables ?? Array.from({ length: WAVETABLE_COUNT }, () => []),

    setSelectedWavetable: (index) => set({ selectedWavetable: index }),
    setSelectedBank: (index) => set({ selectedBank: index, selectedWave: 0 }),
    setSelectedWave: (index) => set({ selectedWave: index }),
    setSelectedPosition: (pos) => set({ selectedPosition: pos }),

    setWavetableName: (wavetableIndex, name) => {
        const { wavetableNames, wavetables } = get()
        const nextNames = [...wavetableNames]
        nextNames[wavetableIndex] = name
        set({ wavetableNames: nextNames })
        persistWavetables({ wavetableNames: nextNames, wavetables })
    },

    addWave: () => {
        const { selectedWavetable, selectedBank, selectedWave, selectedPosition, wavetables } = get()
        if (!canInsertAt(wavetables[selectedWavetable], selectedPosition)) return
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
        if (!entry || entry.position === position) return
        // Check feasibility against the table without the moved entry: if the
        // cascade can't fit below MAX_POSITION, don't move at all.
        const others = wavetables[selectedWavetable].filter((_, i) => i !== entryIndex)
        if (!canInsertAt(others, position)) return
        // Re-insert at the new position so any occupants cascade up to the next
        // free slots, rather than swapping with the entry currently there.
        get().removeWaveAt(selectedWavetable, entry.position)
        get().addWaveAt(selectedWavetable, entry.bankIndex, entry.waveIndex, position)
    },

    updateWavetable: (wavetableIndex) => {
        get().loadWavetableEntries(wavetableIndex, get().wavetables[wavetableIndex])
    },

    addWaveAt: (wavetableIndex, bankIndex, waveIndex, position) => {
        const { wavetables } = get()
        if (!canInsertAt(wavetables[wavetableIndex], position)) return
        const newWavetables = [...wavetables]
        newWavetables[wavetableIndex] = insertWave(wavetables[wavetableIndex], { bankIndex, waveIndex, position })
        set({ wavetables: newWavetables })
        persistWavetables({ wavetableNames: get().wavetableNames, wavetables: newWavetables })

        if (!isMidiReceiving()) {
            updateWavetable(wavetableIndex, newWavetables[wavetableIndex])
        }
    },

    removeWaveAt: (wavetableIndex, position) => {
        const { wavetables } = get()
        const newWavetables = [...wavetables]
        newWavetables[wavetableIndex] = wavetables[wavetableIndex].filter((e) => e.position !== position)
        set({ wavetables: newWavetables })
        persistWavetables({ wavetableNames: get().wavetableNames, wavetables: newWavetables })

        if (!isMidiReceiving()) {
            updateWavetable(wavetableIndex, newWavetables[wavetableIndex])
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
        persistWavetables({ wavetableNames: get().wavetableNames, wavetables: newWavetables })

        if (!isMidiReceiving()) {
            updateWavetable(wavetableIndex, newWavetables[wavetableIndex])
        }
    },

    loadWavetableEntries: (wavetableIndex, entries) => {
        const { wavetables } = get()
        const sorted = sortEntries(entries)
        const newWavetables = [...wavetables]
        newWavetables[wavetableIndex] = sorted
        set({ wavetables: newWavetables })
        persistWavetables({ wavetableNames: get().wavetableNames, wavetables: newWavetables })

        if (!isMidiReceiving()) {
            updateWavetable(wavetableIndex, sorted)
        }
    },
}))
