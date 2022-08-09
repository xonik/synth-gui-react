import mainDisplayControllers from '../mainDisplay/mainDisplayControllers'

export const mainDisplaySettingsPotResolutions = {
    [mainDisplayControllers.POT1.id]: 8,
    [mainDisplayControllers.POT2.id]: 1000,
    [mainDisplayControllers.POT3.id]: 1000,
    [mainDisplayControllers.POT4.id]: 8,
    [mainDisplayControllers.POT5.id]: 32,
    [mainDisplayControllers.POT6.id]: 1000,
}

export const mainDisplaySettingsApi = {
    handleMainDisplayController: (ctrlId: number, increment: number) => {
        if (ctrlId === mainDisplayControllers.POT1.id) {
        } else if (ctrlId === mainDisplayControllers.POT2.id) {
        } else if (ctrlId === mainDisplayControllers.POT3.id) {
        } else if (ctrlId === mainDisplayControllers.POT4.id) {
        } else if (ctrlId === mainDisplayControllers.POT5.id) {
        } else if (ctrlId === mainDisplayControllers.POT6.id) {
        }
    }
}