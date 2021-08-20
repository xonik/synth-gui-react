import controllers from '../../../midi/controllers'
import { cc, nrpn } from '../../../midi/midibus'
import { shouldSend } from '../../../midi/utils'
import modsApi from './modsApi'
import { ApiSource } from '../../types'

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
            if (!shouldSend(source)) {
                return
            }
            currentSourceId = value
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
            currentTargetId = value
            currentTargetIndex = ctrlIndex

            cc.send(cfg, value)

            // We don't send index when it is zero, as almost all controllers have
            // and index of zero. Instead, we reset it when receiving a targetId.
            if(ctrlIndex !== 0){
                cc.send(indexCfg, ctrlIndex)
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