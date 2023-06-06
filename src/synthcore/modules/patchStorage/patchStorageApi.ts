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

export type Patch = {
    controllers: PatchControllers,
    mods: number [][][],
}

let isAuditing = false
let previousPatch: Patch | undefined

function getCurrentPatch() {
    const patchControllers = patchApis.reduce((
        mergedControllers: PatchControllers,
        api
    ) => {
        const patchControllers = api.getForSave()
        return {
            ...mergedControllers,
            ...patchControllers
        }
    }, {})

    const mods = modsApi.getForSave()
    const patch: Patch = {
        controllers: patchControllers,
        mods,
    }
    return patch
}

function setCurrentPatch(patch: Patch) {
    console.log('Setting patch', patch)
    patchApis.forEach((source) => source.setFromLoad(patch.controllers))
    modsApi.setFromLoad(patch.mods)
}

async function savePatch(key: string) {
    if(isAuditing && previousPatch){
        console.log('Reverting before save')
        patchStorageApi.revertToCurrentPatch()
    }
    await patchFileServerFacade.savePatch(key, getCurrentPatch())
}

async function loadPatch(key: string, version?: string) {
    try {
        const patch = await patchFileServerFacade.loadPatch(key, version)
        console.log('Received', patch)
        patchApis.forEach((source) => source.setFromLoad(patch.controllers))
        modsApi.setFromLoad(patch.mods)

        previousPatch = undefined
        isAuditing = false
    } catch (err) {
        console.log('Could not load file')
        return
    }
}

async function auditPatch(key: string, version?: string) {
    try {
        // Store the current patch - but only if it has not yet been set, to be able to run
        // this function multiple times without losing state.
        if(!isAuditing) {
            isAuditing = true
            previousPatch = getCurrentPatch()
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
        console.log('Reverting to current patch', isAuditing, previousPatch)
        if(isAuditing && previousPatch) {
            setCurrentPatch(previousPatch)
            previousPatch = undefined
        }
        isAuditing = false
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