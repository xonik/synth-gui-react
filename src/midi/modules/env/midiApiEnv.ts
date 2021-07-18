import { envApi } from '../../../synthcore/synthcoreApi'
import { Curve, LoopMode, ReleaseMode } from '../../../synthcore/modules/env/types'
import midiControllers from '../../midiControllers'
import { cc, nrpn } from '../../midibus'
import { ApiSource } from '../../../synthcore/types'

const shouldSend = (source: ApiSource) => {
    // TODO: Make this configurable
    return source !== ApiSource.MIDI
}

let currentEnvId = -1

const selectEnv = (envId: number) => {
    if (envId !== currentEnvId) {
        cc.send(midiControllers.ENV.SELECT.cc, envId)
        currentEnvId = envId
    }
}

const level = (() => {
    const cfg = midiControllers.ENV.LEVEL

    return {
        send: (source: ApiSource, envId: number, stageId: number, boundedValue: number) => {
            if (!shouldSend(source)) {
                return
            }
            selectEnv(envId)

            // stageId is encoded as part of the extra available bits
            const value = (Math.round(boundedValue * 65535)  + 32768) + stageId << 16
            nrpn.send(cfg.addr, value)
        },
        receive: () => {
            nrpn.subscribe((value: number) => {
                const level = value & 0xFF
                const stageId = value >> 16
                envApi.setStageLevel(currentEnvId, stageId, level, ApiSource.MIDI)
            }, cfg)
        }
    }
})()

const time = (() => {
    const cfg = midiControllers.ENV.TIME
    return {
        send: (source: ApiSource, envId: number, stageId: number, boundedValue: number) => {
            if (!shouldSend(source)) {
                return
            }
            selectEnv(envId)

            // stageId is encoded as part of the extra available bits
            const value = Math.round(boundedValue * 65535) + stageId << 16
            nrpn.send(cfg.addr, value)
        },
        receive: () => {
            nrpn.subscribe((value: number) => {
                const time = value & 0xFF
                const stageId = value >> 16
                envApi.setStageTime(currentEnvId, stageId, time, ApiSource.MIDI)
            }, cfg)
        }
    }
})()

const invert = (() => {
    const cfg = midiControllers.ENV.INVERT

    return {
        send: (source: ApiSource, envId: number, invert: boolean) => {
            if (!shouldSend(source)) {
                return
            }
            selectEnv(envId)
            const invertIndex = invert ? 1 : 0
            cc.send(cfg.cc, cfg.values[invertIndex])
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
    const cfg = midiControllers.ENV.RESET_ON_TRIGGER

    return {
        send: (source: ApiSource, envId: number, resetOnTrigger: boolean) => {
            if (!shouldSend(source)) {
                return
            }
            selectEnv(envId)
            const resetIndex = resetOnTrigger ? 1 : 0
            cc.send(cfg.cc, cfg.values[resetIndex])
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
    const cfg = midiControllers.ENV.RELEASE_MODE

    return {
        send: (source: ApiSource, envId: number, releaseMode: ReleaseMode) => {
            if (!shouldSend(source)) {
                return
            }
            selectEnv(envId)
            cc.send(cfg.cc, cfg.values[releaseMode])
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
    const cfg = midiControllers.ENV.LOOP_MODE

    return {
        send: (source: ApiSource, envId: number, loopMode: LoopMode) => {
            if (!shouldSend(source)) {
                return
            }
            selectEnv(envId)
            cc.send(cfg.cc, cfg.values[loopMode])
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
    const cfg = midiControllers.ENV.LOOP

    return {
        send: (source: ApiSource, envId: number, enabled: boolean) => {
            if (!shouldSend(source)) {
                return
            }
            selectEnv(envId)
            const loopEnabledIndex = enabled ? 1 : 0
            cc.send(cfg.cc, cfg.values[loopEnabledIndex])
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
    const cfg = midiControllers.ENV.TOGGLE_STAGE

    return {
        send: (source: ApiSource, envId: number, stageId: number, enabled: boolean) => {
            if (!shouldSend(source)) {
                return
            }
            selectEnv(envId)
            const enableBit = enabled ? 0b1000 : 0
            const data = stageId | enableBit
            cc.send(cfg.cc, data)
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
    const cfg = midiControllers.ENV.CURVE

    return {
        send: (source: ApiSource, envId: number, stageId: number, curve: Curve) => {
            if (!shouldSend(source)) {
                return
            }
            selectEnv(envId)
            nrpn.send(cfg.addr, stageId << 7 + curve)
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
    const cfg = midiControllers.ENV.MAX_LOOPS

    return {
        send: (source: ApiSource, envId: number, maxLoops: number) => {
            if (!shouldSend(source)) {
                return
            }
            selectEnv(envId)
            cc.send(cfg.cc, maxLoops)
        },
        receive: () => {
            cc.subscribe((value: number) => {
                envApi.setMaxLoops(currentEnvId, value, ApiSource.MIDI)
            }, cfg)
        }
    }
})()

const env3Id = (() => {
    const cfg = midiControllers.ENV.SELECT_ENV3_ID

    return {
        send: (source: ApiSource, id: number) => {
            if (!shouldSend(source)) {
                return
            }
            cc.send(cfg.cc, id)
        },
        receive: () => {
            cc.subscribe((id: number) => {
                envApi.setEnv3Id(id, ApiSource.MIDI)
            }, cfg)
        }
    }
})()

const trigger = (() => {
    const cfg = midiControllers.ENV.TRIGGER

    return {
        send: (source: ApiSource, envId: number) => {
            if (!shouldSend(source)) {
                return
            }
            selectEnv(envId)
            cc.send(cfg.cc, cfg.values[0])
        },
    }
})()

const release = (() => {
    const cfg = midiControllers.ENV.RELEASE

    return {
        send: (source: ApiSource, envId: number) => {
            if (!shouldSend(source)) {
                return
            }
            selectEnv(envId)
            cc.send(cfg.cc, cfg.values[0])
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

export default {
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