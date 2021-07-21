import { mainDisplayApi } from '../../../synthcore/synthcoreApi'
import controllers from '../../controllers'
import { cc } from '../../midibus'
import { ApiSource } from '../../../synthcore/types'
import { shouldSend } from '../../utils'

const currentScreen = (() => {
    const cfg = controllers.MAIN_DISPLAY.GROUP_MENU

    return {
        send: (source: ApiSource, id: number) => {
            if (!shouldSend(source)) {
                return
            }
            cc.send(cfg.cc, cfg.values[id])
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

export default {
    setCurrentScreen: currentScreen.send,
    initReceive,
}