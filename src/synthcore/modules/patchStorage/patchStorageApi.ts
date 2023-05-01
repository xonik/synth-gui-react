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

type Patch = {
    controllers: PatchControllers,
    mods: number [][][],
}

const savePatch = (): Patch => {
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
    savedPatch = {
        controllers: patchControllers,
        mods,
    }
    console.log('SAVE', savedPatch)
    return savedPatch
}

let savedPatch: {
    controllers: PatchControllers,
    mods: number[][][]
} | undefined

const loadPatch = () => {
    if (!savedPatch) return
    //const patchControllers = {} // TODO: Load from file
    const patchControllers = savedPatch
    patchApis.forEach((source) => source.setFromLoad(patchControllers.controllers))
    modsApi.setFromLoad(savedPatch.mods)
}

const patchStorageApi = {
    savePatch,
    loadPatch,
}

export default patchStorageApi