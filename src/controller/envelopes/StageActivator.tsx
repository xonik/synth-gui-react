import React from 'react'
import { StageId } from '../../synthcore/modules/env/types'
import Button from '../components/Button'
import { stageNames } from './utils'
import { useEnvStages, useEnvStageToggle } from '../../store/modules/useEnvelope'
import { StageName, STAGE_NAMES } from '../../store/modules/envActions'
import { CtrlOptions } from "@/controller/components/CtrlOptions";

interface Props {
    envId: number
}

const STAGE_ID_TO_NAME: Record<number, StageName> = {
    [StageId.DELAY]: 'delay',
    [StageId.ATTACK]: 'attack',
    [StageId.DECAY1]: 'decay1',
    [StageId.DECAY2]: 'decay2',
    [StageId.SUSTAIN]: 'sustain',
    [StageId.RELEASE1]: 'release1',
    [StageId.RELEASE2]: 'release2',
}

const StageActivator = ({ envId }: Props) => {

    const stages = useEnvStages(envId)
    const toggleStage = useEnvStageToggle(envId)

    return <CtrlOptions>
        {stages.map((stage) => {
            if (stage.id === StageId.STOPPED) {
                return null
            }
            const stageName = STAGE_ID_TO_NAME[stage.id]
            return <Button
                key={stage.id}
                active={stage.enabled === 1}
                onClick={() => toggleStage(stageName)}
            >{stageNames[stage.id]}</Button>
        })}
    </CtrlOptions>
}

export default StageActivator
