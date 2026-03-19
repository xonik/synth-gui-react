/**
 * Hooks for connecting envelope UI components to the Zustand store.
 *
 * Provides typed, response-mapped access to envelope parameters with
 * business logic (sustain mirroring, invert resets) handled automatically.
 */

import { useCallback, useMemo } from 'react'
import { useVoiceGroupStore, voiceGroupStores, VoiceGroupPatch, EnvelopeState } from '../patchStore'
import { useUiStore } from '../uiStore'
import { StageName, STAGE_NAMES, setStageLevel, setStageTime, toggleStageEnabled, toggleInvert, setInvert } from './envActions'
import { timeResponseMapper, dbLevelResponseMapper } from '../../synthcore/modules/common/responseMappers'
import { StageId } from '../../synthcore/modules/env/types'

function getBounded(value: number, min: number, max: number): number {
    if (value > max) return max
    if (value < min) return min
    return value
}

export function useEnvTime(envId: number, stageName: StageName) {
    const voiceGroupIndex = useUiStore(s => s.currentVoiceGroupIndex)
    const rawValue = useVoiceGroupStore(voiceGroupIndex, s => s.envelopes[envId].stages[stageName].time)

    const displayValue = useMemo(
        () => timeResponseMapper.input(rawValue),
        [rawValue]
    )

    const increment = useCallback((delta: number) => {
        const newDisplay = getBounded(displayValue + delta, 0, 1)
        const newRaw = timeResponseMapper.output(newDisplay)
        voiceGroupStores[voiceGroupIndex].getState().set(state => {
            setStageTime(state, envId, stageName, newRaw)
        })
    }, [voiceGroupIndex, envId, stageName, displayValue])

    return { displayValue, increment }
}

export function useEnvLevel(envId: number, stageName: StageName) {
    const voiceGroupIndex = useUiStore(s => s.currentVoiceGroupIndex)
    const rawValue = useVoiceGroupStore(voiceGroupIndex, s => s.envelopes[envId].stages[stageName].level)
    const bipolar = useVoiceGroupStore(voiceGroupIndex, s => s.envelopes[envId].bipolar) === 1

    const displayValue = useMemo(
        () => dbLevelResponseMapper.input(rawValue, bipolar),
        [rawValue, bipolar]
    )

    const increment = useCallback((delta: number) => {
        const newDisplay = getBounded(displayValue + delta, bipolar ? -1 : 0, 1)
        const newRaw = dbLevelResponseMapper.output(newDisplay, bipolar)
        voiceGroupStores[voiceGroupIndex].getState().set(state => {
            setStageLevel(state, envId, stageName, newRaw)
        })
    }, [voiceGroupIndex, envId, stageName, displayValue, bipolar])

    return { displayValue, bipolar, increment }
}

export function useEnvToggle(envId: number, param: keyof Omit<VoiceGroupPatch['envelopes'][0], 'stages' | 'offset' | 'maxLoops'>) {
    const voiceGroupIndex = useUiStore(s => s.currentVoiceGroupIndex)
    const value = useVoiceGroupStore(voiceGroupIndex, s => s.envelopes[envId][param] as number)

    const toggle = useCallback(() => {
        voiceGroupStores[voiceGroupIndex].getState().set(state => {
            if (param === 'invert') {
                toggleInvert(state, envId)
            } else {
                const current = state.envelopes[envId][param] as number
                state.envelopes[envId][param] = current === 0 ? 1 : 0
            }
        })
    }, [voiceGroupIndex, envId, param])

    return { value, toggle }
}

export function useEnvStageEnabled(envId: number, stageName: StageName) {
    const voiceGroupIndex = useUiStore(s => s.currentVoiceGroupIndex)
    return useVoiceGroupStore(voiceGroupIndex, s => s.envelopes[envId].stages[stageName].enabled)
}

const STAGE_NAME_TO_ID: Record<StageName, StageId> = {
    delay: StageId.DELAY,
    attack: StageId.ATTACK,
    decay1: StageId.DECAY1,
    decay2: StageId.DECAY2,
    sustain: StageId.SUSTAIN,
    release1: StageId.RELEASE1,
    release2: StageId.RELEASE2,
}

export type DisplayStage = {
    id: StageId
    enabled: number
    curve: number
    level: number
    time: number
}

/**
 * Returns all stages of an envelope as an array compatible with the
 * display components (same shape as the old selectEnvStages selector).
 */
export function useEnvStages(envId: number): DisplayStage[] {
    const voiceGroupIndex = useUiStore(s => s.currentVoiceGroupIndex)
    const env = useVoiceGroupStore(voiceGroupIndex, s => s.envelopes[envId])

    return useMemo(() => {
        const stages: DisplayStage[] = STAGE_NAMES.map(name => {
            const stage = env.stages[name]
            return {
                id: STAGE_NAME_TO_ID[name],
                enabled: stage.enabled,
                curve: stage.curve,
                level: stage.level,
                time: stage.time,
            }
        })
        // Add STOPPED stage
        stages.push({
            id: StageId.STOPPED,
            enabled: 1,
            curve: 0,
            level: 0,
            time: 0,
        })
        return stages
    }, [env])
}

/**
 * Returns a single stage by envId and stageId.
 */
export function useEnvStageById(envId: number, stageId: StageId): DisplayStage {
    const stages = useEnvStages(envId)
    return stages[stageId]
}

/**
 * Returns a scalar envelope parameter (bipolar, offset, etc.)
 */
export function useEnvParam(envId: number, param: keyof Omit<EnvelopeState, 'stages'>): number {
    const voiceGroupIndex = useUiStore(s => s.currentVoiceGroupIndex)
    return useVoiceGroupStore(voiceGroupIndex, s => s.envelopes[envId][param])
}

/**
 * Toggle a stage's enabled state via Zustand.
 */
export function useEnvStageToggle(envId: number) {
    const voiceGroupIndex = useUiStore(s => s.currentVoiceGroupIndex)

    const toggle = useCallback((stageName: StageName) => {
        voiceGroupStores[voiceGroupIndex].getState().set(state => {
            toggleStageEnabled(state, envId, stageName)
        })
    }, [voiceGroupIndex, envId])

    return toggle
}

/**
 * Cycle a multi-value parameter (releaseMode, loopMode, etc.)
 */
export function useEnvCycleParam(envId: number, param: keyof Omit<EnvelopeState, 'stages'>, numValues: number) {
    const voiceGroupIndex = useUiStore(s => s.currentVoiceGroupIndex)
    const value = useVoiceGroupStore(voiceGroupIndex, s => s.envelopes[envId][param])

    const cycle = useCallback(() => {
        voiceGroupStores[voiceGroupIndex].getState().set(state => {
            const current = state.envelopes[envId][param] as number
            state.envelopes[envId][param] = ((current + 1) % numValues) as never
        })
    }, [voiceGroupIndex, envId, param, numValues])

    return { value, cycle }
}
