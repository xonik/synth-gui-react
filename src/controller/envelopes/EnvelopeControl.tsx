import { useUiStore } from '../../store'
import { useEnvCurve } from './curveCalculator'
import EnvOptionsLeft from './EnvOptionsLeft'
import StageActivator from './StageActivator'
import StageParams from './StageParams'
import Stages from './Stages'
import '../components/Ctrl.scss'

const EnvelopeControl = () => {
    const envId = useUiStore((s) => s.selectedEnvId)
    const [points, stageBackgrounds] = useEnvCurve(envId)

    return (
        <div className="ctrl-layout">
            <EnvOptionsLeft envId={envId} />
            <div className="ctrl-stages">
                <div className="ctrl-graph">
                    <svg viewBox={`0 0 1 1`} preserveAspectRatio="none" className="ctrl-graph-svg">
                        <Stages envId={envId} points={points} stageBackgrounds={stageBackgrounds} />
                    </svg>
                </div>
                <StageParams envId={envId} />
            </div>
            <StageActivator envId={envId} />
        </div>
    )
}

export default EnvelopeControl
