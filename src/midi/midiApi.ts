import mainDisplayMidiApi from '../synthcore/modules/mainDisplay/mainDisplayMidiApi'
import modsMidiApi from '../synthcore/modules/mods/modsMidiApi'
import { startSynthConnectionMonitor } from './synthConnection'

const initReceive = () => {
    modsMidiApi.initReceive()
    mainDisplayMidiApi.initReceive()
    startSynthConnectionMonitor()
}

const midiApi = {
    initReceive,
    mods: modsMidiApi,
    mainDisplay: mainDisplayMidiApi,
}

export default midiApi
