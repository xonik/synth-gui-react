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

    await patchFileServerFacade.savePatch(key, patch)
}

async function loadPatch(key: string, version?: string) {
    const patch = await patchFileServerFacade.loadPatch(key, version)
    if (!patch) {
        console.log('Could not load file')
        return
    }
    patchApis.forEach((source) => source.setFromLoad(patch.controllers))
    modsApi.setFromLoad(patch.mods)
}

// TODO: Move patch.
const patchStorageApi = {
    savePatch,
    loadPatch,
    renamePatch: patchFileServerFacade.renamePatch,
    deletePatch: patchFileServerFacade.deletePatch,

    createFolder: patchFileServerFacade.createFolder,
    renameFolder: patchFileServerFacade.renameFolder,
    deleteFolder: patchFileServerFacade.deleteFolder,

    getFileTree: patchFileServerFacade.getFileTree,
    getPatchVersions: patchFileServerFacade.getPatchVersions,
}

export default patchStorageApi