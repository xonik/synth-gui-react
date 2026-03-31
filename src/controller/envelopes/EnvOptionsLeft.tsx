import { CtrlOptions } from '@/controller/components/CtrlOptions'
import { getCurveName } from '../../components/curves/shortCurveNames'
import { useUiStore } from '../../store'
import { useEnvCycleParam, useEnvParam, useEnvStageById, useEnvToggle } from '../../store/modules/useEnvelope'
import { envCtrls } from '../../synthcore/modules/env/envControllers'
import { LoopMode, ReleaseMode, StageId } from '../../synthcore/modules/env/types'
import Button from '../components/Button'
import { loopModeNames, releaseModeNames } from './utils'

interface Props {
    envId: number
}

const getLoopLabel = (loopMode: LoopMode, loops: number) =>
    `Loop ${loopMode === LoopMode.COUNTED ? `${loops} ` : ''} ${loopModeNames[loopMode]}`

const EnvOptionsLeft = ({ envId }: Props) => {
    const { value: invert, toggle: toggleInvert } = useEnvToggle(envId, 'invert')
    const { value: retrigger, toggle: toggleRetrigger } = useEnvToggle(envId, 'resetOnTrigger')
    const { value: loopEnabled, toggle: toggleLoop } = useEnvToggle(envId, 'loop')
    const { value: releaseMode, cycle: cycleReleaseMode } = useEnvCycleParam(envId, 'releaseMode', 3)
    const { value: loopMode, cycle: cycleLoopMode } = useEnvCycleParam(envId, 'loopMode', 3)
    const maxLoops = useEnvParam(envId, 'maxLoops')

    const currStageId = useUiStore((s) => s.selectedEnvStageId)
    const hasCurve = currStageId !== StageId.STOPPED && currStageId !== StageId.DELAY && currStageId !== StageId.SUSTAIN
    const stage = useEnvStageById(envId, currStageId)
    const curveLabel = hasCurve ? getCurveName(envCtrls.CURVE, stage.curve) : '-'

    return (
        <CtrlOptions heading={curveLabel}>
            <Button active={!!invert} onClick={toggleInvert}>
                Invert
            </Button>
            <Button active={!!retrigger} onClick={toggleRetrigger}>
                Retrigger
            </Button>
            <Button active={releaseMode !== ReleaseMode.NORMAL} onClick={cycleReleaseMode}>
                {releaseModeNames[releaseMode]}
            </Button>
            <Button active={!!loopEnabled} onClick={cycleLoopMode}>
                {getLoopLabel(loopMode as LoopMode, maxLoops)}
            </Button>
            <Button active={!!loopEnabled} onClick={toggleLoop}>
                Loop
            </Button>
        </CtrlOptions>
    )
}

export default EnvOptionsLeft
