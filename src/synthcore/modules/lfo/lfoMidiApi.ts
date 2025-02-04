// If imported directly we get a cyclic dependency. Not sure why it works now.
import controllers from '../controllers/controllers'
import { cc, lastSentMidiGroup } from '../../../midi/midibus'
import { ApiSource } from '../../types'
import { shouldSend } from '../../../midi/utils'
import logger from '../../../utils/logger'
import { NumericInputProperty } from '../common/types'
import { ControllerConfig, ControllerConfigButton, ControllerConfigCC, MidiGroup } from '../../../midi/types'
import { paramReceive, ParamReceiveFunc, paramSend, ParamSendFunc } from '../common/commonMidiApi'

let currentReceivedLfoId = -1
let currentSentLfoId = -1
let lastSentLfoIdTimestamp = 0

// A separate select that may be called without setting state
const lfoSelect = (() => {
    const cfg = controllers.LFO.SELECT

    return {
        send: (voiceGroupIndex: number, source: ApiSource, lfoId: number) => {
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
                cc.send(voiceGroupIndex, cfg, lfoId)
            }
        },
        receive: () => {
            cc.subscribe((voiceGroupIndex: number, value: number) => {
                currentReceivedLfoId = value
            }, cfg)

        }
    }
})()

const curve = (() => {
    const curveOutputMapper = (curve: number, cfg: ControllerConfig, stageId: number = 0) => {
        logger.midi(`Setting curve for stage ${stageId} to ${curve}`)
        return (stageId << 7) + curve
    }
    const curveInputMapper = (value: number, ctrl: ControllerConfig) => {
        const stageId = (value >> 7)
        const curve = value & 0b01111111
        return { value: curve, valueIndex: stageId }
    }

    return {
        send: (input: NumericInputProperty) => lfoParamSend(input, curveOutputMapper),
        receive: (ctrl: ControllerConfig, set: (input: NumericInputProperty) => void) => lfoParamReceive(ctrl, set, curveInputMapper)
    }
})()

const stageEnabled = (() => {

    const stageEnabledOutputMapper = (enabled: number, cfg: ControllerConfig, stageId: number = 0) => {
        const enableBit = enabled ? 0b1000 : 0
        const data = stageId | enableBit
        logger.midi(`Changing enable for stage ${stageId} to ${enabled}`)
        return data
    }

    const stageEnabledInputMapper = (value: number, ctrl: ControllerConfig) => {
        const stageId = value & 0b111
        const enabled = (value & 0b1000) > 0 ? 1 : 0
        return { valueIndex: stageId, value: enabled }
    }

    return {
        send: (input: NumericInputProperty) => lfoParamSend(input, stageEnabledOutputMapper),
        receive: (ctrl: ControllerConfig, set: (input: NumericInputProperty) => void) => lfoParamReceive(ctrl, set, stageEnabledInputMapper)
    }
})()

export const lfoParamSend: ParamSendFunc = (
    input: NumericInputProperty,
    outputMapper?: (value: number, ctrl: ControllerConfig, valueIndex?: number) => number
) => {
    lfoSelect.send(input.voiceGroupIndex, input.source, input.ctrlIndex || 0)
    paramSend(input, outputMapper)
}

export const lfoParamReceive: ParamReceiveFunc = (
    ctrl: ControllerConfig | ControllerConfigCC | ControllerConfigButton,
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
    curve,
    stageEnabled,
    initReceive,
}

export default lfoMidiApi