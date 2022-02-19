import { MainDisplayControllerIds, MainDisplayScreenId } from './types'
import { store } from '../../store'
import { selectCurrScreen, setCurrentScreen as setCurrentScreenAction, setShiftOn } from './mainDisplayReducer'
import { dispatch } from '../../utils'
import { mainDisplayModsApi, mainDisplayModsPotResolutions } from '../mods/modsMainDisplayApi'
import { mainDisplayEnvApi, mainDisplayEnvPotResolutions } from '../env/envMainDisplayApi'
import mainDisplayMidiApi from './mainDisplayMidiApi'
import { ApiSource } from '../../types'
import logger from '../../../utils/logger'
import mainDisplayControllers from './mainDisplayControllers'

type PotResolutions = {
    [key: number]: {
        [key: number]: number
    }
}

const potResolution: PotResolutions = {
    [MainDisplayScreenId.ENV]: mainDisplayEnvPotResolutions,
    [MainDisplayScreenId.MOD]: mainDisplayModsPotResolutions
}

export const getPotResolution = (ctrlId: number, currScreen: number) => {
    const screenPots = potResolution[currScreen]
    if (screenPots?.[ctrlId]) {
        return screenPots[ctrlId]
    }
    return 1000
}

const handleHomeClick = (source: ApiSource) => {
    mainDisplayMidiApi.homeClick(source)
}
const handleSettingsClick = (source: ApiSource) => {
    mainDisplayMidiApi.settingsClick(source)
}
const handleShift = (on: boolean, source: ApiSource) => {
    dispatch(setShiftOn({ value: on }))
    mainDisplayMidiApi.shift(source, on)
}
const handlePerformClick = (source: ApiSource) => {
    mainDisplayMidiApi.performClick(source)
}
const handleLoadClick = (source: ApiSource) => {
    mainDisplayMidiApi.loadClick(source)
}
const handleSaveClick = (source: ApiSource) => {
    mainDisplayMidiApi.saveClick(source)
}
const handleCompareClick = (source: ApiSource) => {
    mainDisplayMidiApi.compareClick(source)
}
const handleRouteClick = (source: ApiSource) => {
    mainDisplayMidiApi.routeClick(source)
}

const handleMainDisplayController = (ctrlId: MainDisplayControllerIds, value: number, source: ApiSource) => {
    const currScreenId = selectCurrScreen(store.getState())
    if (currScreenId === MainDisplayScreenId.MOD) {
        mainDisplayModsApi.handleMainDisplayController(ctrlId, value)
    } else if (currScreenId === MainDisplayScreenId.ENV) {
        mainDisplayEnvApi.handleMainDisplayController(ctrlId, value)
    }

    if(ctrlId >= mainDisplayControllers.POT1.id && ctrlId <= mainDisplayControllers.POT6.id){
        mainDisplayMidiApi.pot(source, ctrlId, value)
    }
}

const setCurrentScreen = (id: number, source: ApiSource) => {
    dispatch(setCurrentScreenAction({ id }))
    mainDisplayMidiApi.setCurrentScreen(source, id)
}

const mainDisplayApi = {
    handleMainDisplayController,
    setCurrentScreen,
    handleHomeClick,
    handleSettingsClick,
    handleShift,
    handlePerformClick,
    handleLoadClick,
    handleSaveClick,
    handleCompareClick,
    handleRouteClick,
}

export default mainDisplayApi