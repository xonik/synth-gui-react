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


const patchApis = [
    arpApi,
    commonFxApi,
    envApi, // TODO
    filtersApi,
    fxApi,
    kbdApi,
    lfoApi, // TODO
    noiseApi,
    oscApi, // TODO
    outApi,
    postMixApi,
    ringModApi,
    srcMixApi,
]

const savePatch = () => {
    const patchControllers = patchApis.map((source) => source.getForSave())
    // TODO: Save to file
}

const loadPatch = () => {
    const patchControllers = {} // TODO: Load from file
    patchApis.forEach((source) => source.setFromLoad(patchControllers))
}