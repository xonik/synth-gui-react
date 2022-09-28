import modsApi from './modsApi'
import { ApiSource } from '../../types'
import { step } from '../../utils'
import mainDisplayControllers from '../mainDisplay/mainDisplayControllers'

export const mainDisplayModsPotResolutions = {
    [mainDisplayControllers.POT1.id]: 16,
    [mainDisplayControllers.POT2.id]: 16,
    [mainDisplayControllers.POT3.id]: 16,
    [mainDisplayControllers.POT4.id]: 16,
    [mainDisplayControllers.POT5.id]: 100,
    [mainDisplayControllers.POT6.id]: 1000,
    [mainDisplayControllers.POT7.id]: 1000,
}

export const mainDisplayModsApi = {
    handleMainDisplayController: (ctrlId: number, increment: number) => {
        if (ctrlId === mainDisplayControllers.POT1.id) {
            modsApi.incrementGuiDstGroup(step(increment), ApiSource.UI)
        } else if (ctrlId === mainDisplayControllers.POT2.id) {
            modsApi.incrementGuiSource(step(increment), ApiSource.UI)
        } else if (ctrlId === mainDisplayControllers.POT3.id) {
            modsApi.incrementGuiDstFunc(step(increment), ApiSource.UI)
        } else if (ctrlId === mainDisplayControllers.POT4.id) {
            modsApi.incrementGuiDstParam(step(increment), ApiSource.UI)
        } else if (ctrlId === mainDisplayControllers.POT5.id) {
            modsApi.incrementGuiModValue(increment, ApiSource.UI)
        } else if (ctrlId === mainDisplayControllers.POT6.id) {
        } else if (ctrlId === mainDisplayControllers.POT7.id) {

        }
    }
}
