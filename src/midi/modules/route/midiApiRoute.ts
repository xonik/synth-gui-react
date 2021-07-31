import { envApi } from '../../../synthcore/synthcoreApi'
import { Curve, LoopMode, ReleaseMode } from '../../../synthcore/modules/env/types'
import controllers from '../../controllers'
import { cc, nrpn } from '../../midibus'
import { ApiSource } from '../../../synthcore/types'
import { shouldSend } from '../../utils'
import modsApi from '../../../synthcore/modules/mods/modsApi'

let currentSourceId = 0;
let currentTargetId = 0;

const amount = (() => {
    const cfg = controllers.ROUTE.AMOUNT

    return {
        send: (source: ApiSource, value: number) => {
            if (!shouldSend(source)) {
                return
            }

            // stageId is encoded as part of the extra available bits
            const rounded = Math.round(value * 32767) + 32767
            nrpn.send(cfg.addr, rounded)
        },
        receive: () => {
            nrpn.subscribe((value: number) => {
                modsApi.setModValue( currentSourceId, currentTargetId,(value - 32767) / 32767, ApiSource.MIDI)
            }, cfg)
        }
    }
})()

const source = (() => {
    const cfg = controllers.ROUTE.FROM

    return {
        send: (source: ApiSource, value: number) => {
            if (!shouldSend(source)) {
                return
            }
            cc.send(cfg.cc, value)
        },
        receive: () => {
            cc.subscribe((value: number) => {
                currentSourceId = value
            }, cfg)
        }
    }
})()

const target = (() => {
    const cfg = controllers.ROUTE.TO

    return {
        send: (source: ApiSource, value: number) => {
            if (!shouldSend(source)) {
                return
            }
            cc.send(cfg.cc, value)
        },
        receive: () => {
            cc.subscribe((value: number) => {
                currentTargetId = value
            }, cfg)
        }
    }
})()

const initReceive = () => {
    amount.receive()
    source.receive()
    target.receive()
}

export default {
    setAmount: amount.send,
    setSource: source.send,
    setTarget: target.send,
    initReceive,
}