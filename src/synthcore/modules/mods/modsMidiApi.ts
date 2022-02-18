import controllers from '../../../midi/controllers'
import { cc, nrpn } from '../../../midi/midibus'
import { shouldSend } from '../../../midi/utils'
import modsApi from './modsApi'
import { ApiSource } from '../../types'
import logger from '../../../utils/logger'
import { numericParamReceive, numericParamSend, toggleParamReceive, toggleParamSend } from '../common/commonMidiApi'

let currentSourceId = 0;
let currentDstId = 0;
let currentDstIndex = 0;

const amount = (() => {
    const cfg = controllers.MODS.AMOUNT

    return {
        send: (source: ApiSource, value: number) => {
            if (!shouldSend(source)) {
                return
            }

            // stageId is encoded as part of the extra available bits
            const rounded = Math.round(value * 32767) + 32767
            logger.midi(`Setting modulation amount to ${value}`)
            nrpn.send(cfg, rounded)
        },
        receive: () => {
            nrpn.subscribe((value: number) => {
                modsApi.setModValue( currentSourceId, currentDstId, currentDstIndex, (value - 32767) / 32767, ApiSource.MIDI)
            }, cfg)
        }
    }
})()

const source = (() => {
    const cfg = controllers.MODS.SET_SRC_ID

    return {
        send: (source: ApiSource, value: number) => {
            if (!shouldSend(source) || value === currentSourceId) {
                return
            }
            currentSourceId = value
            logger.midi(`Setting modulation source to ${value}`)
            cc.send(cfg, value)
        },
        receive: () => {
            cc.subscribe((value: number) => {
                currentSourceId = value
            }, cfg)
        }
    }
})()

const dst = (() => {
    const cfg = controllers.MODS.SET_DST_ID
    const indexCfg = controllers.MODS.SET_DST_INDEX

    return {
        send: (source: ApiSource, value: number, ctrlIndex: number) => {
            if (!shouldSend(source)) {
                return
            }
            if(value !== currentDstId){
                currentDstId = value
                logger.midi(`Setting modulation destination id to ${value}`)
                cc.send(cfg, value)
            }

            if(ctrlIndex !== currentDstIndex) {
                currentDstIndex = ctrlIndex
                // We don't send index when it is zero, as almost all controllers have
                // and index of zero. Instead, we reset it when receiving a dstId.
                if (ctrlIndex !== 0) {
                    logger.midi(`Setting modulation destination ctrl index to ${ctrlIndex}`)
                    cc.send(indexCfg, ctrlIndex)
                }
            }
        },
        receive: () => {
            // NB: Synth must send dstId before dstIndex as dstIndex is reset to 0 when dstId is received.
            cc.subscribe((value: number) => {
                currentDstId = value
                currentDstIndex = 0;
            }, cfg)
            cc.subscribe((value: number) => {
                currentDstIndex = value
            }, indexCfg)
        }
    }
})()

const uiRouteButton = (() => {
    const cfg = controllers.MODS.ROUTE_BUTTON
    return {
        send: (source: ApiSource, value: number) => toggleParamSend(source, value, cfg),
        receive: () => toggleParamReceive(cfg, modsApi.setRouteButton)
    }
})()
const uiAmount = (() => {
    const cfg = controllers.MODS.AMOUNT

    return {
        send: (source: ApiSource, value: number) => {
            if (!shouldSend(source)) {
                return
            }

            // stageId is encoded as part of the extra available bits
            const rounded = Math.round(value * 32767) + 32767
            logger.midi(`Setting ui modulation amount to ${value}`)
            nrpn.send(cfg, rounded)
        },
        receive: () => {
            nrpn.subscribe((value: number) => {
                modsApi.setUiAmount( (value - 32767) / 32767, ApiSource.MIDI)
            }, cfg)
        }
    }
})()

const initReceive = () => {
    amount.receive()
    source.receive()
    dst.receive()
    uiRouteButton.receive()
    uiAmount.receive()
}

const modsMidiApi = {
    setAmount: amount.send,
    setSourceId: source.send,
    setDstId: dst.send,
    setUiRouteButton: uiRouteButton.send,
    setUiAmount: uiAmount.send,
    initReceive,
}

export default modsMidiApi