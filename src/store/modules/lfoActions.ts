import type { LfoStages, VoiceGroupPatch } from '@/store'
import { StageId } from '@/synthcore/modules/lfo/types'

export type LfoStageName = keyof LfoStages

export const LFO_STAGE_NAMES: LfoStageName[] = ['delay', 'attack', 'release', 'stopped']

const TOGGLEABLE_STAGES: LfoStageName[] = ['delay', 'release']

export const STAGE_NAME_TO_ID: Record<LfoStageName, StageId> = {
    delay: StageId.DELAY,
    attack: StageId.ATTACK,
    release: StageId.RELEASE,
    stopped: StageId.STOPPED,
}

export const STAGE_ID_TO_NAME: Record<StageId, LfoStageName> = {
    [StageId.DELAY]: 'delay',
    [StageId.ATTACK]: 'attack',
    [StageId.RELEASE]: 'release',
    [StageId.STOPPED]: 'stopped',
}

export function toggleLfoStageEnabled(state: VoiceGroupPatch, lfoId: number, stageName: LfoStageName): void {
    if (!TOGGLEABLE_STAGES.includes(stageName)) {
        return
    }

    const stage = state.lfos[lfoId].stages[stageName]
    stage.enabled = stage.enabled ? 0 : 1
}

export function isLfoStageToggleable(stageName: LfoStageName): boolean {
    return TOGGLEABLE_STAGES.includes(stageName)
}
