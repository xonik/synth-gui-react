import { mainDisplayModsApi, mainDisplayModsPotResolutions } from '../mods/modsMainDisplayApi'
import { mainDisplayEnvApi, mainDisplayEnvPotResolutions } from '../env/envMainDisplayApi'
import mainDisplayMidiApi from './mainDisplayMidiApi'
import { ApiSource } from '../../types'
import mainDisplayControllers from './mainDisplayControllers'
import { mainDisplaySettingsApi, mainDisplaySettingsPotResolutions } from '../settings/settingsMainDisplayApi'
import { mainDisplayLfoApi, mainDisplayLfoPotResolutions } from '../lfo/lfoMainDisplayApi'
import { useUiStore, ScreenId } from '../../../store/uiStore'


type PotResolutions = {
    [key: string]: {
        [key: number]: number
    }
}

const potResolution: PotResolutions = {
    [ScreenId.ENV]: mainDisplayEnvPotResolutions,
    [ScreenId.LFO]: mainDisplayLfoPotResolutions,
    [ScreenId.MOD]: mainDisplayModsPotResolutions,
    [ScreenId.SETTINGS]: mainDisplaySettingsPotResolutions,
}

export const getPotResolution = (ctrlId: number, currScreen: ScreenId) => {
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
    useUiStore.getState().setShift(on)
    mainDisplayMidiApi.shift(source, on)
}
const handlePerformClick = (source: ApiSource) => {
    mainDisplayMidiApi.performClick(source)
}
const handleLoadClick = (source: ApiSource) => {
    mainDisplayMidiApi.loadClick(source)
}
const handleSaveClick = (source: ApiSource) => {
    console.log(`Save form ${source}`)
    mainDisplayMidiApi.saveClick(source)
}
const handleCompareClick = (source: ApiSource) => {
    mainDisplayMidiApi.compareClick(source)
}
const handleRouteClick = (source: ApiSource) => {
    mainDisplayMidiApi.routeClick(source)
}

const handleMainDisplayController = (voiceGroupIndex: number, ctrlId: number, value: number, source: ApiSource) => {
    const currentScreen = useUiStore.getState().currentScreen

    if (currentScreen === ScreenId.MOD) {
        mainDisplayModsApi.handleMainDisplayController(voiceGroupIndex, ctrlId, value)
    } else if (currentScreen === ScreenId.ENV) {
        mainDisplayEnvApi.handleMainDisplayController(voiceGroupIndex, ctrlId, value)
    } else if (currentScreen === ScreenId.LFO) {
        mainDisplayLfoApi.handleMainDisplayController(voiceGroupIndex, ctrlId, value)
    } else if (currentScreen === ScreenId.SETTINGS) {
        mainDisplaySettingsApi.handleMainDisplayController(voiceGroupIndex, ctrlId, value)
    }

    if (ctrlId >= mainDisplayControllers.POT1.id && ctrlId <= mainDisplayControllers.POT6.id) {
        mainDisplayMidiApi.pot(source, ctrlId, value)
    }
}

const setCurrentScreen = (id: number, source: ApiSource) => {
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
