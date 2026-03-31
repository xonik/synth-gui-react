import { type ModRoutingSelection, useUiStore } from '../../../store/uiStore'
import { getBounded, step } from '../../../store/utils'
import { ApiSource } from '../../types'
import mainDisplayControllers from '../mainDisplay/mainDisplayControllers'
import modsApi from './modsApi'
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

function setRouting(changes: Partial<ModRoutingSelection>) {
    useUiStore.getState().setModRouting(changes)
}

export const mainDisplayModsApi = {
    handleMainDisplayController: (voiceGroupIndex: number, ctrlId: number, increment: number) => {
        const routing = useUiStore.getState().modRouting
        const sourceIndex = routing.sourceId ?? 0
        const dstGroupIndex = routing.dstGroupId ?? 0
        const dstFuncIndex = routing.dstFuncId ?? 0
        const dstParamIndex = routing.dstParamId ?? 0

        if (ctrlId === mainDisplayControllers.POT1.id) {
            const next = getBounded(dstGroupIndex + step(increment), 0, modDst.dsts.length - 1)
            if (next !== dstGroupIndex) {
                setRouting({
                    dstGroupId: next,
                    dstFuncId: 0,
                    dstParamId: 0,
                })
            }
        } else if (ctrlId === mainDisplayControllers.POT2.id) {
            const next = getBounded(sourceIndex + step(increment), 0, digitalModSources.length - 1)
            setRouting({ sourceId: next })
        } else if (ctrlId === mainDisplayControllers.POT3.id) {
            const next = getBounded(dstFuncIndex + step(increment), 0, modDst.dsts[dstGroupIndex].length - 1)
            if (next !== dstFuncIndex) {
                setRouting({
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
                    setRouting({
                        dstFuncId: prevFunc,
                        dstParamId: prevLastParam,
                    })
                }
            } else if (requested > lastParam) {
                if (dstFuncIndex < modDst.dsts[dstGroupIndex].length - 1) {
                    setRouting({
                        dstFuncId: dstFuncIndex + 1,
                        dstParamId: 0,
                    })
                }
            } else {
                setRouting({ dstParamId: requested })
            }
        } else if (ctrlId === mainDisplayControllers.POT5.id) {
            modsApi.incrementGuiModValue(voiceGroupIndex, increment, ApiSource.UI)
        } else if (ctrlId === mainDisplayControllers.POT6.id) {
        } else if (ctrlId === mainDisplayControllers.POT7.id) {
        }
    },
}
