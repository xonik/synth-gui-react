import { CtrlOptions } from '@/controller/components/CtrlOptions'
import { isLfoStageToggleable, LFO_STAGE_NAMES } from '../../store/modules/lfoActions'
import { useLfoStageToggle } from '../../store/modules/useLfo'
import { useVoiceGroupStore } from '../../store/patchStore'
import { useUiStore } from '../../store/uiStore'
import Button from '../components/Button'

interface Props {
    lfoId: number
}

const displayNames: Record<string, string> = {
    delay: 'Delay',
    attack: 'Attack',
    release: 'Release',
}

const StageActivator = ({ lfoId }: Props) => {
    const voiceGroupIndex = useUiStore((s) => s.currentVoiceGroupIndex)
    const stages = useVoiceGroupStore(voiceGroupIndex, (s) => s.lfos[lfoId].stages)
    const toggleStage = useLfoStageToggle(lfoId)

    return (
        <CtrlOptions>
            {LFO_STAGE_NAMES.map((stageName) => {
                if (stageName === 'stopped') {
                    return null
                }
                const toggleable = isLfoStageToggleable(stageName)
                return (
                    <Button
                        key={stageName}
                        active={!toggleable || stages[stageName].enabled === 1}
                        onClick={toggleable ? () => toggleStage(stageName) : () => {}}
                    >
                        {displayNames[stageName]}
                    </Button>
                )
            })}
        </CtrlOptions>
    )
}

export default StageActivator
