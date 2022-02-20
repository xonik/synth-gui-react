import { selectCurrEnvId, selectCurrStageId, selectEnvelope } from './envReducer'
import { store } from '../../store'
import { envApi } from '../../synthcoreApi'
import { ApiSource } from '../../types'
import { LoopMode, StageId } from './types'
import { step } from '../../utils'
import mainDisplayControllers from '../mainDisplay/mainDisplayControllers'
import envControllers from './envControllers'

export const mainDisplayEnvPotResolutions = {
    [mainDisplayControllers.POT1.id]: 8,
    [mainDisplayControllers.POT2.id]: 1000,
    [mainDisplayControllers.POT3.id]: 1000,
    [mainDisplayControllers.POT4.id]: 8,
    [mainDisplayControllers.POT5.id]: 32,
    [mainDisplayControllers.POT6.id]: 1000,
}

export const mainDisplayEnvApi = {
    handleMainDisplayController: (ctrlId: number, increment: number) => {
        //TODO Check current display page here
        const envId = selectCurrEnvId(store.getState())
        if (ctrlId === mainDisplayControllers.POT1.id) {
            envApi.incrementCurrentEnvelope(step(increment), ApiSource.UI)
        } else if (ctrlId === mainDisplayControllers.POT2.id) {
            const stageId = selectCurrStageId(store.getState())
            if (stageId !== StageId.STOPPED) {
                envApi.incrementStageTime(envId, stageId, increment, ApiSource.UI)
            }
        } else if (ctrlId === mainDisplayControllers.POT3.id) {
            const stageId = selectCurrStageId(store.getState())
            if (stageId !== StageId.STOPPED) {
                envApi.incrementStageLevel(envId, stageId, increment, ApiSource.UI)
            }
        } else if (ctrlId === mainDisplayControllers.POT4.id) {
            const stageId = selectCurrStageId(store.getState())
            if (stageId !== StageId.STOPPED) {
                envApi.incrementStageCurve(envId, stageId, step(increment), ApiSource.UI)
            }
        } else if (ctrlId === mainDisplayControllers.POT5.id) {
            const env = selectEnvelope(envId)(store.getState())
            if (env.controllers[envControllers(0).LOOP_MODE.id] !== LoopMode.COUNTED) {
                return
            }
            envApi.incrementMaxLoops(envId, step(increment), ApiSource.UI)
        } else if (ctrlId === mainDisplayControllers.POT6.id) {

        }
    }
}