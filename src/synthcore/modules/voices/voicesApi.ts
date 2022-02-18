import {
    setVoiceState as setVoiceStateAction,
    selectVoices,
} from './voicesReducer'
import { store } from '../../store'
import { ApiSource } from '../../types'
import { dispatch, getBounded } from '../../utils'
import voicesControllers from './voicesControllers'
import voicesMidiApi from './voicesMidiApi'

const setVoiceState = (id: number, value: number, source: ApiSource) => {
    const voices = selectVoices(store.getState())
    if(id >= voices.length){
        return
    }
    const currentValue = voices[id].state;
    // all voices have same length
    const boundedValue = getBounded(value, 0, voicesControllers.VOICE1.values.length - 1)

    if (boundedValue === currentValue) {
        return
    }

    dispatch(setVoiceStateAction({voice: id, value: boundedValue }))
    voicesMidiApi.setVoiceState(source, id, boundedValue)
}

const toggleVoiceState = (id: number, source: ApiSource) => {
    const voices = selectVoices(store.getState())
    if(id >= voices.length){
        return
    }
    const currentValue = voices[id].state;
    const possibleStates = voicesControllers.VOICE1.values.length;
    setVoiceState(id,(currentValue + 1 + possibleStates) % possibleStates, source)
}

const voicesApi = {
    setVoiceState,
    toggleVoiceState,
}

export default voicesApi