import { useUiStore } from '../../store/uiStore'
import { useCurve } from './curveCalculator'
import LfoOptionsLeft from './LfoOptionsLeft'
import LfoOptionsRight from './LfoOptionsRight'
import LfoParams from './LfoParams'
import StageActivator from './StageActivator'
import Stages from './Stages'
import '../components/Ctrl.scss'

const LfoControl = () => {
    const lfoId = useUiStore((s) => s.selectedLfoId)
    const [points, stageBackgrounds] = useCurve(lfoId)

    return (
        <div className="ctrl-layout">
            <LfoOptionsLeft lfoId={lfoId} />
            <div className="ctrl-stages">
                <div className="ctrl-graph">
                    <svg viewBox={`0 0 1 1`} preserveAspectRatio="none" className="ctrl-graph-svg">
                        <Stages points={points} stageBackgrounds={stageBackgrounds} />
                    </svg>
                </div>
                <LfoParams lfoId={lfoId} delayLevel={points[0].y} />
            </div>
            <div className="ctrl-right-panel">
                <StageActivator lfoId={lfoId} />
                <LfoOptionsRight lfoId={lfoId} />
            </div>
        </div>
    )
}

export default LfoControl
