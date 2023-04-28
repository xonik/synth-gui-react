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
    outApi, postMixApi, ringModApi, srcMixApi
} from '../../synthcoreApi'
import { PatchControllers } from '../common/types'


const patchApis = [
    arpApi,
    commonFxApi,
    envApi, // TODO
    filtersApi,
    fxApi,
    kbdApi,
    lfoApi, // TODO
    noiseApi,
    oscApi,
    outApi,
    postMixApi,
    ringModApi,
    srcMixApi,
]

const savePatch = () => {
    const patchControllers = patchApis.reduce((mergedControllers: PatchControllers, source) => {
        return {
            ...mergedControllers,
            ...source.getForSave()
        }
    }, {})
    console.log('SAVE', patchControllers)
}

const loadPatch = () => {
    const patchControllers = {} // TODO: Load from file
    patchApis.forEach((source) => source.setFromLoad(patchControllers))
}

const patchStorageApi = {
    savePatch,
    loadPatch,
}

export default patchStorageApi