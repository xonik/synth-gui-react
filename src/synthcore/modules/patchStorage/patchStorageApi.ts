import { type VoiceGroupPatch, voiceGroupStores } from '@/store/patchStore'
import modsApi from '../mods/modsApi'
import { getVoiceGroupIndex } from '../voices/currentVoiceGroupIndex'
import patchFileServerFacade from './patchFileServerFacade'
import type { Patch } from './types'

let auditing = false
let previousPatch: Patch | undefined

function getCurrentPatch(): Patch {
    const voiceGroupIndex = getVoiceGroupIndex()
    const state = voiceGroupStores[voiceGroupIndex].getState()

    // Extract the patch data (everything except actions)
    const { set: _set, loadPatch: _loadPatch, getPatch: _getPatch, ...patchData } = state

    const mods = modsApi.getForSave(voiceGroupIndex)
    return {
        controllers: patchData as any,
        mods,
    }
}

function setCurrentPatch(patch: Patch) {
    const voiceGroupIndex = getVoiceGroupIndex()

    // Load the patch data into the Zustand store
    if (patch.controllers) {
        voiceGroupStores[voiceGroupIndex].getState().loadPatch(patch.controllers as unknown as VoiceGroupPatch)
    }
    modsApi.setFromLoad(voiceGroupIndex, patch.mods)
}

async function savePatch(key: string) {
    if (auditing && previousPatch) {
        console.log('Reverting before save')
        patchStorageApi.revertToCurrentPatch()
    }
    await patchFileServerFacade.savePatch(key, getCurrentPatch())
}

async function loadPatch(key: string, version?: string) {
    try {
        const patch = await patchFileServerFacade.loadPatch(key, version)
        console.log('Received', patch)
        setCurrentPatch(patch)
        previousPatch = undefined
        auditing = false
    } catch (_err) {
        console.log('Could not load file')
        return
    }
}

async function auditPatch(key: string, version?: string) {
    try {
        if (!auditing) {
            auditing = true
            previousPatch = getCurrentPatch()
            console.log('Stored current patch as ', previousPatch)
        }

        const patch = await patchFileServerFacade.loadPatch(key, version)
        console.log('Received for auditing', patch)
        setCurrentPatch(patch)
    } catch (_err) {
        console.log('Could not load file for auditing')
        return
    }
}

function revertToCurrentPatch() {
    try {
        console.log('Reverting to current patch', auditing, previousPatch)
        if (auditing && previousPatch) {
            setCurrentPatch(previousPatch)
            previousPatch = undefined
        }
        auditing = false
    } catch (_err) {
        console.log('Could not revert to current patch')
        return
    }
}

const patchStorageApi = {
    savePatch,
    loadPatch,
    auditPatch,
    revertToCurrentPatch,
    renamePatch: patchFileServerFacade.renamePatch,
    deletePatch: patchFileServerFacade.deletePatch,

    createFolder: patchFileServerFacade.createFolder,
    renameFolder: patchFileServerFacade.renameFolder,
    deleteFolder: patchFileServerFacade.deleteFolder,

    getFileTree: patchFileServerFacade.getFileTree,
    getPatchVersions: patchFileServerFacade.getPatchVersions,
}

export default patchStorageApi
