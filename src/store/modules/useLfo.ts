import { useCallback } from 'react'
import { voiceGroupStores } from '../patchStore'
import { useUiStore } from '../uiStore'
import { type LfoStageName, toggleLfoStageEnabled } from './lfoActions'

export function useLfoStageToggle(lfoId: number) {
    const voiceGroupIndex = useUiStore((s) => s.currentVoiceGroupIndex)

    const toggle = useCallback(
        (stageName: LfoStageName) => {
            voiceGroupStores[voiceGroupIndex].getState().set((state) => {
                toggleLfoStageEnabled(state, lfoId, stageName)
            })
        },
        [voiceGroupIndex, lfoId]
    )

    return toggle
}
