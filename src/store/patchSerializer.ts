/**
 * Patch serialization — save/load patches as human-readable JSON.
 *
 * A patch represents a single voice group's settings. Loading a patch
 * applies it to the currently selected voice group only.
 */

import { defaultVoiceGroupPatch, type VoiceGroupPatch, voiceGroupStores } from './patchStore'
import { useUiStore } from './uiStore'

export interface PatchFile {
    version: 1
    name: string
    createdAt: string
    patch: VoiceGroupPatch
}

/**
 * Create a patch file from the currently selected voice group.
 */
export function createPatchFile(name: string): PatchFile {
    const voiceGroupIndex = useUiStore.getState().currentVoiceGroupIndex
    return {
        version: 1,
        name,
        createdAt: new Date().toISOString(),
        patch: voiceGroupStores[voiceGroupIndex].getState().getPatch(),
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
 * Load a patch into the currently selected voice group.
 */
export function loadPatchFile(patch: PatchFile): void {
    const voiceGroupIndex = useUiStore.getState().currentVoiceGroupIndex
    voiceGroupStores[voiceGroupIndex].getState().loadPatch(patch.patch)
}

/**
 * Load a patch into a specific voice group.
 */
export function loadPatchToVoiceGroup(patch: PatchFile, voiceGroupIndex: number): void {
    voiceGroupStores[voiceGroupIndex].getState().loadPatch(patch.patch)
}

/**
 * Reset the currently selected voice group to default values.
 */
export function resetCurrentVoiceGroup(): void {
    const voiceGroupIndex = useUiStore.getState().currentVoiceGroupIndex
    voiceGroupStores[voiceGroupIndex].getState().loadPatch(defaultVoiceGroupPatch())
}

/**
 * Reset all voice groups to default values.
 */
export function resetAllStores(): void {
    voiceGroupStores.forEach((store) => {
        store.getState().loadPatch(defaultVoiceGroupPatch())
    })
}
