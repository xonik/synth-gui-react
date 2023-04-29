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
    envApi, // TODO for custom handlers and multiple ctrlIndex
    filtersApi,
    fxApi,
    kbdApi,
    lfoApi, // TODO for custom handlers and multiple ctrlIndex
    noiseApi,
    oscApi,
    outApi,
    postMixApi,
    ringModApi,
    srcMixApi,
]

const savePatch = () => {
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