/**
 * Envelope business logic as pure functions operating on the Zustand store.
 *
 * These extract the rules previously embedded in envApi.ts handler classes:
 * - StageLevelControllerHandler
 * - StageTimeControllerHandler
 * - StageEnabledControllerHandler
 * - StageCurveControllerHandler
 * - InvertControllerHandler
 * - MaxLoopsControllerHandler
 *
 * Each function takes an immer draft and mutates it directly.
 */

import { EnvelopeState, EnvelopeStageState, VoiceGroupPatch } from '../patchStore'
import { getBounded, getQuantized } from '../utils'

export type StageName = keyof EnvelopeState['stages']

export const STAGE_NAMES: StageName[] = [
    'delay',
    'attack',
    'decay1',
    'decay2',
    'sustain',
    'release1',
    'release2',
    'stopped',
]

const TOGGLEABLE_STAGES: StageName[] = [
    'delay',
    'decay1',
    'decay2',
    'release1',
]

const LEVEL_EDITABLE_STAGES: StageName[] = [
    'decay2',
    'sustain',
]

function boundLevel(value: number, bipolar: boolean): number {
    const bounded = bipolar
        ? getBounded(value, -1, 1)
        : getBounded(value, 0, 1)
    return getQuantized(bounded, 32767)
}

function boundTime(value: number): number {
    return getQuantized(getBounded(value, 0, 1))
}

/**
 * Set a stage's level value, with sustain mirroring logic.
 *
 * Rules:
 * - Only decay2, sustain, and release2 (when r1 enabled) levels can be set
 * - Setting sustain level also copies to R1 or R2 depending on which is enabled
 */
export function setStageLevel(
    state: VoiceGroupPatch,
    envId: number,
    stageName: StageName,
    value: number
): void {
    const env = state.envelopes[envId]
    const bipolar = env.bipolar === 1
    const bounded = boundLevel(value, bipolar)

    const r1Enabled = env.stages.release1.enabled === 1

    if (stageName === 'sustain') {
        env.stages.sustain.level = bounded
        if (r1Enabled) {
            env.stages.release1.level = bounded
        } else {
            env.stages.release2.level = bounded
        }
    } else if (stageName === 'decay2' || (stageName === 'release2' && r1Enabled)) {
        env.stages[stageName].level = bounded
    }
}

/**
 * Set a stage's time value.
 */
export function setStageTime(
    state: VoiceGroupPatch,
    envId: number,
    stageName: StageName,
    value: number
): void {
    state.envelopes[envId].stages[stageName].time = boundTime(value)
}

/**
 * Toggle a stage's enabled state.
 *
 * Rules:
 * - Only delay, decay1, decay2, release1 can be toggled
 * - When R1 is toggled, sustain level is copied to the newly active release stage
 */
export function toggleStageEnabled(
    state: VoiceGroupPatch,
    envId: number,
    stageName: StageName
): void {
    if (!TOGGLEABLE_STAGES.includes(stageName)) {
        return
    }

    const env = state.envelopes[envId]
    const stage = env.stages[stageName]
    const newEnabled = stage.enabled === 1 ? 0 : 1
    stage.enabled = newEnabled

    if (stageName === 'release1') {
        const sustainLevel = env.stages.sustain.level
        if (newEnabled === 1) {
            env.stages.release1.level = sustainLevel
        } else {
            env.stages.release2.level = sustainLevel
        }
    }
}

/**
 * Set a stage's enabled state to a specific value.
 */
export function setStageEnabled(
    state: VoiceGroupPatch,
    envId: number,
    stageName: StageName,
    enabled: number
): void {
    if (!TOGGLEABLE_STAGES.includes(stageName)) {
        return
    }

    const env = state.envelopes[envId]
    env.stages[stageName].enabled = enabled

    if (stageName === 'release1') {
        const sustainLevel = env.stages.sustain.level
        if (enabled === 1) {
            env.stages.release1.level = sustainLevel
        } else {
            env.stages.release2.level = sustainLevel
        }
    }
}

/**
 * Set a stage's curve.
 */
export function setStageCurve(
    state: VoiceGroupPatch,
    envId: number,
    stageName: StageName,
    curveIndex: number,
    numCurves: number
): void {
    state.envelopes[envId].stages[stageName].curve = getBounded(curveIndex, 0, numCurves - 1)
}

/**
 * Toggle the invert flag and reset related stage levels.
 *
 * Rules:
 * - When inverted: delay, attack, stopped levels → 1, decay1 level → 0
 * - When not inverted: delay, attack, stopped levels → 0, decay1 level → 1
 */
export function toggleInvert(
    state: VoiceGroupPatch,
    envId: number
): void {
    const env = state.envelopes[envId]
    const newInvert = env.invert === 1 ? 0 : 1
    env.invert = newInvert

    const resetLevel = newInvert ? 1 : 0
    env.stages.delay.level = resetLevel
    env.stages.attack.level = resetLevel
    env.stages.decay1.level = newInvert ? 0 : 1
    env.stages.stopped.level = resetLevel
}

/**
 * Set the invert flag with level resets.
 */
export function setInvert(
    state: VoiceGroupPatch,
    envId: number,
    value: number
): void {
    const env = state.envelopes[envId]
    env.invert = value

    const resetLevel = value ? 1 : 0
    env.stages.delay.level = resetLevel
    env.stages.attack.level = resetLevel
    env.stages.decay1.level = value ? 0 : 1
    env.stages.stopped.level = resetLevel
}

/**
 * Set max loops, bounded 1-127.
 */
export function setMaxLoops(
    state: VoiceGroupPatch,
    envId: number,
    value: number
): void {
    state.envelopes[envId].maxLoops = getBounded(value, 1, 127)
}

/**
 * Increment max loops by a delta.
 */
export function incrementMaxLoops(
    state: VoiceGroupPatch,
    envId: number,
    delta: number
): void {
    const current = state.envelopes[envId].maxLoops
    setMaxLoops(state, envId, current + delta)
}

/**
 * Check if a stage name is toggleable.
 */
export function isToggleable(stageName: StageName): boolean {
    return TOGGLEABLE_STAGES.includes(stageName)
}

/**
 * Check if a stage's level can be directly edited.
 */
export function isLevelEditable(stageName: StageName, r1Enabled: boolean): boolean {
    if (stageName === 'release2' && r1Enabled) return true
    return LEVEL_EDITABLE_STAGES.includes(stageName)
}
