import { selectCurrGuiLfoId, selectCurrGuiStageId } from './lfoReducer'
import { store } from '../../store'
import { lfoApi } from '../../synthcoreApi'
import { ApiSource } from '../../types'
import { LoopMode, StageId } from './types'
import { step } from '../../utils'
import mainDisplayControllers from '../mainDisplay/mainDisplayControllers'
import { lfoCtrls } from './lfoControllers'
import { selectController } from '../controllers/controllersReducer'
import { selectShiftOn } from '../mainDisplay/mainDisplayReducer'

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
        //TODO Check current display page here
        const lfoId = selectCurrGuiLfoId(store.getState(), voiceGroupIndex)
        const shiftOn = selectShiftOn(store.getState())
        if (ctrlId === mainDisplayControllers.POT1.id) {
            lfoApi.incrementGuiLfo(voiceGroupIndex, step(increment), ApiSource.UI)
        } else if (ctrlId === mainDisplayControllers.POT2.id) {
            // Freq / delay
            if (!shiftOn) {
                lfoApi.increment({
                    ctrl: lfoCtrls.RATE,
                    ctrlIndex: lfoId,
                    value: increment,
                    voiceGroupIndex,
                    source: ApiSource.UI
                })
            } else {
                lfoApi.increment({
                    ctrl: lfoCtrls.DEPTH,
                    ctrlIndex: lfoId,
                    value: increment,
                    voiceGroupIndex,
                    source: ApiSource.UI
                })
            }
        } else if (ctrlId === mainDisplayControllers.POT3.id) {
            // Level / offset
            if (!shiftOn) {
                lfoApi.increment({
                    ctrl: lfoCtrls.LEVEL_OFFSET,
                    ctrlIndex: lfoId,
                    value: increment,
                    voiceGroupIndex,
                    source: ApiSource.UI
                })
            } else {
                lfoApi.increment({
                    ctrl: lfoCtrls.PHASE_OFFSET,
                    ctrlIndex: lfoId,
                    value: increment,
                    voiceGroupIndex,
                    source: ApiSource.UI
                })
            }
        } else if (ctrlId === mainDisplayControllers.POT4.id) {
            if (!shiftOn) {
                lfoApi.increment({
                    ctrl: lfoCtrls.DELAY,
                    ctrlIndex: lfoId,
                    value: increment,
                    voiceGroupIndex,
                    source: ApiSource.UI
                })
            } else {
                lfoApi.increment({
                    ctrl: lfoCtrls.BALANCE,
                    ctrlIndex: lfoId,
                    value: increment,
                    voiceGroupIndex,
                    source: ApiSource.UI
                })
            }
        } else if (ctrlId === mainDisplayControllers.POT5.id) {
            const stageId = selectCurrGuiStageId(store.getState(), voiceGroupIndex)
            if (stageId !== StageId.STOPPED) {
                lfoApi.increment({
                    ctrl: lfoCtrls.CURVE,
                    ctrlIndex: lfoId,
                    valueIndex: stageId,
                    value: step(increment),
                    voiceGroupIndex,
                    source: ApiSource.UI
                })
            }
        } else if (ctrlId === mainDisplayControllers.POT6.id) {
            const loopMode = selectController(lfoCtrls.LOOP_MODE, lfoId)(store.getState(), voiceGroupIndex)
            if (loopMode !== LoopMode.COUNTED) {
                return
            }
            lfoApi.increment({
                ctrl: lfoCtrls.MAX_LOOPS,
                ctrlIndex: lfoId,
                value: step(increment),
                voiceGroupIndex,
                source: ApiSource.UI
            })
        } else if (ctrlId === mainDisplayControllers.POT7.id) {
        }
    }
}