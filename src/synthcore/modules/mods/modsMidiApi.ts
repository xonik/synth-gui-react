import controllers from '../controllers/controllers'
import { cc, nrpn } from '../../../midi/midibus'
import { shouldSend } from '../../../midi/utils'
import modsApi from './modsApi'
import { ApiSource } from '../../types'
import logger from '../../../utils/logger'
import { toggleParamReceive, toggleParamSend } from '../common/commonMidiApi'

// TODO: Dette virker nå fordi source/dst/index mottas samtidig som amount. Men det er ikke bombesikkert
// og burde heller vært én melding
let currentSourceId = 0;
let currentDstId = 0;
let currentDstIndex = 0;

const amount = (() => {
    const cfg = controllers.MODS.AMOUNT

    return {
        send: (voiceGroupIndex: number, source: ApiSource, value: number) => {
            if (!shouldSend(source)) {
                return
            }

            // stageId is encoded as part of the extra available bits
            const rounded = Math.round(value * 32767) + 32767
            logger.midi(`Setting modulation amount to ${value}`)
            nrpn.send(voiceGroupIndex, cfg, rounded)
        },
        receive: () => {
            nrpn.subscribe((voiceGroupIndex: number, value: number) => {
                modsApi.setModValue(voiceGroupIndex, currentSourceId, currentDstId, currentDstIndex, (value - 32767) / 32767, ApiSource.MIDI)
            }, cfg)
        }
    }
})()

const source = (() => {
    const cfg = controllers.MODS.SET_SRC_ID

    return {
        send: (voiceGroupIndex: number, source: ApiSource, value: number) => {
            if (!shouldSend(source) || value === currentSourceId) {
                return
            }
            currentSourceId = value
            logger.midi(`Setting modulation source to ${value}`)
            cc.send(voiceGroupIndex, cfg, value)
        },
        receive: () => {
            cc.subscribe((voiceGroupIndex: number, value: number) => {
                currentSourceId = value
            }, cfg)
        }
    }
})()

const dst = (() => {
    const cfg = controllers.MODS.SET_DST_ID
    const indexCfg = controllers.MODS.SET_DST_INDEX

    return {
        send: (voiceGroupIndex: number, source: ApiSource, value: number, ctrlIndex: number) => {
            if (!shouldSend(source)) {
                return
            }
            if (value !== currentDstId) {
                currentDstId = value
                logger.midi(`Setting modulation destination id to ${value}`)
                cc.send(voiceGroupIndex, cfg, value)
            }

            if (ctrlIndex !== currentDstIndex) {
                currentDstIndex = ctrlIndex
                // We don't send index when it is zero, as almost all controllers have
                // an index of zero. Instead, we reset it when receiving a dstId.
                if (ctrlIndex !== 0) {
                    logger.midi(`Setting modulation destination ctrl index to ${ctrlIndex}`)
                    cc.send(voiceGroupIndex, indexCfg, ctrlIndex)
                }
            }
        },
        receive: () => {
            // NB: Synth must send dstId before dstIndex as dstIndex is reset to 0 when dstId is received.
            cc.subscribe((voiceGroupIndex: number, value: number) => {
                currentDstId = value
                currentDstIndex = 0;
            }, cfg)
            cc.subscribe((voiceGroupIndex: number, value: number) => {
                currentDstIndex = value
            }, indexCfg)
        }
    }
})()

const uiRouteButton = (() => {
    const cfg = controllers.MODS.ROUTE_BUTTON
    return {
        send: (source: ApiSource, value: number) => toggleParamSend(source, value, cfg, -1),
        receive: () => toggleParamReceive(cfg, modsApi.setRouteButton)
    }
})()

const initReceive = () => {
    amount.receive()
    source.receive()
    dst.receive()
    uiRouteButton.receive()
}

const modsMidiApi = {
    setAmount: amount.send,
    setSourceId: source.send,
    setDstId: dst.send,
    setUiRouteButton: uiRouteButton.send,
    initReceive,
}

export default modsMidiApi