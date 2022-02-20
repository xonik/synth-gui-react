import envMidiApi from '../synthcore/modules/env/envMidiApi'
import modsMidiApi from '../synthcore/modules/mods/modsMidiApi'
import mainDisplayMidiApi from '../synthcore/modules/mainDisplay/mainDisplayMidiApi'
import filtersMidiApi from '../synthcore/modules/filters/filtersMidiApi'
import lfoMidiApi from '../synthcore/modules/lfo/lfoMidiApi'
import voicesMidiApi from '../synthcore/modules/voices/voicesMidiApi'

const initReceive = () => {
    envMidiApi.initReceive()
    modsMidiApi.initReceive()
    mainDisplayMidiApi.initReceive()
    filtersMidiApi.initReceive()
    lfoMidiApi.initReceive()
    voicesMidiApi.initReceive()
}

const midiApi = {
    initReceive,
    env: envMidiApi,
    mods: modsMidiApi,
    mainDisplay: mainDisplayMidiApi,
    filters: filtersMidiApi,
    lfo: lfoMidiApi,
}

export default midiApi