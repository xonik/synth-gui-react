/**
 * Patch serialization — save/load patches as human-readable JSON.
 *
 * The Zustand store shape IS the patch format. We just need to:
 * - Strip out actions before saving
 * - Validate on load
 * - Handle versioning for future compatibility
 */

import { VoiceGroupPatch, defaultVoiceGroupPatch, voiceGroupStores } from './patchStore'
import { GlobalPatchState, globalStore } from './globalStore'

export interface PatchFile {
    version: 1
    name: string
    createdAt: string
    global: GlobalPatchState
    voiceGroups: VoiceGroupPatch[]
}

/**
 * Collect current state from all stores into a saveable patch file.
 */
export function createPatchFile(name: string): PatchFile {
    return {
        version: 1,
        name,
        createdAt: new Date().toISOString(),
        global: globalStore.getState().getPatch(),
        voiceGroups: voiceGroupStores.map((store) => store.getState().getPatch()),
    }
}

/**
 * Serialize a patch to human-readable JSON.
 */
export function serializePatch(patch: PatchFile): string {
    return JSON.stringify(patch, null, 2)
}

/**
 * Deserialize a patch from JSON string.
 */
export function deserializePatch(json: string): PatchFile {
    const parsed = JSON.parse(json) as PatchFile

    if (parsed.version !== 1) {
        throw new Error(`Unsupported patch version: ${parsed.version}`)
    }

    return parsed
}

/**
 * Load a patch file into all stores.
 */
export function loadPatchFile(patch: PatchFile): void {
    // Load global state
    globalStore.getState().loadPatch(patch.global)

    // Load each voice group, falling back to defaults for missing groups
    voiceGroupStores.forEach((store, index) => {
        if (index < patch.voiceGroups.length) {
            store.getState().loadPatch(patch.voiceGroups[index])
        } else {
            store.getState().loadPatch(defaultVoiceGroupPatch())
        }
    })
}

/**
 * Reset all stores to default values.
 */
export function resetAllStores(): void {
    voiceGroupStores.forEach((store) => {
        store.getState().loadPatch(defaultVoiceGroupPatch())
    })
    globalStore.getState().loadPatch({
        masterClock: { rate: 0.5, source: 0 },
        arp: {
            bpm: 0.5, onOff: 0, trigger: 0, sync: 0, range: 0,
            mode: 0, extendedMode: 0, sequence: 0, noteOrdering: 0,
            startSync: 0, fuzzyStart: 0, stopOnRelease: 0,
        },
    })
}
