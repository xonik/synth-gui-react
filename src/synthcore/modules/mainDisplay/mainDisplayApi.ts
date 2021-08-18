import { MainDisplayControllerIds, MainDisplayScreenId } from './types'
import { store } from '../../store'
import { selectCurrScreen, setCurrentScreen } from './mainDisplayReducer'
import { dispatch } from '../../utils'
import { mainDisplayModsApi, mainDisplayModsPotResolutions } from '../mods/modsMainDisplayApi'
import { mainDisplayEnvApi, mainDisplayEnvPotResolutions } from '../env/envMainDisplayApi'

type PotResolutions = {
    [key: number]: {
        [key: number]: number
    }
}

const potResolution: PotResolutions = {
    [MainDisplayScreenId.ENV]: mainDisplayEnvPotResolutions,
    [MainDisplayScreenId.MOD]: mainDisplayModsPotResolutions
}

export const getPotResolution = (ctrlId: MainDisplayControllerIds) => {
    const screenPots = potResolution[selectCurrScreen(store.getState())]
    if (screenPots?.[ctrlId]) {
        return screenPots[ctrlId]
    }
    return 1000
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