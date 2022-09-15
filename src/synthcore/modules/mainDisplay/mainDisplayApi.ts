import { MainDisplayScreenId } from './types'
import { store } from '../../store'
import { selectCurrScreen, setCurrentScreen as setCurrentScreenAction, setShiftOn } from './mainDisplayReducer'
import { dispatch } from '../../utils'
import { mainDisplayModsApi, mainDisplayModsPotResolutions } from '../mods/modsMainDisplayApi'
import { mainDisplayEnvApi, mainDisplayEnvPotResolutions } from '../env/envMainDisplayApi'
import mainDisplayMidiApi from './mainDisplayMidiApi'
import { ApiSource } from '../../types'
import mainDisplayControllers from './mainDisplayControllers'
import { createClickMapper, createIncrementMapper } from '../common/utils'
import { mainDisplaySettingsApi, mainDisplaySettingsPotResolutions } from '../settings/settingsMainDisplayApi'
import { mainDisplayLfoApi, mainDisplayLfoPotResolutions } from '../lfo/lfoMainDisplayApi'

type PotResolutions = {
    [key: number]: {
        [key: number]: number
    }
}

const potResolution: PotResolutions = {
    [MainDisplayScreenId.ENV]: mainDisplayEnvPotResolutions,
    [MainDisplayScreenId.LFO]: mainDisplayLfoPotResolutions,
    [MainDisplayScreenId.MOD]: mainDisplayModsPotResolutions,
    [MainDisplayScreenId.SETTINGS]: mainDisplaySettingsPotResolutions,
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

const handleMainDisplayController = (ctrlId: number, value: number, source: ApiSource) => {
    const currScreenId = selectCurrScreen(store.getState())
    if (currScreenId === MainDisplayScreenId.MOD) {
        mainDisplayModsApi.handleMainDisplayController(ctrlId, value)
    } else if (currScreenId === MainDisplayScreenId.ENV) {
        mainDisplayEnvApi.handleMainDisplayController(ctrlId, value)
    } else if (currScreenId === MainDisplayScreenId.LFO) {
        mainDisplayLfoApi.handleMainDisplayController(ctrlId, value)
    } else if (currScreenId === MainDisplayScreenId.SETTINGS) {
        mainDisplaySettingsApi.handleMainDisplayController(ctrlId, value)
    }

    if(ctrlId >= mainDisplayControllers.POT1.id && ctrlId <= mainDisplayControllers.POT6.id){
        mainDisplayMidiApi.pot(source, ctrlId, value)
    }
}

const setCurrentScreen = (id: number, source: ApiSource) => {
    dispatch(setCurrentScreenAction({ id }))
    mainDisplayMidiApi.setCurrentScreen(source, id)
}

const toggle = createClickMapper([
    [mainDisplayControllers.FUNC_HOME, ({source}) => handleHomeClick(source)],
    [mainDisplayControllers.FUNC_SETTINGS, ({source}) => handleSettingsClick(source)],
    [mainDisplayControllers.FUNC_SHIFT, ({source}) => handleShift(true, source)],
    [mainDisplayControllers.FUNC_PERFORM, ({source}) => handlePerformClick(source)],
    [mainDisplayControllers.FUNC_LOAD, ({source}) => handleLoadClick(source)],
    [mainDisplayControllers.FUNC_SAVE, ({source}) => handleSaveClick(source)],
    [mainDisplayControllers.FUNC_COMPARE, ({source}) => handleCompareClick(source)],
    [mainDisplayControllers.FUNC_ROUTE, ({source}) => handleRouteClick(source)],
])
const increment = createIncrementMapper([
])

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
    toggle,
    increment,
}

export default mainDisplayApi