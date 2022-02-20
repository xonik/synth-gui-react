import { store } from '../../store'
import midiApi from './modsMidiApi'
import { ApiSource } from '../../types'
import { dispatch, getBounded, getQuantized } from '../../utils'
import {
    setGuiSource as setGuiSourceAction,
    setGuiDstGroup as setGuiDstGroupAction,
    setGuiDstFunc as setGuiDstFuncAction,
    setGuiDstParam as setGuiDstParamAction,
    setModValue as setModValueAction,

    setUiAmount,
    setUiRouteButton,

    selectGuiSource,
    selectGuiDstGroup,
    selectGuiDstFunc,
    selectGuiDstParam,
    selectModValue,
    selectModsUi,
} from './modsReducer'
import { digitalModSources, modDst } from './utils'
import { numericPropFuncs } from '../common/commonApi'
import modsControllers from './modsControllers'
import modsMidiApi from './modsMidiApi'
import { createClickMapper, createIncrementMapper } from '../common/utils'

const setGuiMod = (
    guiSource: number,
    guiDstFunc: number,
    guiDstParam: number,
    source: ApiSource
) => {
    dispatch(setGuiSourceAction({ guiSource, source }))
    dispatch(setGuiDstFuncAction({ guiDstFunc, source }))
    dispatch(setGuiDstParamAction({ guiDstParam, source }))
}

const setGuiSource = (guiSource: number, source: ApiSource) => {
    const currSource = selectGuiSource(store.getState())
    if (guiSource !== currSource) {
        dispatch(setGuiSourceAction({ guiSource, source }))
    }
}

const incrementGuiSource = (inc: number, source: ApiSource) => {
    const currSource = selectGuiSource(store.getState())
    const nextSource = getBounded(currSource + inc, 0, digitalModSources.length - 1)
    setGuiSource(nextSource, source)
}

const setGuiDstGroup = (guiDstGroup: number, source: ApiSource) => {
    const currDstGroup = selectGuiDstGroup(store.getState())
    if (guiDstGroup !== currDstGroup) {
        dispatch(setGuiDstParamAction({ guiDstParam: 0, source }))
        dispatch(setGuiDstFuncAction({ guiDstFunc: 0, source }))
        dispatch(setGuiDstGroupAction({ guiDstGroup, source }))
    }
}

const incrementGuiDstGroup = (inc: number, source: ApiSource) => {
    const currDstGroup = selectGuiDstGroup(store.getState())
    const nextDstGroup = getBounded(currDstGroup + inc, 0, modDst.dsts.length - 1)
    setGuiDstGroup(nextDstGroup, source)
}

const setGuiDstFunc = (guiDstFunc: number, source: ApiSource) => {
    const currDstFunc = selectGuiDstFunc(store.getState())
    if (guiDstFunc !== currDstFunc) {
        dispatch(setGuiDstParamAction({ guiDstParam: 0, source }))
        dispatch(setGuiDstFuncAction({ guiDstFunc, source }))
    }
}

const incrementGuiDstFunc = (inc: number, source: ApiSource) => {
    const currDstGroup = selectGuiDstGroup(store.getState())
    const currDstFunc = selectGuiDstFunc(store.getState())
    const nextDstFunc = getBounded(currDstFunc + inc, 0, modDst.dsts[currDstGroup].length - 1)
    setGuiDstFunc(nextDstFunc, source)
}

const setGuiDstParam = (guiDstParam: number, source: ApiSource) => {
    const currDstParam = selectGuiDstParam(store.getState())
    if (guiDstParam !== currDstParam) {
        dispatch(setGuiDstParamAction({ guiDstParam, source }))
    }
}

const incrementGuiDstParam = (inc: -1 | 1, source: ApiSource) => {
    const currDstGroup = selectGuiDstGroup(store.getState())
    const currDstFunc = selectGuiDstFunc(store.getState())
    const currDstParam = selectGuiDstParam(store.getState())

    const lastGuiDstParam = modDst.dsts[currDstGroup][currDstFunc].length - 1
    const requestedGuiDstParam = currDstParam + inc
    if(requestedGuiDstParam < 0){
        if(currDstFunc > 0){
            const prevDstFunc = currDstFunc - 1
            setGuiDstFunc(prevDstFunc, source)
            const lastDstParam = modDst.dsts[currDstGroup][prevDstFunc].length - 1
            setGuiDstParam(lastDstParam, source)
        }
    } else if(requestedGuiDstParam > lastGuiDstParam){
        if(currDstFunc < modDst.dsts[currDstGroup].length -1){
            setGuiDstFunc(currDstFunc + 1, source)
        }

    } else {
        setGuiDstParam(requestedGuiDstParam, source)
    }
}

const setModValue = (sourceId: number, dstId: number, dstCtrlIndex: number, modValue: number, source: ApiSource) => {
    const quantizedValue = getQuantized(modValue, 32767)
    const currModValue = selectModValue(sourceId, dstId, dstCtrlIndex)(store.getState())

    if (quantizedValue === currModValue) {
        return
    }

    dispatch(setModValueAction({ sourceId, dstId, dstCtrlIndex, modValue: quantizedValue, source }))
    midiApi.setSourceId(source, sourceId)
    midiApi.setDstId(source, dstId, dstCtrlIndex)
    midiApi.setAmount(source, modValue)
}

const incrementGuiModValue = (inc: number, source: ApiSource) => {
    const sourceIndex = selectGuiSource(store.getState())
    const dstGroupIndex = selectGuiDstGroup(store.getState())
    const dstFuncIndex = selectGuiDstFunc(store.getState())
    const dstParamIndex = selectGuiDstParam(store.getState())

    const sourceId = digitalModSources[sourceIndex].id
    const dstId = modDst.dsts[dstGroupIndex][dstFuncIndex][dstParamIndex].id
    const dstCtrlIndex = modDst.funcProps[dstGroupIndex][dstFuncIndex].ctrlIndex || 0

    const currModValue = selectModValue(sourceId, dstId, dstCtrlIndex)(store.getState())
    const nextModValue = getBounded(currModValue + inc, -1, 1)
    setModValue(sourceId, dstId, dstCtrlIndex, nextModValue, source)
}

const uiAmount = numericPropFuncs({
    selector: () => selectModsUi(store.getState()).amount,
    action: setUiAmount,
})

const setRouteButton = (value: number, source: ApiSource) => {
    const currentValue = selectModsUi(store.getState()).routeButton
    const boundedValue = getBounded(value, 0, modsControllers.ROUTE_BUTTON.values.length - 1)

    if (value === currentValue) {
        return
    }
    dispatch(setUiRouteButton({ value: boundedValue }))
    modsMidiApi.setUiRouteButton(source, boundedValue)
}

const toggleRouteButton = (value: number, source: ApiSource) => {
    const currentValue = selectModsUi(store.getState()).routeButton
    if(value === currentValue) {
        setRouteButton(0, source)
    } else {
        setRouteButton(value, source)
    }
}

const increment = createIncrementMapper([
    [modsControllers.UI_AMOUNT, ({value,  source}) => uiAmount.increment(value, source)],
])
const toggle = createClickMapper([
])

const modsApi = {
    setGuiMod,
    setGuiSource,
    incrementGuiSource,
    setGuiDstGroup,
    incrementGuiDstGroup,
    setGuiDstFunc,
    incrementGuiDstFunc,
    setGuiDstParam,
    incrementGuiDstParam,
    setModValue,
    incrementGuiModValue,

    setUiAmount: uiAmount.set,


    setRouteButton,
    toggleRouteButton,

    increment,
    toggle,
}

export default modsApi