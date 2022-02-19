import {
    setVoiceState as setVoiceStateAction,
    selectVoices,
} from './voicesReducer'
import { store } from '../../store'
import { ApiSource } from '../../types'
import { dispatch, getBounded } from '../../utils'
import voicesControllers from './voicesControllers'
import voicesMidiApi from './voicesMidiApi'
import { createClickMapper, createIncrementMapper } from '../common/utils'

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


const click = createClickMapper([
    [voicesControllers.VOICE1, ({source}) => toggleVoiceState(0, source)],
    [voicesControllers.VOICE2, ({source}) => toggleVoiceState(1, source)],
    [voicesControllers.VOICE3, ({source}) => toggleVoiceState(2, source)],
    [voicesControllers.VOICE4, ({source}) => toggleVoiceState(3, source)],
    [voicesControllers.VOICE5, ({source}) => toggleVoiceState(4, source)],
    [voicesControllers.VOICE6, ({source}) => toggleVoiceState(5, source)],
    [voicesControllers.VOICE7, ({source}) => toggleVoiceState(6, source)],
    [voicesControllers.VOICE8, ({source}) => toggleVoiceState(7, source)],
])
const increment = createIncrementMapper([
])
const voicesApi = {
    setVoiceState,
    click,
    increment,
}

export default voicesApi