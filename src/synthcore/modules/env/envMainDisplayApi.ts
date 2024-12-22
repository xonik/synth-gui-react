import { selectCurrEnvId, selectCurrStageId } from './envReducer'
import { store } from '../../store'
import { envApi } from '../../synthcoreApi'
import { ApiSource } from '../../types'
import { LoopMode, StageId } from './types'
import { step } from '../../utils'
import mainDisplayControllers from '../mainDisplay/mainDisplayControllers'
import { envCtrls } from './envControllers'
import { selectController } from '../controllers/controllersReducer'

export const mainDisplayEnvPotResolutions = {
    [mainDisplayControllers.POT1.id]: 8, // Envelope
    [mainDisplayControllers.POT2.id]: 1000, // Time
    [mainDisplayControllers.POT3.id]: 1000, // Level
    [mainDisplayControllers.POT4.id]: 8, // Curve
    [mainDisplayControllers.POT5.id]: 100,
    [mainDisplayControllers.POT6.id]: 32, // Loops
    [mainDisplayControllers.POT7.id]: 1000,
}

export const mainDisplayEnvApi = {
    handleMainDisplayController: (voiceGroupIndex: number, ctrlId: number, increment: number) => {
        //TODO Check current display page here
        const envId = selectCurrEnvId(store.getState(), voiceGroupIndex)
        if (ctrlId === mainDisplayControllers.POT1.id) {
            envApi.incrementCurrentEnvelope(voiceGroupIndex, step(increment), ApiSource.UI)
        } else if (ctrlId === mainDisplayControllers.POT2.id) {
            const stageId = selectCurrStageId(store.getState(), voiceGroupIndex)
            if (stageId !== StageId.STOPPED) {
                envApi.increment({
                    ctrl: envCtrls.TIME,
                    ctrlIndex: envId,
                    valueIndex: stageId,
                    value: increment,
                    voiceGroupIndex,
                    source: ApiSource.UI
                })
            }
        } else if (ctrlId === mainDisplayControllers.POT3.id) {
            const stageId = selectCurrStageId(store.getState(), voiceGroupIndex)
            if (stageId !== StageId.STOPPED) {
                envApi.increment({
                    ctrl: envCtrls.LEVEL,
                    ctrlIndex: envId,
                    valueIndex: stageId,
                    value: increment,
                    voiceGroupIndex,
                    source: ApiSource.UI
                })
            }
        } else if (ctrlId === mainDisplayControllers.POT4.id) {
            const stageId = selectCurrStageId(store.getState(), voiceGroupIndex)
            if (stageId !== StageId.STOPPED) {
                envApi.increment({
                    ctrl: envCtrls.CURVE,
                    ctrlIndex: envId,
                    valueIndex: stageId,
                    value: step(increment),
                    voiceGroupIndex,
                    source: ApiSource.UI
                })
            }
        } else if (ctrlId === mainDisplayControllers.POT5.id) {
            console.log('inc',)
            envApi.increment({
                ctrl: envCtrls.OFFSET,
                ctrlIndex: envId,
                value: increment,
                voiceGroupIndex,
                source: ApiSource.UI
            })
        } else if (ctrlId === mainDisplayControllers.POT6.id) {
            const loopMode = selectController(envCtrls.LOOP_MODE, envId)(store.getState(), voiceGroupIndex)
            if (loopMode !== LoopMode.COUNTED) {
                return
            }
            envApi.increment({
                ctrl: envCtrls.MAX_LOOPS,
                ctrlIndex: envId,
                value: step(increment),
                voiceGroupIndex,
                source: ApiSource.UI
            })
        } else if (ctrlId === mainDisplayControllers.POT7.id) {

        }
    }
}