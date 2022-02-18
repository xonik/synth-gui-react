import { MainDisplayControllerIds } from '../mainDisplay/types'
import { selectGuiLfoId, selectGuiStageId } from './lfoReducer'
import { store } from '../../store'
import { lfoApi } from '../../synthcoreApi'
import { ApiSource } from '../../types'
import { StageId } from './types'
import { step } from '../../utils'

export const mainDisplayLfoPotResolutions = {
    [MainDisplayControllerIds.POT1]: 8,
    [MainDisplayControllerIds.POT2]: 1000,
    [MainDisplayControllerIds.POT3]: 1000,
    [MainDisplayControllerIds.POT4]: 8,
    [MainDisplayControllerIds.POT5]: 32,
    [MainDisplayControllerIds.POT6]: 1000,
}

export const mainDisplayLfoApi = {
    handleMainDisplayController: (ctrlId: MainDisplayControllerIds, increment: number) => {
        //TODO Check current display page here
        const lfoId = selectGuiLfoId(store.getState())
        if (ctrlId === MainDisplayControllerIds.POT1) {
            lfoApi.incrementGuiLfo(step(increment), ApiSource.UI)
        } else if (ctrlId === MainDisplayControllerIds.POT2) {
            const stageId = selectGuiStageId(store.getState())
            if (stageId !== StageId.STOPPED) {
                lfoApi.incrementStageTime(lfoId, stageId, increment, ApiSource.UI)
            }
        } else if (ctrlId === MainDisplayControllerIds.POT3) {
            const stageId = selectGuiStageId(store.getState())
            if (stageId !== StageId.STOPPED) {
                //lfoApi.incrementStageLevel(lfoId, stageId, increment, ApiSource.UI)
            }
        } else if (ctrlId === MainDisplayControllerIds.POT4) {
            const stageId = selectGuiStageId(store.getState())
            if (stageId !== StageId.STOPPED) {
                lfoApi.incrementStageCurve(lfoId, stageId, step(increment), ApiSource.UI)
            }
        } else if (ctrlId === MainDisplayControllerIds.POT5) {
        } else if (ctrlId === MainDisplayControllerIds.POT6) {
        }
    }
}