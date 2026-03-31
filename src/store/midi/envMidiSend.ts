/**
 * MIDI send for envelopes: subscribes to Zustand store changes and
 * sends the changed parameters over MIDI.
 *
 * Reuses the existing MIDI infrastructure (envParamSend, paramSend)
 * which handles env select, NRPN encoding, CC encoding, etc.
 */

import { envCtrls } from '../../synthcore/modules/env/envControllers'
import { envParamSend } from '../../synthcore/modules/env/envMidiApi'
import { NUMBER_OF_ENVELOPES, StageId } from '../../synthcore/modules/env/types'
import { ApiSource } from '../../synthcore/types'
import { STAGE_NAMES, type StageName } from '../modules/envActions'
import { type EnvelopeState, voiceGroupStores } from '../patchStore'
import { isMidiReceiving } from './midiGuard'

const STAGE_NAME_TO_ID: Record<StageName, StageId> = {
    delay: StageId.DELAY,
    attack: StageId.ATTACK,
    decay1: StageId.DECAY1,
    decay2: StageId.DECAY2,
    sustain: StageId.SUSTAIN,
    release1: StageId.RELEASE1,
    release2: StageId.RELEASE2,
    stopped: StageId.STOPPED,
}

function sendStageParams(
    voiceGroupIndex: number,
    envId: number,
    stageName: StageName,
    stage: EnvelopeState['stages'][StageName],
    prevStage: EnvelopeState['stages'][StageName]
) {
    const stageId = STAGE_NAME_TO_ID[stageName]

    if (stage.time !== prevStage.time) {
        envParamSend({
            ctrl: envCtrls.TIME,
            ctrlIndex: envId,
            valueIndex: stageId,
            value: stage.time,
            voiceGroupIndex,
            source: ApiSource.UI,
        })
    }

    if (stage.level !== prevStage.level) {
        envParamSend({
            ctrl: envCtrls.LEVEL,
            ctrlIndex: envId,
            valueIndex: stageId,
            value: stage.level,
            voiceGroupIndex,
            source: ApiSource.UI,
        })
    }

    if (stage.curve !== prevStage.curve) {
        const curveOutputMapper = (curveIndex: number, _cfg: unknown, valueIndex: number = 0) =>
            (valueIndex << 7) + curveIndex

        envParamSend(
            {
                ctrl: envCtrls.CURVE,
                ctrlIndex: envId,
                valueIndex: stageId,
                value: stage.curve,
                voiceGroupIndex,
                source: ApiSource.UI,
            },
            curveOutputMapper
        )
    }

    if (stage.enabled !== prevStage.enabled) {
        const stageEnabledOutputMapper = (enabled: number, _cfg: unknown, valueIndex: number = 0) => {
            const enableBit = enabled ? 0b1000 : 0
            return valueIndex | enableBit
        }

        envParamSend(
            {
                ctrl: envCtrls.TOGGLE_STAGE,
                ctrlIndex: envId,
                valueIndex: stageId,
                value: stage.enabled,
                voiceGroupIndex,
                source: ApiSource.UI,
            },
            stageEnabledOutputMapper
        )
    }
}

function sendEnvParams(voiceGroupIndex: number, envId: number, env: EnvelopeState, prevEnv: EnvelopeState) {
    for (const stageName of STAGE_NAMES) {
        const stage = env.stages[stageName]
        const prevStage = prevEnv.stages[stageName]
        if (stage !== prevStage) {
            sendStageParams(voiceGroupIndex, envId, stageName, stage, prevStage)
        }
    }

    if (env.invert !== prevEnv.invert) {
        envParamSend(
            {
                ctrl: envCtrls.INVERT,
                ctrlIndex: envId,
                value: env.invert,
                voiceGroupIndex,
                source: ApiSource.UI,
            },
            (value: number) => value
        )
    }

    if (env.loop !== prevEnv.loop) {
        envParamSend(
            {
                ctrl: envCtrls.LOOP,
                ctrlIndex: envId,
                value: env.loop,
                voiceGroupIndex,
                source: ApiSource.UI,
            },
            (value: number) => value
        )
    }

    if (env.velocity !== prevEnv.velocity) {
        envParamSend(
            {
                ctrl: envCtrls.VELOCITY,
                ctrlIndex: envId,
                value: env.velocity,
                voiceGroupIndex,
                source: ApiSource.UI,
            },
            (value: number) => value
        )
    }

    if (env.loopMode !== prevEnv.loopMode) {
        envParamSend(
            {
                ctrl: envCtrls.LOOP_MODE,
                ctrlIndex: envId,
                value: env.loopMode,
                voiceGroupIndex,
                source: ApiSource.UI,
            },
            (value: number) => value
        )
    }

    if (env.maxLoops !== prevEnv.maxLoops) {
        envParamSend(
            {
                ctrl: envCtrls.MAX_LOOPS,
                ctrlIndex: envId,
                value: env.maxLoops,
                voiceGroupIndex,
                source: ApiSource.UI,
            },
            (value: number) => value
        )
    }

    if (env.resetOnTrigger !== prevEnv.resetOnTrigger) {
        envParamSend(
            {
                ctrl: envCtrls.RESET_ON_TRIGGER,
                ctrlIndex: envId,
                value: env.resetOnTrigger,
                voiceGroupIndex,
                source: ApiSource.UI,
            },
            (value: number) => value
        )
    }

    if (env.releaseMode !== prevEnv.releaseMode) {
        envParamSend(
            {
                ctrl: envCtrls.RELEASE_MODE,
                ctrlIndex: envId,
                value: env.releaseMode,
                voiceGroupIndex,
                source: ApiSource.UI,
            },
            (value: number) => value
        )
    }

    if (env.bipolar !== prevEnv.bipolar) {
        envParamSend(
            {
                ctrl: envCtrls.BIPOLAR,
                ctrlIndex: envId,
                value: env.bipolar,
                voiceGroupIndex,
                source: ApiSource.UI,
            },
            (value: number) => value
        )
    }

    if (env.offset !== prevEnv.offset) {
        envParamSend({
            ctrl: envCtrls.OFFSET,
            ctrlIndex: envId,
            value: env.offset,
            voiceGroupIndex,
            source: ApiSource.UI,
        })
    }
}

let unsubscribers: (() => void)[] = []

/**
 * Start sending MIDI when Zustand envelope state changes.
 * Only sends the specific parameters that changed.
 */
export function startEnvelopeMidiSend() {
    stopEnvelopeMidiSend()

    voiceGroupStores.forEach((store, voiceGroupIndex) => {
        let previousEnvelopes = store.getState().envelopes

        const unsub = store.subscribe((state) => {
            if (isMidiReceiving()) {
                previousEnvelopes = state.envelopes
                return
            }
            if (state.envelopes !== previousEnvelopes) {
                const prev = previousEnvelopes
                previousEnvelopes = state.envelopes

                for (let envId = 0; envId < Math.min(state.envelopes.length, NUMBER_OF_ENVELOPES); envId++) {
                    if (state.envelopes[envId] !== prev[envId]) {
                        sendEnvParams(voiceGroupIndex, envId, state.envelopes[envId], prev[envId])
                    }
                }
            }
        })

        unsubscribers.push(unsub)
    })
}

export function stopEnvelopeMidiSend() {
    unsubscribers.forEach((unsub) => unsub())
    unsubscribers = []
}
