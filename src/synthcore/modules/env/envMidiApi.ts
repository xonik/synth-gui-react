// If imported directly we get a cyclic dependency. Not sure why it works now.
import controllers from '../../../midi/controllers'
import { cc, nrpn } from '../../../midi/midibus'
import { ApiSource } from '../../types'
import { shouldSend } from '../../../midi/utils'
import logger from '../../../utils/logger'
import { NumericInputProperty } from '../common/types'
import { ControllerConfig, ControllerConfigCC, ControllerConfigCCWithValue } from '../../../midi/types'
import { paramReceive, paramSend } from '../common/commonMidiApi'

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

            // Resend env if more than five seconds since last try, makes synth restarts smoother
            if (envId !== currentSentEnvId || Date.now() - lastSentEnvIdTimestamp > 5000) {
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

const trigger = (() => {
    const cfg = controllers.ENV.TRIGGER

    return {
        send: (source: ApiSource, envId: number) => {
            if (!shouldSend(source)) {
                return
            }
            logger.midi(`Env trigger for ${envId}`)
            envSelect.send(source, envId)
            cc.send(cfg, cfg.values[0])
        },
    }
})()

const release = (() => {
    const cfg = controllers.ENV.RELEASE

    return {
        send: (source: ApiSource, envId: number) => {
            if (!shouldSend(source)) {
                return
            }
            envSelect.send(source, envId)
            logger.midi(`Env release for ${envId}`)
            cc.send(cfg, cfg.values[0])
        },
    }
})()

export const envParamSend = (
    source: ApiSource,
    cfg: ControllerConfig | ControllerConfigCC | ControllerConfigCCWithValue,
    envId: number,
    value: number,
    valueIndex?: number,
    outputMapper?: (value: number, ctrl: ControllerConfig, valueIndex?: number) => number
) => {
    envSelect.send(source, envId)
    paramSend(source, cfg, value, valueIndex, outputMapper)
}

export const envParamReceive = (
    ctrl: ControllerConfig | ControllerConfigCC | ControllerConfigCCWithValue,
    apiSetValue: (input: NumericInputProperty) => void,
    inputMapper?: (midiValue: number, ctrl: ControllerConfig) => ({ value: number, valueIndex?: number }),
) => {
    paramReceive(ctrl, (input) => {
        apiSetValue({...input, ctrlIndex: currentReceivedEnvId})
    }, inputMapper)
}

const initReceive = () => {
    envSelect.receive()
}
const envMidiApi = {
    trigger,
    release,
    envSelect,
    initReceive,
}

export default envMidiApi