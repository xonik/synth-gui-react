import controllers from '../../../midi/controllers'
import { ApiSource } from '../../types'

// If imported directly we get a cyclic dependency. Not sure why it works now.
import { kbdApi } from '../../synthcoreApi'
import { numericParamReceive, numericParamSend, toggleParamReceive, toggleParamSend } from '../common/commonMidiApi'

const portamento = (() => {
    const cfg = controllers.KBD.PORTAMENTO
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, kbdApi.setPortamento)
    }
})()
const unisonDetune = (() => {
    const cfg = controllers.KBD.UNISON_DETUNE
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, kbdApi.setUnisonDetune)
    }
})()

const hold = (() => {
    const cfg = controllers.KBD.HOLD
    return {
        send: (source: ApiSource, value: number) => toggleParamSend(source, value, cfg),
        receive: () => toggleParamReceive(cfg, kbdApi.setHold)
    }
})()
const chord = (() => {
    const cfg = controllers.KBD.CHORD
    return {
        send: (source: ApiSource, value: number) => toggleParamSend(source, value, cfg),
        receive: () => toggleParamReceive(cfg, kbdApi.setChord)
    }
})()
const mode = (() => {
    const cfg = controllers.KBD.MODE
    return {
        send: (source: ApiSource, value: number) => toggleParamSend(source, value, cfg),
        receive: () => toggleParamReceive(cfg, kbdApi.setHold)
    }
})()
const transpose = (() => {
    const cfg = controllers.KBD.TRANSPOSE
    return {
        send: (source: ApiSource, value: number) => toggleParamSend(source, value, cfg),
        receive: () => toggleParamReceive(cfg, kbdApi.setTranspose)
    }
})()

const initReceive = () => {
    portamento.receive()
    unisonDetune.receive()
    hold.receive()
    chord.receive()
    mode.receive()
    transpose.receive()
}

const kbdMidiApi = {
    setPortamento: portamento.send,
    setUnisonDetune: unisonDetune.send,
    setHold: hold.send,
    setChord: chord.send,
    setMode: mode.send,
    setTranspose: transpose.send,

    initReceive,
}

export default kbdMidiApi
