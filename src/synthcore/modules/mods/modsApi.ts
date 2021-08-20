import { store } from '../../store'
import midiApi from './modsMidiApi'
import { ApiSource } from '../../types'
import { dispatch, getBounded, getQuantized } from '../../utils'
import {
    setGuiSource as setGuiSourceAction,
    setGuiTargetGroup as setGuiTargetGroupAction,
    setGuiTargetFunc as setGuiTargetFuncAction,
    setGuiTargetParam as setGuiTargetParamAction,
    setModValue as setModValueAction,
    selectGuiSource,
    selectGuiTargetGroup,
    selectGuiTargetFunc,
    selectGuiTargetParam,
    selectModValue
} from './modsReducer'
import { digitalModSources, modTarget } from './utils'

const setGuiMod = (
    guiSource: number,
    guiTargetFunc: number,
    guiTargetParam: number,
    source: ApiSource
) => {
    dispatch(setGuiSourceAction({ guiSource, source }))
    dispatch(setGuiTargetFuncAction({ guiTargetFunc, source }))
    dispatch(setGuiTargetParamAction({ guiTargetParam, source }))
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

const setGuiTargetGroup = (guiTargetGroup: number, source: ApiSource) => {
    const currTargetGroup = selectGuiTargetGroup(store.getState())
    if (guiTargetGroup !== currTargetGroup) {
        dispatch(setGuiTargetParamAction({ guiTargetParam: 0, source }))
        dispatch(setGuiTargetFuncAction({ guiTargetFunc: 0, source }))
        dispatch(setGuiTargetGroupAction({ guiTargetGroup, source }))
    }
}

const incrementGuiTargetGroup = (inc: number, source: ApiSource) => {
    const currTargetGroup = selectGuiTargetGroup(store.getState())
    const nextTargetGroup = getBounded(currTargetGroup + inc, 0, modTarget.targets.length - 1)
    setGuiTargetGroup(nextTargetGroup, source)
}

const setGuiTargetFunc = (guiTargetFunc: number, source: ApiSource) => {
    const currTargetFunc = selectGuiTargetFunc(store.getState())
    if (guiTargetFunc !== currTargetFunc) {
        dispatch(setGuiTargetParamAction({ guiTargetParam: 0, source }))
        dispatch(setGuiTargetFuncAction({ guiTargetFunc, source }))
    }
}

const incrementGuiTargetFunc = (inc: number, source: ApiSource) => {
    const currTargetGroup = selectGuiTargetGroup(store.getState())
    const currTargetFunc = selectGuiTargetFunc(store.getState())
    const nextTargetFunc = getBounded(currTargetFunc + inc, 0, modTarget.targets[currTargetGroup].length - 1)
    setGuiTargetFunc(nextTargetFunc, source)
}

const setGuiTargetParam = (guiTargetParam: number, source: ApiSource) => {
    const currTargetParam = selectGuiTargetParam(store.getState())
    if (guiTargetParam !== currTargetParam) {
        dispatch(setGuiTargetParamAction({ guiTargetParam, source }))
    }
}

const incrementGuiTargetParam = (inc: -1 | 1, source: ApiSource) => {
    const currTargetGroup = selectGuiTargetGroup(store.getState())
    const currTargetFunc = selectGuiTargetFunc(store.getState())
    const currTargetParam = selectGuiTargetParam(store.getState())

    const lastGuiTargetParam = modTarget.targets[currTargetGroup][currTargetFunc].length - 1
    const requestedGuiTargetParam = currTargetParam + inc
    if(requestedGuiTargetParam < 0){
        if(currTargetFunc > 0){
            const prevTargetFunc = currTargetFunc - 1
            setGuiTargetFunc(prevTargetFunc, source)
            const lastTargetParam = modTarget.targets[currTargetGroup][prevTargetFunc].length - 1
            setGuiTargetParam(lastTargetParam, source)
        }
    } else if(requestedGuiTargetParam > lastGuiTargetParam){
        if(currTargetFunc < modTarget.targets[currTargetGroup].length -1){
            setGuiTargetFunc(currTargetFunc + 1, source)
        }

    } else {
        setGuiTargetParam(requestedGuiTargetParam, source)
    }
}

const setModValue = (sourceId: number, targetId: number, targetCtrlIndex: number, modValue: number, source: ApiSource) => {
    const quantizedValue = getQuantized(modValue, 32767)
    const currModValue = selectModValue(sourceId, targetId, targetCtrlIndex)(store.getState())

    if (quantizedValue === currModValue) {
        return
    }

    dispatch(setModValueAction({ sourceId, targetId, targetCtrlIndex, modValue: quantizedValue, source }))
    midiApi.setSourceId(source, sourceId)
    midiApi.setTargetId(source, targetId, targetCtrlIndex)
    midiApi.setAmount(source, modValue)
}

const incrementGuiModValue = (inc: number, source: ApiSource) => {
    const sourceIndex = selectGuiSource(store.getState())
    const targetGroupIndex = selectGuiTargetGroup(store.getState())
    const targetFuncIndex = selectGuiTargetFunc(store.getState())
    const targetParamIndex = selectGuiTargetParam(store.getState())

    const sourceId = digitalModSources[sourceIndex].id
    const targetId = modTarget.targets[targetGroupIndex][targetFuncIndex][targetParamIndex].id
    const targetCtrlIndex = modTarget.funcProps[targetGroupIndex][targetFuncIndex].ctrlIndex || 0

    const currModValue = selectModValue(sourceId, targetId, targetCtrlIndex)(store.getState())
    const nextModValue = getBounded(currModValue + inc, -1, 1)
    setModValue(sourceId, targetId, targetCtrlIndex, nextModValue, source)
}

const modsApi = {
    setGuiMod,
    setGuiSource,
    incrementGuiSource,
    setGuiTargetGroup,
    incrementGuiTargetGroup,
    setGuiTargetFunc,
    incrementGuiTargetFunc,
    setGuiTargetParam,
    incrementGuiTargetParam,
    setModValue,
    incrementGuiModValue,
}

export default modsApi