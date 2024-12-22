import {
    arpApi,
    commonFxApi,
    envApi,
    filtersApi,
    fxApi,
    kbdApi,
    lfoApi,
    noiseApi,
    oscApi,
    postMixApi,
    ringModApi,
    srcMixApi
} from '../../synthcoreApi'
import { PatchControllers } from '../common/types'
import modsApi from '../mods/modsApi'
import patchFileServerFacade from './patchFileServerFacade'
import { Patch } from './types'
import { dispatch } from '../../utils'
import { selectIsAuditing, selectPreviousPatch, setAuditing, setPreviousPatch } from './patchStorageReducer'
import { store } from '../../store'
import { getVoiceGroupIndex } from "../../selectedVoiceGroup";

const patchApis = [
    arpApi,
    commonFxApi,
    envApi, // TODO for custom handlers and multiple ctrlIndex
    filtersApi,
    fxApi,
    kbdApi,
    lfoApi, // TODO for custom handlers and multiple ctrlIndex
    noiseApi,
    oscApi,
    postMixApi,
    ringModApi,
    srcMixApi,
]

function getCurrentPatch() {
    const voiceGroupIndex = getVoiceGroupIndex()
    const patchControllers = patchApis.reduce((
        mergedControllers: PatchControllers,
        api
    ) => {
        const patchControllers = api.getForSave(voiceGroupIndex)
        return {
            ...mergedControllers,
            ...patchControllers
        }
    }, {})

    const mods = modsApi.getForSave(voiceGroupIndex)
    const patch: Patch = {
        controllers: patchControllers,
        mods,
    }
    return patch
}

function setCurrentPatch(patch: Patch) {
    const voiceGroupIndex = getVoiceGroupIndex()
    console.log('Setting patch', patch)
    patchApis.forEach((source) => source.setFromLoad(voiceGroupIndex, patch.controllers))
    modsApi.setFromLoad(voiceGroupIndex, patch.mods)
}

async function savePatch(key: string) {
    const previousPatch = selectPreviousPatch(store.getState())
    const isAuditing = selectIsAuditing(store.getState())
    if (isAuditing && previousPatch) {
        console.log('Reverting before save')
        patchStorageApi.revertToCurrentPatch()
    }
    await patchFileServerFacade.savePatch(key, getCurrentPatch())
}

async function loadPatch(key: string, version?: string) {
    try {
        const voiceGroupIndex = getVoiceGroupIndex()

        const patch = await patchFileServerFacade.loadPatch(key, version)
        console.log('Received', patch)
        patchApis.forEach((source) => source.setFromLoad(voiceGroupIndex, patch.controllers))
        modsApi.setFromLoad(voiceGroupIndex, patch.mods)

        dispatch(setPreviousPatch({ patch: undefined }))
        dispatch(setAuditing({ voiceGroupIndex: -1, value: false }))
    } catch (err) {
        console.log('Could not load file')
        return
    }
}

async function auditPatch(key: string, version?: string) {
    try {
        // Store the current patch - but only if it has not yet been set, to be able to run
        // this function multiple times without losing state.
        const isAuditing = selectIsAuditing(store.getState())
        if (!isAuditing) {
            dispatch(setAuditing({ voiceGroupIndex: -1, value: true }))
            const previousPatch = getCurrentPatch()
            dispatch(setPreviousPatch({ patch: previousPatch }))
            console.log('Stored current patch as ', previousPatch)
        }

        const patch = await patchFileServerFacade.loadPatch(key, version)

        console.log('Received for auditing', patch)
        setCurrentPatch(patch)
    } catch (err) {
        console.log('Could not load file for auditing')
        return
    }
}

function revertToCurrentPatch() {
    try {
        const previousPatch = selectPreviousPatch(store.getState())
        const isAuditing = selectIsAuditing(store.getState())
        console.log('Reverting to current patch', isAuditing, previousPatch)
        if (isAuditing && previousPatch) {
            setCurrentPatch(previousPatch)
            dispatch(setPreviousPatch({ patch: undefined }))
        }
        dispatch(setAuditing({ voiceGroupIndex: -1, value: false }))
    } catch (err) {
        console.log('Could not revert to current patch')
        return
    }
}

// TODO: Move patch.
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