import { mainDisplayApi } from '../../synthcoreApi'
import controllers from '../../../midi/controllers'
import { cc } from '../../../midi/midibus'
import { ApiSource } from '../../types'
import { shouldSend } from '../../../midi/utils'
import { boolParamReceive, boolParamSend, buttonParamReceive, buttonParamSend, } from '../common/commonMidiApi'
import logger from '../../../utils/logger'
import mainDisplayControllers from './mainDisplayControllers'
import { getBounded } from '../../utils'

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
                mainDisplayApi.setCurrentScreen(id, ApiSource.MIDI)
            }, cfg)
        }
    }
})()

const homeClick = (() => {
    const cfg = controllers.MAIN_DISPLAY.FUNC_HOME
    return {
        send: (source: ApiSource) => buttonParamSend(source, cfg),
        receive: () => buttonParamReceive(cfg, mainDisplayApi.handleHomeClick)
    }
})()
const settingsClick = (() => {
    const cfg = controllers.MAIN_DISPLAY.FUNC_SETTINGS
    return {
        send: (source: ApiSource) => buttonParamSend(source, cfg),
        receive: () => buttonParamReceive(cfg, mainDisplayApi.handleSettingsClick)
    }
})()
const performClick = (() => {
    const cfg = controllers.MAIN_DISPLAY.FUNC_PERFORM
    return {
        send: (source: ApiSource) => buttonParamSend(source, cfg),
        receive: () => buttonParamReceive(cfg, mainDisplayApi.handlePerformClick)
    }
})()
const loadClick = (() => {
    const cfg = controllers.MAIN_DISPLAY.FUNC_LOAD
    return {
        send: (source: ApiSource) => buttonParamSend(source, cfg),
        receive: () => buttonParamReceive(cfg, mainDisplayApi.handleLoadClick)
    }
})()
const saveClick = (() => {
    const cfg = controllers.MAIN_DISPLAY.FUNC_SAVE
    return {
        send: (source: ApiSource) => buttonParamSend(source, cfg),
        receive: () => buttonParamReceive(cfg, mainDisplayApi.handleSaveClick)
    }
})()
const compareClick = (() => {
    const cfg = controllers.MAIN_DISPLAY.FUNC_COMPARE
    return {
        send: (source: ApiSource) => buttonParamSend(source, cfg),
        receive: () => buttonParamReceive(cfg, mainDisplayApi.handleCompareClick)
    }
})()
const routeClick = (() => {
    const cfg = controllers.MAIN_DISPLAY.FUNC_ROUTE
    return {
        send: (source: ApiSource) => buttonParamSend(source, cfg),
        receive: () => buttonParamReceive(cfg, mainDisplayApi.handleRouteClick)
    }
})()
const shift = (() => {
    const cfg = controllers.MAIN_DISPLAY.FUNC_SHIFT
    return {
        send: (source: ApiSource, on: boolean) => boolParamSend(source, on, cfg),
        receive: () => boolParamReceive(cfg, mainDisplayApi.handleShift)
    }
})()

const pot = (() => {
    const potCfgs = [
        mainDisplayControllers.POT1,
        mainDisplayControllers.POT2,
        mainDisplayControllers.POT3,
        mainDisplayControllers.POT4,
        mainDisplayControllers.POT5,
        mainDisplayControllers.POT6,
    ]

    return {
        send: (
            source: ApiSource,
            id: number,
            value: number,
        ) => {
            if (!shouldSend(source) || id > 5) {
                return
            }

            const cfg = potCfgs[id]

            // Value is an increment of 1000, positive or negative. We support
            // up to 64 increments in a single send (but have no
            // way of falling back..
            const midiValue = Math.floor(getBounded(value * 1000 + 64, 0, 127));

            logger.midi(`Incrementing ${cfg.label} by ${midiValue-64}/1000`)
            cc.send(cfg, midiValue)
        },
        receive: () => {
            potCfgs.forEach((cfg, index) => {
                cc.subscribe((midiValue: number) => {
                    const value = (midiValue - 64) / 1000;
                    mainDisplayApi.handleMainDisplayController(mainDisplayControllers.POT1.id + index, midiValue, ApiSource.MIDI)
                }, cfg)
            })
        }
    }
})()

const initReceive = () => {
    currentScreen.receive()
    homeClick.receive()
    settingsClick.receive()
    shift.receive()
    performClick.receive()
    loadClick.receive()
    saveClick.receive()
    compareClick.receive()
    routeClick.receive()
    pot.receive()
}

const mainDisplayMidiApi = {
    setCurrentScreen: currentScreen.send,
    homeClick: homeClick.send,
    settingsClick: settingsClick.send,
    shift: shift.send,
    performClick: performClick.send,
    loadClick: loadClick.send,
    saveClick: saveClick.send,
    compareClick: compareClick.send,
    routeClick: routeClick.send,
    pot: pot.send,

    initReceive,
}

export default mainDisplayMidiApi