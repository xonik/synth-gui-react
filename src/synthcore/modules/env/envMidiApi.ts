// If imported directly we get a cyclic dependency. Not sure why it works now.
import controllers from '../controllers/controllers'
import { cc, lastSentMidiGroup } from '../../../midi/midibus'
import { ApiSource } from '../../types'
import { shouldSend } from '../../../midi/utils'
import logger from '../../../utils/logger'
import { NumericInputProperty } from '../common/types'
import { ControllerConfig, ControllerConfigCC, ControllerConfigCCWithValue, MidiGroup } from '../../../midi/types'
import { paramReceive, ParamReceiveFunc, paramSend, ParamSendFunc } from '../common/commonMidiApi'
import { envCtrls } from './envControllers'

let currentReceivedEnvId = -1
let currentSentEnvId = -1
let lastSentEnvIdTimestamp = 0

// A separate select that may be called without setting state
const envSelect = (() => {
    const cfg = controllers.ENV.SELECT

    return {
        send: (source: ApiSource, envId: number) => {
            if (!shouldSend(source)) {
                return
            }

            // Resend env if other controller has been sent in the meantime and more than ten seconds has passed since
            // last envId send. This makes synth restarts smoother while still keeping id sends to a minimum.
            // PS: After restarting the synth/controller you have to send a different controller than env
            if (
                envId !== currentSentEnvId ||
                (lastSentMidiGroup !== MidiGroup.ENV && Date.now() - lastSentEnvIdTimestamp > 10000) ||
                (Date.now() - lastSentEnvIdTimestamp > 30000) // resend every 30 sec even if nothing has changed, just in case.
            ) {
                currentSentEnvId = envId
                lastSentEnvIdTimestamp = Date.now()
                logger.midi(`Setting env id to ${envId}`)
                cc.send(cfg, envId)
            }
        },
        receive: () => {
            cc.subscribe((value: number) => {
                currentReceivedEnvId = value
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
        send: (input: NumericInputProperty) => envParamSend(input, curveOutputMapper),
        receive: (ctrl: ControllerConfig, set: (input: NumericInputProperty) => void) => envParamReceive(ctrl, set, curveInputMapper)
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
        send: (input: NumericInputProperty) => envParamSend(input, stageEnabledOutputMapper),
        receive: (ctrl: ControllerConfig, set: (input: NumericInputProperty) => void) => envParamReceive(envCtrls.TOGGLE_STAGE, set, stageEnabledInputMapper)
    }
})()

export const envParamSend: ParamSendFunc = (
    input: NumericInputProperty,
    outputMapper?: (value: number, ctrl: ControllerConfig, valueIndex?: number) => number
) => {
    envSelect.send(input.source, input.ctrlIndex || 0)
    paramSend(input, outputMapper)
}

export const envParamReceive: ParamReceiveFunc = (
    ctrl: ControllerConfig | ControllerConfigCC | ControllerConfigCCWithValue,
    apiSetValue: (input: NumericInputProperty) => void,
    inputMapper?: (midiValue: number, ctrl: ControllerConfig) => ({ value: number, valueIndex?: number }),
) => {
    paramReceive(ctrl, (input) => {
        apiSetValue({ ...input, ctrlIndex: currentReceivedEnvId })
    }, inputMapper)
}

const initReceive = () => {
    envSelect.receive()
}
const envMidiApi = {
    curve,
    stageEnabled,
    initReceive,
}

export default envMidiApi