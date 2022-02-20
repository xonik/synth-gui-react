import envMidiApi from '../synthcore/modules/env/envMidiApi'
import modsMidiApi from '../synthcore/modules/mods/modsMidiApi'
import mainDisplayMidiApi from '../synthcore/modules/mainDisplay/mainDisplayMidiApi'
import lfoMidiApi from '../synthcore/modules/lfo/lfoMidiApi'
import voicesMidiApi from '../synthcore/modules/voices/voicesMidiApi'

const initReceive = () => {
    envMidiApi.initReceive()
    modsMidiApi.initReceive()
    mainDisplayMidiApi.initReceive()
    lfoMidiApi.initReceive()
    voicesMidiApi.initReceive()
}

const midiApi = {
    initReceive,
    env: envMidiApi,
    mods: modsMidiApi,
    mainDisplay: mainDisplayMidiApi,
    lfo: lfoMidiApi,
}

export default midiApi