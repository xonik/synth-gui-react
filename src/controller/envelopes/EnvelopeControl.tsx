import React from 'react'
import Stages from './Stages'
import { useAppSelector } from '../../forces/hooks'
import { selectEnvelope } from '../../forces/envelope/envelopesReducer'
import StageActivator from './StageActivator'
import EnvOptions from './EnvOptions'
import StageParams from './StageParams'
import StageNames from './StageNames'
import './EnvelopeControl.scss'

// Draw the desired slope between from and to. NB: SVG has 0,0 in upper left corner.
const EnvelopeControl = () => {

    const env = useAppSelector(selectEnvelope).envs[0]
    return <div className="env-ctrl">
        <EnvOptions env={env}/>
        <div className="env-ctrl-stages">
            <StageNames env={env} className="env-ctrl-stage-names"/>
            <div className="env-ctrl-graph">
                <svg viewBox={`0 0 1 1`} preserveAspectRatio="none" className="env-ctrl-graph-svg">
                    <Stages env={env}/>
                </svg>
            </div>
            <StageParams env={env} className="env-ctrl-stage-params"/>
        </div>
        <StageActivator env={env}/>

    </div>
}

export default EnvelopeControl