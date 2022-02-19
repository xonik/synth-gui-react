import controllers from '../../../midi/controllers'
import { ApiSource } from '../../types'

// If imported directly we get a cyclic dependency. Not sure why it works now.
import { arpApi } from '../../synthcoreApi'
import { numericParamReceive, numericParamSend, toggleParamReceive, toggleParamSend } from '../common/commonMidiApi'

const tempo = (() => {
    const cfg = controllers.ARP.TEMPO
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, arpApi.setTempo)
    }
})()

const onOff = (() => {
    const cfg = controllers.ARP.ON_OFF
    return {
        send: (source: ApiSource, value: number) => toggleParamSend(source, value, cfg),
        receive: () => toggleParamReceive(cfg, arpApi.setOnOff)
    }
})()
const sync = (() => {
    const cfg = controllers.ARP.SYNC
    return {
        send: (source: ApiSource, value: number) => toggleParamSend(source, value, cfg),
        receive: () => toggleParamReceive(cfg, arpApi.setSync)
    }
})()
const range = (() => {
    const cfg = controllers.ARP.RANGE
    return {
        send: (source: ApiSource, value: number) => toggleParamSend(source, value, cfg),
        receive: () => toggleParamReceive(cfg, arpApi.setRange)
    }
})()
const mode = (() => {
    const cfg = controllers.ARP.MODE
    return {
        send: (source: ApiSource, value: number) => toggleParamSend(source, value, cfg),
        receive: () => toggleParamReceive(cfg, arpApi.setMode)
    }
})()
const trigger = (() => {
    const cfg = controllers.ARP.TRIGGER
    return {
        send: (source: ApiSource, value: number) => toggleParamSend(source, value, cfg),
        receive: () => toggleParamReceive(cfg, arpApi.setTrigger)
    }
})()


const initReceive = () => {
    tempo.receive()
    onOff.receive()
    sync.receive()
    range.receive()
    mode.receive()
    trigger.receive()
}

const arpMidiApi = {
    setTempo: tempo.send,
    setOnOff: onOff.send,
    setSync: sync.send,
    setRange: range.send,
    setMode: mode.send,
    setTrigger: trigger.send,

    initReceive,
}

export default arpMidiApi
