import { selectCurrEnvId, selectCurrStageId, selectEnvController, selectEnvelope } from './envReducer'
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
                envApi.increment({
                    ctrl: envControllers(0).TIME,
                    ctrlIndex: envId,
                    valueIndex: stageId,
                    value: increment,
                    source: ApiSource.UI})
            }
        } else if (ctrlId === mainDisplayControllers.POT3.id) {
            const stageId = selectCurrStageId(store.getState())
            if (stageId !== StageId.STOPPED) {
                envApi.increment({
                    ctrl: envControllers(0).LEVEL,
                    ctrlIndex: envId,
                    valueIndex: stageId,
                    value: increment,
                    source: ApiSource.UI})
            }
        } else if (ctrlId === mainDisplayControllers.POT4.id) {
            const stageId = selectCurrStageId(store.getState())
            if (stageId !== StageId.STOPPED) {
                envApi.increment({
                    ctrl: envControllers(0).CURVE,
                    ctrlIndex: envId,
                    valueIndex: stageId,
                    value: increment,
                    source: ApiSource.UI})
            }
        } else if (ctrlId === mainDisplayControllers.POT5.id) {
            const loopMode = selectEnvController(envControllers(0).LOOP_MODE, envId)(store.getState())
            if (loopMode !== LoopMode.COUNTED) {
                return
            }
            envApi.increment({
                ctrl: envControllers(0).MAX_LOOPS,
                ctrlIndex: envId,
                value: step(increment),
                source: ApiSource.UI})
        } else if (ctrlId === mainDisplayControllers.POT6.id) {

        }
    }
}