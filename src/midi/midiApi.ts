import modsMidiApi from '../synthcore/modules/mods/modsMidiApi'
import mainDisplayMidiApi from '../synthcore/modules/mainDisplay/mainDisplayMidiApi'

const initReceive = () => {
    modsMidiApi.initReceive()
    mainDisplayMidiApi.initReceive()
}

const midiApi = {
    initReceive,
    mods: modsMidiApi,
    mainDisplay: mainDisplayMidiApi,
}

export default midiApi
