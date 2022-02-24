// If imported directly we get a cyclic dependency. Not sure why it works now.
import { envApi } from '../../synthcoreApi'
import controllers from '../../../midi/controllers'
import { cc, nrpn } from '../../../midi/midibus'
import { ApiSource } from '../../types'
import { shouldSend } from '../../../midi/utils'
import logger from '../../../utils/logger'
import { NumericInputProperty } from '../common/types'

let currentReceivedEnvId = -1
let currentSentEnvId = -1
let lastSentEnvIdTimestamp = 0

const stageEnabled = (() => {
    const cfg = controllers.ENV.TOGGLE_STAGE

    return {
        send: ({ ctrlIndex: envId = 0, value: enabled, valueIndex: stageId = 0, source }: NumericInputProperty) => {
            if (!shouldSend(source)) {
                return
            }
            envSelect.send(source, envId)
            const enableBit = enabled ? 0b1000 : 0
            const data = stageId | enableBit
            logger.midi(`Changing enable for env ${envId} stage ${stageId} to ${enabled}`)
            cc.send(cfg, data)
        },
        receive: (set: (input: NumericInputProperty) => void) => {
            cc.subscribe((value: number) => {
                const stageId = value & 0b111
                const enabled = (value & 0b1000) > 0 ? 1 : 0
                set({ctrl: cfg, ctrlIndex: currentReceivedEnvId, valueIndex: stageId, value: enabled, source: ApiSource.MIDI})
            }, cfg)
        }
    }
})()

const curve = (() => {
    const cfg = controllers.ENV.CURVE

    return {
        send: ({ ctrlIndex: envId = 0, value: curve, valueIndex: stageId = 0, source }: NumericInputProperty) => {
            if (!shouldSend(source)) {
                return
            }
            envSelect.send(source, envId)
            logger.midi(`Setting curve for env ${envId} stage ${stageId} to ${curve}`)
            nrpn.send(cfg, (stageId << 7) + curve)
        },
        receive: (set: (input: NumericInputProperty) => void) => {
            nrpn.subscribe((value: number) => {
                const stageId = (value >> 7)
                const curve = value & 0b01111111
                set({ctrl: cfg, ctrlIndex: currentReceivedEnvId, valueIndex: stageId, value: curve, source: ApiSource.MIDI})
            }, cfg)
        }
    }
})()

const envSelect = (() => {
    const cfg = controllers.ENV.SELECT
    
    return {
        send: (source: ApiSource, id: number) => {
            if (!shouldSend(source)) {
                return
            }

            // Resend env every five seconds just to make synth restarts smoother
            if (id !== currentSentEnvId || Date.now() - lastSentEnvIdTimestamp > 5000) {
                currentSentEnvId = id
                lastSentEnvIdTimestamp = Date.now()
                logger.midi(`Setting env id to ${id}`)
                cc.send(cfg, id)
            }
        },
        receive: () => {
            cc.subscribe((id: number) => {
                currentReceivedEnvId = id;
                envApi.setCurrentEnv(id, ApiSource.MIDI)
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

const initReceive = () => {
    envSelect.receive()
}

const envMidiApi = {
    stageEnabled,
    curve,
    trigger,
    release,
    initReceive,
}

export default envMidiApi