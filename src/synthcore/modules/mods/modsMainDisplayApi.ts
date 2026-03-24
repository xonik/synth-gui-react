import { useUiStore } from '../../../store/uiStore'
import { voiceGroupStores } from '../../../store/patchStore'
import { getBounded } from '../../../store/utils'
import { step } from '../../utils'
import mainDisplayControllers from '../mainDisplay/mainDisplayControllers'
import { digitalModSources, modDst } from './utils'

export const mainDisplayModsPotResolutions = {
    [mainDisplayControllers.POT1.id]: 16,
    [mainDisplayControllers.POT2.id]: 16,
    [mainDisplayControllers.POT3.id]: 16,
    [mainDisplayControllers.POT4.id]: 16,
    [mainDisplayControllers.POT5.id]: 100,
    [mainDisplayControllers.POT6.id]: 1000,
    [mainDisplayControllers.POT7.id]: 1000,
}

export const mainDisplayModsApi = {
    handleMainDisplayController: (voiceGroupIndex: number, ctrlId: number, increment: number) => {
        const uiState = useUiStore.getState()
        const routing = uiState.modRouting
        const sourceIndex = routing.sourceId ?? 0
        const dstGroupIndex = routing.dstGroupId ?? 0
        const dstFuncIndex = routing.dstFuncId ?? 0
        const dstParamIndex = routing.dstParamId ?? 0

        if (ctrlId === mainDisplayControllers.POT1.id) {
            const next = getBounded(dstGroupIndex + step(increment), 0, modDst.dsts.length - 1)
            if (next !== dstGroupIndex) {
                useUiStore.getState().setModRouting({
                    dstGroupId: next,
                    dstFuncId: 0,
                    dstParamId: 0,
                })
            }

        } else if (ctrlId === mainDisplayControllers.POT2.id) {
            const next = getBounded(sourceIndex + step(increment), 0, digitalModSources.length - 1)
            useUiStore.getState().setModRouting({ sourceId: next })

        } else if (ctrlId === mainDisplayControllers.POT3.id) {
            const next = getBounded(dstFuncIndex + step(increment), 0, modDst.dsts[dstGroupIndex].length - 1)
            if (next !== dstFuncIndex) {
                useUiStore.getState().setModRouting({
                    dstFuncId: next,
                    dstParamId: 0,
                })
            }

        } else if (ctrlId === mainDisplayControllers.POT4.id) {
            const inc = step(increment) as -1 | 1
            const lastParam = modDst.dsts[dstGroupIndex][dstFuncIndex].length - 1
            const requested = dstParamIndex + inc

            if (requested < 0) {
                if (dstFuncIndex > 0) {
                    const prevFunc = dstFuncIndex - 1
                    const prevLastParam = modDst.dsts[dstGroupIndex][prevFunc].length - 1
                    useUiStore.getState().setModRouting({
                        dstFuncId: prevFunc,
                        dstParamId: prevLastParam,
                    })
                }
            } else if (requested > lastParam) {
                if (dstFuncIndex < modDst.dsts[dstGroupIndex].length - 1) {
                    useUiStore.getState().setModRouting({
                        dstFuncId: dstFuncIndex + 1,
                        dstParamId: 0,
                    })
                }
            } else {
                useUiStore.getState().setModRouting({ dstParamId: requested })
            }

        } else if (ctrlId === mainDisplayControllers.POT5.id) {
            const sourceId = digitalModSources[sourceIndex].id
            const dstId = modDst.dsts[dstGroupIndex][dstFuncIndex][dstParamIndex].id
            const dstCtrlIndex = modDst.funcProps[dstGroupIndex][dstFuncIndex].ctrlIndex || 0

            const store = voiceGroupStores[voiceGroupIndex].getState()
            const currValue = store.mods?.[sourceId]?.[dstId]?.[dstCtrlIndex] ?? 0
            const newValue = getBounded(currValue + increment, -1, 1)

            voiceGroupStores[voiceGroupIndex].getState().set(state => {
                if (!state.mods[sourceId]) state.mods[sourceId] = {}
                if (!state.mods[sourceId][dstId]) state.mods[sourceId][dstId] = {}
                state.mods[sourceId][dstId][dstCtrlIndex] = newValue
            })
        }
    }
}
