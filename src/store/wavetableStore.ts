import { create } from 'zustand'
import { isMidiReceiving } from '@/store/midi/midiGuard'
import { updateWavetable } from '@/store/midi/wavetableMidi'
import { buildPpgWavetables } from '@/synthcore/modules/wavetable/ppgWavetables'
import {
    defaultWavetableNames,
    MAX_POSITION,
    PROPHET_VS_WAVETABLES,
    USER_WAVETABLES,
    waveBanks,
    wavetableBankNames,
    WAVETABLE_COUNT,
} from '@/synthcore/modules/wavetable/wavetableData'

export interface WaveEntry {
    bankIndex: number
    waveIndex: number
    position: number
}

type WavetableBankEntryLists = WaveEntry[][]
type WavetableEntriesByBank = WavetableBankEntryLists[]

interface WavetableState {
    selectedWavetableBank: number
    selectedWavetable: number
    selectedBank: number
    selectedWave: number
    selectedPosition: number
    wavetableNames: string[]
    wavetablesByBank: WavetableEntriesByBank
}

interface WavetableActions {
    setSelectedWavetableBank: (index: number) => void
    setSelectedWavetable: (index: number) => void
    setSelectedBank: (index: number) => void
    setSelectedWave: (index: number) => void
    setSelectedPosition: (pos: number) => void
    setWavetableName: (wavetableIndex: number, name: string) => void

    addWave: () => void
    removeWave: (entryIndex: number) => void
    moveWave: (entryIndex: number, direction: 'up' | 'down') => void
    setWavePosition: (entryIndex: number, position: number) => void
    updateWavetable: (wavetableIndex: number) => void

    addWaveAt: (bankIndex: number, wavetableIndex: number, waveBankIndex: number, waveIndex: number, position: number) => void
    removeWaveAt: (bankIndex: number, wavetableIndex: number, position: number) => void
    moveWaveTo: (bankIndex: number, wavetableIndex: number, fromPosition: number, toPosition: number) => void
    loadWavetableEntries: (bankIndex: number, wavetableIndex: number, entries: WaveEntry[]) => void
}

const WAVETABLE_STORAGE_KEY = 'wavetable-store-v1'

interface PersistedWavetableState {
    wavetableNames: string[]
    userWavetables: WavetableBankEntryLists
}

const sortEntries = (entries: WaveEntry[]): WaveEntry[] => [...entries].sort((a, b) => a.position - b.position)

const firstFreeFrom = (entries: WaveEntry[], position: number): number => {
    const occupied = new Set(entries.map((e) => e.position))
    for (let p = position; p <= MAX_POSITION; p++) {
        if (!occupied.has(p)) return p
    }
    return -1
}

const canInsertAt = (entries: WaveEntry[], position: number): boolean => firstFreeFrom(entries, position) !== -1

const bumpPosition = (entries: WaveEntry[], position: number): WaveEntry[] => {
    const conflictIndex = entries.findIndex((e) => e.position === position)
    if (conflictIndex === -1) return entries
    const resolved = bumpPosition(entries, position + 1)
    return resolved.map((e, i) => (i === conflictIndex ? { ...e, position: position + 1 } : e))
}

const insertWave = (entries: WaveEntry[], entry: WaveEntry): WaveEntry[] => {
    const bumped = bumpPosition(entries, entry.position)
    return sortEntries([...bumped, entry])
}

const getStorage = (): Storage | null => {
    if (typeof window === 'undefined' || !('localStorage' in window)) return null
    try {
        return window.localStorage
    } catch {
        return null
    }
}

const cloneWavetablesByBank = (wavetablesByBank: WavetableEntriesByBank): WavetableEntriesByBank =>
    wavetablesByBank.map((bank) => bank.map((entries) => entries.map((entry) => ({ ...entry }))))

