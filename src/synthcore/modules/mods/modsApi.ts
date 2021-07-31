import { store } from '../../store'
import midiApi from '../../../midi/midiApi'
import { ApiSource } from '../../types'
import { dispatch, getBounded } from '../../utils'
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
import { modSources, modTargets } from '../../../midi/controllers'

const setGuiSource = (guiSource: number, source: ApiSource) => {
    const currSource = selectGuiSource(store.getState())
    if(guiSource !== currSource) {
        dispatch(setGuiSourceAction({ guiSource }))
    }
}

const incrementGuiSource = (inc: number, source: ApiSource) => {
    const currSource = selectGuiSource(store.getState());
    const nextSource = getBounded(currSource + inc, 0, modSources.length)
    setGuiSource(nextSource, source);
}

const setGuiTargetGroup = (guiTargetGroup: number, source: ApiSource) => {
    const currTargetGroup = selectGuiTargetGroup(store.getState())
    if(guiTargetGroup !== currTargetGroup) {
        dispatch(setGuiTargetGroupAction({ guiTargetGroup }))
    }
}

const incrementGuiTargetGroup = (inc: number, source: ApiSource) => {
    const currTargetGroup = selectGuiTargetGroup(store.getState());
    const nextTargetGroup = getBounded(currTargetGroup + inc, 0, modTargets.length)
    setGuiTargetGroup(nextTargetGroup, source);
}

const setGuiTargetFunc = (guiTargetFunc: number, source: ApiSource) => {
    const currTargetFunc = selectGuiTargetFunc(store.getState())
    if(guiTargetFunc !== currTargetFunc) {
        dispatch(setGuiTargetFuncAction({ guiTargetFunc }))
    }
}

const incrementGuiTargetFunc = (inc: number, source: ApiSource) => {
    const currTargetGroup = selectGuiTargetGroup(store.getState());
    const currTargetFunc = selectGuiTargetFunc(store.getState());
    const nextTargetFunc = getBounded(currTargetFunc + inc, 0, modTargets[currTargetGroup].length)
    setGuiTargetFunc(nextTargetFunc, source);
}

const setGuiTargetParam = (guiTargetParam: number, source: ApiSource) => {
    const currTargetParam = selectGuiTargetParam(store.getState())
    if(guiTargetParam !== currTargetParam) {
        dispatch(setGuiTargetParamAction({ guiTargetParam }))
    }
}

const incrementGuiTargetParam = (inc: number, source: ApiSource) => {
    const currTargetGroup = selectGuiTargetGroup(store.getState());
    const currTargetFunc = selectGuiTargetFunc(store.getState());
    const currTargetParam = selectGuiTargetParam(store.getState());
    const lastGuiTargetParam = modTargets[currTargetGroup][currTargetFunc].length
    const nextTargetParam = getBounded(currTargetParam + inc, 0, lastGuiTargetParam)
    setGuiTargetParam(nextTargetParam, source);
}

const setModValue = (sourceId: number, targetId: number, modValue: number, source: ApiSource) => {
    const currModValue = selectModValue(store.getState())(sourceId, targetId)
    if(modValue !== currModValue) {
        dispatch(setModValueAction({ sourceId, targetId, modValue }))
        midiApi.route.setSource(source, sourceId)
        midiApi.route.setTarget(source, targetId)
        midiApi.route.setAmount(source, modValue)
    }
}

const incrementGuiModValue = (inc: number, source: ApiSource) => {
    const sourceIndex = selectGuiSource(store.getState())
    const targetGroupIndex = selectGuiTargetGroup(store.getState())
    const targetFuncIndex = selectGuiTargetFunc(store.getState())
    const targetParamIndex = selectGuiTargetParam(store.getState())

    const sourceId = modSources[sourceIndex].id
    const targetId = modTargets[targetGroupIndex][targetFuncIndex][targetParamIndex].id

    const currModValue = selectModValue(store.getState())(sourceId, targetId);
    const nextModValue = getBounded(currModValue + inc)
    setModValue(sourceId, targetId, nextModValue, source);
}

const modsApi = {
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