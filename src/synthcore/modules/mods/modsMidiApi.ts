import controllers from '../../../midi/controllers'
import { cc, nrpn } from '../../../midi/midibus'
import { shouldSend } from '../../../midi/utils'
import modsApi from './modsApi'
import { ApiSource } from '../../types'
import logger from '../../../utils/logger'

let currentSourceId = 0;
let currentTargetId = 0;
let currentTargetIndex = 0;

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
                modsApi.setModValue( currentSourceId, currentTargetId, currentTargetIndex, (value - 32767) / 32767, ApiSource.MIDI)
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

const target = (() => {
    const cfg = controllers.MODS.SET_DST_ID
    const indexCfg = controllers.MODS.SET_DST_INDEX

    return {
        send: (source: ApiSource, value: number, ctrlIndex: number) => {
            if (!shouldSend(source)) {
                return
            }
            if(value !== currentTargetId){
                currentTargetId = value
                logger.midi(`Setting modulation destination id to ${value}`)
                cc.send(cfg, value)
            }

            if(ctrlIndex !== currentTargetIndex) {
                currentTargetIndex = ctrlIndex
                // We don't send index when it is zero, as almost all controllers have
                // and index of zero. Instead, we reset it when receiving a targetId.
                if (ctrlIndex !== 0) {
                    logger.midi(`Setting modulation destination ctrl index to ${ctrlIndex}`)
                    cc.send(indexCfg, ctrlIndex)
                }
            }
        },
        receive: () => {
            // NB: Synth must send targetId before targetIndex as targetIndex is reset to 0 when targetId is received.
            cc.subscribe((value: number) => {
                currentTargetId = value
                currentTargetIndex = 0;
            }, cfg)
            cc.subscribe((value: number) => {
                currentTargetIndex = value
            }, indexCfg)
        }
    }
})()

const initReceive = () => {
    amount.receive()
    source.receive()
    target.receive()
}

const modsMidiApi = {
    setAmount: amount.send,
    setSourceId: source.send,
    setTargetId: target.send,
    initReceive,
}

export default modsMidiApi