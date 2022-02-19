import {
    setVolume,
    setSpread,
    setHeadphones,
    selectOut
} from './outReducer'
import { store } from '../../store'
import outMidiApi from './outMidiApi'
import { numericPropFuncs } from '../common/commonApi'
import { createClickMapper, createIncrementMapper } from '../common/utils'
import outControllers from './outControllers'
import { ApiSource } from '../../types'

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


const increment = createIncrementMapper([
    [outControllers.VOLUME, (value: number, source: ApiSource) => volume.increment(value, source)],
    [outControllers.SPREAD, (value: number, source: ApiSource) => spread.increment(value, source)],
    [outControllers.HEADPHONES, (value: number, source: ApiSource) => headphones.increment(value, source)],
])
const click = createClickMapper([
])

const outApi = {
    setVolume: volume.set,
    setSpread: spread.set,
    setHeadphones: headphones.set,

    increment,
    click,
}

export default outApi