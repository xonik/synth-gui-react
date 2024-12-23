import modsMidiApi from '../synthcore/modules/mods/modsMidiApi'
import mainDisplayMidiApi from '../synthcore/modules/mainDisplay/mainDisplayMidiApi'
import lfoMidiApi from '../synthcore/modules/lfo/lfoMidiApi'
import envMidiApi from '../synthcore/modules/env/envMidiApi'

const initReceive = () => {
    modsMidiApi.initReceive()
    envMidiApi.initReceive()
    mainDisplayMidiApi.initReceive()
    lfoMidiApi.initReceive()
}

const midiApi = {
    initReceive,
    mods: modsMidiApi,
    mainDisplay: mainDisplayMidiApi,
    lfo: lfoMidiApi,
}

export default midiApi