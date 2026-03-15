import React from 'react'
import Stages from './Stages'
import { useAppSelector } from '../../synthcore/hooks'
import { selectCurrGuiLfoId } from '../../synthcore/modules/lfo/lfoReducer'
import StageActivator from './StageActivator'
import LfoOptionsLeft from './LfoOptionsLeft'
import LfoParams from './LfoParams'
import LfoOptionsRight from './LfoOptionsRight'
import { useCurve } from './curveCalculator'

// Draw the desired slope between from and to. NB: SVG has 0,0 in upper left corner.
const LfoControl = () => {

    const lfoId = useAppSelector(selectCurrGuiLfoId)
    const [points, stageBackgrounds] = useCurve(lfoId)

    return <div className="ctrl-layout">
        <LfoOptionsLeft lfoId={lfoId}/>
        <div className="ctrl-stages">
            <div className="ctrl-graph">
                <svg viewBox={`0 0 1 1`} preserveAspectRatio="none" className="ctrl-graph-svg">
                    <Stages lfoId={lfoId} points={points} stageBackgrounds={stageBackgrounds}/>
                </svg>
            </div>
            <LfoParams lfoId={lfoId} delayLevel={points[0].y}/>
        </div>
        <div className="ctrl-right-panel">
            <StageActivator lfoId={lfoId}/>
            <LfoOptionsRight lfoId={lfoId}/>
        </div>
    </div>
}

export default LfoControl