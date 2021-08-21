import { envApi } from '../../synthcoreApi'
import { Curve, LoopMode, ReleaseMode } from './types'
import controllers from '../../../midi/controllers'
import { cc, nrpn } from '../../../midi/midibus'
import { ApiSource } from '../../types'
import { shouldSend } from '../../../midi/utils'
import logger from '../../../utils/logger'

let currentEnvId = -1

const selectEnv = (envId: number) => {
    if (envId !== currentEnvId) {
        cc.send(controllers.ENV.SELECT, envId)
        currentEnvId = envId
    }
}

const level = (() => {
    const cfg = controllers.ENV.LEVEL

    return {
        send: (source: ApiSource, envId: number, stageId: number, boundedValue: number) => {
            if (!shouldSend(source)) {
                return
            }
            selectEnv(envId)

            // stageId is encoded as part of the extra available bits
            const value = (Math.round(boundedValue * 32767) + 32767) + (stageId << 16)
            logger.midi(`Setting level for env ${envId} stage ${stageId} to ${boundedValue}`)
            nrpn.send(cfg, value)
        },
        receive: () => {
            nrpn.subscribe((value: number) => {
                const level = value & 0xFFFF
                const stageId = value >> 16
                envApi.setStageLevel(currentEnvId, stageId, (level - 32767) / 32767 , ApiSource.MIDI)
            }, cfg)
        }
    }
})()

const time = (() => {
    const cfg = controllers.ENV.TIME
    return {
        send: (source: ApiSource, envId: number, stageId: number, boundedValue: number) => {
            if (!shouldSend(source)) {
                return
            }
            selectEnv(envId)

            // stageId is encoded as part of the extra available bits
            const value = Math.round(boundedValue * 65535) + (stageId << 16)
            logger.midi(`Setting time for env ${envId} stage ${stageId} to ${boundedValue}`)
            nrpn.send(cfg, value)
        },
        receive: () => {
            nrpn.subscribe((value: number) => {
                const time = value & 0xFFFF
                const stageId = value >> 16
                envApi.setStageTime(currentEnvId, stageId, time / 65535, ApiSource.MIDI)
            }, cfg)
        }
    }
})()

const invert = (() => {
    const cfg = controllers.ENV.INVERT

    return {
        send: (source: ApiSource, envId: number, invert: boolean) => {
            if (!shouldSend(source)) {
                return
            }
            selectEnv(envId)
            const invertIndex = invert ? 1 : 0
            logger.midi(`Setting invert for env ${envId} to ${invert}`)
            cc.send(cfg, cfg.values[invertIndex])
        },
        receive: () => {
            cc.subscribe((value: number) => {
                const invert = value === cfg.values[1]
                envApi.setInvert(currentEnvId, invert, ApiSource.MIDI)
            }, cfg)
        }
    }
})()

const resetOnTrigger = (() => {
    const cfg = controllers.ENV.RESET_ON_TRIGGER

    return {
        send: (source: ApiSource, envId: number, resetOnTrigger: boolean) => {
            if (!shouldSend(source)) {
                return
            }
            selectEnv(envId)
            const resetIndex = resetOnTrigger ? 1 : 0
            logger.midi(`Setting reset on trigger for env ${envId} to ${resetOnTrigger}`)
            cc.send(cfg, cfg.values[resetIndex])
        },
        receive: () => {
            cc.subscribe((value: number) => {
                const reset = value === cfg.values[1]
                envApi.setRetrigger(currentEnvId, reset, ApiSource.MIDI)
            }, cfg)
        }
    }
})()

const releaseMode = (() => {
    const cfg = controllers.ENV.RELEASE_MODE

    return {
        send: (source: ApiSource, envId: number, releaseMode: ReleaseMode) => {
            if (!shouldSend(source)) {
                return
            }
            selectEnv(envId)
            logger.midi(`Setting release mode for env ${envId} to ${releaseMode}`)
            cc.send(cfg, cfg.values[releaseMode])
        },
        receive: () => {
            cc.subscribe((value: number) => {
                const releaseMode = cfg.values.indexOf(value) || 0
                envApi.setReleaseMode(currentEnvId, releaseMode, ApiSource.MIDI)
            }, cfg)
        }
    }
})()

const loopMode = (() => {
    const cfg = controllers.ENV.LOOP_MODE

    return {
        send: (source: ApiSource, envId: number, loopMode: LoopMode) => {
            if (!shouldSend(source)) {
                return
            }
            selectEnv(envId)
            logger.midi(`Setting loop mode for env ${envId} to ${loopMode}`)
            cc.send(cfg, cfg.values[loopMode])
        },
        receive: () => {
            cc.subscribe((value: number) => {
                const loopMode = cfg.values.indexOf(value) || 0
                envApi.setLoopMode(currentEnvId, loopMode, ApiSource.MIDI)
            }, cfg)
        }
    }
})()

