import { mainDisplayApi } from '../../synthcoreApi'
import controllers from '../../../midi/controllers'
import { cc } from '../../../midi/midibus'
import { ApiSource } from '../../types'
import { shouldSend } from '../../../midi/utils'

const currentScreen = (() => {
    const cfg = controllers.MAIN_DISPLAY.GROUP_MENU

    return {
        send: (source: ApiSource, id: number) => {
            if (!shouldSend(source)) {
                return
            }
            cc.send(cfg, cfg.values[id])
        },
        receive: () => {
            cc.subscribe((value: number) => {
                const id = cfg.values.indexOf(value)
                mainDisplayApi.setCurrentScreen(id);
            }, cfg)
        }
    }
})()

const initReceive = () => {
    currentScreen.receive()
}

const mainDisplayMidiApi = {
    setCurrentScreen: currentScreen.send,
    initReceive,
}

export default mainDisplayMidiApi