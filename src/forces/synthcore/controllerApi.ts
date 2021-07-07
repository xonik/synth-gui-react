import { MainDisplayControllerIds } from './controllers'
import { selectCurrEnvId, selectCurrStageId, selectEnvelope } from '../envelope/envelopesReducer'
import { store } from '../store'
import { LoopMode, StageId } from '../envelope/types'
import { selectCurrScreen } from '../controller/controllerReducer'
import { MainDisplayScreenId } from '../controller/types'
import { envApi } from './synthcoreApi'
import { ApiSource } from './utils'

type PotResolutions = {
    [key: number]: {
        [key: number]: number
    }
}

const potResolution: PotResolutions = {
    [MainDisplayScreenId.ENV]: {
        [MainDisplayControllerIds.POT1]: 8,
        [MainDisplayControllerIds.POT2]: 1000,
        [MainDisplayControllerIds.POT3]: 1000,
        [MainDisplayControllerIds.POT4]: 8,
        [MainDisplayControllerIds.POT5]: 32,
        [MainDisplayControllerIds.POT6]: 1000,
    }
}

export const getPotResolution = (ctrlId: MainDisplayControllerIds) => {
    const screenPots = potResolution[selectCurrScreen(store.getState())]
    if (screenPots?.[ctrlId]) {
        return screenPots[ctrlId]
    }
    return 1000
}

const mainDisplayEnvApi = {
    handleMainDisplayController: (ctrlId: MainDisplayControllerIds, increment: number) => {
        //TODO Check current display page here
        const envId = selectCurrEnvId(store.getState())
        if (ctrlId === MainDisplayControllerIds.POT1) {
            if (increment > 0) {
                envApi.incrementCurrentEnvelope(1, ApiSource.GUI)
            } else {
                envApi.incrementCurrentEnvelope(-1, ApiSource.GUI)
            }
        } else if (ctrlId === MainDisplayControllerIds.POT2) {
            const stageId = selectCurrStageId(store.getState())
            if (stageId !== StageId.STOPPED) {
                envApi.incrementStageTime(envId, stageId, increment, ApiSource.GUI)
            }
        } else if (ctrlId === MainDisplayControllerIds.POT3) {
            const stageId = selectCurrStageId(store.getState())
            if (stageId !== StageId.STOPPED) {
                envApi.incrementStageLevel(envId, stageId, increment, ApiSource.GUI)
            }
        } else if (ctrlId === MainDisplayControllerIds.POT4) {
            const stageId = selectCurrStageId(store.getState())
            if (stageId !== StageId.STOPPED) {
                if (increment > 0) {
                    envApi.incrementStageCurve(envId, stageId, 1, ApiSource.GUI)
                } else {
                    envApi.incrementStageCurve(envId, stageId, -1, ApiSource.GUI)
                }
            }
        } else if (ctrlId === MainDisplayControllerIds.POT5) {
            const env = selectEnvelope(envId)(store.getState())
            if (env.loopMode !== LoopMode.COUNTED) {
                return
            }
            if (increment > 0) {
                envApi.incrementMaxLoops(envId, 1, ApiSource.GUI)
            } else {
                envApi.incrementMaxLoops(envId, -1, ApiSource.GUI)
            }
        } else if (ctrlId === MainDisplayControllerIds.POT6) {

        }
    }
}

export const mainDisplayApi = {
    handleMainDisplayController: (ctrlId: MainDisplayControllerIds, value: number) => {
        const currScreenId = selectCurrScreen(store.getState())
        if (currScreenId === MainDisplayScreenId.ENV) {
            mainDisplayEnvApi.handleMainDisplayController(ctrlId, value)
        }
    }
}