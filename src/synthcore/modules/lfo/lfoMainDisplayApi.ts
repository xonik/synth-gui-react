import { useUiStore } from '../../../store/uiStore'
import { voiceGroupStores } from '../../../store/patchStore'
import { getBounded } from '../../../store/utils'
import { LoopMode } from './types'
import { step } from '../../utils'
import mainDisplayControllers from '../mainDisplay/mainDisplayControllers'
import { lfoCtrls } from './lfoControllers'

export const mainDisplayLfoPotResolutions = {
    [mainDisplayControllers.POT1.id]: 8,
    [mainDisplayControllers.POT2.id]: 1000,
    [mainDisplayControllers.POT3.id]: 1000,
    [mainDisplayControllers.POT4.id]: 1000,
    [mainDisplayControllers.POT5.id]: 8,
    [mainDisplayControllers.POT6.id]: 128,
    [mainDisplayControllers.POT7.id]: 1000,
}

const NUMBER_OF_LFOS = 4

export const mainDisplayLfoApi = {
    handleMainDisplayController: (voiceGroupIndex: number, ctrlId: number, increment: number) => {
        const uiState = useUiStore.getState()
        const lfoId = uiState.selectedLfoId
        const shiftOn = uiState.shiftOn
        const store = voiceGroupStores[voiceGroupIndex].getState()
        const lfo = store.lfos[lfoId]

        if (ctrlId === mainDisplayControllers.POT1.id) {
            const newLfoId = getBounded(lfoId + step(increment), 0, NUMBER_OF_LFOS - 1)
            useUiStore.getState().selectLfo(newLfoId)

        } else if (ctrlId === mainDisplayControllers.POT2.id) {
            if (!shiftOn) {
                const newRate = getBounded(lfo.rate + increment, 0, 1)
                voiceGroupStores[voiceGroupIndex].getState().set(state => {
                    state.lfos[lfoId].rate = newRate
                })
            } else {
                const newDepth = getBounded(lfo.depth + increment, 0, 1)
                voiceGroupStores[voiceGroupIndex].getState().set(state => {
                    state.lfos[lfoId].depth = newDepth
                })
            }

        } else if (ctrlId === mainDisplayControllers.POT3.id) {
            if (!shiftOn) {
                const newLevelOffset = getBounded(lfo.levelOffset + increment, -1, 1)
                voiceGroupStores[voiceGroupIndex].getState().set(state => {
                    state.lfos[lfoId].levelOffset = newLevelOffset
                })
            } else {
                const newPhaseOffset = getBounded(lfo.phaseOffset + increment, 0, 1)
                voiceGroupStores[voiceGroupIndex].getState().set(state => {
                    state.lfos[lfoId].phaseOffset = newPhaseOffset
                })
            }

        } else if (ctrlId === mainDisplayControllers.POT4.id) {
            if (!shiftOn) {
                const newDelay = getBounded(lfo.delay + increment, 0, 1)
                voiceGroupStores[voiceGroupIndex].getState().set(state => {
                    state.lfos[lfoId].delay = newDelay
                })
            } else {
                const newBalance = getBounded(lfo.balance + increment, 0, 1)
                voiceGroupStores[voiceGroupIndex].getState().set(state => {
                    state.lfos[lfoId].balance = newBalance
                })
            }

        } else if (ctrlId === mainDisplayControllers.POT5.id) {
            // Curve - currently no stage selection for LFO in uiStore,
            // so this is left as a no-op for now
            // TODO: add LFO stage selection to uiStore

        } else if (ctrlId === mainDisplayControllers.POT6.id) {
            if (lfo.loopMode !== LoopMode.COUNTED) {
                return
            }
            const newMaxLoops = getBounded(lfo.maxLoops + step(increment), 0, 127)
            voiceGroupStores[voiceGroupIndex].getState().set(state => {
                state.lfos[lfoId].maxLoops = newMaxLoops
            })

        } else if (ctrlId === mainDisplayControllers.POT7.id) {
        }
    }
}
