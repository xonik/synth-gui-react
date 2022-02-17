import {
    setVolume,
    setSpread,
    setHeadphones,
    selectOut
} from './outReducer'
import { store } from '../../store'
import outMidiApi from './outMidiApi'
import { numericPropFuncs } from '../common/commonApi'

const volume = numericPropFuncs({
    selector: () => selectOut(store.getState()).volume,
    action: setVolume,
    midi: outMidiApi.setVolume,
})
const spread = numericPropFuncs({
    selector: () => selectOut(store.getState()).spread,
    action: setSpread,
    midi: outMidiApi.setSpread,
})
const headphones = numericPropFuncs({
    selector: () => selectOut(store.getState()).headphones,
    action: setHeadphones,
    midi: outMidiApi.setHeadphones,
})

const outApi = {
    setVolume: volume.set,
    setSpread: spread.set,
    setHeadphones: headphones.set,

    incrementVolume: volume.increment,
    incrementSpread: spread.increment,
    incrementHeadphones: headphones.increment,

}

export default outApi