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
import { digitalModSources, modTarget } from './utils'

const setGuiMod = (
    guiSource: number,
    guiTargetFunc: number,
    guiTargetParam: number,
    source: ApiSource
) => {
    dispatch(setGuiSourceAction({ guiSource }))
    dispatch(setGuiTargetFuncAction({ guiTargetFunc }))
    dispatch(setGuiTargetParamAction({ guiTargetParam }))
}

const setGuiSource = (guiSource: number, source: ApiSource) => {
    const currSource = selectGuiSource(store.getState())
    if (guiSource !== currSource) {
        dispatch(setGuiSourceAction({ guiSource }))
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
        dispatch(setGuiTargetFuncAction({ guiTargetFunc: 0 }))
        dispatch(setGuiTargetParamAction({ guiTargetParam: 0 }))
        dispatch(setGuiTargetGroupAction({ guiTargetGroup }))
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
        dispatch(setGuiTargetParamAction({ guiTargetParam: 0 }))
        dispatch(setGuiTargetFuncAction({ guiTargetFunc }))
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
        dispatch(setGuiTargetParamAction({ guiTargetParam }))
    }
}

const incrementGuiTargetParam = (inc: number, source: ApiSource) => {
    const currTargetGroup = selectGuiTargetGroup(store.getState())
    const currTargetFunc = selectGuiTargetFunc(store.getState())
    const currTargetParam = selectGuiTargetParam(store.getState())

    const lastGuiTargetParam = modTarget.targets[currTargetGroup][currTargetFunc].length - 1
    const nextTargetParam = getBounded(currTargetParam + inc, 0, lastGuiTargetParam)

    setGuiTargetParam(nextTargetParam, source)
}

const setModValue = (sourceId: number, targetId: number, modValue: number, source: ApiSource) => {
    const currModValue = selectModValue(sourceId, targetId)(store.getState())
    if (modValue !== currModValue) {
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

    const sourceId = digitalModSources[sourceIndex].id
    const targetId = modTarget.targets[targetGroupIndex][targetFuncIndex][targetParamIndex].id

    const currModValue = selectModValue(sourceId, targetId)(store.getState())
    const nextModValue = getBounded(currModValue + inc, -1, 1)

    setModValue(sourceId, targetId, nextModValue, source)
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