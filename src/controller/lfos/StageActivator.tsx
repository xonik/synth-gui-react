import React, { useCallback } from 'react'
import { StageId } from '../../synthcore/modules/lfo/types'
import Button from '../components/Button'
import { stageNames } from './utils'
import { useUiStore } from '../../store/uiStore'
import { voiceGroupStores, useVoiceGroupStore } from '../../store/patchStore'
import { CtrlOptions } from "@/controller/components/CtrlOptions";

interface Props {
    lfoId: number
}

const NUMBER_OF_LFO_STAGES = 4

const StageActivator = ({ lfoId }: Props) => {
    const voiceGroupIndex = useUiStore(s => s.currentVoiceGroupIndex)
    const stages = useVoiceGroupStore(voiceGroupIndex, s => s.lfos[lfoId].stages)

    const toggleStage = useCallback((stageId: number) => {
        const store = voiceGroupStores[voiceGroupIndex].getState()
        const current = store.lfos[lfoId].stages[stageId]?.enabled ?? 0
        store.set(state => {
            if (!state.lfos[lfoId].stages[stageId]) {
                state.lfos[lfoId].stages[stageId] = { curve: 0, enabled: 0 }
            }
            state.lfos[lfoId].stages[stageId].enabled = current ? 0 : 1
        })
    }, [voiceGroupIndex, lfoId])

    return <CtrlOptions>
        {Array.from({ length: NUMBER_OF_LFO_STAGES }, (_, stageId) => {
            if (stageId === StageId.STOPPED) {
                return null
            }
            return <Button
                key={stageId}
                active={(stages[stageId]?.enabled ?? 0) === 1}
                onClick={() => toggleStage(stageId)}
            >{stageNames[stageId as StageId]}</Button>
        })}
    </CtrlOptions>
}

export default StageActivator
