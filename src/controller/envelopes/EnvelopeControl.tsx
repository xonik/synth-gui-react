import React from 'react'
import Stages from './Stages'
import { useAppSelector } from '../../synthcore/hooks'
import { selectCurrEnvId } from '../../synthcore/modules/env/envReducer'
import StageActivator from './StageActivator'
import EnvOptions from './EnvOptions'
import StageParams from './StageParams'
import StageNames from './StageNames'
import './EnvelopeControl.scss'

// Draw the desired slope between from and to. NB: SVG has 0,0 in upper left corner.
const EnvelopeControl = () => {

    const envId = useAppSelector(selectCurrEnvId)

    return <div className="env-ctrl">
        <EnvOptions envId={envId}/>
        <div className="env-ctrl-stages">
            <StageNames envId={envId}/>
            <div className="env-ctrl-graph">
                <svg viewBox={`0 0 1 1`} preserveAspectRatio="none" className="env-ctrl-graph-svg">
                    <Stages envId={envId}/>
                </svg>
            </div>
            <StageParams envId={envId}/>
        </div>
        <StageActivator envId={envId}/>

    </div>
}

export default EnvelopeControl