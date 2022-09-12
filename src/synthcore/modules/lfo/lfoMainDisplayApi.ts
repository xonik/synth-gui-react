import { selectCurrGuiLfoId, selectCurrGuiStageId } from './lfoReducer'
import { store } from '../../store'
import { lfoApi } from '../../synthcoreApi'
import { ApiSource } from '../../types'
import { StageId } from './types'
import { step } from '../../utils'
import mainDisplayControllers from '../mainDisplay/mainDisplayControllers'

export const mainDisplayLfoPotResolutions = {
    [mainDisplayControllers.POT1.id]: 8,
    [mainDisplayControllers.POT2.id]: 1000,
    [mainDisplayControllers.POT3.id]: 1000,
    [mainDisplayControllers.POT4.id]: 8,
    [mainDisplayControllers.POT5.id]: 32,
    [mainDisplayControllers.POT6.id]: 1000,
}

export const mainDisplayLfoApi = {
    handleMainDisplayController: (ctrlId: number, increment: number) => {
        //TODO Check current display page here
        const lfoId = selectCurrGuiLfoId(store.getState())
        if (ctrlId === mainDisplayControllers.POT1.id) {
            lfoApi.incrementGuiLfo(step(increment), ApiSource.UI)
        } else if (ctrlId === mainDisplayControllers.POT2.id) {
            const stageId = selectCurrGuiStageId(store.getState())
            if (stageId !== StageId.STOPPED) {
                //lfoApi.incrementStageTime(lfoId, stageId, increment, ApiSource.UI)
            }
        } else if (ctrlId === mainDisplayControllers.POT3.id) {
            const stageId = selectCurrGuiStageId(store.getState())
            if (stageId !== StageId.STOPPED) {
                //lfoApi.incrementStageLevel(lfoId, stageId, increment, ApiSource.UI)
            }
        } else if (ctrlId === mainDisplayControllers.POT4.id) {
            const stageId = selectCurrGuiStageId(store.getState())
            if (stageId !== StageId.STOPPED) {
                //lfoApi.incrementStageCurve(lfoId, stageId, step(increment), ApiSource.UI)
            }
        } else if (ctrlId === mainDisplayControllers.POT5.id) {
        } else if (ctrlId === mainDisplayControllers.POT6.id) {
        }
    }
}