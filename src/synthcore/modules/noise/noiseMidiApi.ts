import controllers from '../../../midi/controllers'
import { ApiSource } from '../../types'

// If imported directly we get a cyclic dependency. Not sure why it works now.
import { noiseApi } from '../../synthcoreApi'
import { toggleParamReceive, toggleParamSend } from '../common/commonMidiApi'

const colour = (() => {
    const cfg = controllers.NOISE.COLOUR
    return {
        send: (colour: ApiSource, value: number) => toggleParamSend(colour, value, cfg),
        receive: () => toggleParamReceive(cfg, noiseApi.setColour)
    }
})()

const initReceive = () => {
    colour.receive()
}

const noiseMidiApi = {
    setColour: colour.send,

    initReceive,
}

export default noiseMidiApi
