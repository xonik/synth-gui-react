import { useUiStore } from '@/store'
import { getBounded, getQuantized } from '@/store/utils'
import { voiceGroupStores as zustandStores } from '@/store/patchStore'
import type { ApiSource } from '../../types'
import { paramReceive, paramSend } from '../common/commonMidiApi'
import type { ButtonInputProperty, NumericInputProperty } from '../common/types'
import modsControllers from './modsControllers'
import midiApi from './modsMidiApi'
import modsMidiApi from './modsMidiApi'
import { digitalModSources, modDst } from './utils'

const setGuiSource = (guiSource: number, _source: ApiSource) => {
    const routing = useUiStore.getState().modRouting
    if (guiSource !== (routing.sourceId ?? 0)) {
        useUiStore.getState().setModRouting({ sourceId: guiSource })
    }
}

const setGuiDstGroup = (guiDstGroup: number, _source: ApiSource) => {
    const routing = useUiStore.getState().modRouting
    if (guiDstGroup !== (routing.dstGroupId ?? 0)) {
        useUiStore.getState().setModRouting({
            dstGroupId: guiDstGroup,
            dstFuncId: 0,
            dstParamId: 0,
        })
    }
}

const setGuiDstFunc = (guiDstFunc: number, _source: ApiSource) => {
    const routing = useUiStore.getState().modRouting
    if (guiDstFunc !== (routing.dstFuncId ?? 0)) {
        useUiStore.getState().setModRouting({
            dstFuncId: guiDstFunc,
            dstParamId: 0,
        })
    }
}

const setGuiDstParam = (guiDstParam: number, _source: ApiSource) => {
    const routing = useUiStore.getState().modRouting
    if (guiDstParam !== (routing.dstParamId ?? 0)) {
        useUiStore.getState().setModRouting({ dstParamId: guiDstParam })
    }
}

const setGuiMod = (guiSource: number, guiDstFunc: number, guiDstParam: number, _source: ApiSource) => {
    useUiStore.getState().setModRouting({
        sourceId: guiSource,
        dstFuncId: guiDstFunc,
        dstParamId: guiDstParam,
    })
}

const incrementGuiSource = (inc: number, source: ApiSource) => {
    const currSource = useUiStore.getState().modRouting.sourceId ?? 0
    const nextSource = getBounded(currSource + inc, 0, digitalModSources.length - 1)
    setGuiSource(nextSource, source)
}

const incrementGuiDstGroup = (inc: number, source: ApiSource) => {
    const currDstGroup = useUiStore.getState().modRouting.dstGroupId ?? 0
    const nextDstGroup = getBounded(currDstGroup + inc, 0, modDst.dsts.length - 1)
    setGuiDstGroup(nextDstGroup, source)
}

const incrementGuiDstFunc = (inc: number, source: ApiSource) => {
    const routing = useUiStore.getState().modRouting
    const currDstGroup = routing.dstGroupId ?? 0
    const currDstFunc = routing.dstFuncId ?? 0
    const nextDstFunc = getBounded(currDstFunc + inc, 0, modDst.dsts[currDstGroup].length - 1)
    setGuiDstFunc(nextDstFunc, source)
}

const incrementGuiDstParam = (inc: -1 | 1, source: ApiSource) => {
    const routing = useUiStore.getState().modRouting
    const currDstGroup = routing.dstGroupId ?? 0
    const currDstFunc = routing.dstFuncId ?? 0
    const currDstParam = routing.dstParamId ?? 0

    const lastGuiDstParam = modDst.dsts[currDstGroup][currDstFunc].length - 1
    const requestedGuiDstParam = currDstParam + inc
    if (requestedGuiDstParam < 0) {
        if (currDstFunc > 0) {
            const prevDstFunc = currDstFunc - 1
            setGuiDstFunc(prevDstFunc, source)
            const lastDstParam = modDst.dsts[currDstGroup][prevDstFunc].length - 1
            setGuiDstParam(lastDstParam, source)
        }
    } else if (requestedGuiDstParam > lastGuiDstParam) {
        if (currDstFunc < modDst.dsts[currDstGroup].length - 1) {
            setGuiDstFunc(currDstFunc + 1, source)
        }
    } else {
        setGuiDstParam(requestedGuiDstParam, source)
    }
}

