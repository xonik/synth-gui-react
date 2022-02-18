import envMidiApi from '../synthcore/modules/env/envMidiApi'
import modsMidiApi from '../synthcore/modules/mods/modsMidiApi'
import mainDisplayMidiApi from '../synthcore/modules/mainDisplay/mainDisplayMidiApi'
import oscMidiApi from '../synthcore/modules/osc/oscMidiApi'
import filtersMidiApi from '../synthcore/modules/filters/filtersMidiApi'
import srcMixMidiApi from '../synthcore/modules/srcMix/srcMixMidiApi'
import fxMidiApi from '../synthcore/modules/fx/fxMidiApi'
import ringModMidiApi from '../synthcore/modules/ringMod/ringModMidiApi'
import noiseMidiApi from '../synthcore/modules/noise/noiseMidiApi'
import masterClockMidiApi from '../synthcore/modules/masterClock/masterClockMidiApi'
import arpMidiApi from '../synthcore/modules/arp/arpMidiApi'
import kbdMidiApi from '../synthcore/modules/kbd/kbdMidiApi'
import commonFxMidiApi from '../synthcore/modules/commonFx/commonFxMidiApi'
import outMidiApi from '../synthcore/modules/out/outMidiApi'
import lfoMidiApi from '../synthcore/modules/lfo/lfoMidiApi'

const initReceive = () => {
    envMidiApi.initReceive()
    modsMidiApi.initReceive()
    mainDisplayMidiApi.initReceive()
    oscMidiApi.initReceive()
    filtersMidiApi.initReceive()
    srcMixMidiApi.initReceive()
    fxMidiApi.initReceive()
    ringModMidiApi.initReceive()
    noiseMidiApi.initReceive()
    masterClockMidiApi.initReceive()
    arpMidiApi.initReceive()
    kbdMidiApi.initReceive()
    commonFxMidiApi.initReceive()
    outMidiApi.initReceive()
    lfoMidiApi.initReceive()
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
    noise: noiseMidiApi,
    masterClock: masterClockMidiApi,
    arp: arpMidiApi,
    kbd: kbdMidiApi,
    commonFx: commonFxMidiApi,
    out: outMidiApi,
    lfo: lfoMidiApi,
}

export default midiApi