import { MainDisplayControllerIds } from '../mainDisplay/types'
import { selectCurrEnvId, selectCurrStageId, selectEnvelope } from './envReducer'
import { store } from '../../store'
import { envApi } from '../../synthcoreApi'
import { ApiSource } from '../../types'
import { LoopMode, StageId } from './types'
import { step } from '../../utils'

export const mainDisplayEnvPotResolutions = {
    [MainDisplayControllerIds.POT1]: 8,
    [MainDisplayControllerIds.POT2]: 1000,
    [MainDisplayControllerIds.POT3]: 1000,
    [MainDisplayControllerIds.POT4]: 8,
    [MainDisplayControllerIds.POT5]: 32,
    [MainDisplayControllerIds.POT6]: 1000,
}

export const mainDisplayEnvApi = {
    handleMainDisplayController: (ctrlId: MainDisplayControllerIds, increment: number) => {
        //TODO Check current display page here
        const envId = selectCurrEnvId(store.getState())
        if (ctrlId === MainDisplayControllerIds.POT1) {
            envApi.incrementCurrentEnvelope(step(increment), ApiSource.UI)
        } else if (ctrlId === MainDisplayControllerIds.POT2) {
            const stageId = selectCurrStageId(store.getState())
            if (stageId !== StageId.STOPPED) {
                envApi.incrementStageTime(envId, stageId, increment, ApiSource.UI)
            }
        } else if (ctrlId === MainDisplayControllerIds.POT3) {
            const stageId = selectCurrStageId(store.getState())
            if (stageId !== StageId.STOPPED) {
                envApi.incrementStageLevel(envId, stageId, increment, ApiSource.UI)
            }
        } else if (ctrlId === MainDisplayControllerIds.POT4) {
            const stageId = selectCurrStageId(store.getState())
            if (stageId !== StageId.STOPPED) {
                envApi.incrementStageCurve(envId, stageId, step(increment), ApiSource.UI)
            }
        } else if (ctrlId === MainDisplayControllerIds.POT5) {
            const env = selectEnvelope(envId)(store.getState())
            if (env.loopMode !== LoopMode.COUNTED) {
                return
            }
            envApi.incrementMaxLoops(envId, step(increment), ApiSource.UI)
        } else if (ctrlId === MainDisplayControllerIds.POT6) {

        }
    }
}