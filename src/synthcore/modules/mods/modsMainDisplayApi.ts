import { MainDisplayControllerIds } from '../mainDisplay/types'
import modsApi from './modsApi'
import { ApiSource } from '../../types'
import { step } from '../../utils'

export const mainDisplayModsPotResolutions = {
    [MainDisplayControllerIds.POT1]: 16,
    [MainDisplayControllerIds.POT2]: 16,
    [MainDisplayControllerIds.POT3]: 16,
    [MainDisplayControllerIds.POT4]: 16,
    [MainDisplayControllerIds.POT5]: 100,
    [MainDisplayControllerIds.POT6]: 1000,
}

export const mainDisplayModsApi = {
    handleMainDisplayController: (ctrlId: MainDisplayControllerIds, increment: number) => {
        if (ctrlId === MainDisplayControllerIds.POT1) {
            modsApi.incrementGuiDstGroup(step(increment), ApiSource.UI)
        } else if (ctrlId === MainDisplayControllerIds.POT2) {
            modsApi.incrementGuiSource(step(increment), ApiSource.UI)
        } else if (ctrlId === MainDisplayControllerIds.POT3) {
            modsApi.incrementGuiDstFunc(step(increment), ApiSource.UI)
        } else if (ctrlId === MainDisplayControllerIds.POT4) {
            modsApi.incrementGuiDstParam(step(increment), ApiSource.UI)
        } else if (ctrlId === MainDisplayControllerIds.POT5) {
            modsApi.incrementGuiModValue(increment, ApiSource.UI)
        } else if (ctrlId === MainDisplayControllerIds.POT6) {

        }
    }
}
