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
import patchFileSystemFacade from './patchFileSystemFacade'

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

async function savePatch(key: string) {
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

    await patchFileSystemFacade.savePatch(key, patch)
}

async function loadPatch(key: string, version?: string) {
    const patch = await patchFileSystemFacade.loadPatch(key, version)
    if (!patch) {
        console.log('Could not load file')
        return
    }
    patchApis.forEach((source) => source.setFromLoad(patch.controllers))
    modsApi.setFromLoad(patch.mods)
}

const patchStorageApi = {
    savePatch,
    loadPatch,
    renamePatch: patchFileSystemFacade.renamePatch,
    deletePatch: patchFileSystemFacade.deletePatch,

    createFolder: patchFileSystemFacade.createFolder,
    renameFolder: patchFileSystemFacade.renameFolder,
    deleteFolder: patchFileSystemFacade.deleteFolder,

    getFileTree: patchFileSystemFacade.getFileTree,
    getPatchVersions: patchFileSystemFacade.getPatchVersions,
}

export default patchStorageApi