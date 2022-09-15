import React from 'react'
import Stages from './Stages'
import { useAppSelector } from '../../synthcore/hooks'
import { selectCurrGuiLfoId } from '../../synthcore/modules/lfo/lfoReducer'
import StageActivator from './StageActivator'
import LfoOptionsLeft from './LfoOptionsLeft'
import StageParams from './StageParams'
import StageNames from './StageNames'
import LfoOptionsRight from './LfoOptionsRight'
import './LfoControl.scss'

// Draw the desired slope between from and to. NB: SVG has 0,0 in upper left corner.
const LfoControl = () => {

    const lfoId = useAppSelector(selectCurrGuiLfoId)

    return <div className="lfo-ctrl">
        <LfoOptionsLeft lfoId={lfoId}/>
        <div className="lfo-ctrl-stages">
            <StageNames lfoId={lfoId}/>
            <div className="lfo-ctrl-graph">
                <svg viewBox={`0 0 1 1`} preserveAspectRatio="none" className="lfo-ctrl-graph-svg">
                    <Stages lfoId={lfoId}/>
                </svg>
            </div>
            <StageParams lfoId={lfoId}/>
        </div>
        <div>
            <StageActivator lfoId={lfoId}/>
            <LfoOptionsRight lfoId={lfoId}/>
        </div>

    </div>
}

export default LfoControl