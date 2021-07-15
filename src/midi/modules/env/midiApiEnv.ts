import { envApi } from '../../../synthcore/synthcoreApi'
import { Curve, LoopMode, ReleaseMode } from '../../../synthcore/modules/env/types'
import midiControllers from '../../midiControllers'
import { send16, send2x7, sendCC, subscribe, subscribeToCmd } from '../../midibus'
import { ApiSource } from '../../../synthcore/types'

const shouldSend = (source: ApiSource) => {
    // TODO: Make this configurable
    return source !== ApiSource.MIDI;
}

let currentEnvId = -1;

const selectEnv = (envId: number) => {
    if(envId !== currentEnvId){
        sendCC(midiControllers.ENV1.SELECT.cc, envId)
        currentEnvId = envId;
    }
}

const level = (() => {
    const cfg = midiControllers.ENV1.LEVEL

    return {
        send: (source: ApiSource, envId: number, stageId: number, boundedValue: number) => {
            if(!shouldSend(source)) return;
            selectEnv(envId)
            send16(cfg.cc, Math.round(boundedValue * 65535))
        },
        receive: () => {
            subscribeToCmd((values: number[]) => {
                const value = values[0] + values[1] * 128 + values[2] * 16384
                envApi.setStageLevel(currentEnvId, values[3], value, ApiSource.MIDI)
            }, cfg)
        }
    }
})()

const time = (() => {
    const cfg = midiControllers.ENV1.TIME
    return {
        send: (source: ApiSource, envId: number, stageId: number, boundedValue: number) => {
            if(!shouldSend(source)) return;
            selectEnv(envId)
            send16(cfg.cc, Math.round(boundedValue * 65535))
        },
        receive: () => {
            subscribeToCmd((values: number[]) => {
                const value = values[0] + values[1] * 128 + values[2] * 16384
                envApi.setStageTime(currentEnvId, values[3], value, ApiSource.MIDI)
            }, cfg)
        }
    }
})()

const invert = (() => {
    const cfg = midiControllers.ENV1.INVERT

    return {
        send: (source: ApiSource, envId: number, invert: boolean) => {
            if (!shouldSend(source)) return;
            selectEnv(envId)
            const invertIndex = invert ? 1 : 0
            sendCC(cfg.cc, cfg.values[invertIndex])
        },
        receive: () => {
            subscribe((value: number) => {
                const invert = value === cfg.values[1];
                envApi.setInvert(currentEnvId, invert, ApiSource.MIDI)
            }, cfg)
        }
    }
})()

const resetOnTrigger = (() => {
    const cfg = midiControllers.ENV1.RESET_ON_TRIGGER

    return {
        send: (source: ApiSource, envId: number, resetOnTrigger: boolean) => {
            if (!shouldSend(source)) return;
            selectEnv(envId)
            const resetIndex = resetOnTrigger ? 1 : 0
            sendCC(cfg.cc, cfg.values[resetIndex])
        },
        receive: () => {
            subscribe((value: number) => {
                const reset = value === cfg.values[1];
                envApi.setRetrigger(currentEnvId, reset, ApiSource.MIDI)
            }, cfg)
        }
    }
})()

const releaseMode = (() => {
    const cfg = midiControllers.ENV1.RELEASE_MODE

    return {
        send: (source: ApiSource, envId: number, releaseMode: ReleaseMode) => {
            if (!shouldSend(source)) return;
            selectEnv(envId)
            sendCC(cfg.cc, cfg.values[releaseMode])
        },
        receive: () => {
            subscribe((value: number) => {
                const releaseMode = cfg.values.indexOf(value) || 0;
                envApi.setReleaseMode(currentEnvId, releaseMode, ApiSource.MIDI)
            }, cfg)
        }
    }
})()

const loopMode = (() => {
    const cfg = midiControllers.ENV1.LOOP_MODE

    return {
        send: (source: ApiSource, envId: number, loopMode: LoopMode) => {
            if (!shouldSend(source)) return;
            selectEnv(envId)
            sendCC(cfg.cc, cfg.values[loopMode])
        },
        receive: () => {
            subscribe((value: number) => {
                const loopMode = cfg.values.indexOf(value) || 0;
                envApi.setLoopMode(currentEnvId, loopMode, ApiSource.MIDI)
            }, cfg)
        }
    }
})()

const loopEnabled = (() => {
    const cfg = midiControllers.ENV1.LOOP

    return {
        send: (source: ApiSource, envId: number, enabled: boolean) => {
            if (!shouldSend(source)) return;
            selectEnv(envId)
            const loopEnabledIndex = enabled ? 1 : 0
            sendCC(cfg.cc, cfg.values[loopEnabledIndex])
        },
        receive: () => {
            subscribe((value: number) => {
                const enabled = value === cfg.values[1];
                envApi.setLoopEnabled(currentEnvId, enabled, ApiSource.MIDI)
            }, cfg)
        }
    }
})()

const stageEnabled = (() => {
    const cfg = midiControllers.ENV1.TOGGLE_STAGE

    return {
        send: (source: ApiSource, envId: number, stageId: number, enabled: boolean) => {
            if (!shouldSend(source)) return;
            selectEnv(envId)
            const enableBit = enabled ? 0b1000 : 0;
            const data = stageId | enableBit;
            sendCC(cfg.cc, data)
        },
        receive: () => {
            subscribe((value: number) => {
                const stageId = value & 0b111
                const enabled = (value & 0b1000) > 0;
                envApi.setStageEnabled(currentEnvId, stageId, enabled, ApiSource.MIDI)
            }, cfg)
        }
    }
})()

const curve = (() => {
    const cfg = midiControllers.ENV1.CURVE

    return {
        send: (source: ApiSource, envId: number, stageId: number, curve: Curve) => {
            if (!shouldSend(source)) return;
            selectEnv(envId)
            send2x7(cfg.cc, stageId, curve)
        },
        receive: () => {
            subscribeToCmd((values: number[]) => {
                const stageId = values[0]
                const curve = values[1]
                envApi.setStageCurve(currentEnvId, stageId, curve, ApiSource.MIDI)
            }, cfg)
        }
    }
})()

const maxLoops = (() => {
    const cfg = midiControllers.ENV1.MAX_LOOPS

    return {
        send: (source: ApiSource, envId: number, maxLoops: number) => {
            if (!shouldSend(source)) return;
            selectEnv(envId)
            sendCC(cfg.cc, maxLoops)
        },
        receive: () => {
            subscribe((value: number) => {
                envApi.setMaxLoops(currentEnvId, value, ApiSource.MIDI)
            }, cfg)
        }
    }
})()

const env3Id = (() => {
    const cfg = midiControllers.ENV1.SELECT_ENV3_ID

    return {
        send: (source: ApiSource, id: number) => {
            if (!shouldSend(source)) return;
            sendCC(cfg.cc, id)
        },
        receive: () => {
            subscribe((id: number) => {
                envApi.setEnv3Id(id, ApiSource.MIDI)
            }, cfg)
        }
    }
})()

const trigger = (() => {
    const cfg = midiControllers.ENV1.TRIGGER

    return {
        send: (source: ApiSource, envId: number) => {
            if (!shouldSend(source)) return;
            selectEnv(envId)
            sendCC(cfg.cc, cfg.values[0])
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
    setEnv3Id: env3Id.send,
    initReceive,
}