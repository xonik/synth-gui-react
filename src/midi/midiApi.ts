import envMidiApi from '../synthcore/modules/env/envMidiApi'
import modsMidiApi from '../synthcore/modules/mods/modsMidiApi'
import mainDisplayMidiApi from '../synthcore/modules/mainDisplay/mainDisplayMidiApi'
import oscMidiApi from '../synthcore/modules/osc/oscMidiApi'
import filtersMidiApi from '../synthcore/modules/filters/filtersMidiApi'
import srcMixMidiApi from '../synthcore/modules/srcMix/srcMixMidiApi'
import fxMidiApi from '../synthcore/modules/fx/fxMidiApi'
import ringModMidiApi from '../synthcore/modules/ringMod/ringModMidiApi'

const initReceive = () => {
    envMidiApi.initReceive()
    modsMidiApi.initReceive()
    mainDisplayMidiApi.initReceive()
    oscMidiApi.initReceive()
    filtersMidiApi.initReceive()
    srcMixMidiApi.initReceive()
    fxMidiApi.initReceive()
    ringModMidiApi.initReceive()
}

const midiApi = {
    initReceive,
    env: envMidiApi,
    mods: modsMidiApi,
    mainDisplay: mainDisplayMidiApi,
    osc: oscMidiApi,
    filters: filtersMidiApi,
    srcMix: srcMixMidiApi,
    fx: fxMidiApi,
    ringMod: ringModMidiApi,
}

export default midiApi