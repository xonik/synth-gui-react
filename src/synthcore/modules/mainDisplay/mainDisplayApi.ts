import { MainDisplayControllerIds, MainDisplayScreenId } from './types'
import { selectCurrEnvId, selectCurrStageId, selectEnvelope } from '../env/envelopesReducer'
import { store } from '../../store'
import { LoopMode, StageId } from '../env/types'
import { envApi } from '../../synthcoreApi'
import { ApiSource } from '../../types'
import { selectCurrScreen, setCurrentScreen } from './mainDisplayReducer'
import { dispatch } from '../../utils'
import modsApi from '../mods/modsApi'

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
    },
    [MainDisplayScreenId.MOD]: {
        [MainDisplayControllerIds.POT1]: 16,
        [MainDisplayControllerIds.POT2]: 16,
        [MainDisplayControllerIds.POT3]: 16,
        [MainDisplayControllerIds.POT4]: 16,
        [MainDisplayControllerIds.POT5]: 100,
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

const step = (increment: number) => increment > 0 ? 1 : -1

const mainDisplayEnvApi = {
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

const mainDisplayModsApi = {
    handleMainDisplayController: (ctrlId: MainDisplayControllerIds, increment: number) => {
        if (ctrlId === MainDisplayControllerIds.POT1) {
            modsApi.incrementGuiTargetGroup(step(increment), ApiSource.UI)
        } else if (ctrlId === MainDisplayControllerIds.POT2) {
            modsApi.incrementGuiSource(step(increment), ApiSource.UI)
        } else if (ctrlId === MainDisplayControllerIds.POT3) {
            modsApi.incrementGuiTargetFunc(step(increment), ApiSource.UI)
        } else if (ctrlId === MainDisplayControllerIds.POT4) {
            modsApi.incrementGuiTargetParam(step(increment), ApiSource.UI)
        } else if (ctrlId === MainDisplayControllerIds.POT5) {
            modsApi.incrementGuiModValue(increment, ApiSource.UI)
        } else if (ctrlId === MainDisplayControllerIds.POT6) {

        }
    }
}

const mainDisplayApi = {
    handleMainDisplayController: (ctrlId: MainDisplayControllerIds, value: number) => {
        const currScreenId = selectCurrScreen(store.getState())
        if (currScreenId === MainDisplayScreenId.MOD) {
            mainDisplayModsApi.handleMainDisplayController(ctrlId, value)
        } else if (currScreenId === MainDisplayScreenId.ENV) {
            mainDisplayEnvApi.handleMainDisplayController(ctrlId, value)
        }
    },
    setCurrentScreen: (id: number) => {
        dispatch(setCurrentScreen({id}))
    }
}

export default mainDisplayApi