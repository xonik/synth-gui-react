import { CtrlOptions } from '@/controller/components/CtrlOptions'
import type { StageName } from '@/store/modules/envActions'
import { useEnvStages, useEnvStageToggle } from '@/store/modules/useEnvelope'
import { StageId } from '@/synthcore/modules/env/types'
import Button from '../components/Button'
import { stageNames } from './utils'

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
    [StageId.STOPPED]: 'stopped',
}

const StageActivator = ({ envId }: Props) => {
    const stages = useEnvStages(envId)
    const toggleStage = useEnvStageToggle(envId)

    return (
        <CtrlOptions>
            {stages.map((stage) => {
                if (stage.id === StageId.STOPPED) {
                    return null
                }
                const stageName = STAGE_ID_TO_NAME[stage.id]
                return (
                    <Button key={stage.id} active={stage.enabled === 1} onClick={() => toggleStage(stageName)}>
                        {stageNames[stage.id]}
                    </Button>
                )
            })}
        </CtrlOptions>
    )
}

export default StageActivator