const persistWavetables = (state: PersistedWavetableState) => {
    const storage = getStorage()
    if (!storage) return
    storage.setItem(WAVETABLE_STORAGE_KEY, JSON.stringify(state))
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

const isValidPersistedUserWavetables = (tables: unknown): tables is WavetableBankEntryLists =>
    Array.isArray(tables) &&
    tables.length === WAVETABLE_COUNT &&
    tables.every((table) => Array.isArray(table) && table.every(isValidWaveEntry))

const loadPersistedWavetables = (): PersistedWavetableState | null => {
    const storage = getStorage()
    if (!storage) return null
    const raw = storage.getItem(WAVETABLE_STORAGE_KEY)
    if (!raw) return null
    try {
        const parsed = JSON.parse(raw) as {
            wavetableNames?: unknown
            userWavetables?: unknown
            wavetablesByBank?: unknown
            wavetables?: unknown
        }
        if (!Array.isArray(parsed.wavetableNames) || parsed.wavetableNames.length !== WAVETABLE_COUNT) return null
        if (!parsed.wavetableNames.every((name) => typeof name === 'string')) return null

        if (isValidPersistedUserWavetables(parsed.userWavetables)) {
            return {
                wavetableNames: parsed.wavetableNames,
                userWavetables: parsed.userWavetables.map((table) => sortEntries(table)),
            }
        }

        if (Array.isArray(parsed.wavetablesByBank) && parsed.wavetablesByBank.length === wavetableBankNames.length) {
            const userTables = parsed.wavetablesByBank[2]
            if (isValidPersistedUserWavetables(userTables)) {
                return {
                    wavetableNames: parsed.wavetableNames,
                    userWavetables: userTables.map((table) => sortEntries(table)),
                }
            }
        }

        if (Array.isArray(parsed.wavetables) && parsed.wavetables.length === WAVETABLE_COUNT) {
            const userTables = parsed.wavetables.map((table) => {
                if (!Array.isArray(table)) return []
                return sortEntries(table.filter(isValidWaveEntry))
            })
            return {
                wavetableNames: parsed.wavetableNames,
                userWavetables: userTables,
            }
        }

        return null
    } catch (error) {
        console.warn('Unable to load wavetable state from local storage', error)
        return null
    }
}

const ppgDefaultWavetables = buildPpgWavetables(0, 0)
const ppgWavetableNames = ppgDefaultWavetables.map((table) => table.name)
const wavetableNamesByBank: string[][] = [ppgWavetableNames, PROPHET_VS_WAVETABLES, USER_WAVETABLES]
const defaultWavetableBank = 0

function createDefaultPpgWavetables(): WavetableBankEntryLists {
    return Array.from({ length: WAVETABLE_COUNT }, (_, wavetableIndex) => {
        const preset = ppgDefaultWavetables.find((table) => table.wavetableId === wavetableIndex)
        return preset ? preset.entries.map((entry) => ({ ...entry })) : []
    })
}

function createEmptyWavetableBank(): WavetableBankEntryLists {
    return Array.from({ length: WAVETABLE_COUNT }, () => [])
}

const defaultWavetableNamesFromPpg = Array.from({ length: WAVETABLE_COUNT }, (_, wavetableIndex) => {
    const preset = ppgDefaultWavetables.find((table) => table.wavetableId === wavetableIndex)
    return preset?.name ?? defaultWavetableNames[wavetableIndex]
})
const persisted = loadPersistedWavetables()

const initialWavetablesByBank = [
    createDefaultPpgWavetables(),
    createEmptyWavetableBank(),
    persisted?.userWavetables ?? createEmptyWavetableBank(),
]

const getBankedNames = (bankIndex: number): string[] => {
    const names = wavetableNamesByBank[bankIndex] ?? []
    return names.slice(0, WAVETABLE_COUNT)
}

const getCurrentEntries = (state: WavetableState) => state.wavetablesByBank[state.selectedWavetableBank]?.[state.selectedWavetable] ?? []

export const useWavetableStore = create<WavetableState & WavetableActions>((set, get) => ({
    selectedWavetableBank: defaultWavetableBank,
    selectedWavetable: 0,
    selectedBank: 0,
    selectedWave: 0,
    selectedPosition: 0,
    wavetableNames: persisted?.wavetableNames ?? defaultWavetableNamesFromPpg,
    wavetablesByBank: cloneWavetablesByBank(initialWavetablesByBank),

    setSelectedWavetableBank: (index) => {
        const safeIndex = Math.max(0, Math.min(index, wavetableBankNames.length - 1))
        const available = getBankedNames(safeIndex)
        set({
            selectedWavetableBank: safeIndex,
            selectedWavetable: available.length > 0 ? 0 : -1,
        })
    },
    setSelectedWavetable: (index) => set({ selectedWavetable: index }),
    setSelectedBank: (index) => set({
        selectedBank: index,
        selectedWave: 0,
    }),
    setSelectedWave: (index) => set({ selectedWave: index }),
    setSelectedPosition: (pos) => set({ selectedPosition: pos }),

    setWavetableName: (wavetableIndex, name) => {
        const { wavetableNames, wavetablesByBank } = get()
        const nextNames = [...wavetableNames]
        nextNames[wavetableIndex] = name
        set({ wavetableNames: nextNames })
        persistWavetables({ wavetableNames: nextNames, userWavetables: wavetablesByBank[2] })
    },

    addWave: () => {
        const state = get()
        const { selectedWavetableBank, selectedWavetable, selectedBank, selectedWave, selectedPosition } = state
        const currentEntries = getCurrentEntries(state)
        if (!canInsertAt(currentEntries, selectedPosition)) return
        get().addWaveAt(selectedWavetableBank, selectedWavetable, selectedBank, selectedWave, selectedPosition)
        const waveCount = waveBanks[selectedBank]?.waves.length ?? 0
        set({
            selectedPosition: Math.min(selectedPosition + 1, MAX_POSITION),
            selectedWave: waveCount > 0 ? Math.min(selectedWave + 1, waveCount - 1) : 0,
        })
    },

    removeWave: (entryIndex) => {
        const state = get()
        const entry = getCurrentEntries(state)[entryIndex]
        if (!entry) return
        get().removeWaveAt(state.selectedWavetableBank, state.selectedWavetable, entry.position)
    },

    moveWave: (entryIndex, direction) => {
        const state = get()
        const table = getCurrentEntries(state)
        const swapIndex = direction === 'up' ? entryIndex - 1 : entryIndex + 1
        if (swapIndex < 0 || swapIndex >= table.length) return
        get().moveWaveTo(state.selectedWavetableBank, state.selectedWavetable, table[entryIndex].position, table[swapIndex].position)
    },

    setWavePosition: (entryIndex, position) => {
        const state = get()
        const table = getCurrentEntries(state)
        const entry = table[entryIndex]
        if (!entry || entry.position === position) return
        const others = table.filter((_, i) => i !== entryIndex)
        if (!canInsertAt(others, position)) return
        get().removeWaveAt(state.selectedWavetableBank, state.selectedWavetable, entry.position)
        get().addWaveAt(state.selectedWavetableBank, state.selectedWavetable, entry.bankIndex, entry.waveIndex, position)
    },

    updateWavetable: (wavetableIndex) => {
        const { selectedWavetableBank, wavetablesByBank } = get()
        get().loadWavetableEntries(selectedWavetableBank, wavetableIndex, wavetablesByBank[selectedWavetableBank]?.[wavetableIndex] ?? [])
    },

    addWaveAt: (bankIndex, wavetableIndex, waveBankIndex, waveIndex, position) => {
        const { wavetablesByBank, wavetableNames } = get()
        const currentEntries = wavetablesByBank[bankIndex]?.[wavetableIndex] ?? []
        if (!canInsertAt(currentEntries, position)) return
        const newWavetablesByBank = cloneWavetablesByBank(wavetablesByBank)
        newWavetablesByBank[bankIndex][wavetableIndex] = insertWave(currentEntries, { bankIndex: waveBankIndex, waveIndex, position })
        set({ wavetablesByBank: newWavetablesByBank })
        persistWavetables({ wavetableNames, userWavetables: newWavetablesByBank[2] })

        if (!isMidiReceiving()) {
            updateWavetable(wavetableIndex, newWavetablesByBank[bankIndex][wavetableIndex])
        }
    },

    removeWaveAt: (bankIndex, wavetableIndex, position) => {
        const { wavetablesByBank, wavetableNames } = get()
        const newWavetablesByBank = cloneWavetablesByBank(wavetablesByBank)
        newWavetablesByBank[bankIndex][wavetableIndex] = newWavetablesByBank[bankIndex][wavetableIndex].filter((e) => e.position !== position)
        set({ wavetablesByBank: newWavetablesByBank })
        persistWavetables({ wavetableNames, userWavetables: newWavetablesByBank[2] })

        if (!isMidiReceiving()) {
            updateWavetable(wavetableIndex, newWavetablesByBank[bankIndex][wavetableIndex])
        }
    },

    moveWaveTo: (bankIndex, wavetableIndex, fromPosition, toPosition) => {
        const { wavetablesByBank, wavetableNames } = get()
        const table = (wavetablesByBank[bankIndex]?.[wavetableIndex] ?? []).map((e) => ({ ...e }))
        const moved = table.find((e) => e.position === fromPosition)
        if (!moved) return

        const occupant = table.find((e) => e.position === toPosition)
        if (occupant) {
            occupant.position = fromPosition
        }
        moved.position = toPosition

        const newWavetablesByBank = cloneWavetablesByBank(wavetablesByBank)
        newWavetablesByBank[bankIndex][wavetableIndex] = sortEntries(table)
        set({ wavetablesByBank: newWavetablesByBank })
        persistWavetables({ wavetableNames, userWavetables: newWavetablesByBank[2] })

        if (!isMidiReceiving()) {
            updateWavetable(wavetableIndex, newWavetablesByBank[bankIndex][wavetableIndex])
        }
    },

    loadWavetableEntries: (bankIndex, wavetableIndex, entries) => {
        const { wavetablesByBank, wavetableNames } = get()
        const newWavetablesByBank = cloneWavetablesByBank(wavetablesByBank)
        newWavetablesByBank[bankIndex][wavetableIndex] = sortEntries(entries)
        set({ wavetablesByBank: newWavetablesByBank })
        persistWavetables({ wavetableNames, userWavetables: newWavetablesByBank[2] })

        if (!isMidiReceiving()) {
            updateWavetable(wavetableIndex, newWavetablesByBank[bankIndex][wavetableIndex])
        }
    },
}))
