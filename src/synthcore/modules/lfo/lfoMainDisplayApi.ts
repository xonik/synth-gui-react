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
    [mainDisplayControllers.POT3.id]: 128,
    [mainDisplayControllers.POT4.id]: 8,
    [mainDisplayControllers.POT5.id]: 100,
    [mainDisplayControllers.POT6.id]: 1000,
    [mainDisplayControllers.POT7.id]: 1000,
}

export const mainDisplayLfoApi = {
    handleMainDisplayController: (ctrlId: number, increment: number) => {
        //TODO Check current display page here
        const lfoId = selectCurrGuiLfoId(store.getState())
        const shiftOn = selectShiftOn(store.getState())
        if (ctrlId === mainDisplayControllers.POT1.id) {
            lfoApi.incrementGuiLfo(step(increment), ApiSource.UI)
        } else if (ctrlId === mainDisplayControllers.POT2.id) {
            // Freq / delay
            if(!shiftOn) {
                lfoApi.increment({
                    ctrl: lfoCtrls.RATE,
                    ctrlIndex: lfoId,
                    value: increment,
                    source: ApiSource.UI
                })
            } else {
                lfoApi.increment({
                    ctrl: lfoCtrls.DELAY,
                    ctrlIndex: lfoId,
                    value: increment,
                    source: ApiSource.UI})
            }
        } else if (ctrlId === mainDisplayControllers.POT3.id) {
            // Level / offset
            if(!shiftOn) {
                lfoApi.increment({
                    ctrl: lfoCtrls.DEPTH,
                    ctrlIndex: lfoId,
                    value: increment,
                    source: ApiSource.UI
                })
            } else {
                lfoApi.increment({
                    ctrl: lfoCtrls.LEVEL_OFFSET,
                    ctrlIndex: lfoId,
                    value: increment,
                    source: ApiSource.UI})
            }
        } else if (ctrlId === mainDisplayControllers.POT4.id) {
            const stageId = selectCurrGuiStageId(store.getState())
            if (stageId !== StageId.STOPPED) {
                lfoApi.increment({
                    ctrl: lfoCtrls.CURVE,
                    ctrlIndex: lfoId,
                    valueIndex: stageId,
                    value: step(increment),
                    source: ApiSource.UI})
            }
        } else if (ctrlId === mainDisplayControllers.POT5.id) {
            // Balance / phase
            if(!shiftOn) {
                lfoApi.increment({
                    ctrl: lfoCtrls.BALANCE,
                    ctrlIndex: lfoId,
                    value: increment,
                    source: ApiSource.UI})
            } else {
                lfoApi.increment({
                    ctrl: lfoCtrls.PHASE_OFFSET,
                    ctrlIndex: lfoId,
                    value: increment,
                    source: ApiSource.UI})
            }

        } else if (ctrlId === mainDisplayControllers.POT6.id) {
            const loopMode = selectController(lfoCtrls.LOOP_MODE, lfoId)(store.getState())
            if (loopMode !== LoopMode.COUNTED) {
                return
            }
            lfoApi.increment({
                ctrl: lfoCtrls.MAX_LOOPS,
                ctrlIndex: lfoId,
                value: step(increment),
                source: ApiSource.UI})
        } else if (ctrlId === mainDisplayControllers.POT7.id) {
        }
    }
}