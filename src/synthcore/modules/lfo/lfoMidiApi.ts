// If imported directly we get a cyclic dependency. Not sure why it works now.
import controllers from '../../../midi/controllers'
import { cc, lastSentMidiGroup } from '../../../midi/midibus'
import { ApiSource } from '../../types'
import { shouldSend } from '../../../midi/utils'
import logger from '../../../utils/logger'
import { NumericInputProperty } from '../common/types'
import { ControllerConfig, ControllerConfigCC, ControllerConfigCCWithValue, MidiGroup } from '../../../midi/types'
import { paramReceive, ParamReceiveFunc, paramSend, ParamSendFunc } from '../common/commonMidiApi'

let currentReceivedLfoId = -1
let currentSentLfoId = -1
let lastSentLfoIdTimestamp = 0

// A separate select that may be called without setting state
const lfoSelect = (() => {
    const cfg = controllers.LFO.SELECT

    return {
        send: (source: ApiSource, lfoId: number) => {
            if (!shouldSend(source)) {
                return
            }

            // Resend lfo if other controller has been sent in the meantime and more than ten seconds has passed since
            // last lfoId send. This makes synth restarts smoother while still keeping id sends to a minimum.
            // PS: After restarting the synth/controller you have to send a different controller than lfo
            if (
                lfoId !== currentSentLfoId ||
                (lastSentMidiGroup !== MidiGroup.LFO && Date.now() - lastSentLfoIdTimestamp > 10000) ||
                (Date.now() - lastSentLfoIdTimestamp > 30000) // resend every 30 sec even if nothing has changed, just in case.
            ) {
                currentSentLfoId = lfoId
                lastSentLfoIdTimestamp = Date.now()
                logger.midi(`Setting lfo id to ${lfoId}`)
                cc.send(cfg, lfoId)
            }
        },
        receive: () => {
            cc.subscribe((value: number) => {
                currentReceivedLfoId = value
            }, cfg)

        }
    }
})()

export const lfoParamSend: ParamSendFunc = (
    input: NumericInputProperty,
    outputMapper?: (value: number, ctrl: ControllerConfig, valueIndex?: number) => number
) => {
    lfoSelect.send(input.source, input.ctrlIndex || 0)
    paramSend(input, outputMapper)
}

export const lfoParamReceive: ParamReceiveFunc = (
    ctrl: ControllerConfig | ControllerConfigCC | ControllerConfigCCWithValue,
    apiSetValue: (input: NumericInputProperty) => void,
    inputMapper?: (midiValue: number, ctrl: ControllerConfig) => ({ value: number, valueIndex?: number }),
) => {
    paramReceive(ctrl, (input) => {
        apiSetValue({ ...input, ctrlIndex: currentReceivedLfoId })
    }, inputMapper)
}

const initReceive = () => {
    lfoSelect.receive()
}
const lfoMidiApi = {
    initReceive,
}

export default lfoMidiApi