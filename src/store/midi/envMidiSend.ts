import type { ControllerConfigButton } from '@/midi/types'
import type { EnvelopeState } from '@/store'
import { envCtrls } from '@/synthcore/modules/env/envControllers'
import { envParamSend } from '@/synthcore/modules/env/envMidiApi'
import { NUMBER_OF_ENVELOPES, StageId } from '@/synthcore/modules/env/types'
import { ApiSource } from '@/synthcore/types'
import { STAGE_NAMES, type StageName } from '../modules/envActions'
import { createStoreMidiSend, curveOutputMapper, stageEnabledOutputMapper } from './midiSendUtils'

type EnvField = keyof Omit<EnvelopeState, 'stages'>

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

const buttonMappings: { field: EnvField; ctrl: ControllerConfigButton }[] = [
    { field: 'invert', ctrl: envCtrls.INVERT },
    { field: 'loop', ctrl: envCtrls.LOOP },
    { field: 'velocity', ctrl: envCtrls.VELOCITY },
    { field: 'loopMode', ctrl: envCtrls.LOOP_MODE },
    { field: 'resetOnTrigger', ctrl: envCtrls.RESET_ON_TRIGGER },
    { field: 'releaseMode', ctrl: envCtrls.RELEASE_MODE },
    { field: 'bipolar', ctrl: envCtrls.BIPOLAR },
]

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

    for (const m of buttonMappings) {
        if (env[m.field] !== prevEnv[m.field]) {
            envParamSend({
                ctrl: m.ctrl,
                ctrlIndex: envId,
                value: env[m.field],
                voiceGroupIndex,
                source: ApiSource.UI,
            })
        }
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

const { start: startEnvelopeMidiSend, stop: stopEnvelopeMidiSend } = createStoreMidiSend<EnvelopeState>({
    getItems: (state) => state.envelopes as EnvelopeState[],
    itemCount: NUMBER_OF_ENVELOPES,
    sendItem: sendEnvParams,
})

export { startEnvelopeMidiSend, stopEnvelopeMidiSend }