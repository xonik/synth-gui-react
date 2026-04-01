import { STAGE_ID_TO_NAME } from '@/store/modules/lfoActions'
import { voiceGroupStores } from '@/store/patchStore'
import { useUiStore } from '@/store/uiStore'
import { getBounded, step } from '@/store/utils'
import mainDisplayControllers from '../mainDisplay/mainDisplayControllers'
import { lfoCtrls } from './lfoControllers'
import { LoopMode, StageId } from './types'

const NUMBER_OF_LFOS = 4

export const mainDisplayLfoPotResolutions = {
    [mainDisplayControllers.POT1.id]: 8,
    [mainDisplayControllers.POT2.id]: 1000,
    [mainDisplayControllers.POT3.id]: 1000,
    [mainDisplayControllers.POT4.id]: 1000,
    [mainDisplayControllers.POT5.id]: 8,
    [mainDisplayControllers.POT6.id]: 128,
    [mainDisplayControllers.POT7.id]: 1000,
}

export const mainDisplayLfoApi = {
    handleMainDisplayController: (voiceGroupIndex: number, ctrlId: number, increment: number) => {
        const uiState = useUiStore.getState()
        const lfoId = uiState.selectedLfoId
        const shiftOn = uiState.shiftOn

        const lfo = voiceGroupStores[voiceGroupIndex].getState().lfos[lfoId]

        if (ctrlId === mainDisplayControllers.POT1.id) {
            const newLfoId = getBounded(lfoId + step(increment), 0, NUMBER_OF_LFOS - 1)
            useUiStore.getState().selectLfo(newLfoId)
        } else if (ctrlId === mainDisplayControllers.POT2.id) {
            if (!shiftOn) {
                const newRate = getBounded(lfo.rate + increment, 0, 1)
                voiceGroupStores[voiceGroupIndex].getState().set((state) => {
                    state.lfos[lfoId].rate = newRate
                })
            } else {
                const newDepth = getBounded(lfo.depth + increment, 0, 1)
                voiceGroupStores[voiceGroupIndex].getState().set((state) => {
                    state.lfos[lfoId].depth = newDepth
                })
            }
        } else if (ctrlId === mainDisplayControllers.POT3.id) {
            if (!shiftOn) {
                const newValue = getBounded(lfo.levelOffset + increment, -1, 1)
                voiceGroupStores[voiceGroupIndex].getState().set((state) => {
                    state.lfos[lfoId].levelOffset = newValue
                })
            } else {
                const newValue = getBounded(lfo.phaseOffset + increment, 0, 1)
                voiceGroupStores[voiceGroupIndex].getState().set((state) => {
                    state.lfos[lfoId].phaseOffset = newValue
                })
            }
        } else if (ctrlId === mainDisplayControllers.POT4.id) {
            if (!shiftOn) {
                const newValue = getBounded(lfo.delay + increment, 0, 1)
                voiceGroupStores[voiceGroupIndex].getState().set((state) => {
                    state.lfos[lfoId].delay = newValue
                })
            } else {
                const newValue = getBounded(lfo.balance + increment, 0, 1)
                voiceGroupStores[voiceGroupIndex].getState().set((state) => {
                    state.lfos[lfoId].balance = newValue
                })
            }
        } else if (ctrlId === mainDisplayControllers.POT5.id) {
            const stageId = uiState.selectedLfoStageId
            if (stageId !== StageId.STOPPED) {
                const stageName = STAGE_ID_TO_NAME[stageId as keyof typeof STAGE_ID_TO_NAME]
                if (!stageName) return
                const currentCurve = lfo.stages[stageName].curve
                const numCurves = lfoCtrls.CURVE.values?.length ?? 10
                const newCurve = getBounded(currentCurve + step(increment), 0, numCurves - 1)
                voiceGroupStores[voiceGroupIndex].getState().set((state) => {
                    state.lfos[lfoId].stages[stageName].curve = newCurve
                })
            }
        } else if (ctrlId === mainDisplayControllers.POT6.id) {
            if (lfo.loopMode !== LoopMode.COUNTED) {
                return
            }
            const newMaxLoops = getBounded(lfo.maxLoops + step(increment), 0, 127)
            voiceGroupStores[voiceGroupIndex].getState().set((state) => {
                state.lfos[lfoId].maxLoops = newMaxLoops
            })
        } else if (ctrlId === mainDisplayControllers.POT7.id) {
        }
    },
}