const loopEnabled = (() => {
    const cfg = controllers.ENV.LOOP

    return {
        send: (source: ApiSource, envId: number, enabled: boolean) => {
            if (!shouldSend(source)) {
                return
            }
            selectEnv(envId)
            const loopEnabledIndex = enabled ? 1 : 0
            logger.midi(`Changing loop enabled for env ${envId} to ${enabled}`)
            cc.send(cfg, cfg.values[loopEnabledIndex])
        },
        receive: () => {
            cc.subscribe((value: number) => {
                const enabled = value === cfg.values[1]
                envApi.setLoopEnabled(currentEnvId, enabled, ApiSource.MIDI)
            }, cfg)
        }
    }
})()

const stageEnabled = (() => {
    const cfg = controllers.ENV.TOGGLE_STAGE

    return {
        send: (source: ApiSource, envId: number, stageId: number, enabled: boolean) => {
            if (!shouldSend(source)) {
                return
            }
            selectEnv(envId)
            const enableBit = enabled ? 0b1000 : 0
            const data = stageId | enableBit
            logger.midi(`Changing enable for env ${envId} stage ${stageId} to ${enabled}`)
            cc.send(cfg, data)
        },
        receive: () => {
            cc.subscribe((value: number) => {
                const stageId = value & 0b111
                const enabled = (value & 0b1000) > 0
                envApi.setStageEnabled(currentEnvId, stageId, enabled, ApiSource.MIDI)
            }, cfg)
        }
    }
})()

const curve = (() => {
    const cfg = controllers.ENV.CURVE

    return {
        send: (source: ApiSource, envId: number, stageId: number, curve: Curve) => {
            if (!shouldSend(source)) {
                return
            }
            selectEnv(envId)
            logger.midi(`Setting curve for env ${envId} stage ${stageId} to ${curve}`)
            nrpn.send(cfg, (stageId << 7) + curve)
        },
        receive: () => {
            nrpn.subscribe((value: number) => {
                const stageId = (value >> 7)
                const curve = value & 0b01111111
                envApi.setStageCurve(currentEnvId, stageId, curve, ApiSource.MIDI)
            }, cfg)
        }
    }
})()

const maxLoops = (() => {
    const cfg = controllers.ENV.MAX_LOOPS

    return {
        send: (source: ApiSource, envId: number, maxLoops: number) => {
            if (!shouldSend(source)) {
                return
            }
            logger.midi(`Setting max loops for ${envId} to ${maxLoops}`)
            selectEnv(envId)
            cc.send(cfg, maxLoops)
        },
        receive: () => {
            cc.subscribe((value: number) => {
                envApi.setMaxLoops(currentEnvId, value, ApiSource.MIDI)
            }, cfg)
        }
    }
})()

const env3Id = (() => {
    const cfg = controllers.ENV.SELECT_ENV3_ID

    return {
        send: (source: ApiSource, id: number) => {
            if (!shouldSend(source)) {
                return
            }
            logger.midi(`Setting 3rd env id to ${id}`)
            cc.send(cfg, id)
        },
        receive: () => {
            cc.subscribe((id: number) => {
                envApi.setEnv3Id(id, ApiSource.MIDI)
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
            selectEnv(envId)
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
            selectEnv(envId)
            logger.midi(`Env release for ${envId}`)
            cc.send(cfg, cfg.values[0])
        },
    }
})()

const initReceive = () => {
    level.receive()
    time.receive()
    invert.receive()
    resetOnTrigger.receive()
    releaseMode.receive()
    loopMode.receive()
    loopEnabled.receive()
    maxLoops.receive()
    stageEnabled.receive()
    curve.receive()
    env3Id.receive()
}

const envMidiApi = {
    setLevel: level.send,
    setTime: time.send,
    setInvert: invert.send,
    setStageEnabled: stageEnabled.send,
    setResetOnTrigger: resetOnTrigger.send,
    setReleaseMode: releaseMode.send,
    setLoopMode: loopMode.send,
    setLoopEnabled: loopEnabled.send,
    setMaxLoops: maxLoops.send,
    setCurve: curve.send,
    trigger: trigger.send,
    release: release.send,
    setEnv3Id: env3Id.send,
    initReceive,
}

export default envMidiApi