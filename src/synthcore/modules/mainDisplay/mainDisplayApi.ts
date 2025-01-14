import { MainDisplayScreenId } from './types'
import { store } from '../../store'
import {
    selectCurrScreen,
    setCurrentScreen as setCurrentScreenAction,
    setPreviousScreen as setPreviousScreenAction,
    setShiftOn
} from './mainDisplayReducer'
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

// Screens that should not be pushed to 'previousScreen', they are modals that should revert to previous screen
// BEFORE any modal.
const modalScreens = [
    MainDisplayScreenId.SAVE,
    MainDisplayScreenId.LOAD,
]

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
    dispatch(setShiftOn({ voiceGroupIndex: -1, value: on }))
    mainDisplayMidiApi.shift(source, on)
}
const handlePerformClick = (source: ApiSource) => {
    mainDisplayMidiApi.performClick(source)
}
const handleLoadClick = (source: ApiSource) => {
    mainDisplayMidiApi.loadClick(source)
    //patchStorageApi.loadPatch()
}
const handleSaveClick = (source: ApiSource) => {
    console.log(`Save form ${source}`)
    mainDisplayMidiApi.saveClick(source)
    //patchStorageApi.savePatch()
}
const handleCompareClick = (source: ApiSource) => {
    mainDisplayMidiApi.compareClick(source)
}
const handleRouteClick = (source: ApiSource) => {
    mainDisplayMidiApi.routeClick(source)
}

const handleMainDisplayController = (voiceGroupIndex: number, ctrlId: number, value: number, source: ApiSource) => {
    const currScreenId = selectCurrScreen(store.getState())
    if (currScreenId === MainDisplayScreenId.MOD) {
        mainDisplayModsApi.handleMainDisplayController(voiceGroupIndex, ctrlId, value)
    } else if (currScreenId === MainDisplayScreenId.ENV) {
        mainDisplayEnvApi.handleMainDisplayController(voiceGroupIndex, ctrlId, value)
    } else if (currScreenId === MainDisplayScreenId.LFO) {
        mainDisplayLfoApi.handleMainDisplayController(voiceGroupIndex, ctrlId, value)
    } else if (currScreenId === MainDisplayScreenId.SETTINGS) {
        mainDisplaySettingsApi.handleMainDisplayController(voiceGroupIndex, ctrlId, value)
    }

    if (ctrlId >= mainDisplayControllers.POT1.id && ctrlId <= mainDisplayControllers.POT6.id) {
        mainDisplayMidiApi.pot(source, ctrlId, value)
    }
}

const setCurrentScreen = (id: number, source: ApiSource) => {
    const currentId = selectCurrScreen(store.getState())
    if (!modalScreens.includes(currentId)) {
        dispatch(setPreviousScreenAction({ id: currentId }))
    }
    dispatch(setCurrentScreenAction({ id }))
    mainDisplayMidiApi.setCurrentScreen(source, id)
}

const toggle = createClickMapper([
    [mainDisplayControllers.FUNC_HOME, ({ source }) => handleHomeClick(source)],
    [mainDisplayControllers.FUNC_SETTINGS, ({ source }) => handleSettingsClick(source)],
    [mainDisplayControllers.FUNC_SHIFT, ({ source }) => handleShift(true, source)],
    [mainDisplayControllers.FUNC_PERFORM, ({ source }) => handlePerformClick(source)],
    [mainDisplayControllers.FUNC_LOAD, ({ source }) => handleLoadClick(source)],
    [mainDisplayControllers.FUNC_SAVE, ({ source }) => handleSaveClick(source)],
    [mainDisplayControllers.FUNC_COMPARE, ({ source }) => handleCompareClick(source)],
    [mainDisplayControllers.FUNC_ROUTE, ({ source }) => handleRouteClick(source)],
])
const increment = createIncrementMapper([])

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