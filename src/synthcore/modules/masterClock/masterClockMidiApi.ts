import controllers from '../../../midi/controllers'
import { ApiSource } from '../../types'

// If imported directly we get a cyclic dependency. Not sure why it works now.
import { masterClockApi } from '../../synthcoreApi'
import { numericParamReceive, numericParamSend, toggleParamReceive, toggleParamSend } from '../common/commonMidiApi'

const rate = (() => {
    const cfg = controllers.MASTER_CLOCK.RATE
    return {
        send: (source: ApiSource, value: number) => numericParamSend(source, value, cfg),
        receive: () => numericParamReceive(cfg, masterClockApi.setRate)
    }
})()
const source = (() => {
    const cfg = controllers.MASTER_CLOCK.SOURCE
    return {
        send: (source: ApiSource, value: number) => toggleParamSend(source, value, cfg),
        receive: () => toggleParamReceive(cfg, masterClockApi.setSource)
    }
})()

const initReceive = () => {
    rate.receive()
    source.receive()
}

const masterClockMidiApi = {
    setRate: rate.send,
    setSource: source.send,

    initReceive,
}

export default masterClockMidiApi
