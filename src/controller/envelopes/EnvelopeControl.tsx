import React from 'react'
import Stages from './Stages'
import { useAppSelector } from '../../forces/hooks'
import { selectEnvelope } from '../../forces/envelope/envelopesReducer'
import StageActivator from './StageActivator'
import EnvOptions from './EnvOptions'
import StageParams from './StageParams'
import './EnvelopeControl.scss'

// Draw the desired slope between from and to. NB: SVG has 0,0 in upper left corner.
const EnvelopeControl = () => {

    const env = useAppSelector(selectEnvelope).envs[0]

    return <div className="env-ctrl">
        <StageActivator env={env}/>
        <div>
            <svg viewBox={`0 0 1 1`} className="env-ctrl-stages">
                <Stages env={env}/>
            </svg>
            <StageParams env={env}/>
        </div>
        <EnvOptions env={env}/>
    </div>
}

export default EnvelopeControl