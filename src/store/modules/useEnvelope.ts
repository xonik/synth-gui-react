/**
 * Hooks for connecting envelope UI components to the Zustand store.
 *
 * Provides typed, response-mapped access to envelope parameters with
 * business logic (sustain mirroring, invert resets) handled automatically.
 */

import { useCallback, useMemo } from 'react'
import { useVoiceGroupStore, voiceGroupStores, VoiceGroupPatch } from '../patchStore'
import { useUiStore } from '../uiStore'
import { StageName, setStageLevel, setStageTime, toggleInvert } from './envActions'
import { timeResponseMapper, dbLevelResponseMapper } from '../../synthcore/modules/common/responseMappers'

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
