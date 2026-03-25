import { useUiStore, ModRoutingSelection } from '../../../store/uiStore'
import { voiceGroupStores } from '../../../store/patchStore'
import { step } from '../../utils'
import mainDisplayControllers from '../mainDisplay/mainDisplayControllers'
import { digitalModSources, modDst } from './utils'
import { getBounded, getQuantized } from '../../../store/utils'
import modsApi from './modsApi'
import { ApiSource } from '../../types'

export const mainDisplayModsPotResolutions = {
    [mainDisplayControllers.POT1.id]: 16,
    [mainDisplayControllers.POT2.id]: 16,
    [mainDisplayControllers.POT3.id]: 16,
    [mainDisplayControllers.POT4.id]: 16,
    [mainDisplayControllers.POT5.id]: 100,
    [mainDisplayControllers.POT6.id]: 1000,
    [mainDisplayControllers.POT7.id]: 1000,
}

// Dual-write selection to both uiStore and Redux so display and modsApi stay in sync
function setRouting(changes: Partial<ModRoutingSelection>) {
    useUiStore.getState().setModRouting(changes)

    // Sync full state to Redux after applying changes
    const routing = useUiStore.getState().modRouting
    modsApi.setGuiSource(routing.sourceId ?? 0, ApiSource.UI)
    modsApi.setGuiDstGroup(routing.dstGroupId ?? 0, ApiSource.UI)
    modsApi.setGuiDstFunc(routing.dstFuncId ?? 0, ApiSource.UI)
    modsApi.setGuiDstParam(routing.dstParamId ?? 0, ApiSource.UI)
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
            const sourceId = digitalModSources[sourceIndex].id
            const dstId = modDst.dsts[dstGroupIndex][dstFuncIndex][dstParamIndex].id
            const dstCtrlIndex = modDst.funcProps[dstGroupIndex][dstFuncIndex].ctrlIndex || 0

            // Read current value from Zustand, increment, write to both Zustand and Redux+MIDI
            const store = voiceGroupStores[voiceGroupIndex].getState()
            const currValue = store.mods?.[sourceId]?.[dstId]?.[dstCtrlIndex] ?? 0
            const nextValue = getQuantized(getBounded(currValue + increment, -1, 1), 32767)

            voiceGroupStores[voiceGroupIndex].getState().set(state => {
                if (!state.mods[sourceId]) state.mods[sourceId] = {}
                if (!state.mods[sourceId][dstId]) state.mods[sourceId][dstId] = {}
                state.mods[sourceId][dstId][dstCtrlIndex] = nextValue
            })

            modsApi.incrementGuiModValue(voiceGroupIndex, increment, ApiSource.UI)

        } else if (ctrlId === mainDisplayControllers.POT6.id) {
        } else if (ctrlId === mainDisplayControllers.POT7.id) {
        }
    }
}
