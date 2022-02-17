import envMidiApi from '../synthcore/modules/env/envMidiApi'
import modsMidiApi from '../synthcore/modules/mods/modsMidiApi'
import mainDisplayMidiApi from '../synthcore/modules/mainDisplay/mainDisplayMidiApi'
import oscMidiApi from '../synthcore/modules/osc/oscMidiApi'
import filtersMidiApi from '../synthcore/modules/filters/filtersMidiApi'

const initReceive = () => {
    envMidiApi.initReceive()
    modsMidiApi.initReceive()
    mainDisplayMidiApi.initReceive()
    oscMidiApi.initReceive()
    filtersMidiApi.initReceive()
}

const midiApi = {
    initReceive,
    env: envMidiApi,
    mods: modsMidiApi,
    mainDisplay: mainDisplayMidiApi,
    osc: oscMidiApi,
}

export default midiApi