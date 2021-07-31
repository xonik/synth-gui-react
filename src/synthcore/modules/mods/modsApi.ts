import { store } from '../../store'
import midiApi from '../../../midi/midiApi'
import { ApiSource } from '../../types'
import { dispatch, getBounded } from '../../utils'

const setGuiSource = (guiSource: number, source: ApiSource) => {
    const currSource = selectGuiSource(store.getState())
    if(guiSource !== currSource) {
        dispatch(setGuiSourceAction({ guiSource }))
        midiApi.mods.setGuiSource(source, guiSource)
    }
}

const incrementGuiSource = (inc: number, source: ApiSource) => {
    const currSource = selectGuiSource(store.getState());
    const nextSource = getBounded(currSource + inc, 0, lastGuiSource)
    setGuiSource(nextSource, source);
}

const setGuiTargetGroup = (guiTargetGroup: number, source: ApiSource) => {
    const currTargetGroup = selectGuiTargetGroup(store.getState())
    if(guiTargetGroup !== currTargetGroup) {
        dispatch(setGuiTargetGroupAction({ guiTargetGroup }))
        midiApi.mods.setGuiTargetGroup(source, guiTargetGroup)
    }
}

const incrementGuiTargetGroup = (inc: number, source: ApiSource) => {
    const currTargetGroup = selectGuiTargetGroup(store.getState());
    const nextTargetGroup = getBounded(currTargetGroup + inc, 0, lastGuiTargetGroup)
    setGuiTargetGroup(nextTargetGroup, source);
}

const setGuiTargetFunc = (guiTargetFunc: number, source: ApiSource) => {
    const currTargetFunc = selectGuiTargetFunc(store.getState())
    if(guiTargetFunc !== currTargetFunc) {
        dispatch(setGuiTargetFuncAction({ guiTargetFunc }))
        midiApi.mods.setGuiTargetFunc(source, guiTargetFunc)
    }
}

const incrementGuiTargetFunc = (inc: number, source: ApiSource) => {
    const currTargetFunc = selectGuiTargetFunc(store.getState());
    const nextTargetFunc = getBounded(currTargetFunc + inc, 0, lastGuiTargetFunc)
    setGuiTargetFunc(nextTargetFunc, source);
}

const setGuiTargetParam = (guiTargetParam: number, source: ApiSource) => {
    const currTargetParam = selectGuiTargetParam(store.getState())
    if(guiTargetParam !== currTargetParam) {
        dispatch(setGuiTargetParamAction({ guiTargetParam }))
        midiApi.mods.setGuiTargetParam(source, guiTargetParam)
    }
}

const incrementGuiTargetParam = (inc: number, source: ApiSource) => {
    const currTargetParam = selectGuiTargetParam(store.getState());
    const nextTargetParam = getBounded(currTargetParam + inc, 0, lastGuiTargetParam)
    setGuiTargetParam(nextTargetParam, source);
}

const setGuiModValue = (guiModValue: number, source: ApiSource) => {
    // Todo: use source and target here to find current value and set new.
    const currModValue = selectGuiModValue(store.getState())
    if(guiModValue !== currModValue) {
        dispatch(setGuiModValueAction({ guiModValue }))
        midiApi.mods.setGuiModValue(source, guiModValue)
    }
}

const incrementGuiModValue = (inc: number, source: ApiSource) => {
    // Todo: use source and target here to find current value and set new.
    const currModValue = selectGuiModValue(store.getState());
    const nextModValue = getBounded(currModValue + inc)
    setGuiModValue(nextModValue, source);
}

export default {
    setGuiSource,
    incrementGuiSource,
    setGuiTargetGroup,
    incrementGuiTargetGroup,
    setGuiTargetFunc,
    incrementGuiTargetFunc,
    setGuiTargetParam,
    incrementGuiTargetParam,
    setGuiModValue,
    incrementGuiModValue,
}