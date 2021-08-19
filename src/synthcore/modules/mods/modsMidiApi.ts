import controllers from '../../../midi/controllers'
import { cc, nrpn } from '../../../midi/midibus'
import { shouldSend } from '../../../midi/utils'
import modsApi from './modsApi'
import { ApiSource } from '../../types'

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
            nrpn.send(cfg, rounded)
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
    const cfg = controllers.ROUTE.TO

    return {
        send: (source: ApiSource, value: number) => {
            if (!shouldSend(source)) {
                return
            }
            cc.send(cfg, value)
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

const modsMidiApi = {
    setAmount: amount.send,
    setSource: source.send,
    setTarget: target.send,
    initReceive,
}

export default modsMidiApi