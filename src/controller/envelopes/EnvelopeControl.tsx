import React from 'react'
import Stages from './Stages'
import { useAppSelector } from '../../synthcore/hooks'
import { selectCurrEnvId } from '../../synthcore/modules/env/envReducer'
import StageActivator from './StageActivator'
import EnvOptionsLeft from './EnvOptionsLeft'
import StageParams from './StageParams'

// Draw the desired slope between from and to. NB: SVG has 0,0 in upper left corner.
const EnvelopeControl = () => {

    const envId = useAppSelector(selectCurrEnvId)

    return <div className="ctrl-layout">
        <EnvOptionsLeft envId={envId}/>
        <div className="ctrl-stages">
            <div className="ctrl-graph">
                <svg viewBox={`0 0 1 1`} preserveAspectRatio="none" className="ctrl-graph-svg">
                    <Stages envId={envId}/>
                </svg>
            </div>
            <StageParams envId={envId}/>
        </div>
        <StageActivator envId={envId}/>
    </div>
}

export default EnvelopeControl