import controllers from '../../../midi/controllers'
import { ApiSource } from '../../types'

// If imported directly we get a cyclic dependency. Not sure why it works now.
import { ringModApi } from '../../synthcoreApi'
import { toggleParamReceive, toggleParamSend } from '../common/commonMidiApi'

const source = (() => {
    const cfg = controllers.RING_MOD.SOURCE
    return {
        send: (source: ApiSource, value: number) => toggleParamSend(source, value, cfg),
        receive: () => toggleParamReceive(cfg, ringModApi.setSource)
    }
})()

const initReceive = () => {
    source.receive()
}

const ringModMidiApi = {
    setSource: source.send,

    initReceive,
}

export default ringModMidiApi