const setModValue = (
    voiceGroupIndex: number,
    sourceId: number,
    dstId: number,
    dstCtrlIndex: number,
    modValue: number,
    source: ApiSource
) => {
    const quantizedValue = getQuantized(modValue, 32767)

    const currModValue = zustandStores[voiceGroupIndex].getState().mods?.[sourceId]?.[dstId]?.[dstCtrlIndex] ?? 0
    if (quantizedValue === currModValue) {
        return
    }

    zustandStores[voiceGroupIndex].getState().set((state: any) => {
        if (!state.mods[sourceId]) state.mods[sourceId] = {}
        if (!state.mods[sourceId][dstId]) state.mods[sourceId][dstId] = {}
        state.mods[sourceId][dstId][dstCtrlIndex] = quantizedValue
    })

    // TODO: These should really be converted into ONE!
    midiApi.setSourceId(voiceGroupIndex, source, sourceId)
    midiApi.setDstId(voiceGroupIndex, source, dstId, dstCtrlIndex)
    midiApi.setAmount(voiceGroupIndex, source, modValue)
}

const incrementGuiModValue = (voiceGroupIndex: number, inc: number, source: ApiSource) => {
    const routing = useUiStore.getState().modRouting
    const sourceIndex = routing.sourceId ?? 0
    const dstGroupIndex = routing.dstGroupId ?? 0
    const dstFuncIndex = routing.dstFuncId ?? 0
    const dstParamIndex = routing.dstParamId ?? 0

    const sourceId = digitalModSources[sourceIndex].id
    const dstId = modDst.dsts[dstGroupIndex][dstFuncIndex][dstParamIndex].id
    const dstCtrlIndex = modDst.funcProps[dstGroupIndex][dstFuncIndex].ctrlIndex || 0

    const currModValue = zustandStores[voiceGroupIndex].getState().mods?.[sourceId]?.[dstId]?.[dstCtrlIndex] ?? 0
    const nextModValue = getBounded(currModValue + inc, -1, 1)
    setModValue(voiceGroupIndex, sourceId, dstId, dstCtrlIndex, nextModValue, source)
}

const setRouteButton = (value: number, source: ApiSource) => {
    const currentValue = useUiStore.getState().modRouteButton
    const boundedValue = getBounded(value, 0, modsControllers.ROUTE_BUTTON.values.length - 1)

    if (value === currentValue) {
        return
    }
    useUiStore.getState().setModRouteButton(boundedValue)
    modsMidiApi.setUiRouteButton(source, boundedValue)
}

const toggleRouteButton = (value: number, source: ApiSource) => {
    const currentValue = useUiStore.getState().modRouteButton
    if (value === currentValue) {
        setRouteButton(0, source)
    } else {
        setRouteButton(value, source)
    }
}

export const uiAmount = (() => {
    const set = (input: NumericInputProperty) => {
        const boundedValue = getQuantized(getBounded(input.value, -1, 1))
        const currentValue = useUiStore.getState().modAmount

        if (boundedValue === currentValue) {
            return
        }

        useUiStore.getState().setModAmount(boundedValue)
        paramSend({ ...input, value: boundedValue })
    }

    const increment = (input: NumericInputProperty) => {
        const currentValue = useUiStore.getState().modAmount
        set({ ...input, value: currentValue + input.value / 2 })
    }

    paramReceive(modsControllers.UI_AMOUNT, set)

    return {
        set,
        increment,
        toggle: (_input: ButtonInputProperty) => {},
    }
})()

const customhandlers = {
    [modsControllers.UI_AMOUNT.id]: uiAmount,
}

const increment = (input: NumericInputProperty) => {
    customhandlers[input.ctrl.id]?.increment(input)
}

const toggle = (input: ButtonInputProperty) => {
    customhandlers[input.ctrl.id]?.toggle(input)
}

const epsilon: number = 0.001
export const isZero = (A: number) => {
    return Math.abs(A) < epsilon
}

const getForSave = (voiceGroupIndex: number) => {
    const mods = zustandStores[voiceGroupIndex].getState().mods
    // Convert from {sourceId: {dstId: {ctrlIndex: value}}} to number[][][]
    const result: number[][][] = []
    for (const sourceId in mods) {
        const destinations: number[][] = []
        for (const dstId in mods[sourceId]) {
            const ctrlIndexes: number[] = []
            for (const ctrlIndex in mods[sourceId][dstId]) {
                const value = mods[sourceId][dstId][ctrlIndex]
                if (!isZero(value)) {
                    ctrlIndexes.push(value)
                }
            }
            if (ctrlIndexes.length > 0) {
                destinations.push(ctrlIndexes)
            }
        }
        if (destinations.length > 0) {
            result.push(destinations)
        }
    }
    return result
}

const setFromLoad = (_voiceGroupIndex: number, _modValues: number[][][]) => {
    // TODO: Convert loaded mod values back to Zustand format
    // This needs the same mapping as getForSave in reverse
}

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

    setRouteButton,
    toggleRouteButton,

    increment,
    toggle,
    getForSave,
    setFromLoad,
}

export default modsApi
