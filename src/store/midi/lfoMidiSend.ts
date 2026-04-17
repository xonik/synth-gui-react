import type { ControllerConfigButton, ControllerConfigCC, ControllerConfigNRPN } from '@/midi/types'
import { MidiGroup } from '@/midi/types'
import type { LfoState } from '@/store'
import { lfoCtrls } from '@/synthcore/modules/lfo/lfoControllers'
import { ApiSource } from '@/synthcore/types'
import type { LfoStageName } from '../modules/lfoActions'
import { LFO_STAGE_NAMES, STAGE_NAME_TO_ID } from '../modules/lfoActions'
import { createModuleParamSend, createStoreMidiSend, curveOutputMapper, stageEnabledOutputMapper } from './midiSendUtils'

const NUMBER_OF_LFOS = 4

type LfoField = keyof Omit<LfoState, 'stages'>

export interface NrpnMapping {
    field: LfoField
    ctrl: ControllerConfigNRPN
}

export interface ButtonMapping {
    field: LfoField
    ctrl: ControllerConfigButton
}

export const nrpnMappings: NrpnMapping[] = [
    { field: 'rate', ctrl: lfoCtrls.RATE },
    { field: 'depth', ctrl: lfoCtrls.DEPTH },
    { field: 'delay', ctrl: lfoCtrls.DELAY },
    { field: 'balance', ctrl: lfoCtrls.BALANCE },
    { field: 'phaseOffset', ctrl: lfoCtrls.PHASE_OFFSET },
    { field: 'levelOffset', ctrl: lfoCtrls.LEVEL_OFFSET },
]

export const buttonMappings: ButtonMapping[] = [
    { field: 'shape', ctrl: lfoCtrls.SHAPE },
    { field: 'sync', ctrl: lfoCtrls.SYNC },
    { field: 'reset', ctrl: lfoCtrls.RESET },
    { field: 'bipolar', ctrl: lfoCtrls.BIPOLAR },
    { field: 'randomPhase', ctrl: lfoCtrls.RANDOM_PHASE },
    { field: 'invert', ctrl: lfoCtrls.INVERT },
    { field: 'loop', ctrl: lfoCtrls.LOOP },
    { field: 'loopMode', ctrl: lfoCtrls.LOOP_MODE },
    { field: 'resetOnTrigger', ctrl: lfoCtrls.RESET_ON_TRIGGER },
    { field: 'resetOnStop', ctrl: lfoCtrls.RESET_ON_STOP },
    { field: 'resetLevelOnClock', ctrl: lfoCtrls.RESET_LEVEL_ON_CLOCK },
    { field: 'syncToClock', ctrl: lfoCtrls.SYNC_TO_CLOCK },
    { field: 'gated', ctrl: lfoCtrls.GATED },
]

const { moduleParamSend: lfoParamSend, selectSender } = createModuleParamSend(
    lfoCtrls.SELECT as ControllerConfigCC,
    MidiGroup.LFO
)

function sendStageParams(
    voiceGroupIndex: number,
    lfoId: number,
    stageName: LfoStageName,
    stage: LfoState['stages'][LfoStageName],
    prevStage: LfoState['stages'][LfoStageName]
) {
    const stageId = STAGE_NAME_TO_ID[stageName]

    if (stage.curve !== prevStage.curve) {
        lfoParamSend(
            {
                ctrl: lfoCtrls.CURVE,
                ctrlIndex: lfoId,
                valueIndex: stageId,
                value: stage.curve,
                voiceGroupIndex,
                source: ApiSource.UI,
            },
            curveOutputMapper
        )
    }

    if (stage.enabled !== prevStage.enabled) {
        lfoParamSend(
            {
                ctrl: lfoCtrls.TOGGLE_STAGE,
                ctrlIndex: lfoId,
                valueIndex: stageId,
                value: stage.enabled,
                voiceGroupIndex,
                source: ApiSource.UI,
            },
            stageEnabledOutputMapper
        )
    }
}

function sendLfoParams(voiceGroupIndex: number, lfoId: number, lfo: LfoState, prevLfo: LfoState) {
    for (const m of nrpnMappings) {
        if (lfo[m.field] !== prevLfo[m.field]) {
            lfoParamSend({
                ctrl: m.ctrl,
                ctrlIndex: lfoId,
                value: lfo[m.field],
                voiceGroupIndex,
                source: ApiSource.UI,
            })
        }
    }

    if (lfo.maxLoops !== prevLfo.maxLoops) {
        lfoParamSend(
            {
                ctrl: lfoCtrls.MAX_LOOPS,
                ctrlIndex: lfoId,
                value: lfo.maxLoops,
                voiceGroupIndex,
                source: ApiSource.UI,
            },
            (value: number) => value
        )
    }

    for (const m of buttonMappings) {
        if (lfo[m.field] !== prevLfo[m.field]) {
            lfoParamSend({
                ctrl: m.ctrl,
                ctrlIndex: lfoId,
                value: lfo[m.field],
                voiceGroupIndex,
                source: ApiSource.UI,
            })
        }
    }

    for (const stageName of LFO_STAGE_NAMES) {
        const stage = lfo.stages[stageName]
        const prevStage = prevLfo.stages[stageName]
        if (stage !== prevStage) {
            sendStageParams(voiceGroupIndex, lfoId, stageName, stage, prevStage)
        }
    }
}

const { start: startLfoMidiSend, stop: stopLfoMidiSend } = createStoreMidiSend<LfoState>({
    getItems: (state) => state.lfos as LfoState[],
    itemCount: NUMBER_OF_LFOS,
    sendItem: sendLfoParams,
    onStop: () => selectSender.reset(),
})

export { startLfoMidiSend, stopLfoMidiSend }
